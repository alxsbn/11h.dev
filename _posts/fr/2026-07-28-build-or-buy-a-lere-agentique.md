---
layout: post
title: "Build or buy : ce qu'on achète n'est plus ce qu'on croit"
date: 2026-07-28
categories: [data, ai]
excerpt: 'Un scanner juge Fivetran remplaçable à 52 % par un Skill Claude. La vraie question, ce sont les 48 % restants : le run, la conformité, l''accountability. C''est ça qu''on achète.'
header_image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1600&q=80"
header_image_alt: "Brique Lego jaune en gros plan sur fond jaune"
header_image_credit: "Xavi Cabrera"
header_image_credit_url: "https://unsplash.com/@xavi_cabrera"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: build-or-buy-agentic
lang: fr
---

Février 2026. Un site web propose de scanner n'importe quel SaaS pour dire s'il n'est, au fond, qu'un fichier markdown qui s'ignore. J'y entre fivetran.com. Le verdict tombe en dix secondes : **52 % remplaçable par un Skill Claude**.

Ce chiffre ne m'a plus lâché. Pas les 52 % que la machine prétend savoir réécrire : les 48 % qu'elle laisse dans l'ombre. C'est là, très exactement, que se joue le build or buy à l'ère agentique.

## La SaaSpocalypse

Tout part de cette trame qu'on a appelée la SaaSpocalypse : l'idée que les agents allaient nous permettre de réécrire tous les logiciels, et qu'il ne servirait donc bientôt plus à rien d'en acheter. Il ne faut pas minimiser l'effet. Des valorisations ont plongé de manière assez inconsidérée, sur la seule foi, si l'on en croit la légende, de quelques Skills publiés sur GitHub.

{% include bob/saaspocalypse.html lang=page.lang %}

La question de fond est réelle : quelque chose change peut-être intrinsèquement dans la manière de fabriquer du logiciel. Mais la chute, elle, fut surtout une réaction épidermique, gonflée par l'inflation du sujet et le boom de l'IA. Les marchés n'ont pas évalué un risque, ils ont paniqué sur un récit.

## Sommes-nous tous remplaçables ?

Un récit, ça se teste. D'où le scanner.

{% include bob/scanner.html lang=page.lang %}

52 %, donc. Et le diagnostic qui accompagne le certificat dit quelque chose de plus intéressant que le chiffre : bouger une base de données, c'est exactement le genre de chose qui rend un outil cher. Autrement dit, la moitié « remplaçable » de Fivetran, c'est du code que des agents savent écrire. L'autre moitié, c'est tout ce que le scanner ne sait pas mesurer. Gardez-la en tête : c'est précisément celle-là qu'on achète.

## Faire plus avec moins

Un mot de terrain, d'abord, parce que cette conviction ne sort pas d'un livre blanc. J'écris depuis une scale-up retail passée en mode lean : consommation des ménages en baisse, taux directeurs en hausse, levées de fonds en recul. Hiérarchie plate, just-in-time bien au-delà de la logistique, séniorisation des effectifs, zéro gaspillage. **La chasse à la croissance à tout prix a été chassée par la croissance rentable**, et ce n'est pas du tout le même sport.

Dans ce contexte, l'équipe data est passée de six ou sept personnes à deux. À chaque départ, la même question : est-ce qu'on remplace ? Et la même réponse : non, parce que l'automatisation avait déjà absorbé le poste. Ceux qui restent sont devenus full stack, du data engineering à l'analytics engineering, jusqu'à ce qu'un audit nous pose la seule question qui compte : où mettez-vous vos efforts pour générer de la valeur ?

Avant, on passait notre temps à écrire du code et à faire tourner la stack. Les agents et les automatisations ont absorbé les départs et libéré ce temps. **La vraie question, c'est : qu'avons-nous fait de ce temps ?**

{% include bob/time-bars.html lang=page.lang %}

La réponse tient en deux mots : context engineering. Plus de data engineering comme avant, plus d'analytics engineering comme avant, plus de BI à la main. De la configuration d'agents, des automatisations, de l'aide à la décision. Le temps gagné n'est pas reparti dans plus de code : il est reparti dans la définition de ce que le code doit servir.

## Une stack, cinq actes

Cette bascule ne s'est pas faite en un jour. Elle se lit dans l'histoire de notre stack, comme une pièce en cinq actes.

{% include bob/stack-timeline.html lang=page.lang %}

Au départ : DMS, Airbyte, Databricks, dbt, Metabase. Puis Census est arrivé, puis Claude Code. Puis Airbyte a été remplacé par Fivetran. Et enfin Census a été absorbé par Fivetran, au sens propre : racheté, intégré. Chaque acte est une décision build or buy, prise sous contrainte, avec de vrais budgets et de vraies nuits courtes. C'est cette histoire qui explique pourquoi le buy tient debout.

## La tentation du build

Car la tentation existe, et nous l'avons eue : brancher dlt, laisser Claude Code crafter tous les ETL, troquer les licences contre des tokens. Sur le papier, les chiffres donnent le vertige.

![Tweet de Martin Salo : « ETL cost down 182x per month, sync time improved 10x », en utilisant Modal et dlt et en abandonnant Fivetran pour leur pipeline ERP](/apps/storydeck/assets/img/tweet-salomartin.png)

On a fait le POC. Et il faut être honnête : c'est une très bonne solution. Le code sort, il tourne, il coûte une fraction du prix.

Mais avant de signer, il faut se demander ce qu'on remplace vraiment. Un connecteur, ce n'est pas un script qui appelle une API. C'est du rate limiting, de la pagination et des curseurs, du schema drift, de l'incrémental, de la rotation de secrets. En entrée comme en sortie, le même problème. Le POC couvre le premier appel ; la production, c'est tout le reste.

## Le premier move : Census

Notre premier vrai arbitrage n'a d'ailleurs pas été Fivetran, mais Census, pour pousser la donnée vers le CRM. Le scripting Python était chronophage et sans valeur ajoutée. Il n'existait aucune alternative open source crédible : Grouparoo venait d'être racheté par Airbyte, et personne ne savait quand le reverse ETL y arriverait. Une bascule de CRM a ouvert la fenêtre, et le premier tier offrait de gros quotas pour 200 € par mois. On les a même dépassés, et les équipes Census nous ont accompagnés pour réduire intelligemment la consommation et repasser dessous.

Il faut le dire simplement : on déléguait. Ce n'était ni notre métier, ni une tâche à forte valeur ajoutée. C'est exactement ça, acheter.

## Build or buy ?

Restait l'ingestion. Airbyte nous avait bien servis, mais les limites s'accumulaient : lenteur du process open source, drivers communautaires, pas de destination Databricks native au début (il fallait pousser du Parquet sur S3, puis tout recharger et remodeler dans dbt). Et une documentation si légère qu'on allait lire celle de Fivetran pour comprendre les connecteurs Airbyte. C'était avant les LLM, et c'est resté notre fun fact préféré.

La question s'est donc posée frontalement : Airbyte, dlt, ou Fivetran ?

{% include bob/duel.html lang=page.lang %}

Ce qui a tranché : le natif Databricks, les 700 connecteurs et plus, le schema drift géré automatiquement, les SLA, le taux de refresh élevé, et les quatorze jours de gratuité. Cette gratuité mérite qu'on s'y arrête, parce qu'on l'a jouée avec le métier : on ingère tout ce qui est imaginable pendant la fenêtre, ça donne de la matière pour le futur, et pendant ce temps on identifie ensemble les données réellement nécessaires. Avec un peu de modeling et un peu de Claude Code, ça va très vite.

Le prix à payer existe, et il faut le regarder en face : la facturation au MAR, l'impact sur la consommation Databricks, des frictions avec la marketplace AWS (réglées depuis), un support pas exceptionnel, et cette question du 80/20 : paie-t-on cher une plateforme qu'on n'utilise qu'en partie, puisqu'on ne transforme pas dedans ? La migration Census a quasiment triplé la facture, ce qui demande une certaine gymnastique mentale. Mais ce prix-là se lit sur une facture. Il ne se cache pas dans un backlog de maintenance.

## Les 48 % restants

La question build or buy n'a rien de neuf. Coase la posait dès 1937 : une entreprise n'internalise une fonction que si le marché la lui vend plus cher que ce qu'il lui en coûte de la faire elle-même. L'agentique vient de faire s'effondrer le coût d'écrire du code. Elle n'a pas touché au coût de le faire tourner : la maintenance, la sécurité, la conformité, l'astreinte du dimanche soir. **Créer une plateforme est un rôle. La maintenir en conditions opérationnelles en est un autre.** Le scanner mesure le premier, jamais le second.

Si les équipes data de demain croient pouvoir remplacer tout leur catalogue en troquant des coûts de licence contre des coûts de tokens, en redéveloppant des solutions qu'il faudra ensuite maintenir, elles se tirent une balle dans le pied. Ce remplacement crée plus de complexité qu'il n'en retire, et n'apporte aucune valeur.

Le buy reste de mise dans le monde agentique, et il reste value-driven. Croire que produire plus de code va nous sortir du problème, c'est se tromper de définition : de ce dont on a besoin, et de ce qu'on veut faire de ces outils. On peut générer des choses à l'infini, c'est certain. Encore faut-il que ça serve.

Les 52 % de Fivetran, n'importe quel agent les écrira. Les 48 % restants, personne ne vous les générera jamais : soit on les achète, soit on les devient.

> [!NOTE]
> Ce billet est adapté d'un talk donné lors d'un meetup Fivetran × Databricks. Le deck interactif (en VF) est en ligne : [Build, buy… or AI ?](/talk/fivetran-databricks/)
