---
layout: talk-post
title: "Code was never the cost"
subtitle: "What you buy is not what you think you buy"
eyebrow: "Build · buy · agents"
date: 2026-08-04
categories: [data, ai]
excerpt: 'Agents can write connectors. That is precisely why you should not have them write yours.'
header_image: "/apps/storydeck/assets/img/hero.jpg"
header_image_alt: "Abstract composition in dark tones"
ref: code-was-never-the-cost
lang: en
---

<div class="act">
<div class="flow">

One word was enough. The idea that agents would rewrite every piece of software circulated for a few days, and roughly a trillion dollars of market value evaporated. Not after a demo, not after a benchmark. On the strength of a few repositories published on GitHub and the sudden, shared conviction that the software we had been buying could now be produced on demand.

You can call the reaction excessive. It is mostly revealing: an entire market had just settled an engineering question by reflex, without once looking inside the software in question.

</div>

{% include talk/chart-line.html
   points="60,34 175,44 290,50 400,148"
   labels="2023,2024,Jan 26,Feb 26"
   len="560"
   crash="true"
   crashnote="≈ $1T wiped out"
   alt="SaaS vendor valuation index: broadly flat from 2023 to January 2026, then a sharp drop in February 2026."
   caption="The technology had not moved. The belief about the technology had." %}

<div class="flow">

There is a serious question underneath, and it deserves better than a panic. I lived it from the inside, on a data team that spent three years doing exactly what the thesis predicts: automating its own work. Here is what we found.

## Doing more with less

The team went from six people to two. This was not a layoff; it was a run of ordinary departures, each time raising the same question: do we backfill?

The answer was always no. Not because budgets were tight, but because the departing person's work was already largely automated. What remained redistributed itself without pain among those who stayed, who became full stack out of necessity more than ambition: data engineering, then data science, then analytics engineering.

</div>

{% include talk/dual-axis.html
   bars="44:92:34:74,119:56:34:110,194:74:34:92,269:110:34:56,344:128:34:38"
   line="61,158 136,152 211,140 286,96 361,28"
   labels="yr 1,yr 2,yr 3,yr 4,yr 5"
   len="500"
   legend_bars="Team size"
   legend_line="Automation level"
   alt="Bars showing team size shrinking year over year while the automation curve rises steeply."
   caption="Headcount divided by three, automation multiplied by two hundred." %}

<div class="flow">

That curve is a comfortable one to show. It tells the story of a team absorbing pressure without breaking, and that is true. But it dodges the only question that matters, the one an audit put to us directly and for which we had no ready answer.

**What did we do with the time we freed up?**

## Where the time went

Before, most of our days went into writing code and keeping the stack running. That block collapsed, and it is worth being precise about what happened: this is not time returned, it is time moved.

</div>

{% include talk/bars-split.html
   label_a="Before"
   label_b="Today"
   a="Spec 20:20:spec,Code / Run 60:60:code,Review 20:20:review"
   b="Spec 40:40:spec,8:8:code,Review 22:22:review,Agent configuration 30:30:value"
   legend="Specification:spec,Code &amp; run:code,Review:review,Agent configuration:value"
   caption="The block that vanishes does not free up time. It pushes it upstream." %}

<div class="flow">

Specification doubled. And more importantly, a category appeared that had not existed three years earlier: configuring agents, what we now call context engineering. Describing the domain, setting the rules, documenting the traps, deciding what should be automated and what should not.

That work is entirely new, and it is irreducibly human. An agent cannot decide on your behalf what your company needs to know.

## The temptation

Then comes the moment when the market's thesis knocks on your door, and it is seductive.

Since agents write the code, why pay a licence for an ingestion tool? Build your own connectors, swap a recurring expense for tokens, cut the bill tenfold. We considered it seriously. We even built the proof of concept.

It worked. That matters, because what follows is not "it doesn't work".

Before replacing a connector, you have to know what is inside one.

</div>

{% include talk/chips.html
   items="Rate limiting,Pagination,Cursors,Schema drift,Incremental loads,Authentication,Secret rotation,Backfill,Idempotency,Error recovery,Type handling,Observability"
   caption="Inbound or outbound: the same problem, twelve times over." %}

<div class="flow">

An agent writes each of these without much trouble. None is a research problem. Taken one at a time, they are exercises solved twenty years ago.

But that is not the question. The question is what happens on the Tuesday the upstream API changes without warning, when the date format becomes a timestamp, when the pagination cursor stops being stable. On that day someone has to understand, fix, redeploy and backfill. That someone has a name, a salary and a sleep schedule.

**Writing was never the cost. The cost is being answerable for the result.**

## What the firm actually buys

</div>

<div class="flow">

In 1937, Ronald Coase asked a question nobody took seriously: if markets are efficient, why do firms exist at all? Why not simply buy each task from a supplier, at market price, whenever you need it?

His answer rests on one idea: **transaction costs**. Using the market is never free. You have to find the supplier, negotiate, write the contract, monitor performance, handle disputes. A firm internalises an activity when those costs exceed the cost of doing it in-house, and outsources when the reverse holds. The boundary of the firm is drawn exactly where the two balance.

That framework is the real name of the build-or-buy dilemma, and it explains why the market's reasoning last February was wrong. The implicit thesis was: agents collapse the cost of producing software, therefore the boundary shifts massively toward build.

But production cost was never the binding constraint. What you buy from a vendor is not the favour of not writing the code. It is the transfer of an obligation: that it will work tomorrow, that it will be compliant, that someone picks up the phone at three in the morning. Coase called these monitoring and enforcement costs, and agents do not touch them.

Rewriting your connectors with an agent does not remove the transaction. It repatriates it inside the firm, where it becomes a coordination cost that shows up on no budget line.

</div>

{% include talk/stack-sticky.html
   steps="The starting stack :: Ingestion, warehouse, transformation, orchestration, reporting. Nothing exotic, and that is the point: each brick does one thing and does it well.|
          Delegating the run :: The first trade-off was not about ingestion but about reverse ETL. In-house scripting cost time and produced no differentiating value. Nobody ever won a customer because their CRM push was hand-rolled.|
          The agent enters the stack :: This is where the temptation becomes concrete. The tool that writes the code is now in the room, and rewriting everything yourself is no longer theoretical.|
          And yet :: The replacement did happen. But we did not replace a vendor with an agent: we replaced a vendor with another vendor, then folded the second into the first. The move ran opposite to the prophecy." %}

<div class="flow">

## The price you pay

It would be dishonest to stop there. Choosing to buy with eyes open is not the same as pretending it is comfortable.

Usage-based pricing is hard to control: it tracks active data volume, a quantity that moves without you deciding it. It has a knock-on effect on downstream warehouse spend. Support is adequate, no more. And there is the question that returns at every renewal: are we paying a lot for a platform we only partly use, since transformation happens elsewhere?

The number that stings most is the consolidation. Bringing both tools under one vendor, which was the rational call on every other criterion, hit the invoice directly.

</div>

{% include talk/stat.html
   value="×3"
   label="the bill, after consolidation"
   sub="A decision can be right operationally and expensive budget-wise. Both things are true at once, and you should be able to say so." %}

<div class="flow">

That figure is the strongest argument for building, and I put it up front rather than bury it. Arbitrating seriously means putting both columns side by side, including when yours is less flattering than you hoped.

## What agents solve, and what remains

</div>

{% include talk/verdict.html
   title_a="What agents solve"
   title_b="What remains"
   a="Writing the code,The first draft,Baseline functional fit,Time to market"
   b="Maintenance &amp; run,Vendor lock-in,Security &amp; compliance,Accountability"
   caption="The left column fills fast. The right one takes its time, and that is the message." %}

<div class="flow">

The left column is real, and denying it would be silly. Agents write the code, produce the first draft, shorten time to market. On those four counts, the promise holds.

So what?

What remains is everything else. Maintenance and run, which cannot be delegated to the thing that wrote the code. Lock-in, which does not disappear but changes creditor: you are no longer captive to a vendor, you are captive to your own code, written fast, understood by nobody, whose author remembers none of it. Security and compliance, which demand a chain of responsibility no model can hold.

And above all that last word, which carries the rest: accountability. Building a platform is a role. Keeping it in operational condition is another. Neither is replaced by a capacity to generate.

## A debt in place of an expense

</div>

<div class="flow">

If data teams believe they can replace their tooling catalogue by swapping licence costs for token costs, they are not making a saving. They are trading a legible, predictable, negotiable expense for a debt whose interest only surfaces at the moment of default: on a Tuesday, when the API changes.

It is a replacement that creates more complexity than it removes, and there is no value in doing it for its own sake.

Buying still holds in an agentic world, and it stays value-driven. The question was never whether we *can* produce the software. Coase had already written it: the boundary of the firm is not drawn where its competence ends, but where the cost of coordinating exceeds the cost of buying. Agents collapsed the cost of writing. They did not touch the cost of answering for what is written.

Believing that producing more code will get us out of the problem is, once again, a definition problem: of what we need, and of what we want these tools to do.

We can generate things endlessly. It still has to be good for something.

</div>
</div>
