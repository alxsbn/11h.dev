---
layout: post
title: "La carte absorbe le cartographe"
date: 2026-04-24
categories: ia
excerpt: 'Meta vient d''annoncer que ses employés seront enregistrés en continu pour entraîner ses agents. Ce n''est pas une bavure, c''est l''aboutissement d''une trajectoire qui commence dans un bidonville de Nairobi'
header_image: "https://images.unsplash.com/photo-1717700300260-02b182f94c9d?w=1600&q=80"
header_image_alt: "Carte antique du monde avec continents détaillés et figures célestes"
header_image_credit: "Europeana"
header_image_credit_url: "https://unsplash.com/@europeana"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: map-absorbs-cartographer
lang: fr
---

Le 21 avril 2026, [Reuters révèle](https://www.reuters.com/sustainability/boards-policy-regulation/meta-start-capturing-employee-mouse-movements-keystrokes-ai-training-data-2026-04-21/) que Meta allait installer un logiciel de tracking sur les postes de ses employés américains. L'idée ? capturer les mouvements de souris, les clics, les frappes clavier et prend des captures d'écran à intervalles. Dans le memo diffusé à ses équipes, Meta écrit qu'ils doivent entraîner leurs modèles sur des exemples réels et leurs employés peuvent y contribuer **en faisant simplement leur travail habituel**.

Pour comprendre ce qu'on vient de franchir, il faut revenir en arrière, jusqu'à [Kibera](https://www.datanami.com/2023/01/20/openai-outsourced-data-labeling-to-kenyan-workers-earning-less-than-2-per-hour-time-report/), dans la banlieue de Nairobi, où le chômage atteint 50% et où il n'y a ni eau potable ni assainissement. C'est là qu'a commencé, il y a trois ans, ce qui se joue aujourd'hui chez Meta.

## De l'annotation low-cost

En 2023, le magazine [*Time* révèle](https://time.com/6247678/openai-chatgpt-kenya-workers/) que pour filtrer les contenus toxiques de ChatGPT, OpenAI a sous-traité l'annotation à Sama, une société californienne qui emploie des Keynians à 2 dollars de l'heure. Leur travail consistait à lire, huit heures par jour, des descriptions graphiques de viol, d'inceste, et autres torture d'enfants, afin de les étiqueter pour qu'un modèle apprenne à ne jamais les reproduire.

Un annotateur raconte qu'il voyait en boucle la scène d'un homme agressant un chien devant un enfant. « That was torture », dit-il. Sama a mis fin au contrat quelques jours après la publication, et les travailleurs ont perdu leur emploi ...

Un dispositif identique, appliqué au ranking, produit un autre biais. Demandez à quelqu'un, payé au volume, de choisir entre deux réponses d'un LLM, il prendra la plus longue car lire les deux en détail coûte du temps, donc de l'argent. Le modèle apprend que plus long égale mieux, et ce biais documenté depuis des années dans la littérature sur le *reward hacking* n'est pas un bug, c'est la structure du dispositif qui le produit.

J'ai vu le même mécanisme sous une autre forme il y a quinze ans. Une équipe de data scientists venait d'intégrer un module de labélisation dans notre plateforme de *case management*. Cinquante opérateurs de call center nourrissaient, à chaque dossier client, un entraînement par renforcement humain (RLHF). Pendant des semaines, le modèle a drifté sans raison, personne n'a compris pourquoi et c'est un délégué du personnel, à un apéro de fin d'année, qui m'a donné la clé. Les opérateurs avaient compris que le projet visait à automatiser leur poste. Ils avaient fait ce que font les travailleurs depuis des siècles face à une menace qu'ils ne peuvent pas affronter frontalement, ils s'étaient organisés pour mentir doucement. 

Dans tous les cas où un humain est payé pour générer du signal qui entraîne un modèle, le signal est biaisé. Que ce soit par son corps (fatigue, trauma), par son cerveau (heuristiques), ou par ses intérêts (résistance).

Pas besoin de supposer de la malveillance, il suffit que les incitations soient mal alignées, ce qu'elles sont structurellement chaque fois qu'un humain est payé pour entraîner sa propre automatisation.

## Trois étages qui ferment les marges

Tout cela appartient déjà au passé, car en 2026, ces failles ne marchent plus, pour trois raisons empilées.

Les labs ne paient désormais grassement des experts. [Mercor, valorisée 10 milliards de dollars](https://aragonresearch.com/human-intelligence-for-ai-training/), livre aux grands labs des médecins, des avocats, des VP de Goldman Sachs et des managing directors de McKinsey, à 500 dollars de l'heure et plus. Quand c'est un expert en droit des affaires qui étiquette un term sheet, l'heuristique « plus long = mieux » ne passe plus, car ses pairs le repèrent immédiatement.

Deuxième strate, c'est désormais une IA qui vérifie le travail des humains. Mercor rapporte que ses *autograders* s'accordent avec les correcteurs humains à [89%](https://time.com/7322386/ai-mercor-professional-tasks-data-annotation/). Si vous bâclez, vous sortez du pool. Le surveillant est devenu automatique et permanent. 

Troisième strate, la plus conséquente, on ne demande même plus aux experts d'étiqueter, on leur demande d'écrire leur méthode. Les grands labs poussent depuis fin 2025 un format nouveau, le *skill.md*, simple fichier markdown où un praticien consigne ses heuristiques, l'enchaînement de ses outils et ses garde-fous. Le savoir-faire est directement exécutable par un agent, et on ne transmet plus un signal bruité qu'il faudra distiller, on livre l'actif fini.

En 1911, Frederick Winslow Taylor ne demandait pas aux ouvriers de travailler autrement, il leur demandait de **décrire** comment ils travaillaient. Chronomètre à la main, il codifiait le tour de main du forgeron qualifié dans une fiche que n'importe quel ouvrier spécialisé pourrait suivre le lendemain pour moitié moins cher. En 1974, Harry Braverman a nommé ce mouvement *deskilling*, séparation de la conception et de l'exécution, dépossession du qualifié par codification de ses gestes. Braverman ne faisait qu'élargir ce que Marx avait vu dans le machinisme victorien, à savoir que chaque technologie, sous rapport capitaliste, consolide le travail passé contre le travail vivant.

Les **skill.md** rejouent le geste de Taylor à un siècle d'écart, cette fois sur les métiers cognitifs qui se croyaient épargnés par la complexité de leurs pratiques tacites. Avocats, consultants, développeurs et médecins se retrouvent visés, et on leur demande aujourd'hui d'écrire leur propre fiche Taylor, en échange d'un bonus ou d'une prime de transformation.

Pains bénis, ces fichiers markdown sont le fuel des agents IA. Les praticiens de la tech boostés à l'IA se ruent pour les compléter volontairement et optimiser leur productivité. Là aussi, la résistance s'organise comme elle peut. On commence à voir fleurir des épisodes de **skills poisoning** et autres retention d'information. L'enjeu tacite est la compétition en collègues, à qui surperformera l'autre ...

## La carte absorbe le cartographe

En 1946, Jorge Luis Borges raconte l'histoire d'un empire dont les cartographes, ayant atteint une perfection inégalée, dressent une carte à l'échelle 1:1 qui coïncide point par point avec le territoire. Les générations suivantes, jugeant la carte inutile, l'abandonnent aux intempéries, et il en reste quelques lambeaux, dans les déserts, habités par des mendiants et des animaux.

Le **skill.md** aspire à devenir cette carte-là. Plus il veut capturer le savoir-faire dans sa totalité, ses heuristiques, ses jugements, ses exceptions et ses garde-fous, plus il se rapproche d'une cartographie coextensive à sa pratique. Mais une pratique qui se résume intégralement à une fiche n'était déjà plus une pratique, c'était une procédure. Ce qui fait le praticien c'est précisément ce qui résiste à la fiche, et ce qui résiste à la fiche sera capturé plus tard, par d'autres moyens.

Une fois écrit, le **skill.md** n'est pas statique. Il rentre dans le circuit de renforcement des modèles. Et trois à douze mois plus tard, le modèle suivant arrive, et la compétence générique que votre fiche documentait est maintenant dans ses poids. L'effet observable est connu de tous ceux qui utilisent ces modèles en production, le scaffolding soigneusement écrit pour la précédente devient soudain encombrant, parfois contre-productif. « Claude X est moins bon que Claude X-1 », c'est rarement vrai, le modèle a simplement intériorisé ce que l'échafaudage compensait.

Et finalement le piège se referme à l'étage du dessus. Le psychologue organisationnel [Harry Kaufman](https://career.iresearchnet.com/career-development/obsolescence-of-knowledge-and-skills/) l'a documenté dès 1974, l'obsolescence des travailleurs qualifiés n'est pas causée par le vieillissement de leur savoir mais par les politiques d'assignation. 

Deux pathologies suffisent à la produire. La *misutilization* consiste à les assigner des tâches routinières sous forte pression temporelle, et la *underutilization* consiste à les reléguer sur des edge cases marginaux, sans enjeu ni stimulation. 

Les **skills.md** rejoueront cette partition. Le senior ne serait pas devenu obsolète, on l'aura rendu obsolète. Cette obsolescence fabriquée deviendra rétroactivement la preuve qui justifie l'expropriation initiale. On ne remplace pas des obsolètes, on fabrique les obsolètes dont l'organisation a besoin.

## Souriez, vous êtes filmés !

Revenons à Meta. L'annonce du 21 avril franchit un seuil que les trois étages précédents laissaient encore entrouvert. Mercor demandait la coopération explicite d'un expert rémunéré, les **skill.md** demandait au praticien d'ouvrir un éditeur et d'écrire, et les deux supposaient un geste, un moment où l'humain décidait, consciemment, de transmettre quelque chose. La *Model Capability Initiative* supprime le geste.

Désormais, le travail sera enregistré et deviendra la matière qui entraîne l'agent qui, dans dix-huit mois, fera ton travail à ta place. Il n'y a plus rien à écrire, plus rien à choisir, plus rien à refuser. 

Le memo Meta dit aux employés qu'ils peuvent contribuer en faisant simplement leur travail habituel. C'est exact, c'est même la seule chose exacte dans la phrase, car tout le reste, le cadrage vertueux, la promesse d'anonymisation et l'encadrement contractuel, est secondaire. Le fait structurel est que la coopération du travailleur n'est plus requise, seule sa présence au poste l'est.

Taylor avait besoin du consentement de l'ouvrier pour qu'il décrive ses gestes. Meta n'en a plus besoin, il suffit de les enregistrer.
