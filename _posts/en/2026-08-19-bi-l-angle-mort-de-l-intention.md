---
layout: post
title: "BI's blind spot was intention"
date: 2026-08-19
categories: [data, ai, work]
excerpt: 'For years we counted dashboard views and called it data usage. Agents finally make visible the question people were actually asking.'
header_image: "https://images.unsplash.com/photo-1565230698474-2a8a500c35cb?w=1600&q=80"
header_image_alt: "Gros plan en noir et blanc d'un œil humain dans la pénombre"
header_image_credit: "Nathan DeFiesta"
header_image_credit_url: "https://unsplash.com/@natedefiesta"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: bi-l-angle-mort-de-l-intention
lang: en
---

If you wanted to know how data was really being used inside an organisation, you used to turn to your BI usage statistics. Whatever the tool, you could pull out plenty of useful things:
* Who ran which query?
* Who exported what?
* From which card?
* In which dashboard?
* At what time?
* And so on.

The raw material looked perfect. We built rankings out of it, usage curves, leaderboards of every kind. It let us sort, archive some things, promote others, and draw a few lessons along the way.

But what were we actually learning?

Not much. Because none of it ever says why someone opened a dashboard. Not what they were looking for, not whether they found it, not what they did with it afterwards, and certainly not whether they used it well. At best we were counting clicks and calling it a need.

## The silence of the dashboard

A dashboard is a frozen answer to a question nobody will phrase the same way a few months from now. It was built one day, for one specific need, by someone who may well have left the company since.

And yes, a dashboard evolves. Every addition leaves an irreversible bias on how it can be read. Whoever opens it today takes what they find there and bends it in their head.

That bending is invisible. It happens inside someone's mind, between two tabs, in an export to a spreadsheet, in a conversation with a colleague. BI keeps no trace of it. It records the symptom and never the cause.

James C. Scott described in *Seeing Like a State* how a power that wants to administer a territory must first make it legible. It simplifies, registers, standardises. Whatever escapes that grid stops existing for it, for want of an instrument to see it.

Our BI tools did exactly that with data usage. They made legible what was countable: the view, the click, the export. The rest, which is to say intention, is quite literally invisible.

## What agents move

Let us come back to those usage metrics. Over the past few months, what I see in the field is first a shift. In a matter of months, our analysis agents go from a negligible share of queries to the vast majority. Classic BI is not being complemented, it is being replaced.

What drives that shift is not sophisticated. The agent is not brilliant, its grasp of business reality is limited, and it will sometimes get your answer wrong. But it can return data from a sentence, and above all it absorbs the effort:
* Picking the right dashboard,
* the right tables,
* the right column,
* applying the right filters,
* the right grain,
* exporting,
* cross-referencing two datasets,
* fact-checking,
* starting over because the scope was wrong,
* and so on.

All that handling work disappears behind a conversation. That is what moves usage, long before answer quality does. You do not leave a tool because another one is smarter, you leave it because it asks less of you.

The numbers I see on the ground tell the same story. Query volume per person drops sharply, while those same people work more with data. Shadow IT fades away.

And where a dashboard firing ten queries was only ever used at ten percent, the agent runs only what the question calls for.

So part of what looks like extra activity is really work coming back from exile. The analysis that used to happen off to the side, in a spreadsheet, invisible to everyone, now happens inside the system and leaves a trace there. That trace, as you will see, turns out to be gold.

## The real gain is not productivity

That new gold is **intention**. What changes is that the question is now written down and captured.

When someone asks an agent why a given metric dropped last month on a given segment, that sentence exists, it is stored, it is readable. Intention stops being an invisible mental move and becomes data like any other.

We finally know what people are looking for, in what order they look for it, and where they hit a wall. The agent can push back too, and talk with the user to frame that intention better.

We see the questions that keep coming back and deserve a model of their own. We see the ones the data cannot answer, and the ones where the agent filled the gap by making something up. Two pieces of information far more valuable than a ranking of most-viewed cards.

Because for a long time, BI showed us what people were looking at. It never showed us what they wanted to know.

## What it moves in the job

On the data side, you will have gathered that the work is no longer about building the right view.

The first taste of it was **context engineering**. How to make sure the agent has what it needs to answer correctly the first time:
* Naming objects properly
* Documenting the traps
* The right way to measure the business
* Spelling out the business rules everyone knew without ever writing them down
* And so on.

That is the expected part of the work, the part that still looks like modelling.

And now there is **intent engineering**. How to draw something durable from the corpus of intentions captured along the way.

## The intention layer emerges

Those intentions, once captured, become material. As described above, they show what people are really after, the vocabulary they use, and where they hit a wall.

What remains is to turn that into something permanent: the way we want those questions answered, and the interpretive keys an analyst takes months to acquire.

It starts upstream. A request rarely arrives complete. Someone asks you for a number when what they are really trying to do is settle a decision. Knowing that a question is too vague, and what to ask back to get at what it serves, is part of what has to be encoded.

Because the same number does not mean the same thing depending on the question asked, on the business you operate in, on a company's culture and its history.

Three small examples:
* A drop is not judged in absolute terms, but against a rolling seven-day median,
* A churn rate is unreadable unless you put the activation rate next to it,
* Some variations are so ordinary that they do not deserve a mention.

Focus, neighbourhood, threshold for mentioning: none of it can be derived from the data, or from the model behind your agent. These are business decisions, and today they live in the way a dashboard was composed, or in the way an analyst goes about their work. Two curves side by side, a rolling window, a threshold that turns red. Encoded in pixels, they stay unreadable to a machine, and they may well be lost the day their author leaves.

This already existed under another name: the specification. With the same downside every spec has, which is that it goes stale. The difference is that a versioned spec gets revised, where a dashboard simply ages in silence.

The intention layer is that spec made alive, malleable, versioned, and feeding the agent.

The semantic layer answers how much. This one answers when it is worth saying, and next to what.

Because in the end, the bottleneck is no longer producing the answer. It is framing the problem.

## Where does that leave BI?

Which brings the awkward question. If agents capture intention, produce the answer, and cost less to run, what is a BI platform still for?

I do not think it disappears. I think it changes customer. It no longer serves humans who click, it serves agents that query, and what we ask of it is no longer an interface but the ability to return the right information given the intention behind the question.

What dies is not data made presentable. It is the click too many.
