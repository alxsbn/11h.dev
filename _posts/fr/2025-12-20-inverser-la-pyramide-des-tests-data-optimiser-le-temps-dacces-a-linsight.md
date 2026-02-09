---
layout: post
title: "Inverser la pyramide des tests data : optimiser le temps d'acces a l'insight"
date: 2025-12-20
categories: [data, testing]
excerpt: "Le vrai probleme n'etait pas la couverture de tests. C'etait ce qu'on cherchait a optimiser."
lang: fr
header_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80"
header_image_alt: "Tableau de bord de visualisation de donnees"
header_image_credit: "Luke Chesser"
header_image_credit_url: "https://unsplash.com/@lukechesser"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: inverting-the-data-testing-pyramid-optimizing-for-time-to-insight
---

Chez [Jolimoi](https://www.jolimoi.com), on faisait tourner 3 500 tests sur 500 modeles avec une petite equipe data. Le resultat etait previsible : livraisons ralenties, surcharge de maintenance, validation en doublon de logique deja testee dans nos APIs, et aucune amelioration de la confiance metier.

Aujourd'hui, on est plus proches de 200 tests, reduits en quelques semaines.

Le vrai probleme n'etait pas la couverture de tests. C'etait ce qu'on cherchait a optimiser.

## La mauvaise question

Les strategies traditionnelles de qualite des donnees se concentrent sur la perfection au niveau des colonnes : chaque champ valide, chaque regle testee, chaque cas limite anticipe.

Mais la vraie question n'est pas "Est-ce que chaque colonne est correcte ?" mais "Est-ce que ce systeme retourne des reponses correctes aux questions metier ?"

Ce n'est pas la meme chose. On a reconstruit notre strategie de tests autour de cette distinction, en inversant la pyramide de tests traditionnelle.

## Trois couches

### Couche 1 : tests dbt, volontairement minimaux

On impose des contraintes de non-nullite, d'unicite selective et d'integrite referentielle sur les cles de jointure uniquement la ou c'est necessaire pour eviter les echecs. Ces tests existent pour capter les ruptures de pipeline, pas pour valider la logique metier.

Si une regle comme `order_total = sum(line_items)` est deja garantie et testee dans nos APIs source, on ne la re-teste pas en aval. Cette seule decision a supprime des milliers de tests redondants.

### Couche 2 : Elementary pour le monitoring

Ca capte ce qu'on n'avait pas pense a tester : chutes de volume, derives de distribution, changements de schema. Il ne s'agit pas de correction stricte, mais d'alerte precoce quand la realite diverge des attentes.

### Couche 3 : corpus de benchmarks pour la verite metier

On teste les questions metier comme des tests d'acceptation, executes sur notre couche semantique via Databricks Genie. Chaque question a un SQL attendu et une reponse attendue, calculee sur des jeux de donnees geles et des metriques bornees dans le temps.

Exemple :

> "Quel etait le total des commandes en novembre 2025 ?"
> Attendu : 12345

```sql
SELECT
  COUNT(DISTINCT `id_order`) AS `total_orders_november_2025`
FROM orders
WHERE YEAR(`order_date`) = 2025
```

C'est la que la confiance se valide. Non pas en affirmant que chaque colonne intermediaire est parfaite, mais en garantissant que les parties prenantes obtiennent des reponses correctes et reproductibles. Quand la logique metier change, le benchmark est cense casser. Mettre a jour la reponse attendue devient une decision explicite et revue. En pratique, c'est un contrat de donnees.

## Le principe

Un principe cle est de faire confiance aux systemes source tout en etant honnete sur les risques. Le fait que les APIs soient testees ne signifie pas qu'elles sont semantiquement immuables. On accepte sciemment le risque de derive des contrats en amont et on l'attenue par le monitoring et les benchmarks metier plutot que par la duplication de logique en aval.

Ca marche pour nous parce qu'on optimise la velocite d'insight, pas la correction theorique. Avec une petite equipe gerant une plateforme data en mouvement rapide, le cout de maintenance des tests compte. On mesure le succes par la capacite des parties prenantes a se fier aux reponses, pas par le nombre de tests qui passent.

> **Attention** : cette approche n'est pas adaptee aux environnements reglementes, au reporting de conformite ou aux organisations avec des exigences d'audit strictes.

## Le contrat

Dans quelques mois, notre agent IA sera en production pour les parties prenantes. Notre corpus de benchmarks est desormais le contrat : ces questions doivent retourner des reponses correctes. Si c'est le cas, le systeme fonctionne, independamment du fait que chaque colonne intermediaire reponde a une definition traditionnelle de la perfection.

La pyramide de tests classique optimise la correction des donnees. Nous, on optimise le temps d'acces a l'insight.
