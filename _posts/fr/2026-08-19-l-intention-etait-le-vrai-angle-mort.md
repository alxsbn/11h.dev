---
layout: post
title: "L'intention était le vrai angle mort"
date: 2026-08-19
categories: [data, ai, work]
excerpt: 'Pendant longtemps nous avons compté des vues de dashboards en croyant mesurer l''usage de la donnée. Les agents rendent enfin visible la question que les gens se posaient vraiment.'
header_image: "https://images.unsplash.com/photo-1565230698474-2a8a500c35cb?w=1600&q=80"
header_image_alt: "Gros plan en noir et blanc d'un œil humain dans la pénombre"
header_image_credit: "Nathan DeFiesta"
header_image_credit_url: "https://unsplash.com/@natedefiesta"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: l-intention-etait-le-vrai-angle-mort
lang: fr
---

Auparavant, si l'on voulait savoir comment la donnée était réellement exploitée dans une organisation, on avait tendance à se tourner vers les statistiques d'utilisation de notre BI. Peu importe l'outil, vous pourriez en tirer des informations bien utiles :
* Qui exécute quelle requête ?
* Qui exporte quoi ?
* Sur quelle carte ?
* Dans quel dashboard ?
* À quel moment ?
* Etc.

La matière était idéale, on en tirait des classements, des courbes d'usage, des palmarès en tout genre. Ça nous permettait de faire du tri, d'archiver des éléments, d'en mettre certains en avant, et donc d'en tirer quelques enseignements.

Mais on apprenait quoi, au fond ?

Pas grand-chose. Parce qu'à aucun moment ces données ne disent pourquoi quelqu'un a ouvert un dashboard. Ni ce qu'il cherchait, ni s'il l'a trouvé, ni ce qu'il en a fait ensuite et surtout pas s'il en faisait bon usage. On mesurait au mieux des clics en croyant mesurer un besoin.

## Le mutisme du dashboard

Un dashboard est une réponse figée à une question que plus personne ne formulera peut-être de la même manière dans quelque temps. Il aura été construit un jour, pour un besoin précis, par quelqu'un qui a peut-être même quitté l'entreprise depuis.

Et puis oui, un dashboard peut évoluer. Chaque ajout créant un biais irréversible sur la manière dont on pourra l'interpréter. Ceux qui l'ouvrent aujourd'hui prendront ce qu'ils y trouveront et le tordront mentalement.

Ce travail de torsion est invisible. Il se passe dans la tête de la personne, entre deux onglets, dans un export vers un tableur, dans une conversation avec un collègue. La BI n'en garde aucune trace. Elle enregistre le symptôme, mais finalement jamais la cause.

James C. Scott décrivait dans *Seeing Like a State* comment un pouvoir, pour administrer un territoire, doit d'abord le rendre lisible. Il simplifie, cadastre, normalise. Ce qui échappe à cette grille cesse d'exister pour lui, par manque d'instrument lui permettant de voir.

Nos outils de BI ont fait exactement cela avec l'usage de la donnée. Ils ont rendu lisible ce qui était comptable : la vue, le clic, l'export. Le reste, c'est-à-dire l'intention, est littéralement invisible.

## Ce que les agents déplacent

Mais revenons d'abord à nos métriques d'usage. Depuis quelques mois, ce que je constate sur le terrain, c'est d'abord un basculement. En quelques mois, nos agents IA d'analyse passent d'une part négligeable des requêtes à la grande majorité. La BI classique n'est pas complétée, elle est remplacée.

Ce qui provoque cette bascule n'a rien de sophistiqué. L'agent n'est pas brillant, il a un accès limité à la réalité métier et il se trompera sûrement lorsqu'il vous répondra. Mais il sait retourner de la donnée à partir d'une phrase, et surtout, il absorbe l'effort :
* Choisir le bon dashboard,
* les bonnes tables,
* la bonne colonne,
* appliquer les bons filtres,
* le bon grain,
* exporter,
* croiser deux jeux de données,
* fact checker,
* recommencer parce qu'on s'est trompé de périmètre
* Etc.

Tout ce travail de manipulation, disparaît derrière une conversation. C'est cela qui déplace les usages, bien avant la qualité des réponses. On ne quitte pas un outil parce qu'un autre est plus intelligent, on le quitte parce qu'il demande moins.

Les chiffres que je constate in-situ racontent la même histoire. Le volume de requêtes exécutées par personne baisse nettement, alors que ces mêmes personnes travaillent davantage sur la donnée. En d'autres termes, le shadow IT s'efface.

Aussi, là où un dashboard exécutant 10 requêtes n'était exploité qu'à 10%, l'agent, lui, n'exécute que ce que la question appelle.

Du coup, une partie de ce qui apparaît comme un surcroît d'activité n'est d'ailleurs qu'un retour d'exil. L'analyse qui se faisait de côté, dans un tableur, invisible à tous, se fait désormais dans le système et y laisse une trace qui, vous allez le voir, deviendra de l'or.

## Le vrai gain n'est pas la productivité

Cet or nouveau, vous l'aurez compris, c'est l'**intention**. Ce qui change, c'est que la question est désormais écrite et capturée.

Quand quelqu'un demande à un agent pourquoi telle métrique a chuté le mois dernier sur tel segment, cette phrase existe, elle est stockée et lisible. L'intention cesse d'être un mouvement mental invisible pour devenir une donnée comme une autre.

On sait enfin ce que les gens cherchent, dans quel ordre ils le cherchent, et où ils se cassent les dents. L'agent est lui-même capable de challenger, de dialoguer avec l'utilisateur pour mieux cadrer cette intention.

On voit les questions qui reviennent et qui mériteraient une modélisation spécifique. On voit celles auxquelles les données ne peuvent pas répondre, et celles où l'agent a comblé le vide en inventant. Deux informations autrement plus précieuses qu'un classement de cartes consultées.

Parce que pendant longtemps, la BI nous a montré ce que les gens regardaient. Elle ne nous a jamais montré ce qu'ils voulaient savoir.

## Ce que cela déplace dans le métier

Côté Data, vous l'aurez compris, il ne s'agit plus de construire la bonne vue.

L'avant-goût aura été le **context engineering**. Où comment faire en sorte que l'agent dispose de ce qu'il faut pour répondre juste du premier coup :
* Nommer correctement les objets
* Documenter les pièges
* La bonne manière de mesurer le business
* Expliciter les règles métier que tout le monde connaissait sans les avoir jamais écrites
* Etc.

C'est la part la plus attendue du travail, celle qui ressemble encore à de la modélisation.

Et puis il y a désormais **l'intent Engineering**. Où comment tirer quelque chose de durable du corpus d'intention capturé précédemment.

## L'émergence de l'Intention Layer

Ces intentions, une fois capturées, forment une matière. Comme décrit plus haut, elles permettent de voir ce que les gens cherchent vraiment, le jargon utilisé, et où ils se cassent les dents.

Reste à en tirer quelque chose de permanent : la manière dont il faut qu'on y réponde, et donner à un agent les clés d'interprétation qu'un analyste met des mois à acquérir.

Cela vaut d'abord en amont. Une demande arrive rarement complète : on vous réclame un chiffre là où l'on cherche en réalité à trancher une décision. Savoir qu'une question est trop vague, et quoi demander en retour pour remonter à ce qu'elle sert, fait partie de ce qu'il faut encoder.

Car le même chiffre ne veut pas dire la même chose selon la question posée, suivant le business dans lequel vous agissez, suivant la culture d'entreprise, son histoire.

Trois petits exemples :
* Une baisse ne s'apprécie pas dans l'absolu, mais contre une médiane glissante sur 7 jours,
* Un taux de churn est illisible s'il n'est pas couplé au taux d'activation,
* Certaines variations sont si ordinaires qu'elles ne méritent pas qu'on en parle.

Focale, voisinage, seuil de mention, etc. rien de tout cela ne se déduit des données ou du LLM derrière votre agent. Ce sont des décisions métier, qui vivent aujourd'hui dans la façon dont un dashboard aura été composé, ou dans celle qu'aura un Data Analyst de travailler. Deux courbes côte à côte, une fenêtre glissante, un seuil qui passe au rouge. Encodées en pixels, elles demeurent illisibles pour une machine, et potentiellement perdues le jour où leur auteur s'en va.

Cela existait déjà, sous un autre nom : la spécification. Avec la contrepartie de toute spec : elle périme. La différence, c'est qu'une spec versionnée se révise, là où un dashboard se contente de vieillir en silence.

L'intention layer, c'est cette spec rendue vivante, malléable, versionnée et nourrissant l'agent.

La couche sémantique répond à combien. Celle-ci répond à quand est-ce que ça mérite d'être dit, et à côté de quoi.

Parce qu'au final, le goulot n'est plus la production de la réponse, il est dans la formulation du problème.

## Et la BI dans tout ça ?

Reste la question qui fâche. Si les agents captent l'intention, produisent la réponse et coûtent moins cher à faire tourner, à quoi sert encore une plateforme de BI ?

Je ne crois pas qu'elle disparaisse. Je crois qu'elle change de client. Elle ne sert plus des humains qui cliquent, elle sert des agents qui interrogent, et ce qu'on lui demande n'est plus une interface mais de pouvoir retourner la bonne information au regard de l'intention souhaitée.

Ce qui meurt, ce n'est pas la donnée mise en forme. C'est le clic de trop.
