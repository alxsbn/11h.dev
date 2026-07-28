---
layout: post
title: "Build or buy: what you're buying isn't what you think"
date: 2026-07-28
categories: [data, ai]
excerpt: 'A scanner rates Fivetran 52% replaceable by a Claude Skill. The real question is the other 48%: the run, the compliance, the accountability. That is what you actually buy.'
header_image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1600&q=80"
header_image_alt: "Close-up of a yellow Lego brick on a yellow background"
header_image_credit: "Xavi Cabrera"
header_image_credit_url: "https://unsplash.com/@xavi_cabrera"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: build-or-buy-agentic
lang: en
---

February 2026. A website offers to scan any SaaS and tell you whether it is, deep down, just a markdown file in denial. I typed in fivetran.com. The verdict landed in ten seconds: **52% replaceable by a Claude Skill**.

That number stuck with me. Not the 52% the machine claims it can rewrite: the 48% it leaves in the dark. That is exactly where build or buy gets decided in the agentic era.

## The SaaSpocalypse

It all starts with the storyline we came to call the SaaSpocalypse: the idea that agents would let us rewrite all software, so buying any of it would soon be pointless. Don't downplay the effect. Valuations plunged, recklessly, on the strength (legend has it) of a few Skills published on GitHub.

{% include bob/saaspocalypse.html lang=page.lang %}

The underlying question is real: something may be changing at the core of how software gets made. The crash itself was something else, a knee-jerk reaction inflated by hype and the AI boom. Markets didn't price a risk. They panicked over a story.

## Are we all replaceable?

A story can be tested. Hence the scanner.

{% include bob/scanner.html lang=page.lang %}

So, 52%. And the diagnosis that comes with the certificate says something more interesting than the number itself: moving a database is exactly the kind of thing that makes a tool expensive. In other words, the "replaceable" half of Fivetran is code that agents know how to write. The other half is everything the scanner has no way to measure. Keep it in mind: that half is precisely what you pay for.

## Doing more with less

First, a word from the field, because this conviction doesn't come from a white paper. I write from a retail scale-up gone lean: household spending down, interest rates up, funding rounds shrinking. Flat hierarchy, just-in-time well beyond logistics, a more senior workforce, zero waste. **The hunt for growth at all costs has been chased out by profitable growth**, and that is a very different sport.

In that context, the data team went from six or seven people to two. Every departure raised the same question: do we replace them? And got the same answer: no, because automation had already absorbed the role. Those who stayed became full stack, from data engineering to analytics engineering, until an audit asked us the only question that matters: where do you put your effort to generate value?

We used to spend our time writing code and keeping the stack running. Agents and automation absorbed the departures and freed that time. **The real question is: what did we do with it?**

{% include bob/time-bars.html lang=page.lang %}

The answer fits in two words: context engineering. No more data engineering as before, no more analytics engineering as before, no more hand-built BI. Agent configuration, automation, decision support. The freed time didn't go into more code. It went into defining what the code should serve.

## One stack, five acts

That shift didn't happen overnight. You can read it in the history of our stack, like a play in five acts.

{% include bob/stack-timeline.html lang=page.lang %}

At the start: DMS, Airbyte, Databricks, dbt, Metabase. Then Census came in, then Claude Code. Then Airbyte was replaced by Fivetran. And finally Census was absorbed into Fivetran, literally: acquired, folded in. Every act is a build-or-buy decision, made under constraint, with real budgets and real short nights. That history is why the buy still stands.

## The temptation to build

Because the temptation is real, and we felt it: plug in dlt, let Claude Code craft every ETL, trade licenses for tokens. On paper, the numbers make your head spin.

![Tweet by Martin Salo: "ETL cost down 182x per month, sync time improved 10x", using Modal and dlt and dropping Fivetran for their ERP pipeline](/apps/storydeck/assets/img/tweet-salomartin.png)

We ran the POC. And to be honest: it's a very good solution. The code ships, it runs, it costs a fraction of the price.

But before signing, ask what you're actually replacing. A connector is not a script that calls an API. It's rate limiting, pagination and cursors, schema drift, incremental loads, secret rotation. Inbound and outbound, the same problem. The POC covers the first call; production is everything after it.

## First move: Census

Our first real trade-off wasn't Fivetran anyway. It was Census, to push data into the CRM. Python scripting was time-consuming and added no value. There was no credible open-source alternative: Grouparoo had just been acquired by Airbyte, and nobody could say when reverse ETL would land there. A CRM migration opened the window, and the first tier offered generous quotas for €200 a month. We even blew through them, and the Census team helped us trim consumption intelligently and get back under.

Say it plainly: we were delegating. It was neither our job nor a high-value task. That is exactly what buying is.

## Build or buy?

That left ingestion. Airbyte had served us well, but the limits kept piling up: the slowness of the open-source process, community drivers, no native Databricks destination at first (we had to push Parquet to S3, then reload everything and remodel it in dbt). And documentation so light we would read Fivetran's docs to understand Airbyte's connectors. That was before LLMs, and it remains our favorite fun fact.

So the question finally stood in the open: Airbyte, dlt, or Fivetran?

{% include bob/duel.html lang=page.lang %}

What settled it: native Databricks, 700-plus connectors, schema drift handled automatically, SLAs, a high refresh rate, and the fourteen-day free trial. That trial deserves a pause, because we played it with the business: ingest everything imaginable while the window lasts, build material for the future, and meanwhile work together to identify the data actually needed. With a bit of modeling and a bit of Claude Code, it goes fast.

The price is real, and you have to look at it straight: MAR-based billing, the impact on Databricks consumption, friction with the AWS marketplace (fixed since), support that won't win awards, and the 80/20 question: are we paying full price for a platform we only partly use, since we don't transform inside it? The Census migration nearly tripled the bill, which takes some mental gymnastics. But that price sits on an invoice. It doesn't hide in a maintenance backlog.

## The remaining 48%

Build or buy is not a new question. Coase asked it back in 1937: a firm only internalizes a function when the market sells it for more than it costs to do in-house. Agentic AI just collapsed the cost of writing code. It did not touch the cost of running it: maintenance, security, compliance, the Sunday-night pager. **Building a platform is a role. Keeping it in operational condition is another.** The scanner measures the first, never the second.

If tomorrow's data teams believe they can replace their whole catalog by trading license costs for token costs, rebuilding solutions they will then have to maintain, they are shooting themselves in the foot. That replacement creates more complexity than it removes, and delivers no value.

Buy still stands in the agentic world, and it remains value-driven. Believing that producing more code will get us out of the problem is, once again, a definition problem: of what we need, and of what we want these tools to do. We can generate things endlessly, that much is certain. It still has to serve a purpose.

Fivetran's 52%, any agent will write. The remaining 48%, nobody will ever generate for you: you either buy it, or you become it.

> [!NOTE]
> This post is adapted from a talk given at a Fivetran × Databricks meetup. The interactive deck (in French) is online: [Build, buy… or AI?](/talk/fivetran-databricks/)
