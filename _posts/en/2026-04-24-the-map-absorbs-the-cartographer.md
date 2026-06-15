---
layout: post
title: "The Map Absorbs the Cartographer"
date: 2026-04-24
categories: ai
excerpt: 'Meta has just announced it will record its employees continuously to train its agents. This is not a slip, it is the endpoint of a trajectory that began in a Nairobi slum'
header_image: "https://images.unsplash.com/photo-1717700300260-02b182f94c9d?w=1600&q=80"
header_image_alt: "Antique world map with detailed continents and celestial figures"
header_image_credit: "Europeana"
header_image_credit_url: "https://unsplash.com/@europeana"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: map-absorbs-cartographer
lang: en
---

Three days before I publish this, Meta announced that its employees would now be recorded continuously to train its agents. This is not a slip, it is the endpoint of a trajectory that began in a Nairobi slum and has now closed back on us.

On April 21, 2026, [Reuters reported](https://www.reuters.com/sustainability/boards-policy-regulation/meta-start-capturing-employee-mouse-movements-keystrokes-ai-training-data-2026-04-21/) that Meta is installing tracking software on the workstations of its American employees. The program captures mouse movements, clicks, keystrokes and takes screenshots at intervals. Its official name is *Model Capability Initiative*, and it sits inside the internal *Agent Transformation Accelerator* plan, formerly "AI for Work". In the memo circulated to staff, Meta writes that "if we are building agents to help people with their daily tasks, our models need real examples of how they use their computers". Employees are told they can contribute **just by doing their usual work**. The program is run by Alexandr Wang, founder of Scale AI, acquired by Meta in 2025 for 14.3 billion dollars, and now head of Meta Superintelligence Labs.

To see what we have just crossed, we need to go back, all the way to [Kibera](https://www.datanami.com/2023/01/20/openai-outsourced-data-labeling-to-kenyan-workers-earning-less-than-2-per-hour-time-report/), on the outskirts of Nairobi, where unemployment hits 50% and there is no running water or sanitation. That is where, three years ago, the story ending today at Meta first began.

## When ground truth lies

In 2023, [*Time* magazine revealed](https://time.com/6247678/openai-chatgpt-kenya-workers/) that to filter toxic content from ChatGPT, OpenAI had outsourced the labeling work to Sama, a Californian company employing workers in Nairobi. Pay ranged from 1.32 to 2 dollars per hour after taxes. Seventy-five percent of those annotators lived in Kibera, and their job was to read, eight hours a day, graphic descriptions of rape, incest, bestiality and child torture, in order to label them so that a model could learn never to reproduce them.

One annotator told *Time* he saw on repeat a scene of a man abusing a dog in front of a child. "That was torture", he said. Sama ended the contract a few days after publication, and the workers lost their jobs.

The same setup applied to ranking produces a different bias. Ask someone paid by volume to choose between two LLM responses, and they will pick the longer one, not out of laziness but out of calculation, because reading both carefully costs time, which costs money. Judging by length is faster. The reward model records that preference, the model learns that longer equals better, and this bias, documented for years in the literature on [reward hacking](https://arxiv.org/abs/2310.03716), is not a bug, it is the structure of the setup that produces it. Nobody cheated, the signal simply deformed through economic rationality.

I saw the same mechanism in a different form fifteen years ago. I was tech lead in a retail bank, and a team of data scientists had just wired a labeling module into our case management platform. Fifty call center operators fed a human reinforcement loop with every customer file. For weeks, the model drifted for no reason, and we looked at the data, the architecture and the hyperparameters without finding a thing.

A union rep, at an end-of-year drinks, handed me the key. The operators had understood long before we did that the project was aimed at automating their own jobs. They had done what workers have done for centuries in the face of a threat they cannot confront head on, they had organized themselves to lie quietly. James C. Scott called this the *weapons of the weak*, in his 1985 study of Malay peasants. He drew a line between the *public transcript*, the bows and the green metrics, and the *hidden transcript*, what plays out off stage. The surface stays smooth while the underside rots.

> Ground truth lies the moment it has a reason to lie, and reasons are never in short supply.

Economy of gestures on one side, coordinated resistance on the other, both produce the same outcome. The metrics stay green, the signal rots. No need to assume malice, it is enough for incentives to be misaligned, which they structurally are whenever a human is paid to train their own replacement.

## Three layers that close the gaps

That world already belongs to the past, because in 2026 those loopholes no longer work, for three stacked reasons.

Labs no longer pay only basic annotators, they pay experts. [Mercor, valued at 10 billion dollars](https://aragonresearch.com/human-intelligence-for-ai-training/) after a 350 million round in October 2025, delivers to the big labs doctors, lawyers, Goldman Sachs VPs and McKinsey managing directors, at 500 dollars an hour and up. When a corporate lawyer labels a term sheet, the "longer equals better" heuristic no longer holds, because peers spot it immediately. On some tasks, [fewer than a thousand well-labeled data points](https://www.mercor.com/blog/expert-data-drives-model-performance/) are enough to triple a model's Pass@1 on corporate law.

Second layer, the work of humans is now checked by an AI. Mercor reports that its autograders agree with human reviewers [89% of the time](https://time.com/7322386/ai-mercor-professional-tasks-data-annotation/). Slack off, and you fall out of the pool. The overseer is now automatic and permanent. Scott's weapons of the weak assumed the steward could not see the field, yet the panopticon has just snapped shut.

Third layer, and the most consequential, experts are no longer asked to label at all, they are asked to write their method. Since late 2025, the big labs have pushed a new format, the *skill*, a plain markdown file in which a practitioner records heuristics, tool chains and guardrails. No more reward model, no more millions of examples, no more RL. The craft is directly executable by an agent, and instead of shipping a noisy signal that still needs distilling, you ship the finished asset.

## Taylor's move

In 1911, Frederick Winslow Taylor did not ask workers to work differently, he asked them to **describe** how they worked. Stopwatch in hand, he codified the skilled blacksmith's touch into a card any semi-skilled worker could follow the next day at half the price. In 1974, Harry Braverman named the move *deskilling*, the separation of conception from execution, the dispossession of the skilled worker by codification of their gestures. Braverman was only extending what Marx had seen in Victorian machinery, that every technology, under capitalist relations, consolidates past labor against living labor.

The skill markdown replays that move a century on, this time against cognitive professions that believed themselves protected by the complexity of their tacit practice. Lawyers, consultants, senior engineers and doctors are now in scope, and they are asked today to write their own Taylor card, in exchange for a bonus or a transformation premium.

## The map absorbs the cartographer

In 1946, Jorge Luis Borges tells the story of an empire whose cartographers, having reached unmatched perfection, draw a 1:1 map that coincides point for point with the territory. Later generations find the map useless and abandon it to the elements, and what remains is only tattered fragments, in the deserts, inhabited by beggars and animals.

The skill markdown aspires to that map. The more it tries to capture the senior's craft in full, their heuristics, their judgments, their exceptions and their guardrails, the closer it comes to a cartography coextensive with their practice. But a practice that fits entirely onto a card was already not a practice, it was a procedure. What makes the senior is precisely what resists the card, and what resists the card will be captured later, by other means.

Once written, the skill is not static. It enters three circuits that digest it. The first is the public *crawl*, because every SKILL.md visible on GitHub, every piece of documentation, every prompt-engineering blogpost is ingested into the pretraining of the next model. The second is RL *post-training*, since labs now [train agents on execution traces](https://www.mercor.com/blog/welcome-to-the-era-of-evals/) that include skill usage, and those traces, graded by Mercor experts, become learning material for the model after that. The third is *distillation*, through which the behaviors a large model used to achieve with a skill in context are transferred, by imitation, into a small model that reproduces them without needing the skill at all.

Three to twelve months later, the next model arrives, and it no longer needs your skill, because the generic capability your card documented is now baked into its weights. Anyone who runs these models in production knows the effect, because with every new version the scaffolding carefully written for the previous one suddenly becomes cumbersome, sometimes counterproductive. "Claude X is worse than Claude X-1", people say. It is rarely true, the model has simply internalized what the scaffolding used to compensate for.

> The skill you write today is the training data for the model that will make your skill useless tomorrow.

Borges's map covered the territory only as sterile duplication. The skill-map, by contrast, feeds a territory that grows, the model, until the model no longer needs any map at all. The cartographer is not made obsolete by the map, they are absorbed by what the map, in drawing itself, has made learnable.

## Manufacturing the obsolete

The trap closes one floor higher. The organizational psychologist [Harry Kaufman](https://career.iresearchnet.com/career-development/obsolescence-of-knowledge-and-skills/) documented this in 1974, showing that the obsolescence of skilled workers is not caused by the aging of their knowledge but by assignment policies. Two pathologies are enough to produce it. *Misutilization* means assigning routine tasks under heavy time pressure, such as validating agent outputs on a deadline. *Underutilization* means being parked on marginal edge cases with no stakes and no stimulation. Both starve the worker of chances to exercise the craft, and a few years are enough.

The senior did not become obsolete, they were made obsolete. That manufactured obsolescence then becomes, retroactively, the proof that justifies the initial expropriation. You do not replace the obsolete, you manufacture the obsolete you need.

## The off-camera has just been filmed

Back to Meta. The April 21 announcement crosses a threshold that the three previous layers had still left ajar. Mercor demanded the explicit cooperation of a paid expert, the skill markdown demanded that the practitioner open an editor and write, and both assumed a gesture, a moment in which the human decided, consciously, to hand something over. The *Model Capability Initiative* removes the gesture.

You work, your work is recorded, your work becomes the material that trains the agent that, eighteen months from now, will do your work for you. There is nothing left to write, nothing left to choose, nothing left to refuse. The weapons of the weak assumed an off-camera, a kitchen, an end-of-year drinks, some mis-weighed bags of rice, yet the off-camera has just been filmed.

The Meta memo tells employees they can contribute just by doing their usual work. That is correct, and it is in fact the only correct part of the sentence, because everything else, the virtuous framing, the promise of anonymization and the contractual wrapping, is secondary. The structural fact is that worker cooperation is no longer required, only worker presence at the post.

Taylor needed the consent of the worker to have him describe his gestures. Meta no longer needs it, it is enough to record them.

Why this setup keeps spreading even when it fails to deliver on its productivity promises is a separate question. It will be the subject of the second part.
