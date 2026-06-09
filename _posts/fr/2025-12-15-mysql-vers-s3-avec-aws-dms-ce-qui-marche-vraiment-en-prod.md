---
layout: post
title: "MySQL vers S3 avec AWS DMS : ce qui marche vraiment en production"
date: 2025-12-15
categories: [data, work, tech]
excerpt: "Je n'aime pas partager des retours d'expérience sur des logiciels spécifiques. Ces articles vieillissent mal. Mais sur AWS DMS vers S3, on a assez souffert chez..."
lang: fr
header_image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80"
header_image_alt: "Salle de serveurs avec des lumieres bleues"
header_image_credit: "Taylor Vick"
header_image_credit_url: "https://unsplash.com/@tvick"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: mysql-to-s3-with-aws-dms-what-actually-works-in-pr
---

Je n'aime pas partager des retours d'expérience sur des logiciels spécifiques. Ces articles vieillissent mal. Mais sur AWS DMS vers S3, on a assez souffert chez [Jolimoi](https://www.jolimoi.com) pour que garder ça pour nous serait criminel.

**Avertissement :** Ce qui suit n'est valable que dans notre contexte. AWS RDS Aurora MySQL > DMS > S3 > Databricks Autoloader (micro-batch toutes les 30 minutes).


## 1. Partitionnement : restez simple


Style Hive, partition `YYYYMMDD`, point. Pas de complexité inutile. Ça marche pour nous parce qu'on ne fait pas de query pruning directement sur S3, puisqu'on ingère tout via Autoloader vers Delta Lake.

Le vrai bénéfice : les backfills et les migrations deviennent triviaux. Adaptez à votre volume et vos patterns d'accès, mais commencez simple.


## 2. Découpez les tâches DMS stratégiquement


Ne faites pas 1 source = 1 tâche. Découpez par type de table (volume, taux de churn, criticité). Ça vous donne des full reloads indépendants et un tuning granulaire.

Mais attention : on ne fait ça que sur des tables isolées. Si la table A référence la table B et qu'elles sont dans des tâches séparées, vous risquez des incohérences temporelles.

Par ailleurs, on gère les schema drifts côté Autoloader avec l'inférence automatique de schéma.


## 3. Évaluations de pré-migration : passez votre tour


Quand votre cible est S3, je pense que c'est une perte de temps. DMS pousse du Parquet non structuré, il n'y a pas de schéma relationnel à valider.

On fait juste des vérifications de base (comptages de lignes, quelques checksums). Pousser vers S3 coûte si peu qu'on peut itérer rapidement sans se noyer dans des validations qui n'ont pas de sens dans ce contexte.


## 4. DMS Serverless : on a fait marche arrière


On l'a testé plusieurs fois sur des périodes de 3 à 6 mois. Plus cher, moins performant, scaling imprévisible.

On a fait marche arrière à chaque fois. AWS améliore constamment le produit, mais aujourd'hui côté tarification, les instances classiques restent plus prévisibles et économiques.


## 5. Les métadonnées de transaction sont non-négociables


Ajoutez un ID de transaction (`AR_H_CHANGE_SEQ` pour MySQL), l'`Op` (INSERT/UPDATE/DELETE) et le `TIMESTAMP`. DMS peut tronquer la précision à la milliseconde.

Sans ça, vous ne pouvez pas ordonner de manière fiable les opérations concurrentes. Ça a l'air d'un détail jusqu'au jour où ça casse vos garanties de cohérence.


## 6. Rétention des binlogs et dimensionnement des instances


**Côté source** : augmentez votre rétention de binlogs. Sept jours minimum pour nous. On a perdu des événements une fois à cause d'un binlog qui a expiré trop vite. On ne lésine plus depuis.

**Côté DMS** : lancez une grosse instance pour le full load, faites l'import, puis réduisez avant de passer en CDC continu. Ça nous a fait économiser des milliers d'euros. En revanche, ne sous-dimensionnez jamais le stockage de l'instance.


## 7. Les petits fichiers : le vrai ennemi


Même avec Parquet. On vise 100-200 Mo par fichier. La compaction se fait automatiquement côté Databricks (Auto Optimize + Z-Ordering), après l'ingestion dans Delta Lake.

On ajuste le commit/flush DMS en conséquence. Le coût de chargement depuis S3 est négligeable, et on ne charge normalement qu'une seule fois.


## Conclusion


AWS DMS vers S3 n'est pas une solution "configurer et oublier". Ce qui fait la différence, c'est la granularité des tâches sur des tables isolées, des métadonnées de transaction complètes, un dimensionnement intelligent et une vraie obsession pour les détails opérationnels.

Et surtout, votre architecture en aval compte autant que DMS. On ne requête jamais directement sur S3, puisque tout passe par Autoloader vers Delta Lake, puis dbt. Le Parquet sur S3 n'est pour nous qu'un buffer d'ingestion.

On capte les erreurs DMS et on monitore via un agent custom vers Slack. Le seul bug vraiment vicieux qu'on a rencontré : un `ALTER TYPE` sur un ENUM MySQL qui a mélangé les valeurs. Détecté rapidement, corrigé et re-full load.

Aujourd'hui, on ingère des centaines de To avec quasiment zéro maintenance. Mais il a fallu 2 ans pour en arriver là. Adaptez à votre contexte, ne copiez pas aveuglément !
