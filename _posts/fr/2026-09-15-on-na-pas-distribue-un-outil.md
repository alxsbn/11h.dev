---
layout: post
title: "On n'a pas distribué un outil"
date: 2026-09-15
categories: [data, ai, work]
excerpt: "Une équipe data passée de sept personnes à deux, qui encode sa façon d'analyser pour gagner du temps, et découvre dans les métriques de son cluster qu'elle a distribué bien plus qu'un raccourci."
ref: on-na-pas-distribue-un-outil
lang: fr
---

> **Statut** : draft de plan. Le récit condensé est en bas, les points sont le déroulé à rédiger.
> Accompagne un talk. Fait suite à [[BI, l'angle mort de l'intention]] (11h.dev, 2026-08-19).

## Le récit en un bloc

Notre équipe data est passée de sept personnes à deux. On aurait dû faire moins, on a fait plus. Parce qu'au lieu de traiter les demandes une par une, on a encodé notre manière d'analyser : d'abord pour gagner du temps sur un travail d'agrégation fastidieux, puis parce qu'on s'est aperçu que cette méthode pouvait sortir de l'équipe. On l'a ouverte à d'autres, on est allés encoder des logiques métier qui n'étaient pas les nôtres, on a chassé sur des plates-bandes voisines. Metabase s'est vidé pendant ce temps : ouvrir un dashboard et le lire s'est révélé plus fastidieux que de laisser une routine renvoyer l'information chaque matin, et tout le shadow analytics qui vivait dans des tableurs invisibles est rentré dans le système. Le signal technique est venu après : les requêtes par personne baissaient, la pression sur le cluster non, parce que ce ne sont plus les mêmes requêtes. Là où on cherchait une information, on creuse désormais un sujet, et c'est logique : l'agent ne devine pas la méthode, il applique celle qu'on a écrite. On n'a donc pas distribué un outil, on a distribué un geste, et avec lui ce qu'on tient pour la bonne façon de mener une analyse. Le data-driven n'est pas arrivé par la formation, il est arrivé par délégation. Ce qui déplace complètement ce qu'il faut enseigner : plus le modèle de données, mais la façon de dialoguer avec l'agent, et de rendre au système ce qu'on en tire. Le vrai risque est là : ceux qui empilent mémoire locale et skills personnelles s'épargnent ce retour, et gardent pour eux ce qui devrait profiter à tout le monde.

## Le déroulé

### 1. Sept personnes, puis deux, et plus de capacité

Le point de départ n'est pas une stratégie, c'est une contrainte. L'équipe fond, la demande non. Ce qui aurait dû produire moins produit plus. Poser ce paradoxe d'entrée : c'est lui qui rend la suite intéressante.

### 2. Au début, c'était égoïste

On n'a pas construit ça pour les autres. Agréger, recouper, ré-agréger, vérifier, recommencer parce que le périmètre était faux : un travail fastidieux et un peu inhumain. On a encodé notre manière de mener une analyse pour ne plus avoir à la refaire à la main.

### 3. Puis la méthode est sortie de l'équipe

Et c'est là que ça devient un moteur plutôt qu'une conséquence. On a ouvert à quelques personnes, puis à toute la société. On est allés encoder des logiques métier qui n'étaient pas les nôtres. On a chassé sur des plates-bandes voisines, ce qui a ouvert des conversations qu'on n'aurait jamais eues en restant sur nos livrables.

### 4. Metabase se vide, et le shadow analytics rentre

Deux mouvements simultanés, souvent lus comme un seul. Le dashboard perd parce que l'interpréter demande plus d'effort que de laisser une routine renvoyer l'information chaque matin. Et l'analyse qui se faisait de côté, dans des tableurs invisibles à tous, rentre dans le système et y laisse une trace.

### 5. L'anomalie du cluster

Le signal qui a tout déclenché : les requêtes par personne baissent, la pression sur le cluster ne baisse pas. Quand deux courbes qui devraient bouger ensemble divergent, il y a une histoire derrière.

### 6. Ce ne sont plus les mêmes requêtes

Là où on cherchait une information, on creuse maintenant un sujet. Le détail qui frappe : après une agrégation en vient presque toujours une autre. Ce n'est pas une descente vers une réponse, c'est une spirale autour d'un sujet.

### 7. Ce n'est pas émergent, c'est écrit

Notre méthode d'analyse exploratoire est noir sur blanc : cadrer avant de toucher aux données, regarder le brut, puis croiser, puis recouper. L'agent ne devine pas la méthode, il applique la nôtre. On a encodé un chemin de pensée, et le cluster nous le renvoie en volume lu.

### 8. On a distribué un geste, pas un outil

Devant un dashboard, on pose un filtre et on s'arrête. Segmenter, croiser, tester l'hypothèse d'à côté : ce n'est pas un réflexe qu'on a quand ce n'est pas son métier. Aujourd'hui ces gestes s'exécutent sans avoir été demandés, et sans qu'on sache qu'ils existent.

### 9. Le data-driven par délégation

On a passé des années à vouloir former les gens : apprendre à requêter, comprendre un grain, se méfier d'une moyenne. Ça n'a jamais vraiment pris, nulle part. Le data-driven n'est pas arrivé par la montée en compétence, il est arrivé par délégation. Le signe le plus net : le SQL écrit à la main a quasiment disparu.

### 10. Ce qu'il faut enseigner à la place

Le postulat qui découle de tout ça : il n'est plus nécessaire de former les gens au modèle de données. Il faut leur apprendre à s'intégrer dans le système agentique. Bien formuler, bien cadrer, et surtout rendre au système ce qu'on en tire, pour que les résultats deviennent plus pertinents pour tout le monde.

### 11. Le risque de la privatisation

C'est la chute, et elle mord. Ceux qui empilent mémoire locale et skills personnelles s'épargnent ce retour au commun. Ils gagnent en confort immédiat et retirent au système ce qui devait profiter à tous. Un système agentique se construit en commun ou se fragmente.

## Réserves à porter dans le texte

- Les chiffres restent en ordre de grandeur, jamais en valeur absolue : ne rien publier qui expose la structure de l'équipe ou les volumes de la boîte.
- Le « après une agrégation en vient une autre » est reconstitué par fenêtre temporelle, pas par session tracée. À mentionner si le chiffre est cité.
- L'écart entre profils (le geste traverse, la précision moins) est écarté de ce texte pour tenir le récit. Candidat pour un billet suivant.

## Matière écartée

- Le fil Spotify / Uber / Netflix sur le stockage orienté point query : sert à répondre en commentaire, pas dans l'article. Le point à garder sous le coude : leur travail analytique est fait à l'écriture dans un index, le nôtre à la lecture à chaque question.
- La question du pricing des warehouses (facturation à l'octet scanné contre facturation au compute) : sujet distinct, mérite son propre texte.

## Liens

- [[BI, l'angle mort de l'intention]] : le billet précédent, sur la capture de l'intention.
- Article sur la mutualisation des systèmes agentiques (à retrouver, sert au point 11).
