---
layout: post
title: "Your training data is a stage"
date: 2026-06-09
categories: [data, ai]
excerpt: 'When you ask people to supply the raw material of their own obsolescence, they do what James C. Scott''s Malaysian peasants always did.'
header_image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=1600&q=80"
header_image_alt: "Closed red theater curtain in front of a stage"
header_image_credit: "Rob Laughter"
header_image_credit_url: "https://unsplash.com/@roblaughter"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: training-data-is-a-stage
lang: en
---

## An inexplicable drift

A few years ago, when I was working at a retail bank, we rolled out a continuous learning system to improve a machine learning model. The principle was simple: at every step of processing a case, operators saw the model's recommendation and could indicate whether it looked correct to them or not. Fifty people thus fed the feedback loop continuously.

On paper, the idea was elegant. In practice, something wasn't working. The more feedback we accumulated, the more the model's performance degraded. We checked the data, the algorithms, the processing pipelines, the quality metrics. Nothing seemed to explain the drift.

The answer came in a completely unexpected way, in passing during a conversation with a union representative at an end-of-year gathering. The operators had understood that the project's goal was, ultimately, to automate part of their work. So they had started to skew their evaluations. Not enough to show up in the indicators, not enough to trigger an alert, but enough to disrupt the system's learning.

## What James Scott had already seen

This story came back to me recently while rereading [James C. Scott](https://en.wikipedia.org/wiki/James_C._Scott)'s book, *Weapons of the Weak*. Drawing on fieldwork carried out among Malaysian peasants, Scott shows that dissent rarely takes the spectacular form that those in power imagine. Far more often it expresses itself through a multitude of micro-behaviors: quietly slowing down a task, applying an instruction with excessive zeal, feigning incomprehension or slightly bending a rule.

One of the book's most fertile insights is the distinction between what he calls the *public transcript* and the *hidden transcript*. The first corresponds to the visible stage, the one institutions observe and measure. The second refers to the whole set of behaviors, conversations and strategies that develop out of power's sight.

The problem isn't that individuals disobey openly. The problem is that they can perfectly well [appear to cooperate](/en/2026/01/04/collapse-through-obedience/) while pursuing other goals.

## The blind spot of alignment

This idea strikes me as particularly useful for thinking about certain contemporary problems in artificial intelligence.

When we talk about alignment, we generally focus on the [behavior of the models themselves](/en/2026/01/02/ai-doesnt-cheat-and-thats-the-problem/). We try to understand how to keep a system from optimizing its objective function in an unexpected way. We talk about [*reward hacking*](https://en.wikipedia.org/wiki/Reward_hacking), imperfect specifications or emergent behaviors.

But we talk much less about the humans who produce the learning signal.

What happens when the annotators, the evaluators or the users who feed these systems have interests that differ from those of the organization designing them?

The annotation example is telling. When an annotator has to compare responses produced by an LLM, their real objective isn't necessarily to maximize the quality of the signal provided. They may try to finish the task faster, to reduce their cognitive effort or simply to meet the productivity targets set for them. In that context, certain shortcuts become rational.

The system then keeps learning, but it learns from a signal that is already distorted.

## When metrics become a backdrop

The parallel with Scott is striking. In both cases, the indicators look reassuring. Procedures are followed. Forms are filled in. Data keeps flowing in.

Yet what is observed is no longer necessarily what is actually happening.

We tend to treat data produced by humans as a faithful representation of the field. But that assumption only holds if the people producing the data have an interest in telling the truth. As soon as a gap appears between the system's objectives and those of the individuals, the signal starts to reflect the structure of incentives as much as the reality it claims to measure.

## Aligning the humans

So the question may not only be how to align the models.

It is also about understanding how to align the humans who train them.

After all, asking someone to actively take part in building their own replacement is not a neutral situation. James Scott would probably remind us that in such a context, resistance doesn't disappear. It simply becomes harder to see.

And when it becomes invisible, dashboards tend to tell us a far more reassuring story than reality.
