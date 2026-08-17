---
layout: post
title: "Amodei answers, and talks about something else"
date: 2026-08-17
categories: [ai, governance, ethics]
excerpt: 'Six months after Claude''s Constitution, Dario Amodei finally sets out his position. He concedes that AI concentrates power by nature, then offers only safety instruments where the question is about values.'
header_image: "https://images.unsplash.com/photo-1643804926339-e94f0a655185?w=1600&q=80"
header_image_alt: "Trousseau de clés posé sur une table en bois sombre patiné"
header_image_credit: "Filip Szalbot"
header_image_credit_url: "https://unsplash.com/@fess0"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: amodei-repond-et-parle-dautre-chose
lang: en
---

At 12:44 in the morning on 16 August 2026, Dario Amodei posted two tweets running to about a thousand words. He opens by almost apologising for being there at all, noting that he doesn't usually spend much time on social media. Six million views later, we have the most detailed answer Anthropic's chief executive has given his critics, and it repays a careful read.

Back in February I wrote a short piece about Claude's Constitution, the document that sets the moral values of the agent I work with every day and that nobody consulted me about. My question was four words long, and I'll ask it again here. Who writes that text?

Amodei wasn't answering me but the investor Gavin Baker, who had accused him of two things. Talking too darkly about AI, and pushing a form of regulation that would concentrate power in a handful of laboratories. The reply is honest, and on two points it is genuinely disarming. It simply addresses a problem that isn't mine.

## What he concedes

Start with the admission that ought to settle the argument about concentration, since it comes from him. "AI is structurally a technology that tends to concentrate power, for reasons that have nothing to do with regulation." He points at the scaling laws, the economic fact that a better model needs more compute, therefore more capital, therefore fewer players able to stay in the race.

That concession costs him something, and it is worth measuring what. Baker's charge was that regulation creates the concentration, and Amodei answers that the concentration would exist without it. He adds that open-weight models barely change the picture, since they shift power towards whoever owns the most chips, which means the same frontier labs plus a few hardware makers.

He then concedes something rarer in this industry. "By far the most accurate criticism of AI companies including Anthropic is that we haven't yet delivered on our big promises to benefit the world. That is totally on us." He mentions in passing that he lost his father to Hepatitis C a few years before the arrival of the treatment that now cures ninety-five per cent of patients, which lends his next sentence a weight no argument could have manufactured. A communications campaign will not win back public trust, because "saying that AI will cure cancer is more a cliche than it is inspiring". What will work, he writes, is actually curing cancer.

From where I stand this is the strongest part of the thread. He refuses the escape into marketing, he names his debt and he accepts being judged on results rather than intentions.

## What he installs

The question is what he proposes to protect the house with, and that is where our paths part. Amodei argues for pre-deployment testing of frontier models, revenue thresholds that exempt smaller players, a modulated release pace for the best models and a supervisory body modelled on America's FINRA.

He defends the idea with an argument I find sound, and one Silicon Valley rarely hears out. The shorthand that treats all regulation as regulatory capture is too simple a picture of the world, because "at their best, institutions can vest power in ideas rather than people, and thereby decentralize that power". His example is the courtroom, which can feel stuffy and elitist yet defends a vulnerable individual's rights far better than mob justice does.

He even offers checkable evidence of good faith, which is more than most of his opponents bring. California's SB53, which Anthropic supported, exempts any company below five hundred million dollars in revenue, so it binds Anthropic and leaves its smaller rivals alone. On SB 1047 the company objected that the threshold sat too low. The tests he presses for with American authorities are stricter for frontier models than for those trailing behind. His own summary of all this is blunt, since it "hurts the business interests of the frontier labs and helps challengers".

So the alarm is a serious one, calibrated by someone who accepts that it will ring in his own house first.

## What he leaves out

An alarm guards against a break-in, though, and says nothing about who holds the keys. Every instrument Amodei proposes addresses a model's dangerous capabilities, meaning what it might do catastrophically in cyber, biological or alignment terms. None of them touches the ordinary judgements that same model makes millions of times a day.

No regulator, existing or proposed, will rule on how an agent handles blasphemy, assisted dying or equality between men and women. A FINRA-style body will test capabilities rather than values, and it will do so as sectoral self-regulation, which amounts to having the text approved by a club of its own authors. Those judgements stay where they have always been written, inside a sociologically narrow circle, and that is what genuinely bothers me.

Let me be clear about what this charge is not, because it is often misread. I suspect nobody of bad faith and I don't claim Anthropic's text is a poor one, since it is probably better than most of what exists. The trouble sits elsewhere, in the way a closed circle produces blind spots that its own sincerity cannot detect. I used two historical examples in February and would rather point back to them than plant an analogy here that would drag the argument somewhere else.

## The panel nobody institutionalised

Someone will object that Anthropic has already run this experiment, and the objection is fair. In 2023 the company ran a deliberative constitution project with the Collective Intelligence Project, gathering around a thousand people on a polling platform, one thousand one hundred and twenty-seven proposed principles and thirty-eight thousand votes. The resulting text was published, compared clause by clause against the internal constitution and actually used to train a model. It was real, documented and commendable.

Except that those thousand people were all American, and widening a circle does not de-provincialise it. A user in Senegal, Japan or rural Poland still deals with an agent whose moral frame was set somewhere else, and the panel simply made that somewhere else more crowded without moving it.

The troubling part is not that Americanness, because the experiment happened, it revealed divergences from the internal text, and the Constitution published in 2026 was still written in-house with expert consultation. Public deliberation was therefore tested and then dropped as a mechanism, which is more awkward than never having tried, because nobody can plead ignorance about what it would have cost.

## The scale we look at least

The debate runs at laboratory height, which hides the place where the problem bites hardest and is governed least. When a company deploys an internal agent, somebody writes its system prompt, and every line of that prompt is a normative decision dressed up as a technical choice. Writing that the agent must not criticise the company's products is a communications decision, and having it redirect every sensitive question to human resources is a governance decision.

In most deployments I have seen, the data or engineering team makes the call, without a mandate to do so, without procedure and sometimes without a trace. The employee talking to that agent has no idea which instructions shape the answers coming back, and nobody governs that asymmetry. Here the constitutional comparison stops being a figure of speech, because an employee cannot switch agents the way I can switch models.

We worry a great deal about interference from outside. This one is internal, invisible and daily, and none of the institutions Amodei proposes reaches down to that level.

## Three questions, unmoved

So I stand by February's questions, which this thread has not shifted an inch.

Do we accept that a normative text shaping the interactions of hundreds of millions of people gets written without any democratic process? Inside a company, who should hold the legitimacy to configure the moral frame of an agent every employee uses? And what legal framework covers conversational logs, that seam of personal data of unprecedented intimacy?

One objection surfaces every time I ask the second, and it comes from people who lived through the thing. Internal democracy has been tried, it was called holacracy, and Zappos lost eighteen per cent of its workforce to it while Medium abandoned it explaining that too much time went into deciding how to decide. The objection is solid, and it misses, because it answers the question of representation when I am asking about procedure. I am not calling for a circle that votes on the system prompt, I am asking that the prompt be published to the employees who talk to the agent, that a refusal be contestable with someone identifiable and that changes leave a dated trail. Publicity of the norm, a right of appeal and traceability, which is to say ordinary administrative law, and nobody has ever mistaken data protection law for holacracy.

## What neither of us is asking

One question this thread made visible was absent from my February piece too, which makes it more interesting than anything above. Amodei asks who tests the model's capabilities, I ask who writes its values, and neither of us asks who verifies that the deployed model actually honours the published text.

An AI constitution is not a law that gets applied but a piece of training data one hopes will shape a behaviour. Anthropic itself cannot demonstrate that Claude conforms to it, and nobody currently holds an instrument to measure that from outside. This changes the nature of my own complaint, because a check on the drafting of an unverifiable text would be theatre, a room where people argue at length about the keys to a lock nobody has ever tried.

The question is no longer only who writes the constitution of machines, but whether that text governs anything at all.
