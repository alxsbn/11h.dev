---
layout: post
title: "La dark mine"
date: 2026-03-05
categories: data ai
excerpt: 'Une organisation qui délègue la formulation des questions à des agents découvre structurellement plus qu''une organisation qui se contente d''y répondre. Le goulot d''étranglement ne sera pas le minage, mais la capacité à exploiter le minerai.'
header_image: "/assets/images/dark-mine.jpg"
header_image_alt: "Mineurs robotiques extrayant des cristaux de données bleus luminescents dans une caverne souterraine"
header_image_credit: "Généré avec ChatGPT Image"
ref: the-dark-mine
lang: fr
---

Il y a un concept qui circule dans l'industrie manufacturière depuis quelques années (et des mois côté tech), la dark factory. Une usine entièrement automatisée, sans lumières, sans humains sur la chaîne. Les machines produisent, assemblent et expédient. L'image est saisissante, mais elle reste confinée à ce qu'on sait déjà fabriquer.

Ce qui m'intéresse, c'est ce qui se passe quand on pousse cette logique sous terre. Pas une usine qui exécute, mais une mine qui cherche. Des agents autonomes qui ne répondent pas à tes questions, mais qui en formulent de nouvelles. Contrairement à une vraie mine, où l'on sait quel minerai on cherche avant de creuser, une dark mine ne sait pas ce qu'elle cherche avant de le trouver.

## Usine contre mine

La différence est structurelle. Dans une dark factory, le processus est borné. On sait ce qui entre, on sait ce qui sort, et on optimise le chemin entre les deux. Le code suit bien cette logique, avec un ticket, un spec et un livrable. L'agent remplace le développeur sur des tâches définies, et le gain se mesure en vélocité.

Dans une mine, le réel s'invite. Les angles morts peuvent porter du sens. Un filon peut suivre une veine que personne n'avait cartographiée, en tirant parti des capacités cognitives des LLM et de la somme des connaissances humaines qu'ils composent. Un filon peut aussi s'épuiser, voire halluciner une continuité qui n'existe pas. Mais le coût marginal de chaque hypothèse testée est dérisoire au regard de ce qu'elle peut révéler.

Ce que je défends ici est simple. Une organisation qui délègue la formulation des questions à des agents découvre structurellement plus qu'une organisation qui se contente d'y répondre. Le goulot d'étranglement ne sera pas le minage, mais la capacité à exploiter le minerai.

## CRISP-DM comme colonne vertébrale

Pour ancrer cette logique dans une réalité opérationnelle, il fallait une colonne vertébrale méthodologique, pas un nouveau framework brillant mais un vieux que tout le monde avait rangé au placard.

Je suis allé déterrer [CRISP-DM](https://cs.unibo.it/~danilo.montesi/CBD/Beatriz/10.1.1.198.5133.pdf). On l'a longtemps cantonné à de la modélisation prédictive, puis oublié aussi vite. Pourtant la base du processus est limpide. Comprendre le besoin métier, comprendre les données, les associer, et surtout itérer sans relâche. C'est aussi un cadre informel, une ligne directrice qui donne aux équipes la capacité de travailler en autonomie et d'improviser quand le terrain l'exige. À l'origine, c'était un standard de collaboration entre laboratoires, souvent décrié pour sa rigidité. Mais cette rigidité, c'est exactement ce dont des agents ont besoin pour rester un minimum déterministes. Ce qui était un défaut pour des humains devient une qualité pour des machines.

C'est ce principe que j'applique, en m'appuyant aussi sur les patterns d'exploration de données du NIST comme socle de travail, le tout orchestré par des swarms d'agents. Les rôles diffèrent de ce qu'on voit dans le développement logiciel. On parle de Lead, de Scout, d'Explorer, de Synthesizer et de Challenger, le tout articulé autour de signaux structurés, de convergence et de scores de satisfaction. Le détail d'implémentation fera l'objet d'un article à part.

## Terrain d'essai

Pour tester cette logique sur le terrain, l'exemple sur lequel j'itère est parlant. Prenons Spotify. Au départ, leur North Star KPI était le nombre d'abonnés. Puis ils se sont posé une question différente : comment nos utilisateurs se comportent-ils quand ils apprécient réellement le service ? Est-ce que c'est l'abonnement qui capture la valeur, ou autre chose ? Ils ont fini par basculer sur le nombre de minutes écoutées, parce que c'est là que la valeur générée se trouvait. Il leur a fallu des années pour poser la bonne question. Une dark mine pourrait faire émerger ce type de recadrage en quelques jours, parce que le coût de chaque hypothèse testée est négligeable et que les agents n'ont aucun investissement émotionnel dans la réponse précédente.

C'est cette logique qui me sert de baseline dans le contexte [Jolimoi](https://jolimoi.com). Aujourd'hui, un Data Analyst répond à des questions qu'un humain a déjà formulées. Le biais est structurel, car on ne peut trouver que ce qu'on cherche. Une dark mine génère des questions que personne n'aurait posées, et c'est fondamentalement différent. La découverte naît de l'hypothèse que personne n'avait jugé utile de tester, ni même imaginé.

## Le vrai risque

Faire émerger ces hypothèses a un coût. La complexité opérationnelle est réelle, avec six phases, six types d'agents, des signaux structurés et des boucles de rétroaction entre les rôles. Mais c'est une complexité au service de l'exploration, pas de la protection.

Et c'est là que la vraie question se pose. De la même manière qu'une dark factory en production infernale peut stresser l'organisation sur laquelle elle repose, une dark mine crée un problème symétrique. Comment une structure peut-elle créer les conditions pour agir sur ce que la mine remonte ?

Le risque n'est pas que la mine ne trouve rien, mais qu'elle trouve tout, et que l'organisation se noie dans un minerai qu'elle ne sait pas raffiner.
