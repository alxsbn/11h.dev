# Editorial Guidelines — 11h.dev

Read this file in full before creating or modifying any blog post.

---

## Bilingual Obligation

Every post MUST exist in both languages:
- `_posts/en/YYYY-MM-DD-slug.md` (lang: en)
- `_posts/fr/YYYY-MM-DD-slug.md` (lang: fr)

Both versions share the same `ref` value in their front matter. This is how the site links them.

The French version is NOT a literal translation of the English. The English version is NOT a literal translation of the French. Each is a natural rewrite in its own language — same ideas, different phrasing, different rhythm. A native reader of either language should feel like the post was written for them.

After creating or modifying posts, run `scripts/check-bilingual.sh` to verify parity. Fix any gaps before committing.

---

## Writing Voice

The blog's tone is conversational and opinionated. Write like you're talking to a colleague over coffee, not presenting at a conference.

- Short sentences. Direct statements. Opinions stated plainly.
- Cite concrete facts, numbers, real examples rather than vague generalities.
- If something is uncertain, say so once and move on. Don't hedge every sentence.
- Reuse the clearest word rather than cycling through synonyms.

---

## Banned Patterns — English

### Vocabulary

Do not use these words/phrases. They are AI tells:

- "landscape", "tapestry", "testament", "beacon"
- "delve", "showcase", "foster", "leverage", "navigate"
- "pivotal moment", "game-changer", "paradigm shift"
- "It's not just X, it's Y"
- "At its core"
- "In today's rapidly evolving..."
- "The future looks bright"

### Filler

Replace these with their shorter forms:

| Don't write | Write instead |
|-------------|---------------|
| In order to | To |
| Due to the fact that | Because |
| At the end of the day | (delete it) |
| It is worth noting that | (just state the thing) |
| could potentially possibly | may |

### Structure

- No rule of three: "innovation, inspiration, and insights" — pick the one that matters.
- No sycophantic openers: "Great question!", "That's a fascinating point!"
- No inflation of significance. If it's not actually revolutionary, don't call it revolutionary.

---

## Banned Patterns — French

### Vocabulary

Do not use these words/phrases:

- "il convient de noter", "force est de constater"
- "il est important de souligner"
- "dans un monde en constante évolution"
- "en effet" as a paragraph filler
- "par ailleurs" at the start of every paragraph
- "n'hésitez pas à", "il est à noter que"
- "L'avenir s'annonce prometteur"
- "révolutionnaire" (unless describing an actual revolution)

### Filler

| Don't write | Write instead |
|-------------|---------------|
| Afin de | Pour |
| Il s'avère que | (just state the thing) |
| Dans le cadre de | Dans / Pour |
| Au niveau de | (be specific) |

### Tone

- No formal vouvoiement — the blog's tone is informal (tutoiement or neutral).
- No Title Case in French titles. French capitalizes only the first word: "Le piège de l'effort", not "Le Piège de l'Effort".

---

## Formatting Rules (Both Languages)

- No excessive bold (**word**) in body text. Bold is for headings and key terms only.
- No bullet lists unless the content genuinely calls for a list. Prefer prose.
- No emojis.
- No cascading em dashes (— ... — ... —). One per sentence maximum.
- No empty conclusions that just restate the intro. If there's nothing new to say, end earlier.

---

## Checklist Before Committing a Post

1. Both FR and EN versions exist with matching `ref` values
2. Front matter is complete (title, date, categories, excerpt, header_image fields, ref, lang)
3. `scripts/check-bilingual.sh` passes
4. Re-read the post for banned patterns listed above
5. Excerpt is a real sentence, not a clickbait teaser
