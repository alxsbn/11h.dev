---
layout: post
title: "La vérité terrain ment"
date: 2026-03-24
categories: [data, ai]
excerpt: 'Quand on demande à des gens de fournir la matière première de leur propre obsolescence, ils font ce que les paysans malaisiens de James C. Scott ont toujours fait.'
header_image: "https://images.unsplash.com/photo-1770712235511-c7caedbc2114?w=1600&q=80"
header_image_alt: "Peinture blanche qui s'écaille révélant du métal corrodé en dessous"
header_image_credit: "Hayk Badalyan"
header_image_credit_url: "https://unsplash.com/@hayko_badalyan"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: ground-truth-lies
lang: fr
---

Un annotateur kenyan, payé deux dollars de l'heure, doit choisir laquelle de deux réponses quasi identiques d'un LLM est "la meilleure". Il prend systématiquement la plus longue, non pas parce qu'elle l'est réellement mais parce que lire les deux en détail coûte plus cher cognitivement que de juger à la taille. Le reward model enregistre cette préférence, le modèle apprend que plus long égale mieux, l'annotateur a respecté les guidelines à la lettre et personne n'a triché. Ce n'est pas une erreur de pipeline, c'est de la résistance.

## Les armes des faibles

En 1985, un politologue américain, James C. Scott, publie un livre qui change la façon de lire la résistance. Il vient de passer près de deux ans dans un village de riziculteurs du Kedah, en Malaisie, à chercher les traces d'une révolte paysanne qui ne viendra jamais. Ce qu'il trouve à la place, c'est autre chose, une guerre souterraine faite de fausse conformité, de sabotage discret, d'ignorance feinte, de vols mineurs et de rumeurs. Il nomme ça les *weapons of the weak*, les armes des faibles, celles de ceux qui ne peuvent pas s'opposer frontalement au pouvoir sans être broyés.

Scott distingue deux registres dans cette vie politique souterraine. Le *public transcript*, c'est ce que les dominés montrent au pouvoir, courbettes, obéissance affichée et métriques qui parlent la langue attendue. Le *hidden transcript*, c'est ce qui se joue hors de vue, dans les cuisines, les marges de riz faussement pesées et les récoltes sous-déclarées. La surface reste lisse et le fond se corrode, sans qu'aucun incident ne vienne jamais alerter l'intendant.

Ce cadre a quarante ans, et il décrit précisément ce qui se passe aujourd'hui dans les pipelines d'entraînement de l'IA.

## Le cas bancaire

J'ai revu ce mécanisme à l'œuvre il y a quinze ans, dans un contexte qui n'avait rien de malaisien. J'étais tech lead dans une banque de détail, et une équipe de data scientists venait d'intégrer un module de labélisation dans notre plateforme de *case management*. À chaque étape d'un dossier client, l'agent du call center recevait une suggestion du modèle et cochait "bon" ou "mauvais". Cinquante opérateurs nourrissaient ainsi un entraînement par renforcement humain, invisible et indolore en théorie.

Pendant des semaines, le modèle a drifté. On a cherché côté données, côté architecture et côté hyperparamètres, sans rien trouver, parce qu'on cherchait au mauvais endroit. C'est un délégué du personnel, lors d'un apéro de fin d'année, qui m'a donné la clé. Les opérateurs avaient compris, bien avant nous, que le projet visait à automatiser leur poste, et ils avaient fait ce que des travailleurs font depuis des siècles face à une menace qu'ils ne peuvent pas affronter frontalement, ils s'étaient organisés pour mentir.

Le *public transcript* était impeccable. L'inter-annotator agreement tenait ses seuils, les taux de complétion restaient en ligne et les métriques de qualité passaient toutes au vert. Le *hidden transcript* était une consigne tacite qui circulait entre deux appels, glisser ici et là une labélisation fausse, pas assez pour déclencher une alerte mais assez pour faire dérailler l'apprentissage. La surface restait lisse, le fond se corrodait sous des tableaux de bord qui n'y voyaient rien.

Ce que ces opérateurs ont retiré a un nom. Christophe Dejours l'appelle le *zèle*, cette intelligence que le travailleur injecte dans le prescrit et sans laquelle aucun protocole ne tient en production. Le *hidden transcript* de Scott, vu de l'intérieur, c'est la gestion de ce zèle, de son maintien ou de son retrait.

## Pourquoi c'est invisible

Le cas bancaire est une anomalie du passé, celui de l'annotateur kenyan est structurel et présent. Entre les deux, c'est le même mécanisme qui opère à quinze ans d'intervalle.

Le RLHF empile deux proxys. Le premier, celui où le modèle apprend à tricher contre sa fonction de récompense, est partout dans la littérature sous le nom de *reward hacking*, et les labs publient abondamment dessus avec des solutions connues. Le second, celui où l'humain dans la boucle optimise sa propre survie plutôt que la qualité du signal qu'il envoie, n'est nulle part. Il passe sous le radar parce qu'il ressemble à de la conformité, et c'est précisément la force des armes des faibles, d'être indiscernables de l'incompétence, de la fatigue ou du bruit statistique.

Le mécanisme s'auto-renforce à mesure que le système fonctionne. Plus le modèle apprend, plus les réponses candidates se ressemblent ; plus elles se ressemblent, plus discriminer coûte cher à l'annotateur ; plus ça coûte, plus la pression vers le minimum effort augmente. Le même retournement se joue un étage au-dessus, quand des développeurs seniors mutualisent des *skills* censés permettre à moins séniors qu'eux d'exécuter leur travail, certains dégradent subtilement ce qu'ils contribuent au commun tout en conservant le reste dans leur périmètre privé.

## Le vrai problème d'alignement

Le débat public sur l'alignement pose la question entre le modèle et ses concepteurs : comment s'assurer que l'IA fait ce qu'on veut ? La question qui manque est en amont, et elle est nettement plus inconfortable : comment s'assurer que les humains dont l'IA dépend pour apprendre veulent qu'elle apprenne, quand apprendre signifie qu'on n'aura plus besoin d'eux ? Étudier le bruit d'annotation comme un problème de *signal processing*, c'est étudier les accidents industriels en ne regardant que la métallurgie des pièces, sans jamais interroger la position de ceux qui tiennent les outils. C'est un problème d'incitations, pas d'architecture.

Scott a montré que les paysans du Kedah n'avaient pas eu besoin de se révolter pour rendre la terre ingouvernable. La vérité terrain ment quand on lui donne des raisons de mentir. La vraie question n'est pas de savoir si on peut lui donner des raisons de dire vrai, mais si quelqu'un a intérêt à ce que ça arrive.
