---
layout: post
title: "La carte parfaite du mauvais territoire"
date: 2026-03-14
categories: data
excerpt: 'Une équipe data qui produit quarante dashboards que personne ne lit ne vaut rien. Le piège, c''est de confondre la rigueur de production avec la création de valeur.'
header_image: "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?w=1600&q=80"
header_image_alt: "Carte du monde colorée et détaillée vue de dessus"
header_image_credit: "Andrew Stutesman"
header_image_credit_url: "https://unsplash.com/@drwmrk"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: the-perfect-map-of-the-wrong-territory
lang: fr
---

Qu'on se le dise, une équipe data produisant des dashboards que personne ne lit ne vaut rien. Peu importe la qualité des pipelines, la robustesse des modèles ou encore six décimales et plus de précision. Si personne ne regarde, rien de tout cela n'a d'intérêt. 

C'est le piège de la carte parfaite. On la raffine, on la met à jour, on en soigne la légende, et pendant ce temps le terrain bouge sans nous. Pire, on a male cartographié Le terrain. La carte devient la finalité, le produit, et le territoire devient optionnel.

La rigueur, telle qu'elle est pratiquée dans la plupart des équipes data, n'est pas de l'exigence pure, mais plus ou moins de la procrastination confortable. 

Je m'explique. 

Fiabiliser ou créer un pipeline, documenter un modèle ou produire un dashboard, c'est produire un livrable mesurable. Cela rassure et s'évalue, mais cela permet d'éviter la seule question qui compte : est-ce que quelqu'un a appris quelque chose qu'il ne savait pas hier ? La semaine derniere ? Le mois dernier ? 

La plupart du temps la réponse est simplement négative. 

## La myopie de l'exploitation

James March a donné un nom à ce mécanisme en 1991 dans l'article « Exploration and Exploitation in organizational learning ». Il l'a appelé la myopie de l'exploitation. 

Les organisations dérivent vers ce qui produit des résultats visibles et immédiats. Chaque dashboard livré renforce la croyance que la valeur est dans le dashboard. Chaque pipeline stabilisé justifie le prochain crée et la boucle se referme. 

L'exploration, elle, celle qui naît de la surprise et de la découverte inconfortable, est chassée en silence. En fait, l'organisation ne décide pas d'arrêter de chercher. Elle oublie juste trop rapidement, pas certitude, qu'elle pourrait (et devrait) continuer de le faire. 

Le piège est pernicieux car il tient par une asymétrie de visibilité. Un pipeline livré, c'est un ticket fermé. Une corrélation suspecte explorée pendant deux heures et rejetée ? Dans un sprint review, c'est du temps "perdu" voire bornée dans le temps. 

L'exploitation produit des preuves d'elle-même alors que l'exploration n'en produit que rétrospectivement, quand elle a déjà réussi. 

Alors les équipes cartographient compulsivement. 

## Terrain mouvant

Pourtant, le terrain a changé sous la carte. Le coût de production d'un insight tend vers zéro. Ce qui prenait une semaine d'investigation prend vingt minutes. L'excuse historique ("on n'a pas le temps, on a les pipelines à maintenir") n'a plus de fondement. Quand l'insight était rare et cher, la rigueur en amont était une nécessité économique. Quand il est abondant et cheap, la rigueur se déplace en aval. On ne vérifie plus avant de chercher, on vérifie après avoir trouvé.

Une corrélation imparfaite qui ouvre une piste inédite crée plus de valeur qu'un modèle parfait qui confirme ce qu'on savait déjà. Accepter ça, pour un analyste formé à traquer les biais et les artefacts, c'est une hérésie. Plus on est bon cartographe, moins on supporte l'idée de marcher sans carte.

Mais le foisonnement change la donne. On peut générer cinquante hypothèses en une heure. Quarante-cinq seront du bruit. Cinq ouvriront des territoires qu'aucun dashboard n'aurait cartographiés, parce qu'ils n'étaient dans aucun backlog, aucune roadmap et aucune question posée par un stakeholder en réunion.

## L'éditeur d'hypothèses

C'est un nouveau métier. L'analyste ne produit plus l'insight, il en reçoit cinquante et en tue quarante-neuf. Il passe de chercheur à éditeur d'hypothèses. Sa valeur la plus haute, la plus ingrate, c'est le non. Dire "cette corrélation est séduisante mais c'est un artefact" demande plus de compétence que de la trouver. N'importe quel agent peut explorer. Seul un humain qui connaît le domaine, les biais et les pièges de composition peut dire que ça ne tient pas.

Ce rôle n'existe nulle part. Pas dans les fiches de poste, pas dans les OKR et pas dans les sprint reviews. Tant que les équipes data seront évaluées sur la disponibilité de leurs pipelines et la fraîcheur de leurs dashboards, elles resteront prisonnières de l'exploitation. Elles continueront de perfectionner des cartes de territoires qu'elles n'explorent jamais.

## Le slack organisationnel

March avait une solution, inconfortable mais documentée. Il parlait de slack organisationnel, du temps non alloué, non justifiable, consacré à l'exploration sans garantie de retour. Les organisations performantes tolèrent cette inefficacité apparente. Les autres optimisent jusqu'à l'extinction.

Reste une question que cet article évite. Dire aux équipes data "explorez au lieu de cartographier", c'est facile. C'est même confortable. C'est une nouvelle carte, en somme, un cadre rassurant qui dit quoi faire, comment répartir le temps, quel rôle inventer. Le vrai territoire, celui que personne ne cartographie, c'est ce qui se passe quand l'éditeur d'hypothèses se trompe, quand il tue le bon signal et garde le mauvais. Quand la carte qu'on a posée nous manque et que le terrain ne pardonne pas. L'exploration a un coût que l'exploitation n'a jamais eu, celui de ne pas savoir si on a raison avant qu'il soit trop tard.
