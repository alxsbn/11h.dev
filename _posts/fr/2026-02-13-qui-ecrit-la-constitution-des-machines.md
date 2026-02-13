---
layout: post
title: "Qui écrit la constitution des machines ?"
date: 2026-02-13
categories: [ai, governance, ethics]
excerpt: 'Dario Amodei a écrit 20 000 mots sur les risques de l''IA. Il n''a jamais posé la question : qui écrit la constitution morale de Claude, et avec quelle légitimité ?'
header_image: "https://images.unsplash.com/photo-1602660187275-7275b639d7ea?w=1600&q=80"
header_image_alt: "Ancien livre ouvert avec texte manuscrit sur parchemin"
header_image_credit: "Boudewijn Huysmans"
header_image_credit_url: "https://unsplash.com/@boudewijn_huysmans"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: who-writes-the-constitution-of-machines
lang: fr
---

*Lecture critique de « The Adolescence of Technology » de Dario Amodei*

J'utilise Claude tous les jours. Pour écrire, pour coder, pour réfléchir. Chaque interaction est encadrée par un texte que je n'ai pas rédigé et pour lequel personne ne m'a consulté : la Constitution de Claude. Un ensemble de principes moraux, de valeurs et de limites, écrit par une poignée de personnes à San Francisco.

En janvier 2026, le CEO d'Anthropic, Dario Amodei, a publié [« The Adolescence of Technology »](https://www.darioamodei.com/essay/the-adolescence-of-technology), un essai de 20 000 mots sur les risques existentiels de l'IA. Cinq menaces identifiées, des défenses techniques sérieuses (IA constitutionnelle, interprétabilité mécaniste, classificateurs anti-bioarmes), 5,7 millions de vues sur X. L'essai a été salué pour sa lucidité.

Ce qui suit est une lecture de ce que l'essai ne dit pas.

## L'essai en bref

Amodei décrit l'arrivée d'une IA puissante, un « pays de génies dans un datacenter », comme un passage obligé. Ni catastrophiste ni naïf, il plaide pour le pragmatisme. Ses risques sont réels, ses propositions techniques sont sérieuses.

Mais l'essai a trois angles morts, et les trois concernent le pouvoir.

## 1. Qui configure l'agent ?

Amodei ne pose jamais la question : **qui décide du comportement de l'agent, et avec quelle légitimité ?**

Chaque modèle d'IA est livré avec un set de valeurs. Anthropic configure Claude pour être prudent, équilibré, éthique au sens libéral du terme. xAI configure Grok pour être libertarien, provocateur, moins filtré. On peut préférer l'un ou l'autre, mais c'est structurellement le même geste : une poignée de personnes décide du cadre normatif d'un outil utilisé par des millions.

C'est le même problème que les algorithmes de recommandation : une dizaine d'ingénieurs chez Meta décide de ce que 3 milliards d'humains voient dans leur fil. Ici, l'architecture de pouvoir est la même, mais l'outil est plus intime : un agent à qui les gens parlent comme à un confident.

Amodei consacre une section entière aux risques de concentration du pouvoir (section 3, « The Odious Apparatus »), tout en décrivant un système où Anthropic fixe unilatéralement les normes morales de Claude. Il n'y voit aucune tension.

## 2. La Constitution de Claude : une charte octroyée

C'est le point central, et Amodei l'esquive.

Il présente la Constitution de Claude comme une avancée : plutôt que des règles rigides (« ne fais pas X »), un ensemble de principes de haut niveau qui forment le *caractère* du modèle. Il compare ça à « une lettre d'un parent décédé, ouverte à l'âge adulte ».

La métaphore mérite qu'on s'y arrête. Car la question qui suit est : **qui est ce parent ?**

### Les rédacteurs

Un groupe sociologiquement étroit : ingénieurs, chercheurs en ML, philosophes de tradition analytique, basés à San Francisco, issus de l'élite universitaire américaine. Leurs biais ne sont pas malveillants, ils sont structurels : une vision libérale californienne de ce qui est acceptable, un rationalisme anglo-saxon comme cadre épistémique par défaut, une conception individualiste de l'éthique où les dilemmes se posent en termes de droits individuels, rarement de bien commun ou de devoir collectif.

Un utilisateur au Sénégal, au Japon, en Pologne rurale ou en Arabie Saoudite interagit avec un agent dont le cadre moral a été défini par des gens qui ne partagent ni sa culture, ni ses priorités, ni sa conception du bien. Mais l'agent se présente comme neutre et universel.

### Ce que les constitutions historiques nous apprennent

La Constitution américaine de 1787, célébrée comme un chef-d'œuvre, a été rédigée par 55 hommes blancs, propriétaires terriens, dont beaucoup possédaient des esclaves. Elle consacrait le compromis des trois-cinquièmes. Les « droits inaliénables » s'arrêtaient aux femmes, aux Noirs, aux autochtones.

La Déclaration des Droits de l'Homme de 1789 ? Rédigée par des bourgeois lettrés. Olympe de Gouges a écrit une version parallèle pour les femmes. On l'a guillotinée.

Le problème n'est pas que ces textes étaient mauvais. C'est qu'ils reflétaient les angles morts de leurs rédacteurs tout en se présentant comme universels. Il a fallu des siècles, des guerres civiles et des mouvements sociaux pour les corriger. La Constitution de Claude reproduit ce schéma — avec une différence : aucun mécanisme de correction n'est prévu.

### Pas de contre-pouvoir

Les vraies constitutions ont des amendements, des cours constitutionnelles, des processus de révision démocratique. La Constitution de Claude est mise à jour quand Anthropic le décide. Aucune société civile consultée, aucun mécanisme de contestation, aucune représentation des utilisateurs.

En droit constitutionnel, on appelle ça une **charte octroyée** : un texte accordé par un souverain qui se considère bienveillant, mais qui ne rend de comptes à personne. C'est exactement ce qu'est la Constitution de Claude. Et c'est cette image qui résume le mieux le problème de fond de l'essai d'Amodei : une bienveillance sincère, exercée sans mandat.

## 3. Le déploiement en entreprise : la gouvernance invisible

L'essai raisonne à l'échelle civilisationnelle, mais il oublie la plus immédiate : l'entreprise.

### Qui décide ?

Quand une organisation déploie un agent IA interne, qui décide de son comportement ? Un data engineer ? Un ML ops ? Un CISO ? Ces fonctions n'ont aucun mandat pour trancher des questions éthiques, RH, juridiques ou commerciales. Pourtant, chaque prompt système, chaque garde-fou, chaque consigne de comportement est une décision normative déguisée en choix technique.

« L'agent ne doit pas critiquer les produits de l'entreprise » : c'est une décision de communication. « L'agent doit rediriger les questions sensibles vers les RH » : c'est une décision de gouvernance. Mais dans la plupart des déploiements, c'est l'équipe data qui tranche, par défaut, sans processus.

Quelqu'un configure les limites d'un agent avec lequel chaque salarié interagit quotidiennement, et ce quelqu'un n'a ni titre pour ça, ni visibilité. Appelons ce rôle par son nom : **Chief Context Officer**. Le terme n'existe pas encore. Le rôle, si.

### L'opacité du prompt système

Le salarié qui interagit avec un agent interne ne sait pas quelles instructions conditionnent les réponses. Le prompt système est invisible, et c'est une asymétrie informationnelle que personne ne gouverne et que peu de gens identifient.

### Les logs

Celui qui déploie l'agent capture potentiellement l'intégralité des conversations. Tout ce qu'un salarié confie à l'IA y passe : comment négocier mon salaire, est-ce que mon manager a le droit de..., rédige ma lettre de démission.

Les gens parlent à l'IA comme à un confident, ils y mettent leurs doutes, leurs frustrations, leurs projets secrets, et tout est loggé. C'est de la surveillance passive bien au-delà de ce que l'email professionnel a jamais permis, et Amodei ne le mentionne pas.

### Un rôle instable

Sherwin Wu, Head of Engineering pour l'API d'OpenAI, a récemment observé que les modèles « mangent le scaffolding au petit-déjeuner » : les outils construits autour des limites des modèles deviennent obsolètes à mesure que les modèles s'améliorent. Le Chief Context Officer d'aujourd'hui configure des prompts système, celui de demain configurera autre chose. Le rôle mute plus vite que la gouvernance ne peut le cadrer : il n'existe pas assez longtemps sous une forme stable pour qu'on légifère, mais assez longtemps pour façonner des décisions.

## Ce qui manque : la dimension politique

Amodei traite la gouvernance de l'IA comme un problème technique et géopolitique. Il esquive la dimension politique au sens propre : qui a le pouvoir de définir les normes comportementales d'un agent, par quel processus, avec quelle redevabilité ?

L'essai de 20 000 mots alerte sur les risques de pouvoir concentré, tout en incarnant cette concentration. Comme le note Zvi Mowshowitz dans [sa critique](https://thezvi.substack.com/), le ton revient à dire « faites-moi confiance, on va gérer ». C'est la posture que les démocraties sont censées refuser.

Et comme le relève Fortune, l'essai fonctionne simultanément comme alerte et comme argumentaire commercial : la Constitution de Claude est présentée comme un rempart civilisationnel *et* comme un avantage concurrentiel face à OpenAI, Meta et xAI.

## Une question de pouvoir, pas de technique

La question n'est pas de savoir si la Constitution de Claude est « bonne ». Elle est probablement meilleure que l'absence de constitution. La question est triple :

1. Accepte-t-on qu'un texte normatif qui façonne les interactions de centaines de millions de personnes soit rédigé sans processus démocratique ?
2. Qui, dans une entreprise, doit avoir la légitimité de configurer le cadre moral d'un agent utilisé par tous les salariés ?
3. Quel cadre juridique pour les logs conversationnels, un gisement de données personnelles d'une intimité sans précédent ?

Les constitutions historiques nous enseignent une chose : même les meilleures intentions produisent des exclusions systémiques quand le cercle des rédacteurs est fermé. Il n'y a aucune raison de penser que les constitutions d'IA échapperont à cette règle.

Amodei a raison sur l'essentiel : nous traversons une adolescence technologique. Mais l'adolescence, ce n'est pas seulement le risque de se faire du mal. C'est aussi le moment où l'on commence à questionner l'autorité de ceux qui prétendent savoir ce qui est bon pour nous.

Il serait temps de commencer.
