---
layout: post
title: "Inverser la pyramide des tests data : optimiser le temps d'accès à l'insight"
date: 2025-12-20
categories: [data, testing]
excerpt: "Le vrai problème n'était pas la couverture de tests. C'était ce qu'on cherchait à optimiser."
lang: fr
header_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80"
header_image_alt: "Tableau de bord de visualisation de données"
header_image_credit: "Luke Chesser"
header_image_credit_url: "https://unsplash.com/@lukechesser"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: inverting-the-data-testing-pyramid-optimizing-for-time-to-insight
---

Chez [Jolimoi](https://www.jolimoi.com), on faisait tourner 3 500 tests sur 500 modèles avec une petite équipe data. Le résultat était prévisible : livraisons ralenties, surcharge de maintenance, validation en doublon de logique déjà testée dans nos APIs, et aucune amélioration de la confiance métier.

Aujourd'hui, on est plus proches de 200 tests, réduits en quelques semaines.

Le vrai problème n'était pas la couverture de tests. C'était ce qu'on cherchait à optimiser.

## La mauvaise question

Les stratégies traditionnelles de qualité des données se concentrent sur la perfection au niveau des colonnes : chaque champ valide, chaque règle testée, chaque cas limite anticipé.

Mais la vraie question n'est pas "Est-ce que chaque colonne est correcte ?" mais "Est-ce que ce système retourne des réponses correctes aux questions métier ?"

Ce n'est pas la même chose. On a reconstruit notre stratégie de tests autour de cette distinction, en inversant la pyramide de tests traditionnelle.

## Trois couches

### Couche 1 : tests dbt, volontairement minimaux

On impose des contraintes de non-nullité, d'unicité sélective et d'intégrité référentielle sur les clés de jointure uniquement là où c'est nécessaire pour éviter les échecs. Ces tests existent pour capter les ruptures de pipeline, pas pour valider la logique métier.

Si une règle comme `order_total = sum(line_items)` est déjà garantie et testée dans nos APIs source, on ne la re-teste pas en aval. Cette seule décision a supprimé des milliers de tests redondants.

### Couche 2 : Elementary pour le monitoring

Ça capte ce qu'on n'avait pas pensé à tester : chutes de volume, dérives de distribution, changements de schéma. Il ne s'agit pas de correction stricte, mais d'alerte précoce quand la réalité diverge des attentes.

### Couche 3 : corpus de benchmarks pour la vérité métier

On teste les questions métier comme des tests d'acceptation, exécutés sur notre couche sémantique via Databricks Genie. Chaque question a un SQL attendu et une réponse attendue, calculée sur des jeux de données gelés et des métriques bornées dans le temps.

Exemple :

> "Quel était le total des commandes en novembre 2025 ?"
> Attendu : 12345

```sql
SELECT
  COUNT(DISTINCT `id_order`) AS `total_orders_november_2025`
FROM orders
WHERE YEAR(`order_date`) = 2025
```

C'est là que la confiance se valide. Non pas en affirmant que chaque colonne intermédiaire est parfaite, mais en garantissant que les parties prenantes obtiennent des réponses correctes et reproductibles. Quand la logique métier change, le benchmark est censé casser. Mettre à jour la réponse attendue devient une décision explicite et revue. En pratique, c'est un contrat de données.

## Le principe

Un principe clé est de faire confiance aux systèmes source tout en étant honnête sur les risques. Le fait que les APIs soient testées ne signifie pas qu'elles sont sémantiquement immuables. On accepte sciemment le risque de dérive des contrats en amont et on l'atténue par le monitoring et les benchmarks métier plutôt que par la duplication de logique en aval.

Ça marche pour nous parce qu'on optimise la vélocité d'insight, pas la correction théorique. Avec une petite équipe gérant une plateforme data en mouvement rapide, le coût de maintenance des tests compte. On mesure le succès par la capacité des parties prenantes à se fier aux réponses, pas par le nombre de tests qui passent.

> **Attention** : cette approche n'est pas adaptée aux environnements réglementés, au reporting de conformité ou aux organisations avec des exigences d'audit strictes.

## Le contrat

Dans quelques mois, notre agent IA sera en production pour les parties prenantes. Notre corpus de benchmarks est désormais le contrat : ces questions doivent retourner des réponses correctes. Si c'est le cas, le système fonctionne, indépendamment du fait que chaque colonne intermédiaire réponde à une définition traditionnelle de la perfection.

La pyramide de tests classique optimise la correction des données. Nous, on optimise le temps d'accès à l'insight.
