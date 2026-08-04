---
layout: talk-post
title: "Le code n'a jamais été le coût"
subtitle: "Ce qu'on achète n'est plus ce qu'on croit"
eyebrow: "Build · buy · agents"
date: 2026-08-04
categories: [data, ai]
excerpt: 'Les agents savent écrire des connecteurs. C''est précisément pour ça qu''il ne faut pas les leur faire écrire.'
header_image: "/apps/storydeck/assets/img/hero.jpg"
header_image_alt: "Composition abstraite en tons sombres"
ref: code-was-never-the-cost
lang: fr
---

<div class="act">
<div class="flow">

Un mot a suffi. L'idée que les agents allaient réécrire tous les logiciels du monde a circulé quelques jours, et l'équivalent de mille milliards de dollars de valorisation s'est évaporé. Pas après une démonstration, pas après un benchmark. Sur la foi de quelques dépôts publiés sur GitHub et de la conviction, soudaine et partagée, que le logiciel qu'on achetait pouvait désormais être produit à la demande.

On peut trouver la réaction excessive. Elle est surtout révélatrice : un marché entier venait de trancher une question d'ingénierie par réflexe, sans avoir regardé ce qu'il y avait dans les logiciels en question.

</div>

{% include talk/chart-line.html
   points="60,34 175,44 290,50 400,148"
   labels="2023,2024,janv. 26,févr. 26"
   len="560"
   crash="true"
   crashnote="≈ 1 000 Md$ effacés"
   alt="Indice de valorisation des éditeurs SaaS : quasi stable de 2023 à janvier 2026, puis chute brutale en février 2026."
   caption="La technologie n'avait pas bougé. La croyance sur la technologie, si." %}

<div class="flow">

Il y a une question sérieuse là-dessous, et elle mérite mieux qu'un mouvement de panique. Je l'ai vécue de l'intérieur, dans une équipe data qui a passé trois ans à faire exactement ce que la thèse annonce : automatiser son propre travail. Voici ce qu'on y a trouvé.

## Faire plus avec moins

L'équipe est passée de six personnes à deux. Ce n'est pas un plan social, c'est une succession de départs naturels devant lesquels la même question revenait à chaque fois : est-ce qu'on remplace ?

La réponse a toujours été non. Non parce qu'on serrait les budgets, mais parce que le travail de la personne qui partait était déjà largement automatisé. Ce qui restait se redistribuait sans douleur entre celles et ceux qui restaient, lesquels devenaient full stack par nécessité plus que par ambition : data engineering, puis data science, puis analytics engineering.

</div>

{% include talk/dual-axis.html
   bars="44:92:34:74,119:56:34:110,194:74:34:92,269:110:34:56,344:128:34:38"
   line="61,158 136,152 211,140 286,96 361,28"
   labels="an 1,an 2,an 3,an 4,an 5"
   len="500"
   legend_bars="Taille de l'équipe"
   legend_line="Niveau d'automatisation"
   alt="Les barres représentant la taille de l'équipe décroissent d'année en année pendant que la courbe d'automatisation croît fortement."
   caption="L'effectif divisé par trois, l'automatisation multipliée par deux cents." %}

<div class="flow">

Cette courbe est confortable à montrer. Elle raconte une équipe qui encaisse sans casser, et c'est vrai. Mais elle escamote la seule question qui compte vraiment, celle qu'un audit nous a posée frontalement et à laquelle nous n'avions pas de réponse toute faite.

**Qu'a-t-on fait du temps libéré ?**

## Où le temps est passé

Avant, l'essentiel de nos journées partait dans l'écriture de code et le maintien de la stack en état de marche. Ce bloc s'est effondré, et il faut être précis sur ce qui s'est passé : ce n'est pas du temps rendu, c'est du temps déplacé.

</div>

{% include talk/bars-split.html
   label_a="Avant"
   label_b="Aujourd'hui"
   a="Spec 20:20:spec,Code / Run 60:60:code,Review 20:20:review"
   b="Spec 40:40:spec,8:8:code,Review 22:22:review,Configuration agentique 30:30:value"
   legend="Spécification:spec,Code &amp; run:code,Review:review,Configuration agentique:value"
   caption="Le bloc qui disparaît ne libère pas du temps : il le déporte vers l'amont." %}

<div class="flow">

La spécification a doublé. Et surtout, une catégorie est apparue qui n'existait pas trois ans plus tôt : la configuration des agents, ce qu'on appelle désormais le *context engineering*. Décrire le domaine, poser les règles, documenter les pièges, arbitrer ce qui doit être automatisé et ce qui ne doit pas l'être.

C'est un travail entièrement neuf, et il est irréductiblement humain. Un agent ne peut pas décider à votre place ce que votre entreprise a besoin de savoir.

## La tentation

Vient alors le moment où la thèse du marché frappe à votre porte, et elle est séduisante.

Puisque les agents écrivent le code, pourquoi payer une licence pour un outil d'ingestion ? On développe ses propres connecteurs, on troque une dépense récurrente contre des tokens, on divise la facture par dix. On l'a envisagé sérieusement. On a même fait le proof of concept.

Il marchait. C'est important de le dire, parce que la suite n'est pas « ça ne marche pas ».

Avant de remplacer un connecteur, il faut savoir ce qu'il y a dedans.

</div>

{% include talk/chips.html
   items="Rate limiting,Pagination,Curseurs,Dérive de schéma,Incrémental,Authentification,Rotation des secrets,Backfill,Idempotence,Reprise sur erreur,Typage,Observabilité"
   caption="En entrée comme en sortie : le même problème, douze fois." %}

<div class="flow">

Un agent écrit chacune de ces briques sans difficulté particulière. Aucune n'est un problème de recherche. Prises une par une, ce sont des exercices résolus depuis vingt ans.

Sauf que ce n'est pas la question. La question, c'est ce qui se passe le mardi où l'API d'en face change sans prévenir, où le format de date devient un timestamp, où le curseur de pagination cesse d'être stable. Ce jour-là, quelqu'un doit comprendre, corriger, redéployer et rattraper les données manquantes. Ce quelqu'un a un nom, un salaire et un sommeil.

**Écrire n'a jamais été le coût. Le coût, c'est de répondre du résultat.**

## Ce que la firme achète vraiment

</div>

<div class="flow">

En 1937, Ronald Coase pose une question que personne ne prenait au sérieux : si le marché est efficace, pourquoi les entreprises existent-elles ? Pourquoi ne pas simplement acheter chaque tâche à un prestataire, au prix du marché, à chaque fois qu'on en a besoin ?

Sa réponse tient dans une notion : les **coûts de transaction**. Recourir au marché n'est jamais gratuit. Il faut chercher le fournisseur, négocier, rédiger le contrat, contrôler l'exécution, gérer les litiges. Une entreprise internalise une activité quand ces coûts dépassent ceux de la faire elle-même, et l'externalise dans le cas inverse. La frontière de la firme se dessine exactement là où les deux s'équilibrent.

Ce cadre est le vrai nom du dilemme build or buy, et il explique pourquoi le raisonnement du marché en février dernier était faux. La thèse implicite était : les agents font tomber le coût de production du logiciel, donc la frontière se déplace massivement vers le build.

Or le coût de production n'a jamais été le facteur limitant. Ce qu'on achète à un éditeur, ce n'est pas la faveur de ne pas écrire le code. C'est le transfert d'une obligation : que ça marche demain, que ça soit conforme, que quelqu'un décroche à trois heures du matin. Coase appelait ça les coûts de contrôle et d'exécution du contrat, et les agents n'y touchent pas.

Réécrire ses connecteurs avec un agent ne supprime pas la transaction. Ça la rapatrie à l'intérieur de l'entreprise, où elle devient un coût de coordination qui n'apparaît sur aucune ligne budgétaire.

</div>

{% include talk/stack-sticky.html
   steps="La stack de départ :: Ingestion, entrepôt, transformation, orchestration, restitution. Rien d'exotique, et c'est le but : chaque brique fait une chose et la fait bien.|
          On délègue le run :: Le premier arbitrage n'a pas porté sur l'ingestion mais sur le reverse ETL. Le scripting maison coûtait cher en temps et ne produisait aucune valeur différenciante. Personne n'a jamais gagné un client parce que son push vers le CRM était fait main.|
          L'agent entre dans la stack :: C'est là que la tentation devient concrète. L'outil qui écrit le code est désormais dans la pièce, et la question de tout réécrire soi-même n'est plus théorique.|
          Et pourtant :: Le remplacement a bien eu lieu. Mais on n'a pas remplacé un éditeur par un agent : on a remplacé un éditeur par un autre éditeur, puis absorbé le second dans le premier. Le mouvement est allé dans le sens inverse de la prophétie." %}

<div class="flow">

## Le prix à payer

Il serait malhonnête de s'arrêter là. Choisir le buy en connaissance de cause, ce n'est pas prétendre que c'est confortable.

La facturation à l'usage se maîtrise mal : elle suit le volume de données actives, une grandeur qui bouge sans qu'on la décide. Elle produit un effet de bord sur la consommation de l'entrepôt en aval. Le support est correct sans plus. Et il y a cette question qui revient à chaque renouvellement : est-ce qu'on ne paie pas cher une plateforme dont on n'utilise qu'une fraction, puisque la transformation se fait ailleurs ?

Le chiffre qui fait le plus mal est celui de la consolidation. Regrouper les deux outils chez un seul éditeur, ce qui était la décision rationnelle sur tous les autres critères, a eu un effet direct sur la facture.

</div>

{% include talk/stat.html
   value="×3"
   label="la facture, après consolidation"
   sub="Une décision juste sur le plan opérationnel peut être coûteuse sur le plan budgétaire. Les deux choses sont vraies en même temps, et il faut pouvoir le dire." %}

<div class="flow">

Ce chiffre est l'argument le plus solide en faveur du build, et je le mets en avant plutôt que de le cacher. Si l'on veut arbitrer sérieusement, il faut mettre les deux colonnes en face l'une de l'autre — y compris quand la sienne est moins flatteuse qu'espéré.

## Ce que l'agentique règle, et ce qui reste

</div>

{% include talk/verdict.html
   title_a="Ce que l'agentique règle"
   title_b="Ce qui reste"
   a="Écrire le code,Le premier jet,Le fit fonctionnel de base,Le time to market"
   b="Maintenance &amp; run,Vendor lock-in,Sécurité &amp; conformité,Accountability"
   caption="La colonne de gauche se remplit vite. Celle de droite prend son temps, et c'est le message." %}

<div class="flow">

La colonne de gauche est réelle, et la nier serait ridicule. Les agents écrivent le code, sortent le premier jet, raccourcissent le time to market. Sur ces quatre points, la promesse est tenue.

So what ?

Ce qui reste, c'est tout le reste. La maintenance et le run, qui ne se délèguent pas à ce qui a écrit le code. Le lock-in, qui ne disparaît pas mais change de créancier : on n'est plus captif d'un éditeur, on est captif de son propre code, écrit vite, compris par personne, et dont l'auteur ne se souvient de rien. La sécurité et la conformité, qui exigent une chaîne de responsabilité que nul modèle ne peut endosser.

Et surtout ce dernier mot, qui porte tout le reste : l'*accountability*. Construire une plateforme est un rôle. La maintenir en conditions opérationnelles en est un autre. Aucun des deux ne se remplace par une capacité de génération.

## Une dette contre une dépense

</div>

<div class="flow">

Si les équipes data croient qu'elles peuvent remplacer leur catalogue d'outils en troquant des coûts de licence contre des coûts de tokens, elles ne font pas une économie. Elles échangent une dépense lisible, prévisible, négociable, contre une dette dont les intérêts ne se voient qu'au moment du défaut de paiement — un mardi, quand l'API change.

C'est un remplacement qui crée plus de complexité qu'il n'en supprime, et il n'y a aucune valeur à le faire pour lui-même.

Le buy reste de mise dans le monde agentique, et il reste value-driven. La question n'a jamais été de savoir si l'on *sait* produire le logiciel. Coase l'avait déjà écrit : la frontière de l'entreprise ne se trace pas là où s'arrête sa compétence, mais là où le coût de coordonner devient plus lourd que celui d'acheter. Les agents ont fait tomber le coût d'écrire. Ils n'ont pas touché au coût de répondre de ce qui est écrit.

Croire que produire plus de code va nous sortir du problème, c'est encore une fois un problème de définition : de ce dont on a besoin, et de ce qu'on veut faire de ces outils.

On peut générer des choses à l'infini. Encore faut-il que ça serve à quelque chose.

</div>
</div>
