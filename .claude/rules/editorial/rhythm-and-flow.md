# Rhythm & Flow Rules

These rules are critical. Violating them is the most common failure mode.

## No telegraphic style

Do NOT write sequences of short disconnected sentences. Connect ideas with conjunctions (et, mais, car, or, because, yet), commas, semicolons, or relative clauses. Two related short sentences should almost always be merged.

**This rule has NO exceptions.** Opening paragraphs, transitions, and "punchy" passages are not exempt. Staccato rhythm is never a valid justification. "Deliberate rhetorical effect" is not an excuse.

### Heuristic

**Two consecutive sentences both under ten words must be merged.** Use conjunctions (and, but, because, yet, car, mais), commas, semicolons, or relative clauses.

**Every sentence needs a subject and a verb.** Noun phrases without a verb ("A thousand pieces.", "Same photo on the box.") are not sentences. A comma does not turn a fragment into a clause. Rewrite with a real verb: "The car contains a thousand pieces." not "A car, a thousand pieces."

The only narrow exception is a rhetorical question that opens a section, paired with its short answer ("So what checks the spec? The real does."). Everything else merges.

### Common violations and fixes

| Don't write | Write instead | Why |
|-------------|---------------|-----|
| Take a car. A thousand pieces. A child can build it. Why? The manual. | Take a car, a thousand pieces. A child can build it, because the manual carries them through. | Five fragments in a row |
| Leurs biais ne sont pas malveillants. Ils sont structurels. | Leurs biais ne sont pas malveillants, ils sont structurels. | Two short parallel sentences |
| No complaint, no resistance. The output looks right. It compiles. | ...with no complaint and no resistance. The output looks right, compiles, and... | Fragment + two short sentences |
| You don't rewind because you failed. You rewind because you learned. | You don't rewind because you failed, but because you learned something. | Two short contrasting sentences |
| The resistance talks back. It's slow and expensive. | The resistance talks back, and while it's slow and expensive, it's also a safety net. | Two short sentences about the same subject |
| Not the code. The intent. | ...not to review the code but to challenge the intent. | Two fragments posing as sentences |
| Foundation, walls, patches, more patches. | ...you lay the foundation, add walls, apply patches, then more patches. | Bare list without a verb |
| It's not technical. It's the willingness to start over. | It's not technical, it's the willingness to start over. | "It's X. It's Y." always merges |

## Section transitions are mandatory

Every new section or subsection MUST open with a transition that connects it to what came before. Never start a section by diving straight into content. A single linking sentence is enough: "Or, les vraies constitutions...", "Ce n'est pas la première fois que...", "This is not the first time...".

## "Et" / "and" before the last list item

When listing items separated by commas, always place "et" (or "and") before the last element. This is standard French/English and prevents choppy enumeration.

| Don't write | Write instead |
|-------------|---------------|
| X, Y, Z | X, Y et Z |
| Aucune société consultée, aucun mécanisme, aucune représentation. | Aucune société consultée, aucun mécanisme et aucune représentation. |

## Prefer sentences over colons

Do not use colons in body text. Restructure using a period, a conjunction (car, parce que, because, since), or a preposition.

**The only exception** is a colon before a direct question: "se demander : *pourquoi...*", "ask: *why...*". Colons in section headings are also acceptable.

This applies even when the text after the colon is a grammatically complete clause. A colon is a shortcut; a full sentence is always clearer.

| Don't write | Write instead | Why |
|-------------|---------------|-----|
| l'outil est plus intime : un agent à qui on parle. | l'outil est plus intime. Nous sommes face à un agent à qui on parle. | Fragment after colon |
| with one difference: no correction mechanism. | with one notable difference: no correction mechanism is built in. | Fragment after colon |
| The core mechanic is rewinding time: make a mistake, and the world unspools backward. | The core mechanic is rewinding time. Make a mistake, and the world unspools backward. | Full clause, but period is clearer |
| Les LLMs ne fonctionnent pas comme ça : un meilleur plan, et ils reconstruisent. | Les LLMs ne fonctionnent pas comme ça. Avec un meilleur plan, ils reconstruisent. | Fragment + clause, use preposition |
| La raison est contre-intuitive : plus on itère... | La raison est contre-intuitive, car plus on itère... | Full clause, use conjunction |
