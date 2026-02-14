---
layout: post
title: "Who writes the constitution of machines?"
date: 2026-02-18
categories: [ai, governance, ethics]
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
  - /en/2026/02/13/who-writes-the-constitution-of-machines/
lang: en
---

*A critical reading of Dario Amodei's "The Adolescence of Technology"*

I use Claude every day. To write, to code, to think. Every interaction is shaped by a text I didn't write and was never consulted on: [Claude's Constitution](https://www.anthropic.com/news/claude-new-constitution). A set of moral principles, values, and boundaries, written by a handful of people in San Francisco.

In January 2026, Anthropic CEO Dario Amodei published ["The Adolescence of Technology"](https://www.darioamodei.com/essay/the-adolescence-of-technology), a 20,000-word essay on AI's existential risks. Five threats identified, serious technical defenses (constitutional AI, mechanistic interpretability, anti-bioweapon classifiers), 5.7 million views on X. The essay was widely praised for its candor.

What follows is my reading of what the essay doesn't say.

## The essay in brief

Amodei frames the arrival of powerful AI, a "country of geniuses in a datacenter," as an inevitable passage. Neither doomer nor naive, he argues for pragmatism. His risks are real. His technical proposals are serious.

But the essay has three blind spots, and all three are about power.

## 1. Who configures the agent?

Amodei never asks: **who decides how the agent behaves, and by what authority?**

Every AI model ships with a set of values. Anthropic configures Claude to be cautious, balanced, ethical in a liberal sense. xAI configures Grok to be libertarian, provocative, less filtered. You can prefer either, but it's structurally the same move: a handful of people decide the normative framework of a tool used by millions.

It's the same problem as recommendation algorithms: a dozen engineers at Meta decide what 3 billion people see in their feed. Here, the power architecture is identical, but the tool is more intimate. We're dealing with an agent that people potentially talk to like a confidant.

Amodei dedicates an entire section to the risks of concentrated power (section 3, "The Odious Apparatus"), while describing a system where Anthropic unilaterally sets Claude's moral standards. He sees no tension.

## 2. Claude's Constitution: a granted charter

This is the central point, and Amodei sidesteps it.

He presents Claude's Constitution as an advance: instead of rigid rules ("don't do X"), a set of high-level principles that form the model's *character*. He compares it to "a letter from a deceased parent, opened in adulthood."

The metaphor is worth pausing on. Because it implicitly raises the question of **who writes that letter**, and in the name of what values.

### The drafters

A sociologically narrow group: engineers, ML researchers, philosophers from the analytic tradition, based in San Francisco, products of the American university elite. Their biases aren't malicious, they're structural: a Californian liberal view of what's acceptable, Anglo-Saxon rationalism as the default epistemic framework, and an individualist conception of ethics where dilemmas are framed in terms of individual rights, rarely in terms of the common good or collective duty.

A user in Senegal, Japan, rural Poland, or Saudi Arabia interacts with an agent whose moral framework was set by people who share neither their culture, their priorities, nor their conception of the good. Yet the agent presents itself as neutral and universal.

### What historical constitutions teach us

This is not the first time a normative text has claimed universality while reflecting the biases of its authors.

The American Constitution of 1787 is celebrated as a masterpiece. Yet it was drafted by 55 white men, landowners, many of whom owned slaves. It enshrined the three-fifths compromise, and the "inalienable rights" stopped at women, Black people, and Indigenous peoples.

And the French Declaration of the Rights of Man, 1789? Drafted by educated bourgeois men. Olympe de Gouges did write a parallel version for women, and she was guillotined for it.

The point isn't that these texts were bad. It's that they reflected the blind spots of their drafters while presenting themselves as universal. It took centuries, civil wars, and social movements to correct them. Claude's Constitution reproduces this pattern with one notable difference: no correction mechanism is built in.

### No checks and balances

Because real constitutions have amendments, constitutional courts, and democratic revision processes. Claude's Constitution gets updated when Anthropic decides. No civil society consulted, no contestation mechanism, and no user representation.

In constitutional law, this is called a **granted charter**: a text bestowed by a sovereign who considers himself benevolent but answers to no one. That's exactly what Claude's Constitution is. And it's this image that best captures the fundamental problem with Amodei's essay: sincere benevolence, exercised without mandate.

## 3. Enterprise deployment: invisible governance

The essay resonates at the civilizational scale, but forgets a more immediate one that likely concerns us all: the company.

### Who decides?

When an organization deploys an internal AI agent, who decides how it behaves? A data engineer? An MLOps specialist? A CISO? None of these roles have a mandate to settle ethical, HR, legal, or commercial questions. Yet every system prompt, every guardrail, every behavioral instruction is a normative decision disguised as a technical choice.

"The agent must not criticize company products": that's a communications decision. "The agent should redirect sensitive questions to HR": that's a governance decision. But in most deployments, the data team makes the call by default and without process.

Someone configures the boundaries of an agent that every employee interacts with daily, and that someone has neither a title for it nor any visibility. Let's name this role: **Chief Context Officer**. The term doesn't exist yet. The role does.

### System prompt opacity and passive surveillance

The employee interacting with an internal agent *potentially doesn't know what instructions shape the responses*. The system prompt is often invisible, and it's an information asymmetry that nobody governs and few people even notice. It is entirely possible to expose an agent's system prompt and create a transparent internal constitution, but almost no one has started that work.

On top of that, whoever deploys the agent potentially captures every conversation, and everything an employee confides to the AI. People aren't naive enough to ask an internal agent how to negotiate their salary: they'll go to ChatGPT for that. But they do slip in far more sensitive elements without always realizing it: strategic directions, commercial trade-offs, marketing decisions that haven't been announced yet, or thoughts about reorganizing a team.

On the private life side, the picture is even more concerning. Some users already talk to AI like a psychoanalyst, sharing their doubts, frustrations, and plans. This is passive surveillance far beyond what corporate email ever enabled, and Amodei never mentions it. Incidentally, this also applies to Anthropic itself: any company operating a conversational model potentially has this mass surveillance capability over its users.

### An unstable role

Even this Chief Context Officer role, even the guardrails put in place today, won't necessarily last in their current form. Sherwin Wu, Head of Engineering for OpenAI's API, [recently observed](https://www.lennysnewsletter.com/p/engineers-are-becoming-sorcerers) that models "eat the scaffolding for breakfast": tools built around model limitations become obsolete as models improve. Companies will need someone to govern their agents, and the role will eventually take shape. But for now, it mutates faster than governance can frame it: it doesn't exist long enough in a stable form for legislation, but it exists long enough to shape decisions.

## What's missing: the political dimension

Amodei treats AI governance as a technical and geopolitical problem. He sidesteps the political dimension proper, because who holds the power to define an agent's behavioral norms, through what process, and with what accountability?

His 20,000-word essay warns about the risks of concentrated power, while embodying that concentration. As Zvi Mowshowitz notes in [his critique](https://thezvi.substack.com/), the tone amounts to "trust me, we'll handle it," and that's the posture democracies are supposed to refuse.

And as Fortune observes, the essay functions simultaneously as warning and sales pitch: Claude's Constitution is presented as a civilizational safeguard *and* as a competitive advantage over OpenAI, Meta, and xAI.

## A question of power, not technique

Ultimately, the question isn't whether Claude's Constitution is "good." It's probably better than no constitution at all. From where I stand, three questions remain:

1. Do we accept that a normative text shaping the interactions of hundreds of millions of people is drafted without democratic process?
2. Who, within a company, should have the authority to configure the moral framework of an agent used by all employees?
3. What legal framework for conversational logs, a repository of personal data of unprecedented intimacy?

Because historical constitutions teach us one thing: even the best intentions produce systemic exclusions when the circle of drafters is closed. There's no reason to think AI constitutions, including Claude's, will escape this rule.

Let's give Amodei credit on the essential point: we're going through a technological adolescence. But adolescence isn't just the risk of hurting yourself. It's also the moment you start questioning the authority of those who claim to know what's good for you.
