---
layout: post
title: "La notice est le produit"
date: 2026-02-18
categories: [ai, work, organizations]
excerpt: "L'IA a fait chuter le coût de génération du code, mais pas celui de savoir quoi construire ni de vérifier que c'est correct. Le goulet s'est déplacé de l'exécution vers la spécification, d'un endroit avec des rituels de revue vers un endroit qui n'en a aucun."
header_image: "https://images.unsplash.com/photo-1527689638836-411945a2b57c?w=1600&q=80"
header_image_alt: "Enfant construisant avec des briques Lego en suivant une notice d'instructions"
header_image_credit: "Kelly Sikkema"
header_image_credit_url: "https://unsplash.com/@kellysikkema"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: the-manual-is-the-product
lang: fr
---

Une voiture Lego Technic contient mille pièces, et pourtant un enfant de dix ans peut la monter, non pas parce qu'il comprend l'ingénierie, mais parce que la notice porte toute l'intelligence du produit dans soixante pages d'instructions limpides qui ne laissent aucune place à l'ambiguïté ni à l'interprétation.

Retire la notice, et l'expérience change. Les pièces ne changent pas, la photo sur la boîte non plus, mais on n'obtiendra qu'une approximation, quatre roues tout au plus. « À peu près » et « le modèle exact de la boîte » sont deux univers distincts, et c'est précisément ce qui se passe dans le développement logiciel depuis que l'IA génère du code à la demande.

## Le coût de la génération tend vers zéro. Celui de la validation, non.

Dans « [L'exécution n'est plus la contrainte](/fr/2026/01/21/execution-nest-plus-la-contrainte/) », j'avançais que coder, analyser et concevoir avaient cessé d'être le goulet d'étranglement. L'IA a fait chuter le coût de *génération* du code, en temps comme en argent. Ce que je n'ai pas dit assez clairement, c'est que quand la génération devient bon marché, les seules choses qui restent coûteuses sont savoir *quoi construire* et vérifier *que ce qui a été construit est correct*.

Un plan vague donné à un agent IA puissant produit un résultat médiocre, mais un plan précis donné à un agent IA moyen converge. Le goulet s'est déplacé des mains vers le document qui les guide.

Mais le piège est là. Ce n'est pas parce que le code est bon marché à produire qu'il est bon marché à valider. La migration de base de données, les utilisateurs en production, le contrat avec le prestataire et l'état du système ne se régénèrent pas. La génération a chuté vers zéro, pas la validation. Confondre les deux, c'est construire vite ce qui casse lentement.

## Braid, ou pourquoi itérer vers l'avant est le mauvais réflexe

Si la génération coûte peu mais que la validation coûte cher, à quoi ressemble le bon flux de travail ? Un jeu vidéo de 2008 offre une métaphore étonnamment précise.

*Braid* a redéfini ce qu'un jeu vidéo pouvait exprimer. La mécanique centrale, c'est le rembobinage du temps. Dès qu'on commet une erreur, le monde se déroule à l'envers. Mais certains objets, verts ou dorés, résistent au retour en arrière et restent en place tandis que tout le reste rembobine. Tout le puzzle design repose sur la tension entre ce qu'on peut défaire et ce qu'on ne peut pas.

{% include youtube.html id="uqtSKkyJgFM" %}

Le développement logiciel fonctionne de la même manière, car l'approche traditionnelle ne va que dans un sens, chaque couche posée sur la précédente. On pose les fondations, puis les murs, puis les correctifs, et encore des correctifs. La dette technique n'est pas un bug ; c'est la conséquence naturelle de construire vers l'avant sans pouvoir totalement revenir en arrière.

Les agents IA ne fonctionnent pas comme ça. Avec un meilleur plan, ils ne patchent pas, ils reconstruisent. On peut rembobiner une fonctionnalité, un composant ou un module entier, ajuster la spec et régénérer. C'est un geste quotidien, pas une fantaisie architecturale.

La raison pour laquelle c'est plus efficace que l'itération est contre-intuitive, car plus on itère sur la sortie d'un agent IA, plus les hallucinations s'accumulent, et chaque passe s'éloigne un peu plus de l'intention initiale. Revenir à la spec et régénérer remet les compteurs à zéro, car patcher accumule l'erreur alors que rembobiner l'aplatit.

Dans Braid, on ne rembobine pas parce qu'on a échoué, mais parce qu'*on a appris quelque chose*. C'est exactement ce qui se passe quand on affine une spec après avoir vu ce qu'elle a produit. On perd la sortie, mais on garde ce qu'on a compris.

Mais tout ne rembobine pas. En logiciel, ces objets lumineux sont les données, les utilisateurs, les intégrations et l'état du système. On peut régénérer le code, mais on ne peut pas régénérer ce que le code a déjà touché. Savoir où se trouvent ces frontières, c'est ce qui distingue quelqu'un qui utilise les agents IA de quelqu'un qui les comprend.

## Le vrai danger : la chaîne de montage n'a pas d'avis

Si la notice est le produit, alors la notice concentre tout le pouvoir. Et un pouvoir concentré sans boucle de rétroaction, c'est comme ça qu'on construit des systèmes qui ont l'air parfaits et qui finissent dans le mur.

Quand un humain construit à la main, la friction crée des points de contrôle. On remarque que quelque chose cloche quand le boulon ne rentre pas, quand le test échoue d'une façon inattendue, quand l'interface sonne faux sous les doigts. La résistance du matériau répond, et si c'est lent et cher, c'est aussi un filet de sécurité.

Quand un agent IA construit, il n'y a aucune friction. Si le plan dit que la voiture a trois roues, on obtient une voiture à trois roues magnifiquement conçue, sans aucune plainte ni résistance. Le résultat *a l'air correct*, ça compile, et ça passe les tests que le plan a demandé d'écrire.

On a déplacé le goulet de l'exécution vers la spécification, et ce faisant, on a supprimé les boucles de rétroaction qui servaient à rattraper les mauvaises spécifications. Le constructeur était autrefois un contre-pouvoir face à l'architecte, mais aujourd'hui le constructeur dit oui à tout.

## La boucle, pas la ligne

Alors qu'est-ce qui vérifie la spec ? Le réel.

La notice dit « fixe la pièce 47B », mais tu ouvres le sachet et il n'y a pas de pièce 47B, et le réel vient de dire non. Parfois c'est une pièce manquante, parfois c'est un utilisateur qui clique là où personne ne l'attendait, et parfois c'est une base de données qui refuse de migrer parce que les données ne correspondent pas au schéma que la spec présumait.

La collision a toujours la même forme. La spec disait X, et le monde a dit non. Et le réflexe (le mauvais) est de patcher la sortie. Le bon geste, c'est de revenir à la spec et de se demander : *pourquoi ai-je cru que la pièce 47B existait ?*

On ne commence pas avec une spec parfaite, on y arrive par collision avec le réel. On écrit un prompt vague, l'agent IA renvoie quelque chose, et le voir nous apprend ce qu'on n'aurait pas su formuler avant. La spec n'est pas l'entrée, c'est ce qui émerge quand l'intention rencontre la résistance.

**Spec → construction → réel → spec.** Cette boucle n'est pas nouvelle, car le design thinking a toujours reposé sur le même cycle de prototypage, de test et d'itération. Ce qui est nouveau, c'est le coût du prototype. Quand il faut trois semaines, on fait quatre boucles par trimestre et il vaut mieux viser juste. Quand il faut trois minutes, on en fait quarante par jour, et la boucle cesse d'être un processus de validation pour devenir un mode de pensée. Ce n'est pas une question de degré, c'est un changement de régime.

On itère sur la notice, pas sur la voiture, et la notice évolue chaque fois que le réel répond. Le courage que ça demande n'est pas technique, c'est la volonté de jeter un build qui fonctionne pour réécrire la spec qui l'a produit, parce que « ça marche » et « c'est juste » ne sont pas la même chose.

Certains vont d'ailleurs plus loin et s'affranchissent entièrement de la spec. Ils promptent au feeling, sans filtre, et laissent l'agent IA produire ce qu'il comprend de l'intention brute. Le prompt devient la spec, la spec devient le produit, et le lâcher-prise est total. C'est un [geste que les artistes connaissent bien](/fr/2026/01/12/ce-que-les-artistes-savent-sur-ia/), mais qui, appliqué à du logiciel en production, exige un filet de sécurité que personne n'a encore tendu.

## Le contrôle manquant

Le code avait la pull request, un moment structuré où quelqu'un d'autre regarde ce qu'on a construit et pousse en retour, mais la spec n'a pas encore son équivalent. D'ailleurs, à mesure que le temps consacré au code diminue, même le pair programming risque de glisser vers le prompt. On pourrait imaginer du pair prompting, deux personnes devant la même intention, l'une qui formule et l'autre qui challenge, mais la pratique n'existe pas encore.

Si la notice est le produit, et que la chaîne de montage ne dit jamais non, alors la seule garde restante, c'est que *d'autres personnes lisent la notice avant qu'elle soit expédiée*, non pas pour relire le code mais pour en vérifier l'intention. Qui écrit la spec, qui la challenge et comment. C'est la question organisationnelle à laquelle personne n'a encore répondu. Le goulet ne s'est pas seulement déplacé de l'exécution vers la spécification, il s'est déplacé d'un endroit avec des rituels de revue établis vers un endroit qui n'en a aucun.

L'enfant de dix ans peut monter la voiture Lego avec une bonne notice. Mais personne ne demande à l'enfant de dix ans d'écrire la notice, surtout quand la chaîne de montage ne pousse jamais en retour.
