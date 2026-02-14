# Bilingual Obligation

Every post MUST exist in both languages:
- `_posts/en/YYYY-MM-DD-slug.md` (lang: en)
- `_posts/fr/YYYY-MM-DD-slug.md` (lang: fr)

Both versions share the same `ref` value in their front matter. This is how the site links them.

The French version is NOT a literal translation of the English. The English version is NOT a literal translation of the French. Each is a natural rewrite in its own language, same ideas, different phrasing, different rhythm. A native reader of either language should feel like the post was written for them.

After creating or modifying posts, run `scripts/check-bilingual.sh` to verify parity. Fix any gaps before committing.

## Simultaneous editing rule

When editing one language version of a post, ALWAYS apply the equivalent changes to the other language version in the same commit. This includes structural changes (transitions, links, references), factual corrections, added sources, and rhythm/flow fixes. Each version should be adapted naturally (not translated literally), but no version should fall behind the other. Never commit a change to only one language.

## Checklist Before Committing a Post

1. Both FR and EN versions exist with matching `ref` values
2. Front matter is complete (title, date, categories, excerpt, header_image fields, ref, lang)
3. `scripts/check-bilingual.sh` passes
4. Re-read the post against `.claude/rules/editorial/`
5. Excerpt is a real sentence, not a clickbait teaser
