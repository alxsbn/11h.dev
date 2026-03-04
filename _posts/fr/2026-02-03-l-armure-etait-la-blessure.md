---
layout: post
title: "L'armure était la blessure"
date: 2026-02-03
categories: data work
excerpt: "Une équipe data incapable de prouver sa valeur analytique construit de la complexité jusqu'à ce que le coût de la remettre en question dépasse celui de la garder. L'IA ne corrige pas ça, elle rend l'armure inutile du jour au lendemain."
header_image: "https://images.unsplash.com/photo-1767976517212-ab1bcb2a5a9e?w=1600&q=80"
header_image_alt: "Ruines d'un chateau aux murs de pierre effrondres sous un ciel d'hiver"
header_image_credit: "Tanya Barrow"
header_image_credit_url: "https://unsplash.com/@tanyabarrow"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: the-armor-was-the-wound
lang: fr
---

L'armure était la blessure, et il m'a fallu sept ans pour le voir.

Pas la complexité en elle-même, pas les cinquante modèles, les pipelines ou les systèmes parallèles. Tout ça, c'étaient des symptômes, et la blessure, c'était ceci : une équipe data incapable de démontrer sa valeur analytique s'était réorganisée de sorte que le coût de l'auditer dépasse le coût de la garder. La complexité n'était pas de l'architecture, c'était le prix de la question que personne ne pouvait se permettre de poser.

---

L'ennemi a toujours été la même réunion. Celle où un nouveau DAF, ou un CEO suffisamment exaspéré, regarde la masse salariale, la facture d'infrastructure et la liste des dashboards que personne n'ouvre, puis demande : cette équipe fait quoi, exactement ? Cette question, posée par quelqu'un qui a l'autorité budgétaire et aucun investissement émotionnel dans la réponse, c'est le seul audit qui compte.

Le mécanisme est simple. Si le système demande six mois d'apprentissage, le coût de remplacement de l'équipe dépasse celui de son maintien. Si les pipelines que seule une personne comprend vraiment tombent à 3h du matin, cette personne n'est pas remplaçable dans le cycle d'une revue trimestrielle. Si la migration des anciens modèles vers les nouveaux est "en cours" depuis deux ans, le chiffre est injugeable, et l'équipe est donc en sécurité. Chaque couche de complexité ajoutée pour repousser l'audit repoussait aussi le moment où une vraie valeur analytique pouvait être démontrée. L'opacité qui protégeait l'équipe du regard protégeait aussi le business de l'insight. Six personnes sont devenues un centre de coûts, non pas parce qu'elles ont échoué, mais parce qu'elles ont réussi la mauvaise chose : elles se sont rendues indispensables par la complexité plutôt que par le jugement.

---

C'est avec le double-run que tout ça devient concret. De 2023 à fin 2025, on a fait tourner deux versions parallèles de la réalité chez Jolimoi : les anciens modèles Metabase et les nouveaux modèles dbt sur Databricks. Le cas pour tuer les anciens tenait dès mi-2023. On a gardé les deux en vie pendant deux ans de plus, pas par prudence. Tant que la migration est en cours, le chiffre ne t'appartient pas. Le jour où tu tues l'ancien modèle, chaque écart devient ta faute. Le double-run n'était pas de la dette technique, c'était une couverture contre la réunion.

Le coût est apparu là où ce type de coût apparaît toujours : pas dans la facture d'infrastructure, mais dans la salle où le dashboard commercial disait une chose et le dashboard financier en disait une autre. Deux chiffres pour la même métrique ne créent pas de la confusion, ils créent un verdict, formé avant que quiconque ait parlé. On maintenait la complexité pour protéger la fiabilité, et la complexité détruisait la fiabilité. Un mécanisme de défense qui se retourne contre son hôte n'est plus une défense, c'est la maladie qu'il était censé prévenir.

---

L'IA ne corrige pas ça, elle rend l'armure inutile.

La défense reposait sur une asymétrie d'information : l'équipe connaissait le système, le business non, et l'écart était assez large pour rendre l'audit trop cher. Ce qui change, c'est le coût de pénétration de cette asymétrie. L'audit qui demandait six mois d'intégration ne demande plus qu'un après-midi avec les bons outils. La douve devient une flaque, non pas parce que l'eau a disparu, mais parce que la traversée est devenue bon marché. L'opacité cesse d'être une stratégie viable à partir du moment où le business voit à travers plus vite que l'équipe ne peut la reconstruire.

C'est pour ça que l'IA atterrit si différemment dans les organisations data par rapport au récit productiviste ambiant. Deux personnes qui font le travail de six, c'est la partie visible. La partie invisible, c'est que deux personnes ne peuvent plus se cacher derrière ce que six ont construit. L'audit qui a toujours été la vraie menace est désormais trivialement bon marché à conduire. La seule défense durable est celle qui ne nous a jamais été accessible quand on en avait le plus besoin : une valeur analytique si évidente que la question ne se pose pas.

---

Quand l'armure tombe, trois choses peuvent se trouver en dessous.

La première, c'est un socle : un vrai jugement analytique, des données propres, des métriques en lesquelles le business a confiance et des questions auxquelles on répond avant qu'elles ne soient posées. Chez Jolimoi, après la mort des cinquante modèles, après la fin du double-run, après la mise en service de la couche sémantique, il y avait quelque chose en dessous. Deux personnes, dix analyses par jour et un business qui explore par lui-même. L'armure cachait un bâtiment.

La deuxième, c'est le vide : la complexité ne cachait pas de la valeur analytique, elle s'y substituait. Retirer l'armure révèle la question que l'équipe avait été construite pour éviter : est-ce que cette organisation sait vraiment ce qu'elle attend de ses données ?

La troisième est la plus fréquente et la moins discutée. L'équipe avait une vraie valeur, et elle avait construit des choses réelles. Le jugement était là. Ils pouvaient lire un problème business, formuler une question analytique et ramener quelque chose que le business n'avait pas pensé à demander. Mais ce jugement avait toujours vécu à l'intérieur d'un système si stratifié, si spécifique à ses créateurs, que personne à l'extérieur ne pouvait le voir opérer. Quand l'audit devient bon marché, ce qui est audité, ce n'est pas le jugement mais la lisibilité du jugement. Une équipe qui a passé sept ans à construire de la complexité comme armure n'a jamais construit le langage pour rendre son raisonnement visible. La compétence existe, mais pas la preuve. Dans un régime d'audit gratuit, cette distinction n'a aucune importance. Indiscernable de l'armure qu'il a remplacée, le jugement tombe avec les murs.

C'est le cas que l'IA fera remonter le plus souvent, et celui qui mérite le plus de préparation. Pas parce que l'équipe a échoué, mais parce qu'elle a survécu par les mauvais moyens assez longtemps pour que les bons s'atrophient. Le travail maintenant, ce n'est pas de retirer l'armure mais de construire la lisibilité avant qu'elle ne tombe d'elle-même, en sachant que l'audit n'est plus une menace à l'horizon. Il est déjà assez bon marché pour être lancé cet après-midi.
