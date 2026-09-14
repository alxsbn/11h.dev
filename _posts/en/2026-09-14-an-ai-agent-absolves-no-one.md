---
layout: post
title: "An AI agent absolves no one"
date: 2026-09-14
categories: [ai, work, organizations]
excerpt: 'We can delegate almost everything to agents, except the moment someone says "I''ll answer for this". That last metre is what a company should now be organised around.'
header_image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80"
header_image_alt: "Brass scales of justice on a dark desk"
header_image_credit: "Tingey Injury Law Firm"
header_image_credit_url: "https://unsplash.com/@tingeyinjurylawfirm"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: an-ai-agent-absolves-no-one
lang: en
---

Let us take the thought experiment all the way, without arguing with it.

In an ordinary startup, with the roles you ordinarily find there, everyone encodes their way of working into skills and agents. Legal pours in its contract doctrine, marketing its campaign grammar, finance its rules of engagement, data its business definitions. All that know-how becomes callable by anyone, at any hour, with no meeting and no queue.

At that point execution is gone. What remains is people with their experience, their instinct and their nerve, pushing the company toward something large, which is to say toward profitable growth and market share. This is the scenario everyone now describes, and it is no longer quite science fiction given that [execution is already no longer the constraint](/en/2026/01/21/execution-is-no-longer-the-constraint/).

Except that one thing remains, exactly one, and it does not encode.

## An agent is irresponsible

The word should be read literally rather than as an accusation. An agent cannot *answer* for what it does, not through negligence or bad design, but because there is nobody inside it to hold to account.

The law already says so, more plainly than any philosophical intuition. An AI agent is legally **property** rather than a person, so it does not contract, is not sued in its own name and repairs nothing. California has even closed the escape hatch by barring defendants from arguing that the AI acted on its own, and a June 2026 executive order directs the Department of Justice to pursue the humans who deploy agents for malicious ends.

Responsibility, in other words, does not evaporate when you delegate. It travels upward. It travels up to the person who configured the agent, scoped it and decided to let it run, which is precisely what makes the promise of absolution untenable.

## The gap Jonas had already named

That upward travel has a name, and it is older than computing.

In 1979 Hans Jonas published *[The Imperative of Responsibility](https://en.wikipedia.org/wiki/Hans_Jonas)*, a book written against its own era. His thesis rests on one uncomfortable observation, since modern technology has given our actions a reach that far exceeds our capacity to answer for them. We have produced something that escapes us, and we remain accountable for it all the same.

Jonas was thinking of nuclear power and ecological irreversibility, of acts whose effects unfold across centuries and across generations who cannot object. Yet he describes with unsettling precision what we now live at a wholly different timescale. I write a configuration on Monday, it acts on Tuesday against a system I no longer watch, and I remain the one who answers for it.

The problem is not the agent's power but **the distance it puts between the act and whoever answers for it**. An agent works while I sleep, over scopes I do not inspect, at a cadence I no longer follow. The causal chain lengthens, the chain of responsibility does not move an inch, and it is exactly in that gap that the nasty surprises live.

The imperative Jonas draws from it — act so that the effects of your actions remain compatible with genuinely human life — translates here without any forcing. Delegate only what you can still answer for.

## The last metre

We can give everyone the ability to delegate their way of working, and it is even desirable, since that is what gives a small team the reach of a large one. But there always comes a moment when someone performs an act nobody can perform in their place, because that act is the one by which they take it on.

Merging the code, with everything it commits in production. Committing the spend on a media budget. Signing off the business decision drawn from an analysis. A bad decision built on wrong figures remains the data team's responsibility, whatever agent produced the figure, and that sentence does not change by a word according to how automated the chain happens to be.

There is a technical reason for this, and it is sturdier than an argument from principle. [The builder says yes to everything](/en/2026/02/18/the-manual-is-the-product/), since an agent never pushes back, never finds the idea doubtful and never points out that the request is absurd. A system without a counterweight does not need to be malicious to drift, it only needs to be obedient. The counterweight therefore has to stay human, and [saying no remains the most thankless skill](/en/2026/03/14/data-team-explore-or-disappear/) as much as the most necessary one.

That last metre is the one the promise of absolution will not cross.

## But responsibilities do fall away

The objection deserves to be taken seriously, because it is already coming true in front of us.

Delaware, the American state with the deepest experience in company law, is studying a new kind of entity called an *AIC*, where an autonomous system could run a company, sign contracts and be sued in its own name. This is still only a proposal, tested inside a supervised regulatory sandbox, but the direction is set and it will not close on its own.

Nor is there any need to wait for the law, because the thing is already slipping inside organisations. A continuous integration pipeline whose validation gates end up merging without human review. An advertising budget that reallocates itself across channels. A support agent committing the company to a goodwill gesture. Each time, this is not a delegated responsibility but an **abandoned** one, and it was abandoned out of convenience rather than by decision.

That is the whole difference, and it cuts sharply. Delegating requires deciding, naming a scope and accepting what comes out of it, whereas letting go requires nothing at all. [Power no longer needs you to say yes, it only needs you not to say no](/en/2026/01/03/servitude-by-ergonomics/) — and a responsibility that falls almost never falls because someone decided it, but because nobody had the chance to catch it.

## The org chart says nothing any more

If that reasoning holds, then the way we picture companies has become obsolete.

An org chart answers the question of who commands whom, and that question assumed work meant distributing execution among people. In an organisation where execution goes to agents, there is not much left to distribute, and the pyramid becomes a drawing that no longer describes anything actually happening.

I have argued here before that [the chain of command loses its purpose once the value chain fits inside one person](/en/2026/05/15/adam-smith-packs-up-his-pins/), and that titles survive only as social currency. I want to go one step further, because the disappearance of titles leaves an open question nobody is addressing. If the title says nothing any more, what is left to describe an organisation with?

The answer seems to me the one question that still holds, that of **who answers for what**.

At Anthropic everyone carries the same job title, and Boris Cherny describes [five roles](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny) that are precisely not jobs, since one person moves between them depending on what the product needs that week. This is right, and a considerable advance on the classic org chart. But those roles describe ways of working rather than scopes of accountability, and a Prototyper and a Maintainer plainly do not answer for the same things. That second map is the one missing, and it is the one that becomes structural once execution leaves.

It meets a question I left open elsewhere, that of [who holds the mandate to define an agent's behaviour](/en/2026/02/13/who-writes-the-constitution-of-machines/). The two belong together, since configuring without answering for anything is the very definition of power without counterpart.

## What it changes in practice

The exercise does not call for a two-day offsite but for a table, and it consists of going back to job descriptions, not to read tasks off them, which are now largely automatable, but to extract the scopes each person answers for.

| What the agent does | Who answers for it | The last metre |
|---|---|---|
| Writes and proposes code | the maintainer | the merge |
| Produces an analysis | the data team | the decision that invokes it |
| Allocates a media budget | marketing | the spend commitment |
| Replies to a customer | support | what is promised on the company's behalf |
| Merges without review | nobody | none |

The last row is the only test that matters. An empty "who answers for it" column does not signal successful automation but a hole in the structure, and that hole will only surface the day something goes wrong, at the exact moment it is too late to fill.

The table has an interesting side effect. It makes visible that some responsibilities never had a holder, even before agents, and that they had been floating between two job descriptions for years without anyone noticing.

## What we still agree to carry

We will automate nearly everything, and there is nothing to regret in that prospect, because most of what leaves should never have occupied capable people for so long.

But a last metre will always remain, the one where somebody says they will take it on. That metre is not a residue of work that escaped optimisation and that some next generation of models will absorb. It is what makes a company a company rather than a process, and Jonas would likely say it is the last place where our power to act and our capacity to answer for it still coincide.

The question is therefore not what we can delegate, since the answer is now "nearly everything". It is what we still agree to carry.
