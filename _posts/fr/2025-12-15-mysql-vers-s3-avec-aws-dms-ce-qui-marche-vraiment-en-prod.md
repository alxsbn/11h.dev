---
layout: post
title: "MySQL vers S3 avec AWS DMS : ce qui marche vraiment en production"
date: 2025-12-15
categories: [data, work, tech]
excerpt: "Je n'aime pas partager des retours d'experience sur des logiciels specifiques. Ces articles vieillissent mal. Mais sur AWS DMS vers S3, on a assez souffert chez..."
lang: fr
header_image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80"
header_image_alt: "Salle de serveurs avec des lumieres bleues"
header_image_credit: "Taylor Vick"
header_image_credit_url: "https://unsplash.com/@tvick"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: mysql-to-s3-with-aws-dms-what-actually-works-in-pr
---

Je n'aime pas partager des retours d'experience sur des logiciels specifiques. Ces articles vieillissent mal. Mais sur AWS DMS vers S3, on a assez souffert chez [Jolimoi](https://www.jolimoi.com) pour que garder ca pour nous serait criminel.

**Avertissement :** Ce qui suit n'est valable que dans notre contexte. AWS RDS Aurora MySQL > DMS > S3 > Databricks Autoloader (micro-batch toutes les 30 minutes).


## 1. Partitionnement : restez simple


Style Hive, partition `YYYYMMDD`, point. Pas de complexite inutile. Ca marche pour nous parce qu'on ne fait pas de query pruning directement sur S3, puisqu'on ingere tout via Autoloader vers Delta Lake.

Le vrai benefice : les backfills et les migrations deviennent triviaux. Adaptez a votre volume et vos patterns d'acces, mais commencez simple.


## 2. Decoupez les taches DMS strategiquement


Ne faites pas 1 source = 1 tache. Decoupez par type de table (volume, taux de churn, criticite). Ca vous donne des full reloads independants et un tuning granulaire.

Mais attention : on ne fait ca que sur des tables isolees. Si la table A reference la table B et qu'elles sont dans des taches separees, vous risquez des incoherences temporelles.

Par ailleurs, on gere les schema drifts cote Autoloader avec l'inference automatique de schema.


## 3. Evaluations de pre-migration : passez votre tour


Quand votre cible est S3, je pense que c'est une perte de temps. DMS pousse du Parquet non structure, il n'y a pas de schema relationnel a valider.

On fait juste des verifications de base (comptages de lignes, quelques checksums). Pousser vers S3 coute si peu qu'on peut iterer rapidement sans se noyer dans des validations qui n'ont pas de sens dans ce contexte.


## 4. DMS Serverless : on a fait marche arriere


On l'a teste plusieurs fois sur des periodes de 3 a 6 mois. Plus cher, moins performant, scaling imprevisible.

On a fait marche arriere a chaque fois. AWS ameliore constamment le produit, mais aujourd'hui cote tarification, les instances classiques restent plus previsibles et economiques.


## 5. Les metadonnees de transaction sont non-negociables


Ajoutez un ID de transaction (`AR_H_CHANGE_SEQ` pour MySQL), l'`Op` (INSERT/UPDATE/DELETE) et le `TIMESTAMP`. DMS peut tronquer la precision a la milliseconde.

Sans ca, vous ne pouvez pas ordonner de maniere fiable les operations concurrentes. Ca a l'air d'un detail jusqu'au jour ou ca casse vos garanties de coherence.


## 6. Retention des binlogs et dimensionnement des instances


**Cote source** : augmentez votre retention de binlogs. Sept jours minimum pour nous. On a perdu des evenements une fois a cause d'un binlog qui a expire trop vite. On ne lesine plus depuis.

**Cote DMS** : lancez une grosse instance pour le full load, faites l'import, puis reduisez avant de passer en CDC continu. Ca nous a fait economiser des milliers d'euros. En revanche, ne sous-dimensionnez jamais le stockage de l'instance.


## 7. Les petits fichiers : le vrai ennemi


Meme avec Parquet. On vise 100-200 Mo par fichier. La compaction se fait automatiquement cote Databricks (Auto Optimize + Z-Ordering), apres l'ingestion dans Delta Lake.

On ajuste le commit/flush DMS en consequence. Le cout de chargement depuis S3 est negligeable, et on ne charge normalement qu'une seule fois.


## Conclusion


AWS DMS vers S3 n'est pas une solution "configurer et oublier". Ce qui fait la difference, c'est la granularite des taches sur des tables isolees, des metadonnees de transaction completes, un dimensionnement intelligent et une vraie obsession pour les details operationnels.

Et surtout, votre architecture en aval compte autant que DMS. On ne requete jamais directement sur S3, puisque tout passe par Autoloader vers Delta Lake, puis dbt. Le Parquet sur S3 n'est pour nous qu'un buffer d'ingestion.

On capte les erreurs DMS et on monitore via un agent custom vers Slack. Le seul bug vraiment vicieux qu'on a rencontre : un `ALTER TYPE` sur un ENUM MySQL qui a melange les valeurs. Detecte rapidement, corrige et re-full load.

Aujourd'hui, on ingere des centaines de To avec quasiment zero maintenance. Mais il a fallu 2 ans pour en arriver la. Adaptez a votre contexte, ne copiez pas aveuglement !
