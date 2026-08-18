---
layout: post
title: "IA, qui contrôle quoi ?"
date: 2026-08-17
categories: [ai, governance, ethics]
excerpt: 'Dario Amodei sort de son silence et concède que l''IA concentre le pouvoir par nature, avant de ne proposer que des tests de sécurité. Mais aucune ligne sur qui décide des valeurs des modèles.'
header_image: "https://images.unsplash.com/photo-1643804926339-e94f0a655185?w=1600&q=80"
header_image_alt: "Trousseau de clés posé sur une table en bois sombre patiné"
header_image_credit: "Filip Szalbot"
header_image_credit_url: "https://unsplash.com/@fess0"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: ai-who-controls-what
lang: fr
---

J'avais, en février 2026, écrit un [billet d'humeur](https://11h.dev/fr/2026/02/13/qui-ecrit-la-constitution-des-machines/) suite à la publication de la « Constitution de Claude », posant une question simple. Qui contrôle quoi ?

Ce week-end, Dario Amodei est sorti de son silence sur X pour répondre à l'investisseur Gavin Baker, qui lui reprochait un discours trop alarmiste et une régulation qui concentrerait le pouvoir entre les mains de quelques labos. Honnête, et tout autant incomplète, sa [réponse](https://x.com/DarioAmodei/status/2088758816376807762) mérite d'être lue.

## Ce qu'il concède

D'abord il concède le diagnostic.

{% include tweet.html
   text="L'IA est structurellement une technologie qui tend à concentrer le pouvoir, pour des raisons qui n'ont rien à voir avec la régulation."
   author="Dario Amodei"
   handle="DarioAmodei"
   date="16 août 2026"
   url="https://x.com/DarioAmodei/status/2088758816376807762" %}

En cause des lois d'échelle, plus que de simples régulations. Ensuite il admet la seule critique qu'il juge fondée, à savoir que « nous n'avons pas encore tenu nos grandes promesses de bénéfice pour le monde. C'est entièrement de notre faute. »

Il finit sur la défiance du public, qu'une campagne marketing ne réparera pas de si tôt. « Dire que l'IA guérira le cancer est devenu un cliché. Ce qui marchera, c'est guérir effectivement le cancer. » Sic.

## Ce dont il ne parle pas

Sauf que toute sa réponse porte sur la sécurité. Des tests pré-déploiement, des seuils de revenus et un régulateur sectoriel, ce sont des instruments pour encadrer les capacités dangereuses d'un modèle. Mais aucune ligne sur qui décide des valeurs desdits modèles.

Aucun régulateur, existant ou proposé, ne se prononcera sur la façon dont un agent traite le blasphème, le suicide assisté ou l'égalité femmes-hommes. Ces arbitrages restent écrits par un cercle sociologiquement étroit, et ce sont ces angles morts qui m'ennuient vraiment.

On m'objectera qu'Anthropic a fait l'expérience, avec en 2023 une constitution rédigée avec un panel citoyen, mille personnes et trente-huit mille votes. C'était réel et salutaire.

Mais ces mille personnes, qui étaient-elles ? Des Américains. Et élargir un cercle ne réglerait pas le problème. Surtout, l'expérience a eu lieu, elle a montré des divergences avec le texte interne, et la version 2026 a quand même été écrite en interne. La délibération a été testée, pas institutionnalisée.

## L'échelle qu'on regarde le moins

Et le même problème se rejoue à une échelle qu'on regarde encore moins, celle de l'entreprise. Quand une organisation déploie un agent interne, chaque prompt système est une décision normative déguisée en choix technique. Écrire que l'agent ne critique pas tel ou tel produit est une décision de communication, et le faire rediriger vers les ressources humaines est une décision de gouvernance. Dans la plupart des déploiements, c'est l'équipe data ou la tech qui tranche, sans mandat, sans procédure, et des fois sans trace ni délibération.

On craint beaucoup les ingérences externes. Celle-là est interne, invisible et quasi-quotidienne.

Je maintiens donc mes trois questions.

Accepte-t-on qu'un texte normatif qui façonne les interactions de centaines de millions de personnes soit rédigé sans processus démocratique ? Qui, dans une entreprise, doit avoir la légitimité de configurer le cadre moral d'un agent utilisé par tous les salariés ? Et quel cadre juridique pour les logs conversationnels, un gisement de données personnelles d'une intimité sans précédent ?
