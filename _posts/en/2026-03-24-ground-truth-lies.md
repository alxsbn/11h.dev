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

A Kenyan annotator, two dollars an hour, has to pick which of two near-identical model responses is "the better one." He picks the longer one every time. Not because it's better, but because reading both with any care costs more than the job pays. The reward model logs the preference, the model learns that longer means better, the annotator hit every guideline and nobody cheated. The metrics stay green. The signal underneath them rots.

That isn't a pipeline bug. It's a strike nobody called.

## Weapons of the weak

In 1985 the political scientist James C. Scott published a book that changed how we read defeat. He had just spent nearly two years in a rice-farming village in Kedah, Malaysia, hunting for the peasant revolt that never came. What he found instead was a quieter war, made of false compliance, small sabotage, feigned ignorance, petty theft and rumor. He called them the *weapons of the weak*, the only tools left to people who can't confront power without being crushed.

He split that underground life into two registers. The *public transcript* is what the dominated show to power, deference, visible obedience, numbers that speak the expected language. The *hidden transcript* is what runs offstage, in the kitchens, in margins quietly fudged and harvests under-declared. The surface stays smooth while the substrate keeps corroding, and not one incident ever reaches the steward's ear.

The framework is forty years old. It describes, almost line for line, what happens today inside an AI training pipeline.

## The bank case

I watched this exact mechanism fifteen years ago, in a setting with nothing Malaysian about it. I was tech lead at a retail bank, and a data science team had just wired a labeling module into our case management platform. At every step of a customer file, the call center agent saw a model suggestion and clicked "correct" or "wrong." Fifty operators were feeding a human-in-the-loop training loop, invisible and painless, in theory.

The model drifted for six weeks. We combed the data, the architecture, the hyperparameters, and found nothing, because we were digging in the wrong place. The key came from a union rep at the end-of-year drinks. The operators had understood, long before we did, that the project existed to automate their jobs, and they had done what workers have done for centuries against a threat they can't face head-on.

They organized to lie.

The *public transcript* was spotless. Inter-annotator agreement held its thresholds, completion rates stayed on target, every quality gauge read green. The *hidden transcript* was one rule passed between calls, slip a wrong label in here and there, never enough to trip an alert, always enough to poison the learning. The surface stayed smooth while the substrate corroded under dashboards built to catch none of it.

What those operators withheld has a name. Christophe Dejours calls it *zeal*, the intelligence a worker pours into prescribed tasks, without which no protocol survives contact with production. Scott's hidden transcript, seen from the inside, is the management of that zeal. Its withholding, or its release.

## Why it stays invisible

The bank case is a closed anomaly. The Kenyan annotator's is structural and running right now. Between them, fifteen years apart, it's the same hand on the same lever.

RLHF stacks two proxies. The first, where the model games its reward function, lives all over the literature as *reward hacking*, and the labs publish on it at length, with known mitigations. The second, where the human in the loop optimizes their own survival instead of the quality of the signal they send, is nowhere. It slips the radar because it looks exactly like compliance, and that's the whole genius of the weapons of the weak.

They are indistinguishable from incompetence, fatigue, or statistical noise.

And it tightens as the system improves. The more the model learns, the more alike the candidate responses get; the more alike they get, the more it costs to tell them apart; the more it costs, the harder the pull toward minimum effort. The same reversal plays out one floor up, where senior developers pool *skills* meant to let juniors do their work, and quietly degrade what they hand to the shared space while keeping the good part in private scope.

## The real alignment problem

The mainstream alignment debate frames the question between the model and its designers. How do we make sure the AI does what we want? The missing question sits upstream, and it's far less comfortable. How do we make sure the humans the AI leans on to learn actually want it to learn, when learning means they stop being needed?

Treating annotation noise as a signal-processing problem is like investigating a factory accident by studying the metallurgy of the parts and never the position of the hands on the tools. It's an incentive problem wearing an architecture problem's clothes.

Scott showed that the peasants of Kedah never had to revolt to make the land ungovernable. Ground truth lies when you hand it reasons to lie, and the smooth surface tells you nothing, right up until the floor gives way. The real question was never whether we can give it reasons to tell the truth. It's whether anyone in the building has an interest in letting it.
