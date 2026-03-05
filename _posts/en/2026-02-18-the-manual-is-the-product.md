---
layout: post
title: "The Manual Is the Product"
date: 2026-02-18
categories: [ai, work, organizations]
excerpt: "AI collapsed the cost of generating code. It didn't touch the cost of knowing what to build or verifying it was built right. The bottleneck moved from execution to specification, and from a place with review rituals to a place with none."
header_image: "https://images.unsplash.com/photo-1527689638836-411945a2b57c?w=1600&q=80"
header_image_alt: "Child building with Lego bricks while following an instruction manual"
header_image_credit: "Kelly Sikkema"
header_image_credit_url: "https://unsplash.com/@kellysikkema"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: the-manual-is-the-product
redirect_from:
  - /2026/02/18/the-manual-is-the-product/
lang: en
---

A Lego Technic car contains a thousand pieces, yet a ten-year-old can build it, not because they understand engineering, but because the manual carries all the intelligence in sixty pages of step-by-step clarity that leave no room for ambiguity or interpretation.

Now remove the manual, and the experience changes. The pieces don't change, and neither does the photo on the box, but you'll only get something approximate, four wheels at best. "Roughly" and "the exact model on the box" are different universes, and that is precisely what is happening in software development now that AI generates code on demand.

## Code generation costs tend toward zero. Validation doesn't.

In "[Execution Is No Longer the Constraint](/en/2026/01/21/execution-is-no-longer-the-constraint/)," I argued that coding, analyzing, and designing stopped being the bottleneck. AI collapsed the cost of *generating* code, in time and money. What I didn't say clearly enough is that when generation gets cheap, the only things that remain expensive are knowing *what to build* and verifying *that what was built is right*.

A vague plan fed to a powerful AI agent yields mediocre output, but a precise plan fed to an average AI agent converges. The bottleneck moved from the hands to the document that guides them.

But here's the trap. Just because code is cheap to generate doesn't mean it's cheap to trust. The database migration, the users in production, the third-party contract, and the state don't regenerate. Generation dropped toward zero, but validation didn't. Conflating the two is how you build something fast that breaks everything slow.

## Braid, or why iterating forward is the wrong instinct

If generation is cheap but validation isn't, what does the right workflow look like? A video game from 2008 offers a surprisingly precise metaphor.

*Braid* redefined what a video game could say. The core mechanic is rewinding time. Make a mistake, and the world unspools backward. But certain objects, glowing green or gold, resist the reversal and stay put while everything else rewinds. The game's puzzle design lives in the tension between what you can undo and what you can't.

{% include youtube.html id="uqtSKkyJgFM" %}

Software development works the same way, because the traditional approach is forward-only. You lay the foundation, add walls, apply patches, then more patches. Technical debt isn't a bug; it's the natural consequence of building forward without ever fully going back.

AI agents don't work that way. Give them a better plan, and they don't patch, they rebuild. You can rewind a feature, a component, or an entire module, adjust the spec, and regenerate. It's a daily gesture, not an architectural fantasy.

The reason this works better than iterating is counterintuitive, because the more you iterate on an AI agent's output, the more hallucination accumulates, and each pass drifts further from the intent. Going back to the spec and regenerating resets the drift, because patching compounds error while rewinding flattens it.

In Braid, you don't rewind because you failed, but because *you learned something*. That's exactly what happens when you refine a spec after seeing what it produced. You lose the output, but you keep the insight.

But not everything rewinds. In software, those glowing objects are your data, your users, your integrations, and your state. You can regenerate the code, but you can't regenerate what the code has already touched. Knowing where those boundaries are is what separates someone who uses AI agents from someone who understands them.

## The real danger: the assembly line has no opinion

If the manual is the product, then the manual concentrates all the power. And concentrated power without feedback loops is how you build systems that look perfect and drive off a cliff.

When a human builds by hand, friction creates checkpoints. You notice something's off when the bolt doesn't fit, when the test fails in a way you didn't expect, when the interface feels wrong under your fingers. The resistance of the material talks back, and while it's slow and expensive, it's also a safety net.

When an AI agent builds, there is no friction. If the plan says the car has three wheels, you get a beautifully engineered three-wheeled car, with no complaint and no resistance. The output *looks right*, compiles, and passes the tests the plan told it to write.

We moved the bottleneck from execution to specification, and in doing so, we removed the very feedback loops that used to catch bad specifications. The builder used to be a check on the architect, but now the builder says yes to everything.

## The loop, not the line

So what checks the spec? The real does.

The manual says "attach piece 47B," but you open the bag and there is no piece 47B, and the real just said no. Sometimes it's a missing piece, sometimes it's a user clicking where no one expected, and sometimes it's a database that won't migrate because the data doesn't match the schema the spec assumed.

The collision is always the same shape. The spec said X, and the world said no. And the instinct (the wrong one) is to patch the output. The right move is to go back to the spec and ask: *why did I think piece 47B existed?*

You don't start with a perfect spec, you arrive at one through collision with reality. You write a vague prompt, the AI agent gives you something back, and seeing it tells you something you couldn't have articulated before. The spec isn't the input, it's what emerges when intent meets resistance.

**Spec → build → reality → spec.** This loop isn't new, since design thinking has always followed the same cycle of prototyping, testing, and iterating. What's new is the cost of the prototype. When it takes three weeks, you get four loops per quarter and you'd better aim well. When it takes three minutes, you get forty loops per day, and the loop stops being a validation process to become a way of thinking. That's not a difference of degree, it's a change of regime.

You iterate on the manual, not the car, and the manual evolves every time the real talks back. The courage this requires isn't technical, it's the willingness to throw away a build that works and rewrite the spec that produced it, because "works" and "right" aren't the same thing.

Some go further and bypass the spec entirely. They prompt by instinct, unfiltered, and let the AI agent produce whatever it understands from the raw intent. The prompt becomes the spec, the spec becomes the product, and the letting go is total. It's a [gesture artists know well](/en/2026/01/12/what-artists-know-about-ai/), but applied to production software, it demands a safety net nobody has strung yet.

## The missing check

Code had the pull request, a structured moment where someone else looks at what you built and pushes back, but the spec doesn't have its equivalent yet. As the time spent actually writing code shrinks, even pair programming risks drifting toward the prompt. You could imagine pair prompting, two people facing the same intent, one formulating and the other challenging, but the practice doesn't exist yet.

If the manual is the product, and the assembly line never says no, then the only remaining safeguard is *other people reading the manual before it ships*, not to review the code but to challenge the intent. Who writes the spec, who challenges it, and how. That's the organizational question nobody has answered yet. The bottleneck didn't just move from execution to specification, it moved from a place with established review rituals to a place with none.

The ten-year-old can build the Lego car with a good manual. But nobody asks the ten-year-old to write the manual, especially not when the assembly line never pushes back.
