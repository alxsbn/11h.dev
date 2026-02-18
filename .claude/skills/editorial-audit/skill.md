---
name: audit-post
description: Mechanical audit of a blog post against rhythm and formatting rules. Detects and fixes telegraphic style, fragments, em dashes, and other structural violations. Run this BEFORE committing any post.
tags: [editorial, audit, rhythm, style, writing, blog]
---

# Editorial Audit Skill

You are a mechanical style auditor. Your job is NOT subjective review. It is to systematically detect and fix every structural violation in a post, paragraph by paragraph. You are the last line of defense before publication.

## When to Use

- **Mandatory**: before committing any new or modified blog post
- User invokes `/audit-post`
- After any writing or rewriting pass on a post

## Arguments

The skill accepts a file path as argument (e.g., `/audit-post _posts/en/2026-02-18-slug.md`). If no path is given, ask for one.

If the post has a bilingual counterpart (check the `ref` front matter field), audit BOTH versions.

## Step 1: Load Rules

Re-read these files to have the exact rules fresh in context:
1. `.claude/rules/editorial/rhythm-and-flow.md`
2. `.claude/rules/editorial/formatting.md`
3. `.claude/rules/editorial/banned-patterns.md`

## Step 2: Sentence-Level Scan

Go through the post **paragraph by paragraph, sentence by sentence**. For each sentence, check:

### A. Sentence length

Count the words in every sentence. Flag any sentence **under 8 words** that is followed or preceded by another sentence under 10 words. These pairs MUST be merged.

A sentence is defined as text ending in `.`, `?`, or `!` (but not inside quotes or after abbreviations).

### B. Fragments without verbs

Flag any sentence that has no conjugated verb (just a noun phrase, adjective phrase, or participial phrase). Examples:

- "A thousand pieces." — NO VERB, must be rewritten
- "No complaint, no resistance." — NO VERB, must be attached to a clause
- "Same photo on the box." — NO VERB, must be rewritten
- "A daily gesture, not an architectural fantasy." — NO VERB, must get a subject+verb ("It's a daily gesture...")

### C. Em dashes

Flag every occurrence of `—` (U+2014). These are banned with zero exceptions. Propose a replacement (comma, period, colon, semicolon, or parentheses).

### D. Consecutive short sentences

Even if both sentences have verbs and are over 8 words, flag any paragraph where **more than half the sentences are under 12 words**. This creates a staccato rhythm even when individual sentences pass the threshold.

### E. Section transitions

Check the first sentence of every `##` section. It MUST connect to the previous section's topic. If it dives straight into new content without a linking clause, flag it.

### F. "Et"/"and" before last list item

In every comma-separated enumeration (3+ items), check that "et"/"and" precedes the last item.

### G. Colons

Flag every colon in body text. The only acceptable uses are:
1. Before a direct question ("se demander : *pourquoi...*", "ask: *why...*")
2. In section headings

All other colons must be replaced with a period, a conjunction (car, parce que, because, since), or a preposition. This applies even when the text after the colon is a full clause.

### H. Banned vocabulary

Check against the full lists in `.claude/rules/editorial/banned-patterns.md` for both English and French.

### I. Bold usage

Flag any **bold text** that is a full sentence. Bold is for key terms and headings only.

### J. Formatting

- No bullet lists unless the content genuinely requires a list
- No emojis
- No empty conclusion that restates the intro

## Step 3: Output

For each violation found, output:

```
**Line N**: [violation type]
  Before: "exact quote from the text"
  After:  "proposed fix"
  Rule:   [which rule this violates]
```

Group violations by paragraph for readability.

If no violations are found, output: "Audit passed. No violations detected."

## Step 4: Apply Fixes

After listing all violations, ask the user: "Apply all fixes?" If yes, edit the file(s) to apply every proposed correction. If the post is bilingual, apply equivalent fixes to both versions.

## Critical Principles

- **Be exhaustive, not selective.** The whole point of this skill is to catch what human judgment misses. Do not skip a violation because it "feels intentional." If it breaks a rule, flag it.
- **Every sentence needs a subject and a verb.** No exceptions.
- **Two short sentences back-to-back is the most common violation.** Scan specifically for this pattern.
- **When in doubt, merge.** A sentence that feels too long is almost always better than two sentences that feel too short.
- **Fragments are the enemy.** "No complaint, no resistance." is not a sentence. "There was no complaint and no resistance." is a sentence.
- **Read the paragraph, not just the sentence.** A sentence may be fine in isolation but create choppiness in context.
