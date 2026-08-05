---
layout: talk-post
title: "Code was never the cost"
subtitle: "What you buy is not what you think you buy"
eyebrow: "Build · buy · agents"
date: 2026-08-04
categories: [data, ai]
excerpt: 'Agents can write connectors, and that is precisely why you should not have them write yours.'
header_image: "/apps/storydeck/assets/img/hero.jpg"
header_image_alt: "Abstract composition in dark tones"
ref: code-was-never-the-cost
lang: en
---

<div class="act" markdown="1">
<div class="flow" markdown="1">

It took only a handful of Claude files published on a GitHub repository for the panic to start. Those Skills showed that an agent could reproduce, in a few hundred lines of configuration, what vendors charge for by seat and by year, and the idea that every piece of software was now rewritable on demand circulated for a few days. The result: roughly a trillion dollars of market value evaporated.

You can call the reaction disproportionate, and it was. It is mostly revealing, since an entire market had just settled an engineering question by reflex, without once looking inside the software in question.

</div>

{% include talk/chart-line.html
   points="60,34 175,44 290,50 400,148"
   labels="2023,2024,Jan 26,Feb 26"
   len="560"
   crash="true"
   crashnote="≈ $1T wiped out"
   alt="SaaS vendor valuation index: broadly flat from 2023 to January 2026, then a sharp drop in February 2026."
   caption="The technology had not moved, only the belief about it had changed." %}

<div class="flow" markdown="1">

## What agents actually moved

Automation delivered on its promise, but not where we expected. Most of our days used to go into writing code and keeping the stack running, and that block collapsed. The temptation is to conclude that we gained time, when in fact we moved it.

In my own professional context, here is what that looks like in practice:

</div>

{% include talk/bars-split.html
   label_a="Before"
   label_b="Today"
   a="Spec 20:20:spec,Code / Run 60:60:code,Review 20:20:review"
   b="Spec 40:40:spec,8:8:code,Review 22:22:review,Agent configuration 30:30:value"
   legend="Spec with the business:spec,Code &amp; run:code,Review:review,Agent configuration:value"
   caption="The block that vanishes does not free up time, it pushes it upstream." %}

<div class="flow" markdown="1">

Specification work, the kind carried out with business stakeholders, rose sharply to the point of nearly doubling, and above all a category appeared that had not existed three years earlier. We now call it *context engineering*, and it consists of describing the domain, setting the rules, documenting the traps and deciding what should be automated as much as what should never be.

That work is entirely new and irreducibly human, because no agent can decide on your behalf what your company needs to know. This is where the freed-up time went, and it is also what makes what follows interesting.

## The temptation

When the market's thesis knocks on the door of a team that has just lived through that, it is particularly seductive.

Since agents write the code, why keep paying a licence for an ingestion tool when you could build your own connectors, swap a recurring expense for tokens and cut the bill tenfold? We considered it seriously and went as far as a proof of concept.

It worked, and that matters, because what follows is not a report of technical failure. Before replacing a connector, you still need to know what is inside one.

</div>

{% include talk/chips.html
   items="Rate limiting,Pagination,Cursors,Schema drift,Incremental loads,Authentication,Secret rotation,Backfill,Idempotency,Error recovery,Type handling,Observability"
   caption="Inbound or outbound, the same problem comes back twelve times." %}

<div class="flow" markdown="1">

An agent writes each of these without much trouble, and none of them is a research problem, since these are exercises solved twenty years ago. But that is not the question a connector poses.

The real question arrives on the Tuesday the upstream API changes without warning, when the date format becomes a timestamp and the pagination cursor stops being stable. On that day someone has to understand, fix, redeploy and then backfill, and that someone has a name, a salary and a sleep schedule.

**Writing was never the cost, because the cost is being answerable for the result.**

## What the firm actually buys

That intuition has a name, and it is older than computing. In 1937, Ronald Coase asked a question nobody took seriously, wondering why firms exist at all if markets are efficient, and why we do not simply buy each task from a supplier at market price.

His answer rests on one idea, that of **transaction costs**. Using the market is never free, since you have to find the supplier, negotiate, write the contract, monitor performance and handle disputes. A firm internalises an activity when those costs exceed the cost of doing it in-house, and outsources when the reverse holds, so the boundary of the firm is drawn exactly where the two balance.

That framework is the real name of the build-or-buy dilemma, and it explains why last February's reasoning was wrong. The implicit thesis held that agents collapse the cost of producing software, and that the boundary therefore shifts massively toward build.

But production cost was never the binding constraint. What you buy from a vendor is not the favour of not writing the code, but the transfer of an obligation, that it will work tomorrow, that it will be compliant and that someone picks up the phone at three in the morning. Coase called these monitoring and enforcement costs, and agents do not touch them.

Rewriting your connectors with an agent therefore does not remove the transaction, but repatriates it inside the firm, where it becomes a coordination cost that shows up on no budget line.

If that reasoning holds, it should show up in practice, and this is where the observation becomes awkward for the prophecy. The teams that already had agents, and therefore every opportunity to bring ingestion back in-house, did not make that move, and many did the exact opposite by consolidating with a vendor what they were still maintaining themselves.

</div>

{% include talk/counterfact.html
   title_a="The predicted path"
   path_a="Vendor licence,Agent rewrites it,In-house stack"
   title_b="The observed path"
   path_b="In-house scripts,Vendor licence,Consolidation on one"
   verdict="The replacement did happen, but it was not a vendor replaced by an agent. It was a vendor replaced by another vendor."
   caption="The real move ran opposite to the one the market had priced in." %}

<div class="flow" markdown="1">

There is nothing paradoxical about that inversion once you read it through Coase, because agents lowered the cost of writing without touching the cost of coordinating, and it is the second term that sets the boundary. What remains is what that choice costs, because it does cost something.

## The price you pay

It would be dishonest to stop at that observation, because choosing to buy with eyes open does not amount to pretending it is comfortable.

Usage-based pricing is hard to control, since it tracks active data volume, a quantity that moves without you deciding it, and it has a knock-on effect on downstream warehouse spend. Support is adequate and no more, and there is the question that returns at every renewal, that of whether we are paying a lot for a platform we only partly use, since transformation happens elsewhere.

The number that stings most remains the consolidation, because bringing two tools under one vendor, which was the rational call on every other criterion, hit the invoice directly.

</div>

{% include talk/stat.html
   value="×3"
   label="the bill, after consolidation"
   sub="A decision can be right operationally and expensive budget-wise, both things being true at once." %}

<div class="flow" markdown="1">

That figure is the strongest argument for building, and this is precisely why I put it up front rather than bury it. Arbitrating seriously means putting both columns side by side, including when yours is less flattering than you hoped.

## What agents solve, and what remains

</div>

{% include talk/verdict.html
   title_a="What agents solve"
   title_b="What remains"
   a="Writing the code,The first draft,Baseline functional fit,Time to market"
   b="Maintenance &amp; run,Vendor lock-in,Security &amp; compliance,Accountability"
   caption="The left column fills fast, the right one takes its time, and that is the whole message." %}

<div class="flow" markdown="1">

The left column is real and denying it would be silly, because agents write the code, produce the first draft and shorten time to market. On those four counts, the promise holds.

So what?

What remains is everything else, starting with maintenance and run, which cannot be delegated to the thing that wrote the code. Then comes lock-in, which does not disappear but simply changes creditor, since you are no longer captive to a vendor but to your own code, written fast, understood by nobody and whose author remembers none of it. Then come security and compliance, which demand a chain of responsibility no model can hold.

And above all that last word which carries the rest, accountability. Building a platform is one role, keeping it in operational condition is another, and neither is replaced by a capacity to generate.

## A debt in place of an expense

If data teams believe they can replace their tooling catalogue by swapping licence costs for token costs, they are not making a saving. They are trading a legible, predictable and negotiable expense for a debt whose interest only surfaces at the moment of default, which is to say on a Tuesday, when the API changes.

It is a replacement that creates more complexity than it removes, and there is no value in doing it for its own sake.

Buying therefore still holds in an agentic world, and it stays value-driven. The question was never whether we *can* produce the software, because Coase had already written it, the boundary of the firm is not drawn where its competence ends but where the cost of coordinating exceeds the cost of buying. Agents collapsed the cost of writing, without ever touching the cost of answering for what is written.

Believing that producing more code will get us out of the problem is once again a definition problem, that of what we need and of what we want these tools to do.

We can generate things endlessly, but it still has to be good for something.

</div>
</div>
