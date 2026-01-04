# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**11h.dev** is a personal notes website and blog by Alexis Blandin (alxsbn). Jekyll static site hosted on GitHub Pages.

## Development Commands

```bash
# Local development (requires Jekyll installed)
bundle exec jekyll serve --livereload

# Build site locally
bundle exec jekyll build

# Check for Jekyll config issues
bundle exec jekyll doctor
```

Deployment is automatic via GitHub Actions on push to `main`.

## Creating Blog Posts

### File Location & Naming
- Posts go in `_posts/` directory
- Filename format: `YYYY-MM-DD-title-slug-in-kebab-case.md`

### Required Front Matter
```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
categories: category1 category2
excerpt: "Short, punchy preview text"
---
```

### Key Rules
- Headings start at `##` (h2) since title is h1
- **Never use `---` separators** in article body (only in front matter)
- Excerpt must match article language (English article → English excerpt)
- Reuse existing categories: `ai`, `productivity`, `coding`, `data`, `testing`, `marketing`, `digital`, `work`, `tech`

## Claude Skills

Three skills are available in `.claude/skills/`:

| Skill | Purpose |
|-------|---------|
| `jekyll-blog-post` | Create properly formatted posts with correct front matter |
| `impactful-writing` | Polish articles for flow, punch, and impact |
| `git-branch-management` | Handle branch naming and workflows |

## Git Workflow

- **Branch naming**: `claude/<descriptive-name>-<sessionID>`
- **Main branch**: `main` (production)
- Push to feature branches, then PR to main

## Site Configuration

- **URL**: https://11h.dev
- **Theme**: Minima (auto skin)
- **Markdown**: Kramdown
- **Permalinks**: `/:year/:month/:day/:title/`

## Content Guidelines

- Primary language: English (French also accepted)
- Style: Personal, thoughtful, analytical
- Topics: AI, productivity, philosophy, technology, work culture
