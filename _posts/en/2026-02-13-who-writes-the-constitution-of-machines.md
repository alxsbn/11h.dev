---
layout: post
title: "Who Writes the Constitution of Machines?"
date: 2026-02-13
categories: ai governance ethics
excerpt: "Dario Amodei wrote 20,000 words on AI risk. He never asked: who writes Claude's moral constitution, and by what authority?"
header_image: "https://images.unsplash.com/photo-1602660187275-7275b639d7ea?w=1600&q=80"
header_image_alt: "Old book open with handwritten text on parchment"
header_image_credit: "Boudewijn Huysmans"
header_image_credit_url: "https://unsplash.com/@boudewijn_huysmans"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: who-writes-the-constitution-of-machines
redirect_from:
  - /2026/02/13/who-writes-the-constitution-of-machines/
lang: en
---

*A critical reading of Dario Amodei's "The Adolescence of Technology"*

> *In January 2026, Anthropic CEO Dario Amodei published ["The Adolescence of Technology"](https://www.darioamodei.com/essay/the-adolescence-of-technology) — a 20,000-word essay on the existential risks of AI. He identifies five threats: model autonomy, biological weapons, authoritarian power grabs, economic disruption, and indirect effects. His proposed defenses center on technical alignment, transparency, and surgical regulation. The essay went viral (5.7 million views on X) and was widely praised for its candor. What follows is a critical reading of what the essay doesn't say — and what its silences reveal.*

## The essay in brief

Amodei frames the imminent arrival of powerful AI — a "country of geniuses in a datacenter" — as a civilizational rite of passage. Neither doomer nor naive, he argues for pragmatism. His five risks are real. His technical defenses (constitutional AI, mechanistic interpretability, anti-bioweapon classifiers) are serious.

But the essay has three major blind spots. All of them are about power.

## 1. Agent configuration: the invisible slider

Amodei never asks a fundamental question: **who configures the agent's behavior, and by what authority?**

Every AI model ships with a set of values. Anthropic configures Claude to be cautious, balanced, ethical in a liberal sense. xAI configures Grok to be libertarian, provocative, less filtered. You can prefer one over the other — but it's **structurally the same move**: a handful of people decide the normative framework of a tool used by millions.

This is the same problem as social media recommendation algorithms: a dozen engineers at Meta decide what 3 billion people see in their feed. Here, the same power architecture is replicated with an even more intimate tool — an agent people talk to like a confidant.

Amodei dedicates an entire section to the risks of concentrated power (section 3, "The Odious Apparatus"), while describing without any apparent discomfort a system where Anthropic unilaterally sets Claude's moral standards. He sees no tension. It's a spectacular blind spot.

## 2. Claude's Constitution: the drafters' biases

This is the most structural point — and Amodei sidesteps it entirely.

He presents Claude's Constitution as a major advance: instead of rigid rules ("don't do X"), a set of high-level principles and values that form the model's *character*. He compares it to "a letter from a deceased parent, opened in adulthood."

The metaphor is revealing. Because the immediate follow-up is: **who is that parent?**

### The homogeneity of the drafters

A sociologically narrow group: engineers, ML researchers, philosophers from the analytic tradition, based in San Francisco, products of the American university elite. Their biases aren't malicious — they're structural:

- A **Californian liberal** view of what's acceptable (attitudes toward the body, religion, humor, violence)
- **Anglo-Saxon rationalism** as the default epistemic framework
- An **individualist** conception of ethics — dilemmas framed in terms of individual rights, rarely in terms of the common good, collective duty, or communal honor
- A relationship to **risk calibrated to American legal sensitivities**

A user in Senegal, Japan, rural Poland, or Saudi Arabia interacts with an agent whose moral framework was defined by people who share neither their culture, their priorities, nor their conception of the good. Yet the agent presents itself as neutral and universal.

### The lesson of historical constitutions

The analogy with founding constitutions is illuminating — and damning.

The American Constitution of 1787, celebrated as a masterpiece, was drafted by 55 white men, landowners, many of whom owned slaves. It enshrined the three-fifths compromise. The "inalienable rights" stopped at women, Black people, and Indigenous peoples.

The French Declaration of the Rights of Man, 1789? Drafted by educated bourgeois. Olympe de Gouges wrote a parallel version for women — she was guillotined for it.

The point isn't that these texts were bad. It's that they **structurally reflected the blind spots of their drafters while presenting themselves as universal**. It took centuries, civil wars, and social movements to correct them.

Claude's Constitution reproduces exactly this pattern. Amodei doesn't see it — because he's inside it. The classic problem of the fish that can't see the water.

### No checks and balances

Real constitutions have amendments, constitutional courts, democratic revision processes. Claude's Constitution gets updated when Anthropic decides. No civil society consulted, no contestation mechanism, no user representation.

In constitutional law, this is called a **granted charter** — a text bestowed by a sovereign who considers himself benevolent but answers to no one.

## 3. Enterprise deployment: who governs the agent?

Amodei's essay reasons at the civilizational scale. It forgets the most immediate one: **the company**.

### The legitimacy question

When an organization deploys an internal AI agent, who decides how it behaves? A data engineer? An MLOps specialist? A CISO? None of these roles have a mandate to settle ethical, HR, legal, or commercial questions. Yet every system prompt, every guardrail, every behavioral instruction is a **normative decision disguised as a technical choice**.

"The agent must not criticize company products" — that's a communications decision. "The agent should redirect sensitive questions to HR" — that's a governance decision. But in most deployments, the data team makes the call by default, without process.

### System prompt opacity

The employee interacting with an internal agent doesn't know what instructions shape the responses. The system prompt is invisible. It's a **massive information asymmetry** that nobody governs and few people even notice.

### Logs: the most powerful passive surveillance tool ever built

This might be the most explosive point — and Amodei **never** mentions it.

Whoever deploys the agent potentially captures every conversation. An employee who asks the AI "how do I negotiate my salary," "does my manager have the right to...," "draft my resignation letter" — all of it flows upstream.

This is passive surveillance of unprecedented power, far beyond what corporate email reveals. Because people talk to AI like a confidant. They share their doubts, frustrations, secret plans. And all of it is logged.

## What's missing: the political dimension

Amodei treats AI governance as a technical problem (better alignment, better interpretability) and a geopolitical one (regulation between states, transparency between labs). He entirely sidesteps the **political dimension proper**: who holds the power to define an agent's behavioral norms, through what process, with what accountability?

A 20,000-word essay warns about the risks of concentrated power — while embodying exactly that concentration. As Zvi Mowshowitz notes in his critique, the tone amounts to "trust me, we'll handle it." That's precisely the posture democracies are supposed to refuse.

And as Fortune observes with measured irony: the essay functions simultaneously as existential warning and marketing pitch. Claude's Constitution is presented as a civilizational safeguard — and also as a competitive advantage over OpenAI, Meta, and xAI.

## Conclusion: a question of power, not technique

The question isn't whether Claude's Constitution is "good." It's probably better than no constitution at all. The question is threefold:

1. **Do we accept that a normative text shaping the interactions of hundreds of millions of people is drafted without democratic process?**
2. **Who, within a company, should have the authority to configure the moral framework of an agent used by all employees?**
3. **What legal framework for conversational logs — the most intimate repository of personal data ever assembled?**

Historical constitutions teach us one thing: even the best intentions produce systemic exclusions when the circle of drafters is closed. There's no reason to think AI constitutions will escape this rule.

Amodei is right about the essential point: we're going through a technological adolescence. But adolescence isn't just the risk of hurting yourself. It's also the moment you start questioning the authority of those who claim to know what's good for you.

It's time to start.
