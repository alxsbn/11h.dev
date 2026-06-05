---
layout: post
title: "Ground truth lies"
date: 2026-03-24
categories: [data, ai]
excerpt: 'Ask people to supply the raw material for their own obsolescence, and they do exactly what the Malaysian peasants in James C. Scott did.'
header_image: "https://images.unsplash.com/photo-1770712235511-c7caedbc2114?w=1600&q=80"
header_image_alt: "White paint flaking away to reveal corroded metal underneath"
header_image_credit: "Hayk Badalyan"
header_image_credit_url: "https://unsplash.com/@hayko_badalyan"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: ground-truth-lies
lang: en
---

A Kenyan annotator, paid two dollars an hour, has to pick which of two near-identical LLM responses is *the better one*. He picks the longer one every time, not because it actually is better but because reading both in full costs more, cognitively, than judging by length. The reward model records the preference, the model learns that longer means better, and the annotator followed the guidelines to the letter.

Nobody cheated.

This isn't a pipeline error, it's resistance.

## Weapons of the weak

In 1985, an American political scientist, James C. Scott, published a book that changed how we read resistance. He had just spent close to two years in a rice-farming village in Kedah, Malaysia, looking for the traces of a peasant revolt that would never come. What he found instead was something else, an underground war made of false compliance, quiet sabotage, feigned ignorance, petty theft and rumor. He called it the *weapons of the weak*, the tools of those who cannot oppose power head-on without being crushed.

Scott split this underground political life into two registers. The *public transcript* is what the dominated show to power, the bowing, the displayed obedience, the metrics that speak the expected language. The *hidden transcript* is what plays out off-stage, in the kitchens, in the rice that's deliberately mis-weighed, in the harvests that go under-declared. Not one incident ever reaches the steward.

The surface stays smooth. Underneath, it corrodes.

This framework is forty years old.

## The bank case

I watched this same mechanism at work fifteen years ago, in a setting with nothing Malaysian about it. I was tech lead at a retail bank, and a team of data scientists had just dropped a labeling module into our *case management* platform. At every step of a customer file, the call center agent got a suggestion from the model and ticked *good* or *bad*. Fifty operators were feeding a human reinforcement loop this way, invisible and painless in theory.

For weeks, the model drifted. We looked at the data, the architecture, the hyperparameters. We were hunting a bug. There wasn't one. It was a union rep, at a year-end drinks thing, who handed me the key. The operators had understood, well before we did, that the project was meant to automate their jobs, and they had done what workers have done for centuries when faced with a threat they can't confront head-on, they had organized to lie.

The *public transcript* was flawless. Inter-annotator agreement held its thresholds, completion rates stayed in line, the quality metrics all came up green. The *hidden transcript* fit in a single gesture: one click on *bad* where it should have been *good*, slipped in between two calls, never enough to trip an alert, always enough to send the learning off the rails. An instruction nobody had written and everybody followed. The surface stayed smooth, the bottom corroded under dashboards that saw none of it.

What those operators withdrew has a name: their *zeal*, the intelligence a worker injects into the prescribed task, without which no protocol survives in production. The *hidden transcript*, seen from the inside, is only that: zeal withdrawn, without ever raising a voice.

## Why it's invisible

The bank case is an anomaly of the past, the Kenyan annotator's is structural and present. Between the two, it's the same mechanism operating fifteen years apart.

RLHF stacks two proxies. The first, where the model learns to cheat against its reward function, is everywhere in the literature under the name *reward hacking*, and the labs publish abundantly on it with known fixes. The second, where the human in the loop optimizes for their own survival rather than the quality of the signal they send, is nowhere. It slips under the radar because it looks like compliance, and that is precisely the strength of the weapons of the weak, being indistinguishable from incompetence, fatigue or statistical noise.

The mechanism reinforces itself the more the system works. The more the model learns, the more the candidate responses resemble each other; the more they resemble each other, the more discriminating between them costs the annotator; the more it costs, the more the pull toward minimum effort grows. The same reversal plays out one floor up, with the senior developer who shares a *skill* at eighty percent and keeps the twenty percent that makes the difference inside his own private perimeter.

## The problem isn't the model

The public debate on alignment poses the question between the model and its designers: how do we make sure the AI does what we want? The missing question sits upstream, and it's far more uncomfortable: how do we make sure the humans the AI depends on to learn want it to learn, when learning means they'll no longer be needed? Studying annotation noise as a *signal processing* problem is reading only the *public transcript*: taking the green metrics for the truth, and never going down into the kitchens where the rest plays out.

It's an incentives problem, not an architecture problem.

Scott showed that the peasants of Kedah never needed to revolt to make the land ungovernable. And this is where the dashboard turns on whoever reads it: it is not the measure of the work, it is the work's *public transcript*, written for the eye of management, green by construction, because the person filling it in knows exactly who's watching. Ground truth lies when you give it reasons to lie. The real question isn't whether you can give it reasons to tell the truth, but whether anyone has an interest in that happening. The Kenyan annotator will pick the longer response again this afternoon, and he'll be right.
