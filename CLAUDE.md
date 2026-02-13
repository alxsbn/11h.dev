# CLAUDE.md — 11h.dev

## Overview

**11h.dev** is a personal blog by Alexis Blandin (alxsbn). Jekyll static site, hosted on GitHub Pages.

## Technical Stack

- **Platform**: Jekyll static site generator
- **Theme**: Minima v2.5.1 (GitHub Pages version, not v3.x)
- **Skin**: `auto` (dark mode support)
- **Markdown**: Kramdown
- **Hosting**: GitHub Pages
- **Domain**: https://11h.dev
- **Languages**: Bilingual — French (default) + English

### GitHub Pages Constraints

GitHub Pages ships Minima v2.5.1, not v3.x.

| Feature | Minima 3.x | Minima 2.5.1 (GitHub Pages) |
|---------|------------|----------------------------|
| `custom-head.html` hook | Auto-included | Requires manual override |
| Dark mode | Built-in | Via `skin: auto` |

To include custom head content: `_includes/head.html` copies Minima's default and adds `{% include custom-head.html %}`.

## Project Structure

```
_posts/
  en/          # English posts
  fr/          # French posts
_layouts/
  home.html    # Homepage (bilingual, featured post + grid)
  post.html    # Post layout (header image, share buttons, author bio)
_includes/
  head.html          # Minima head override
  custom-head.html   # Favicon, OG tags, hreflang, Google Fonts
  header.html        # Nav, language toggle, dark mode toggle
  newsletter-form.html
  google-analytics.html
  youtube.html
_data/
  translations.yml   # UI strings (FR/EN)
assets/
  main.scss
  images/            # Post images
  alexis-photos/     # Author photos
  favicon.svg
  11h-logo.png
en/
  index.html         # EN homepage
  about.md           # EN about page
fr/
  index.html         # FR homepage
  about.md           # FR about page
scripts/
  check-bilingual.sh # Verifies FR/EN post parity
```

## Post Format

Posts live in `_posts/en/` and `_posts/fr/`. Naming: `YYYY-MM-DD-title-slug.md`.

Front matter:
```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
categories: [category1, category2]
excerpt: 'Short description for preview'
header_image: "https://images.unsplash.com/photo-XXXXX?w=1600&q=80"
header_image_alt: "Image description"
header_image_credit: "Photographer Name"
header_image_credit_url: "https://unsplash.com/@photographer"
header_image_source: "Unsplash"
header_image_source_url: "https://unsplash.com"
ref: post-slug-identifier
lang: en
---
```

- `ref`: links FR and EN versions of the same post (must match)
- `lang`: `en` or `fr`
- YAML quoting: use single quotes if excerpt contains double quotes: `excerpt: 'Be "data-driven"'`
- If it also has apostrophes, double them: `excerpt: 'It''s "data-driven"'`

## Header Images

Every post needs a header image. See `_layouts/post.html` for rendering.

| Field | Required | Description |
|-------|----------|-------------|
| `header_image` | Yes | URL (Unsplash `?w=1600&q=80`) or local `/assets/images/...` |
| `header_image_alt` | Yes | Alt text for accessibility |
| `header_image_credit` | Recommended | Photographer's name |
| `header_image_credit_url` | Recommended | Photographer's profile URL |
| `header_image_source` | Optional | Source name (e.g., "Unsplash") |
| `header_image_source_url` | Optional | Source website URL |

## Plugins

- jekyll-feed (RSS at /feed.xml)
- jekyll-seo-tag
- jekyll-sitemap
- jekyll-redirect-from

## Author

- **Name**: Alexis Blandin (alxsbn)
- **Email**: alexis.blandin@gmail.com
- **GitHub**: https://github.com/alxsbn
- **LinkedIn**: https://linkedin.com/in/alexisblandin
- **Instagram**: https://www.instagram.com/alxisblandin

## Git Workflow

- **Main Branch**: production
- **Feature Branches**: `claude/feature-name-sessionID`
- Commit with descriptive messages
- Push to feature branches before merging

## Editorial Content

**Before creating or modifying any post**, read `_posts/CLAUDE.md`. It contains:
- Bilingual obligation (every post must exist in FR and EN)
- Writing style rules and AI anti-patterns to avoid
- Tone and voice guidelines

**After creating any post**, run:
```bash
scripts/check-bilingual.sh
```
If it fails, create the missing version before committing.
