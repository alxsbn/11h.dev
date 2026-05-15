---
layout: post
title: "Ground truth lies"
date: 2026-03-24
categories: [data, ai]
excerpt: 'When you ask people to supply the raw material of their own obsolescence, they do what James C. Scott''s Malaysian peasants always did.'
header_image: "https://images.unsplash.com/photo-1770712235511-c7caedbc2114?w=1600&q=80"
header_image_alt: "White paint peeling to reveal corroded metal underneath"
header_image_credit: "Hayk Badalyan"
header_image_credit_url: "https://unsplash.com/@hayko_badalyan"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: ground-truth-lies
lang: en
---

A Kenyan annotator, paid two dollars an hour, has to pick which of two near-identical LLM responses is "the better one." He consistently goes with the longer one, not because it actually is better but because reading both carefully costs more than judging on length. The reward model registers the preference, the model learns that longer equals better, the annotator followed the guidelines exactly and nobody cheated. This isn't a pipeline bug, it's resistance.

## Weapons of the weak

In 1985, the American political scientist James C. Scott published a book that reshaped how we read resistance. He had just spent nearly two years living in a rice-farming village in Kedah, Malaysia, looking for traces of a peasant revolt that never came. What he found instead was something else, a quieter war made of false compliance, small sabotage, feigned ignorance, petty theft and rumor. He called these the *weapons of the weak*, the tools of those who can't stand up to power directly without being crushed.

Scott split this underground political life into two registers. The *public transcript* is what the dominated show to power, deference, visible obedience and metrics that speak the expected language. The *hidden transcript* is what plays out offstage, in the kitchens, in rice margins quietly fudged and harvests under-declared. The surface stays smooth and the substrate keeps corroding, without any incident ever reaching the steward's ear.

The framework is forty years old, and it describes almost exactly what happens today inside AI training pipelines.

## The bank case

I watched this mechanism at work fifteen years ago, in a setting that had nothing Malaysian about it. I was a tech lead at a retail bank, and a data science team had just wired a labeling module into our case management platform. At every step of a customer file, the call center agent saw a model suggestion and clicked "correct" or "wrong." Fifty operators were quietly feeding a human-in-the-loop training process, invisible and painless in theory.

The model drifted for weeks. We looked at the data, the architecture and the hyperparameters, and found nothing, because we were looking in the wrong place. It was a union rep, at an end-of-year drinks gathering, who gave me the key. The operators had understood long before we did that the project aimed to automate their jobs, and they had done what workers have done for centuries when facing a threat they can't confront head-on, they organized to lie.

The *public transcript* was spotless. Inter-annotator agreement held its thresholds, completion rates stayed on target and quality metrics all registered green. The *hidden transcript* was a quiet rule passed between calls, slip a wrong label here and there, not enough to trigger an alert but enough to derail the learning. The surface stayed smooth while the substrate corroded beneath dashboards that caught none of it.

What those operators withheld has a name. Christophe Dejours calls it *zeal*, the intelligence a worker injects into prescribed tasks and without which no protocol ever holds up in production. Scott's *hidden transcript*, seen from the inside, is the management of that zeal, its withholding or its release.

## Why it stays invisible

The bank case is a past anomaly, the Kenyan annotator's is structural and ongoing, and between the two it's the same mechanism at work fifteen years apart.

RLHF stacks two proxies. The first, where the model learns to game its reward function, is everywhere in the literature under the name *reward hacking*, and the labs publish on it at length with known mitigations. The second, where the human in the loop optimizes their own survival rather than the quality of the signal they send, is nowhere. It slips under the radar because it looks like compliance, and that's precisely the strength of the weapons of the weak, being indistinguishable from incompetence, fatigue or statistical noise.

The mechanism self-reinforces as the system gets better. The more the model learns, the more similar the candidate responses become; the more similar they are, the more expensive it becomes to tell them apart; the more expensive it gets, the stronger the pull toward minimum effort. The same reversal plays out one floor up, when senior developers pool *skills* meant to let less senior people perform their work, some of them subtly degrade what they contribute to the shared space while keeping the rest in their private scope.

## The real alignment problem

The mainstream alignment debate frames the question between the model and its designers: how do we make sure the AI does what we want? The missing question sits upstream, and it's considerably more uncomfortable: how do we make sure the humans the AI depends on to learn actually want it to learn, when learning means they won't be needed anymore? Treating annotation noise as a signal processing problem is like studying industrial accidents by looking only at the metallurgy of the parts, never at the position of the people holding the tools. This is an incentive problem, not an architecture problem.

Scott showed that the peasants of Kedah never needed to revolt to make the land ungovernable. Ground truth lies when you give it reasons to lie. The real question isn't whether we can give it reasons to tell the truth, but whether anyone has an interest in making that happen.
