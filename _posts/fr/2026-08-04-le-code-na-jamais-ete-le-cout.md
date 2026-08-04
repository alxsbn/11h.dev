---
layout: talk-post
title: "Le code n'a jamais été le coût"
subtitle: "Ce qu'on achète n'est plus ce qu'on croit"
eyebrow: "Build · buy · agents"
date: 2026-08-04
categories: [data, ai]
excerpt: 'Les agents savent écrire des connecteurs, et c''est précisément pour cette raison qu''il ne faut pas leur faire écrire les vôtres.'
header_image: "/apps/storydeck/assets/img/hero.jpg"
header_image_alt: "Composition abstraite en tons sombres"
ref: code-was-never-the-cost
lang: fr
---

<div class="act" markdown="1">
<div class="flow" markdown="1">

Il aura suffi de quelques fichiers Claude publiés sur un repo GitHub pour que la panique démarre. Ces Skills montraient qu'un agent pouvait reproduire, en quelques centaines de lignes de configuration, ce que des éditeurs facturent au siège et à l'année, et l'idée que tout le logiciel du monde était désormais réécrivable à la demande a circulé pendant quelques jours. Ce n'était ni une démonstration ni un benchmark, et l'équivalent de mille milliards de dollars de valorisation s'est évaporé.

On peut trouver la réaction disproportionnée, et elle l'était. Elle est surtout révélatrice, puisqu'un marché entier venait de trancher une question d'ingénierie par réflexe, sans avoir regardé ce qu'il y avait à l'intérieur des logiciels en question.

</div>

{% include talk/chart-line.html
   points="60,34 175,44 290,50 400,148"
   labels="2023,2024,janv. 26,févr. 26"
   len="560"
   crash="true"
   crashnote="≈ 1 000 Md$ effacés"
   alt="Indice de valorisation des éditeurs SaaS : quasi stable de 2023 à janvier 2026, puis chute brutale en février 2026."
   caption="La technologie n'avait pas bougé, seule la croyance à son sujet avait changé." %}

<div class="flow" markdown="1">

Il y a pourtant une question sérieuse là-dessous, et elle mérite mieux qu'un mouvement d'humeur boursier. Une équipe data qui automatise son propre travail depuis trois ans finit par la rencontrer de près, et c'est le cas de celle où je travaille.

## Ce que les agents ont vraiment déplacé

L'automatisation a tenu ses promesses, mais pas là où on l'attendait. Avant, l'essentiel des journées partait dans l'écriture de code et le maintien de la stack en état de marche, et ce bloc s'est effondré. La tentation est alors de conclure qu'on a gagné du temps, alors qu'en réalité on l'a déplacé.

</div>

{% include talk/bars-split.html
   label_a="Avant"
   label_b="Aujourd'hui"
   a="Spec 20:20:spec,Code / Run 60:60:code,Review 20:20:review"
   b="Spec 40:40:spec,8:8:code,Review 22:22:review,Configuration agentique 30:30:value"
   legend="Spécification:spec,Code &amp; run:code,Review:review,Configuration agentique:value"
   caption="Le bloc qui disparaît ne libère pas du temps, il le déporte vers l'amont." %}

<div class="flow" markdown="1">

La spécification a doublé, et surtout une catégorie est apparue qui n'existait pas trois ans plus tôt. On l'appelle désormais le *context engineering*, et elle consiste à décrire le domaine, poser les règles, documenter les pièges et arbitrer ce qui doit être automatisé comme ce qui ne doit surtout pas l'être.

Ce travail est entièrement neuf et il est irréductiblement humain, car aucun agent ne peut décider à votre place ce que votre entreprise a besoin de savoir. C'est là que le temps libéré est allé, et c'est aussi ce qui rend la suite intéressante.

## La tentation

Quand la thèse du marché frappe à la porte d'une équipe qui vient de vivre ça, elle est particulièrement séduisante.

Puisque les agents écrivent le code, pourquoi continuer à payer une licence pour un outil d'ingestion, alors qu'on pourrait développer ses propres connecteurs, troquer une dépense récurrente contre des tokens et diviser la facture par dix ? Nous l'avons envisagé sérieusement et nous sommes allés jusqu'au proof of concept.

Il marchait, et c'est important de le dire, parce que ce qui suit n'est pas un constat d'échec technique. Avant de remplacer un connecteur, encore faut-il savoir ce qu'il y a dedans.

</div>

{% include talk/chips.html
   items="Rate limiting,Pagination,Curseurs,Dérive de schéma,Incrémental,Authentification,Rotation des secrets,Backfill,Idempotence,Reprise sur erreur,Typage,Observabilité"
   caption="En entrée comme en sortie, le même problème revient douze fois." %}

<div class="flow" markdown="1">

Un agent écrit chacune de ces briques sans difficulté particulière, et aucune ne relève de la recherche fondamentale, puisque ce sont des exercices résolus depuis vingt ans. Mais ce n'est pas la question que pose un connecteur.

La vraie question arrive le mardi où l'API d'en face change sans prévenir, où le format de date devient un timestamp et où le curseur de pagination cesse d'être stable. Ce jour-là, quelqu'un doit comprendre, corriger, redéployer puis rattraper les données manquantes, et ce quelqu'un a un nom, un salaire et un sommeil.

**Écrire n'a jamais été le coût, car le coût c'est de répondre du résultat.**

## Ce que la firme achète vraiment

Cette intuition a un nom, et il est plus ancien que l'informatique. En 1937, Ronald Coase pose une question que personne ne prenait au sérieux, en demandant pourquoi les entreprises existent si le marché est efficace, et pourquoi l'on n'achète pas simplement chaque tâche à un prestataire au prix du marché.

Sa réponse tient dans une notion, celle des **coûts de transaction**. Recourir au marché n'est jamais gratuit, puisqu'il faut chercher le fournisseur, négocier, rédiger le contrat, contrôler l'exécution et gérer les litiges. Une entreprise internalise une activité quand ces coûts dépassent ceux de la faire elle-même, et l'externalise dans le cas inverse, si bien que la frontière de la firme se dessine exactement là où les deux s'équilibrent.

Ce cadre est le vrai nom du dilemme build or buy, et il explique pourquoi le raisonnement de février dernier était faux. La thèse implicite consistait à dire que les agents font tomber le coût de production du logiciel, et que la frontière se déplace donc massivement vers le build.

Or le coût de production n'a jamais été le facteur limitant. Ce qu'on achète à un éditeur n'est pas la faveur de ne pas écrire le code, mais le transfert d'une obligation, celle que ça marche demain, que ce soit conforme et que quelqu'un décroche à trois heures du matin. Coase appelait cela les coûts de contrôle et d'exécution du contrat, et les agents n'y touchent pas.

Réécrire ses connecteurs avec un agent ne supprime donc pas la transaction, mais la rapatrie à l'intérieur de l'entreprise, où elle devient un coût de coordination qui n'apparaît sur aucune ligne budgétaire.

Si ce raisonnement tient, il doit se vérifier dans les faits, et c'est là que l'observation devient gênante pour la prophétie. Les équipes qui disposaient déjà d'agents et qui avaient donc tout loisir de réinternaliser leur ingestion n'ont pas fait ce mouvement, et beaucoup ont fait exactement l'inverse en consolidant chez un éditeur ce qu'elles maintenaient encore elles-mêmes.

</div>

{% include talk/counterfact.html
   title_a="La trajectoire annoncée"
   path_a="Licence éditeur,Agent qui réécrit,Stack maison"
   title_b="La trajectoire observée"
   path_b="Scripts maison,Licence éditeur,Consolidation chez un seul"
   verdict="Le remplacement a bien eu lieu, mais ce n'est pas un éditeur qui a été remplacé par un agent. C'est un éditeur qui a été remplacé par un autre éditeur."
   caption="Le mouvement réel est allé dans le sens inverse de celui que le marché avait anticipé." %}

<div class="flow" markdown="1">

Cette inversion n'a rien de paradoxal une fois qu'on la lit avec Coase, car les agents ont fait baisser le coût d'écrire sans toucher au coût de coordonner, et c'est ce second terme qui décide de la frontière. Reste à savoir ce que coûte ce choix, parce qu'il coûte quelque chose.

## Le prix à payer

Il serait malhonnête de s'arrêter sur ce constat, car choisir le buy en connaissance de cause ne revient pas à prétendre que c'est confortable.

La facturation à l'usage se maîtrise mal, puisqu'elle suit le volume de données actives, une grandeur qui bouge sans qu'on la décide, et elle produit un effet de bord sur la consommation de l'entrepôt en aval. Le support est correct sans plus, et il y a cette question qui revient à chaque renouvellement, celle de savoir si l'on ne paie pas cher une plateforme dont on n'utilise qu'une fraction, puisque la transformation se fait ailleurs.

Le chiffre qui fait le plus mal reste celui de la consolidation, car regrouper deux outils chez un seul éditeur, ce qui était la décision rationnelle sur tous les autres critères, a eu un effet direct sur la facture.

</div>

{% include talk/stat.html
   value="×3"
   label="la facture, après consolidation"
   sub="Une décision peut être juste opérationnellement et coûteuse budgétairement, les deux choses étant vraies en même temps." %}

<div class="flow" markdown="1">

Ce chiffre est l'argument le plus solide en faveur du build, et c'est pour cette raison que je le mets en avant plutôt que de l'enfouir. Arbitrer sérieusement suppose de mettre les deux colonnes face à face, y compris quand la sienne est moins flatteuse qu'espéré.

## Ce que l'agentique règle, et ce qui reste

</div>

{% include talk/verdict.html
   title_a="Ce que l'agentique règle"
   title_b="Ce qui reste"
   a="Écrire le code,Le premier jet,Le fit fonctionnel de base,Le time to market"
   b="Maintenance &amp; run,Vendor lock-in,Sécurité &amp; conformité,Accountability"
   caption="La colonne de gauche se remplit vite, celle de droite prend son temps, et c'est tout le message." %}

<div class="flow" markdown="1">

La colonne de gauche est réelle et la nier serait ridicule, car les agents écrivent le code, sortent le premier jet et raccourcissent le time to market. Sur ces quatre points, la promesse est tenue.

So what ?

Ce qui reste, c'est tout le reste, à commencer par la maintenance et le run, qui ne se délèguent pas à ce qui a écrit le code. Vient ensuite le lock-in, qui ne disparaît pas mais change simplement de créancier, puisqu'on n'est plus captif d'un éditeur mais de son propre code, écrit vite, compris par personne et dont l'auteur ne se souvient de rien. Viennent enfin la sécurité et la conformité, qui exigent une chaîne de responsabilité qu'aucun modèle ne peut endosser.

Et surtout ce dernier mot qui porte tout le reste, l'*accountability*. Construire une plateforme est un rôle, la maintenir en conditions opérationnelles en est un autre, et aucun des deux ne se remplace par une capacité de génération.

## Une dette contre une dépense

Si les équipes data croient qu'elles peuvent remplacer leur catalogue d'outils en troquant des coûts de licence contre des coûts de tokens, elles ne font pas une économie. Elles échangent une dépense lisible, prévisible et négociable contre une dette dont les intérêts ne se voient qu'au moment du défaut de paiement, c'est-à-dire un mardi, quand l'API change.

C'est un remplacement qui crée plus de complexité qu'il n'en supprime, et il n'y a aucune valeur à le faire pour lui-même.

Le buy reste donc de mise dans le monde agentique, et il reste value-driven. La question n'a jamais été de savoir si l'on *sait* produire le logiciel, car Coase l'avait déjà écrit, la frontière de l'entreprise ne se trace pas là où s'arrête sa compétence mais là où le coût de coordonner devient plus lourd que celui d'acheter. Les agents ont fait tomber le coût d'écrire, sans jamais toucher au coût de répondre de ce qui est écrit.

Croire que produire plus de code va nous sortir du problème relève encore une fois d'un problème de définition, celui de ce dont on a besoin et de ce qu'on veut faire de ces outils.

On peut générer des choses à l'infini, encore faut-il que ça serve à quelque chose.

</div>
</div>
