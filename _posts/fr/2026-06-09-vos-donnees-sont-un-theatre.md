---
layout: post
title: "Vos données d'entraînement sont un théâtre"
date: 2026-06-09
categories: [data, ai]
excerpt: 'Quand on demande à des gens de fournir la matière première de leur propre obsolescence, ils font ce que les paysans malaisiens de James C. Scott ont toujours fait.'
header_image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=1600&q=80"
header_image_alt: "Rideau de théâtre rouge fermé devant une scène"
header_image_credit: "Rob Laughter"
header_image_credit_url: "https://unsplash.com/@roblaughter"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: training-data-is-a-stage
lang: fr
---

## Une dérive inexplicable

Il y a quelques années, alors que je travaillais dans une banque de détail, nous avons déployé un système d'apprentissage continu pour améliorer un modèle de machine learning. Le principe était simple : à chaque étape du traitement d'un dossier, les opérateurs voyaient la recommandation du modèle et pouvaient indiquer si celle-ci leur paraissait correcte ou non. Cinquante personnes alimentaient ainsi en permanence la boucle de rétroaction.

Sur le papier, l'idée était élégante. Dans les faits, quelque chose ne fonctionnait pas. Plus nous accumulions de feedback, plus les performances du modèle se dégradaient. Nous avons vérifié les données, les algorithmes, les pipelines de traitement, les métriques de qualité. Rien ne semblait expliquer cette dérive.

La réponse est arrivée de manière totalement inattendue, au détour d'une conversation avec un représentant syndical lors d'un pot de fin d'année. Les opérateurs avaient compris que l'objectif du projet était, à terme, d'automatiser une partie de leur travail. Ils avaient donc commencé à fausser les évaluations. Pas suffisamment pour que cela soit visible dans les indicateurs, pas suffisamment pour déclencher une alerte, mais assez pour perturber l'apprentissage du système.

## Ce que James Scott avait déjà vu

Cette anecdote m'est revenue récemment en relisant le livre de [James C. Scott](https://fr.wikipedia.org/wiki/James_C._Scott), *Weapons of the Weak*. À partir d'un travail de terrain mené auprès de paysans malaisiens, Scott montre que la contestation prend rarement la forme spectaculaire que les détenteurs du pouvoir imaginent. Elle s'exprime bien plus souvent par une multitude de micro-comportements : ralentir discrètement une tâche, appliquer une consigne avec un zèle excessif, feindre l'incompréhension ou détourner légèrement une règle.

L'une des intuitions les plus fécondes du livre est la distinction entre ce qu'il appelle le *public transcript* et le *hidden transcript*. Le premier correspond à la scène visible, celle que les institutions observent et mesurent. Le second désigne l'ensemble des comportements, des discussions et des stratégies qui se développent hors du regard du pouvoir.

Le problème n'est pas que les individus désobéissent ouvertement. Le problème est qu'ils peuvent parfaitement [sembler coopérer](/fr/2026/01/04/effondrement-par-obeissance/) tout en poursuivant d'autres objectifs.

## Le point aveugle de l'alignement

Cette idée me paraît particulièrement utile pour penser certains problèmes contemporains de l'intelligence artificielle.

Lorsque nous parlons d'alignement, nous nous intéressons généralement aux [comportements des modèles eux-mêmes](/fr/2026/01/02/lia-ne-triche-pas-et-cest-le-probleme/). Nous cherchons à comprendre comment éviter qu'un système optimise sa fonction objectif d'une manière inattendue. Nous parlons de [*reward hacking*](https://en.wikipedia.org/wiki/Reward_hacking), de spécifications imparfaites ou de comportements émergents.

Mais nous parlons beaucoup moins des humains qui produisent le signal d'apprentissage.

Que se passe-t-il lorsque les annotateurs, les évaluateurs ou les utilisateurs qui alimentent ces systèmes ont des intérêts différents de ceux de l'organisation qui les conçoit ?

L'exemple de l'annotation est révélateur. Lorsqu'un annotateur doit comparer des réponses produites par un LLM, son objectif réel n'est pas nécessairement de maximiser la qualité du signal fourni. Il peut chercher à terminer sa tâche plus rapidement, à réduire son effort cognitif ou simplement à atteindre les objectifs de productivité qui lui sont fixés. Dans ce contexte, certains raccourcis deviennent rationnels.

Le système continue alors d'apprendre, mais il apprend à partir d'un signal déjà déformé.

## Quand les métriques deviennent un décor

Le parallèle avec Scott est frappant. Dans les deux cas, les indicateurs semblent rassurants. Les procédures sont respectées. Les formulaires sont remplis. Les données continuent d'affluer.

Pourtant, ce qui est observé n'est plus nécessairement ce qui se passe réellement.

Nous avons tendance à considérer les données produites par les humains comme une représentation fidèle du terrain. Or cette hypothèse n'est valable que si les personnes qui produisent ces données ont intérêt à dire la vérité. Dès lors qu'apparaît un décalage entre les objectifs du système et ceux des individus, le signal commence à refléter autant les rapports d'incitation que la réalité qu'il prétend mesurer.

## Aligner les humains

La question n'est donc peut-être pas seulement de savoir comment aligner les modèles.

Elle consiste aussi à comprendre comment aligner les humains qui les entraînent.

Après tout, demander à quelqu'un de participer activement à la construction de son propre remplacement n'est pas une situation neutre. James Scott nous rappellerait probablement que dans un tel contexte, la résistance ne disparaît pas. Elle devient simplement plus difficile à voir.

Et lorsqu'elle devient invisible, les tableaux de bord ont souvent tendance à nous raconter une histoire beaucoup plus rassurante que la réalité.
