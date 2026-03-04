---
layout: post
title: "The armor was the wound"
date: 2026-02-03
categories: data work
excerpt: "A data team that can't prove its value will build complexity until the cost of questioning it exceeds the cost of keeping it. AI doesn't fix that. It makes the armor useless overnight."
header_image: "https://images.unsplash.com/photo-1767976517212-ab1bcb2a5a9e?w=1600&q=80"
header_image_alt: "Ruined castle with crumbling stone walls and empty towers against a winter sky"
header_image_credit: "Tanya Barrow"
header_image_credit_url: "https://unsplash.com/@tanyabarrow"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: the-armor-was-the-wound
lang: en
---

The armor was the wound. It took seven years to see it.

Not the complexity itself, not the fifty models or the pipelines or the parallel systems. Those were symptoms. The wound was this: a data team that couldn't demonstrate analytical value had reorganized itself so that the cost of auditing it exceeded the cost of keeping it. The complexity wasn't architecture. It was the price of the question nobody could afford to ask.

---

The enemy was always the same meeting. The one where a new CFO, or a sufficiently frustrated CEO, looks at the headcount, the infrastructure bill, and the list of dashboards nobody opens, and asks: what exactly does this team do? That question, asked by someone with budget authority and no sunk investment in the answer, is the only audit that matters.

The mechanism is simple. If the system takes six months to learn, the cost of replacing the team exceeds the cost of keeping it. If the pipelines only one person fully understands break at 3am, that person is not replaceable on a quarterly review cycle. If the migration from the old models to the new ones has been "in progress" for two years, the number is unjudgeable, and the team is therefore safe. Every layer of complexity added to defer the audit also deferred the moment when real analytical value could be demonstrated. The opacity that protected the team from scrutiny also protected the business from insight. Six people became a cost center not because they failed, but because they succeeded at the wrong thing: making themselves necessary through complexity rather than through judgment.

---

The double-run is where this becomes concrete. From 2023 to late 2025, we ran two parallel versions of reality at Jolimoi: the old Metabase models and the new dbt models on Databricks. The case for killing the old ones was solid by mid-2023. We kept both alive for two more years. Not out of caution. As long as the migration is in progress, the number is not yours to own. The moment you kill the old model, every discrepancy becomes your fault. The double-run wasn't technical debt. It was a hedge against the meeting.

The cost showed up where costs like this always show up: not in the infrastructure bill, but in the room where the sales dashboard said one thing and the finance dashboard said another. Two numbers for the same metric do not create confusion. They create a verdict, formed before anyone speaks. We were maintaining the complexity to protect reliability, and the complexity was destroying reliability. A defense mechanism that turns on the host is no longer a defense. It's the condition it was supposed to prevent.

---

AI doesn't fix this. It makes the armor useless.

The defense was always built on information asymmetry: the team knew the system, the business didn't, and the gap was wide enough to make auditing too expensive. What changes is the cost of penetrating that asymmetry. The audit that used to require six months of onboarding now requires an afternoon with the right tools. The moat becomes a puddle not because the water disappeared, but because the crossing got cheap. Opacity stops being a viable strategy the moment the business can see through it faster than the team can rebuild it.

This is why AI lands so differently in data organizations than the productivity narrative suggests. Two people doing what six did is the visible part. The invisible part is that two people can no longer hide behind what six built. The audit that was always the real threat is now trivially cheap to conduct. The only durable defense is the one that was never available to us when we needed it most: analytical value so evident that the question doesn't arise.

---

When the armor falls, three things can be underneath.

The first is a foundation: real analytical judgment, clean data, metrics the business trusts, and questions answered before they're asked. At Jolimoi, after the fifty models were killed, after the double-run ended, after the semantic layer went live, there was something underneath. Two people, ten analyses a day, and a business that explores on its own. The armor had been hiding a building.

The second is nothing. The complexity was not hiding analytical value but substituting for it. Removing the armor reveals the question the team was built to avoid: does this organization actually know what it wants from its data?

The third is the most common and the least discussed. The team had real value. It built real things. The judgment was there: the ability to read a business problem, form an analytical question, and return something the business hadn't thought to ask for. But that judgment had always lived inside a system so layered, so specific to its builders, that no one outside could see it operating. When the audit becomes cheap, what gets audited is not the judgment but the legibility of the judgment. A team that spent seven years building complexity as armor never built the language to make its reasoning visible. The capability exists, but the proof doesn't. In a free-audit regime, that distinction doesn't matter. Indistinguishable from the armor it replaced, the judgment goes down with the walls.

This is the case AI will surface most often, and the one that deserves the most preparation. Not because the team failed, but because it survived by the wrong means for long enough that the right means atrophied. The work now is not to remove the armor. It's to build legibility before the armor comes down on its own, and to do it knowing that the audit is no longer a threat on the horizon. It's already cheap enough to run this afternoon.
