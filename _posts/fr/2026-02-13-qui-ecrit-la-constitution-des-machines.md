---
layout: post
title: "Qui ecrit la constitution des machines ?"
date: 2026-02-13
categories: [ai, governance, ethics]
excerpt: 'Dario Amodei a ecrit 20 000 mots sur les risques de l''IA. Il n''a jamais pose la question : qui ecrit la constitution morale de Claude, et avec quelle legitimite ?'
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

> *En janvier 2026, Dario Amodei, CEO d'Anthropic, a publie [« The Adolescence of Technology »](https://www.darioamodei.com/essay/the-adolescence-of-technology), un essai de 20 000 mots sur les risques existentiels de l'IA. Il y decrit cinq menaces — autonomie des modeles, armes biologiques, prise de pouvoir autoritaire, disruption economique, effets indirects — et propose un plan de bataille articule autour de l'alignement technique, de la transparence et d'une regulation chirurgicale. L'essai a genere un buzz considerable (5,7 millions de vues sur X) et a ete largement salue pour sa lucidite. Ce qui suit est une lecture critique de ce que l'essai ne dit pas — et de ce que ses silences revelent.*

## L'essai en bref

Amodei decrit l'arrivee imminente d'une IA puissante — un « pays de genies dans un datacenter » — comme un rite de passage civilisationnel. Ni doomer ni naif, il plaide pour une approche pragmatique. Ses cinq risques sont reels, ses defenses techniques (IA constitutionnelle, interpretabilite mecaniste, classificateurs anti-bioarmes) sont serieuses.

Mais l'essai a trois angles morts majeurs. Et ils sont tous lies au pouvoir.

## 1. Le parametrage de l'agent : le curseur invisible

Amodei ne pose jamais une question pourtant fondamentale : **qui configure le comportement de l'agent, et avec quelle legitimite ?**

Chaque modele d'IA est livre avec un set de valeurs. Anthropic configure Claude pour etre prudent, equilibre, ethique au sens liberal du terme. xAI configure Grok pour etre libertarien, provocateur, moins filtre. On peut preferer l'un ou l'autre — mais c'est **structurellement le meme geste** : une poignee de personnes decide du cadre normatif d'un outil utilise par des millions.

C'est exactement le probleme des algorithmes de recommandation des reseaux sociaux : une dizaine d'ingenieurs chez Meta decide de ce que 3 milliards d'humains voient dans leur fil. Ici, on replique la meme architecture de pouvoir avec un outil encore plus intime — un agent a qui les gens parlent comme a un confident.

Amodei consacre une section entiere aux risques de concentration du pouvoir (section 3, « The Odious Apparatus »), tout en decrivant sans aucune gene un systeme ou Anthropic fixe unilateralement les normes morales de Claude. Il n'y voit aucune tension. C'est un angle mort spectaculaire.

## 2. La Constitution de Claude : les biais des redacteurs

C'est le point le plus structurant — et Amodei l'esquive totalement.

Il presente la Constitution de Claude comme une avancee majeure : plutot que des regles rigides (« ne fais pas X »), un ensemble de principes et de valeurs de haut niveau qui forment le *caractere* du modele. Il compare ca a « une lettre d'un parent decede, ouverte a l'age adulte ».

La metaphore est revelatrice. Car la question qui suit immediatement est : **qui est ce parent ?**

### L'homogeneite des redacteurs

Un groupe sociologiquement etroit : ingenieurs, chercheurs en ML, philosophes de tradition analytique, bases a San Francisco, issus de l'elite universitaire americaine. Leurs biais ne sont pas malveillants — ils sont structurels :

- Une vision **liberale californienne** de ce qui est acceptable (rapport au corps, a la religion, a l'humour, a la violence)
- Un **rationalisme anglo-saxon** comme cadre epistemique par defaut
- Une conception **individualiste** de l'ethique — les dilemmes sont cadres en termes de droits individuels, rarement en termes de bien commun, de devoir collectif, ou d'honneur communautaire
- Un rapport au **risque calibre sur la sensibilite juridique americaine**

Un utilisateur au Senegal, au Japon, en Pologne rurale ou en Arabie Saoudite interagit avec un agent dont le cadre moral a ete defini par des gens qui ne partagent ni sa culture, ni ses priorites, ni sa conception du bien. Mais l'agent se presente comme neutre et universel.

### La lecon des constitutions historiques

L'analogie avec les constitutions fondatrices est eclairante — et devastatrice.

La Constitution americaine de 1787, celebree comme un chef-d'oeuvre, a ete redigee par 55 hommes blancs, proprietaires terriens, dont beaucoup possedaient des esclaves. Elle consacrait le compromis des trois-cinquiemes. Les « droits inalienables » s'arretaient aux femmes, aux Noirs, aux autochtones.

La Declaration des Droits de l'Homme de 1789 ? Redigee par des bourgeois lettres. Olympe de Gouges a ecrit une version parallele pour les femmes — on l'a guillotinee.

Le point n'est pas que ces textes etaient mauvais. C'est qu'ils **refletaient structurellement les angles morts de leurs redacteurs, tout en se presentant comme universels**. Il a fallu des siecles, des guerres civiles et des mouvements sociaux pour les corriger.

La Constitution de Claude reproduit exactement ce schema. Amodei ne le voit pas — parce qu'il est dedans. C'est le probleme classique du poisson qui ne voit pas l'eau.

### Aucun mecanisme de contre-pouvoir

Les vraies constitutions ont des amendements, des cours constitutionnelles, des processus de revision democratique. La Constitution de Claude a une mise a jour quand Anthropic le decide. Aucune societe civile consultee, aucun mecanisme de contestation, aucune representation des utilisateurs.

En droit constitutionnel, on appelle ca une **charte octroyee** — un texte accorde par un souverain qui se veut bienveillant, mais qui ne rend de comptes a personne.

## 3. Le deploiement en entreprise : qui gouverne l'agent ?

L'essai d'Amodei raisonne a l'echelle civilisationnelle. Il oublie l'echelle la plus immediate : **l'entreprise**.

### La question de la legitimite

Quand une organisation deploie un agent IA interne, qui decide de son comportement ? Un data engineer ? Un ML ops ? Un CISO ? Ces fonctions n'ont aucun mandat pour trancher des questions ethiques, RH, juridiques ou commerciales. Pourtant, chaque prompt systeme, chaque garde-fou, chaque consigne de comportement est une **decision normative deguisee en choix technique**.

« L'agent ne doit pas critiquer les produits de l'entreprise » — c'est une decision de communication. « L'agent doit rediriger les questions sensibles vers les RH » — c'est une decision de gouvernance. Mais dans la plupart des deploiements, c'est l'equipe data qui tranche, par defaut, sans processus.

### L'opacite du prompt systeme

Le salarie qui interagit avec un agent interne ne sait pas quelles instructions conditionnent les reponses. Le prompt systeme est invisible. C'est une **asymetrie informationnelle massive** que personne ne gouverne et que peu de gens identifient.

### Les logs : l'outil de surveillance passive le plus puissant jamais cree

C'est peut-etre le point le plus explosif — et Amodei ne le mentionne **jamais**.

Celui qui deploie l'agent capture potentiellement l'integralite des conversations. Un salarie qui demande a l'IA « comment negocier mon salaire », « est-ce que mon manager a le droit de... », « redige ma lettre de demission » — tout ca remonte.

C'est un outil de surveillance passive d'une puissance inedite, bien au-dela de ce que l'email professionnel revele. Parce que les gens parlent a l'IA comme a un confident. Ils y mettent leurs doutes, leurs frustrations, leurs projets secrets. Et tout est logge.

## Ce qui manque : la dimension politique

Amodei traite la gouvernance de l'IA comme un probleme technique (meilleur alignement, meilleure interpretabilite) et un probleme geopolitique (regulation entre Etats, transparence entre labos). Il esquive totalement la dimension **politique au sens propre** : qui a le pouvoir de definir les normes comportementales d'un agent, par quel processus, avec quelle redevabilite ?

L'essai de 20 000 mots alerte sur les risques de pouvoir concentre — tout en incarnant exactement cette concentration. Comme le note Zvi Mowshowitz dans sa critique : le ton revient a dire « faites-moi confiance, on va gerer ». C'est precisement la posture que les democraties sont censees refuser.

Et comme le souligne Fortune avec une ironie mesuree : l'essai fonctionne simultanement comme alerte existentielle et comme argumentaire marketing. La Constitution de Claude est presentee comme un rempart civilisationnel — et aussi comme un avantage concurrentiel face a OpenAI, Meta et xAI.

## Conclusion : une question de pouvoir, pas de technique

La question n'est pas de savoir si la Constitution de Claude est « bonne ». Elle est probablement meilleure que l'absence de constitution. La question est triple :

1. **Accepte-t-on qu'un texte normatif qui faconne les interactions de centaines de millions de personnes soit redige sans processus democratique ?**
2. **Qui, dans une entreprise, doit avoir la legitimite de configurer le cadre moral d'un agent utilise par tous les salaries ?**
3. **Quel cadre juridique pour les logs conversationnels — le gisement de donnees personnelles le plus intime jamais constitue ?**

Les constitutions historiques nous enseignent une chose : meme les meilleures intentions produisent des exclusions systemiques quand le cercle des redacteurs est ferme. Il n'y a aucune raison de penser que les constitutions d'IA echapperont a cette regle.

Amodei a raison sur l'essentiel : nous traversons une adolescence technologique. Mais l'adolescence, ce n'est pas seulement le risque de se faire du mal. C'est aussi le moment ou l'on commence a questionner l'autorite de ceux qui pretendent savoir ce qui est bon pour nous.

Il serait temps de commencer.
