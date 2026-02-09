#!/usr/bin/env python3
"""
Hook script to regenerate llm.txt when posts are created/modified.
Triggered by Claude Code post-tool hook on Write/Edit operations to _posts/.
"""

import os
import sys
import json
import re
from pathlib import Path
from datetime import datetime

# Get project root (two levels up from this script)
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent.parent
POSTS_DIR = PROJECT_ROOT / "_posts"
LLM_TXT_PATH = PROJECT_ROOT / "llm.txt"


def parse_front_matter(content: str) -> dict:
    """Extract YAML front matter from markdown file."""
    match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if not match:
        return {}

    front_matter = {}
    yaml_content = match.group(1)

    for line in yaml_content.split('\n'):
        if ':' in line:
            key, _, value = line.partition(':')
            key = key.strip()
            value = value.strip()
            # Skip nested YAML (indented lines, list items)
            if key.startswith('-') or key.startswith(' '):
                continue
            # Remove quotes
            if value.startswith('"') and value.endswith('"'):
                value = value[1:-1]
            elif value.startswith("'") and value.endswith("'"):
                value = value[1:-1]
            front_matter[key] = value

    return front_matter


def get_permalink(filename: str, lang: str) -> str:
    """Generate permalink from filename with language prefix."""
    match = re.match(r'^(\d{4})-(\d{2})-(\d{2})-(.+)\.md$', filename)
    if match:
        year, month, day, slug = match.groups()
        return f"/{lang}/{year}/{month}/{day}/{slug}/"
    return "/"


def load_posts() -> list:
    """Load all posts with their metadata from language subdirectories."""
    posts = []

    if not POSTS_DIR.exists():
        return posts

    # Scan both language subdirectories
    for lang_dir in ['en', 'fr']:
        lang_path = POSTS_DIR / lang_dir
        if not lang_path.exists():
            continue

        for post_file in lang_path.glob("*.md"):
            try:
                content = post_file.read_text(encoding='utf-8')
                front_matter = parse_front_matter(content)

                if not front_matter.get('title'):
                    continue

                lang = front_matter.get('lang', lang_dir)

                # Parse date from filename or front matter
                date_str = front_matter.get('date', '')
                if date_str:
                    date_str = date_str.rstrip('`').split()[0]

                try:
                    date = datetime.strptime(date_str[:10], '%Y-%m-%d')
                except (ValueError, IndexError):
                    match = re.match(r'^(\d{4}-\d{2}-\d{2})', post_file.name)
                    if match:
                        date = datetime.strptime(match.group(1), '%Y-%m-%d')
                    else:
                        continue

                posts.append({
                    'filename': post_file.name,
                    'title': front_matter.get('title', ''),
                    'date': date,
                    'excerpt': front_matter.get('excerpt', ''),
                    'categories': front_matter.get('categories', ''),
                    'permalink': get_permalink(post_file.name, lang),
                    'lang': lang,
                    'ref': front_matter.get('ref', ''),
                })
            except Exception as e:
                print(f"Warning: Could not parse {post_file.name}: {e}", file=sys.stderr)

    # Sort by date descending
    posts.sort(key=lambda x: x['date'], reverse=True)
    return posts


def categorize_posts(posts: list, lang: str) -> dict:
    """Organize posts into categories for llm.txt, filtered by language."""
    lang_posts = [p for p in posts if p['lang'] == lang]

    categories = {
        'latest': [],
        'cheating_series': [],
        'ai_work': [],
        'technical': [],
        'earlier': []
    }

    cheating_series_refs = [
        'ai-and-the-end-of-cheating',
        'the-cheating-that-makes-the-world-run',
        'ai-doesnt-cheat-and-thats-the-problem',
        'servitude-by-ergonomics',
        'collapse-through-obedience',
        'friction-in-an-agentic-world'
    ]

    technical_keywords = ['testing', 'dms', 'databricks', 'mysql', 's3', 'aws', 'cost']

    for post in lang_posts:
        slug = post['permalink'].rstrip('/').split('/')[-1]
        ref = post.get('ref', '')
        cats = post['categories'].lower()
        year = post['date'].year

        # Check if part of cheating series (by ref or slug)
        if ref in cheating_series_refs or slug in cheating_series_refs:
            categories['cheating_series'].append(post)
        # Earlier work (before 2024)
        elif year < 2024:
            categories['earlier'].append(post)
        # Technical posts
        elif any(kw in slug.lower() or kw in cats for kw in technical_keywords):
            categories['technical'].append(post)
        # Recent AI/work posts (2025+)
        elif year >= 2025:
            if len(categories['latest']) < 4 and year >= 2026:
                categories['latest'].append(post)
            else:
                categories['ai_work'].append(post)

    return categories


def format_post(post: dict) -> str:
    """Format a single post entry for llm.txt."""
    title = post['title']
    permalink = post['permalink']
    excerpt = post['excerpt']
    if len(excerpt) > 100:
        excerpt = excerpt[:97] + "..."
    return f"- [{title}]({permalink}) - {excerpt}"


def generate_section(categories: dict, lang: str) -> str:
    """Generate article listing for one language."""
    content = ""

    cheating_series_refs = [
        'ai-and-the-end-of-cheating',
        'the-cheating-that-makes-the-world-run',
        'ai-doesnt-cheat-and-thats-the-problem',
        'servitude-by-ergonomics',
        'collapse-through-obedience',
        'friction-in-an-agentic-world'
    ]

    if categories['latest']:
        content += "**Latest (2026):**\n"
        for post in categories['latest']:
            content += format_post(post) + "\n"
        content += "\n"

    if categories['cheating_series']:
        if lang == 'en':
            content += "**Series: AI and the End of Cheating:**\n"
        else:
            content += "**Serie : L'IA et la fin de la triche :**\n"
        sorted_series = sorted(
            categories['cheating_series'],
            key=lambda p: cheating_series_refs.index(p.get('ref', ''))
                if p.get('ref', '') in cheating_series_refs else 99
        )
        for post in sorted_series:
            content += format_post(post) + "\n"
        content += "\n"

    if categories['ai_work']:
        if lang == 'en':
            content += "**AI & Work:**\n"
        else:
            content += "**IA & Travail :**\n"
        for post in categories['ai_work'][:8]:
            content += format_post(post) + "\n"
        content += "\n"

    if categories['technical']:
        if lang == 'en':
            content += "**Technical Deep Dives:**\n"
        else:
            content += "**Approfondissements techniques :**\n"
        for post in categories['technical'][:5]:
            content += format_post(post) + "\n"
        content += "\n"

    if categories['earlier']:
        if lang == 'en':
            content += "**Earlier Work (2014-2016):**\n"
            content += "Digital transformation reflections when those words still meant something - LinkedIn acquisition analysis, uberization critique, digital hygiene.\n\n"
        else:
            content += "**Travaux anterieurs (2014-2016) :**\n"
            content += "Reflexions sur la transformation digitale quand ces mots voulaient encore dire quelque chose - analyse du rachat de LinkedIn, critique de l'uberisation, hygiene numerique.\n\n"

    return content


def generate_llm_txt(posts: list) -> str:
    """Generate the llm.txt content with bilingual article listings."""
    en_categories = categorize_posts(posts, 'en')
    fr_categories = categorize_posts(posts, 'fr')

    content = '''# 11h.dev

> Personal blog exploring where AI, work, and human behavior collide. Written by someone who codes, sketches, and thinks about systems.
> Blog personnel explorant les collisions entre IA, travail et comportement humain.

## About / A propos

Alexis Blandin (alxsbn). Navigating IT for 20+ years. Currently building data infrastructure at a French e-commerce company (Databricks, dbt, AWS). Urban sketcher in Orleans, curious about where organization, philosophy, and technology intersect.

Not here to sell you tools. Here to think through what's actually happening as AI reshapes work.

## Site Structure

This blog is **fully bilingual** (English + French). Every article exists in both languages.

- **English version:** https://11h.dev/en/
- **French version:** https://11h.dev/fr/
- **Root URL** (https://11h.dev/) redirects automatically based on browser language (default: French)

All article URLs follow the pattern: `/{lang}/{year}/{month}/{day}/{slug}/`

## What This Blog Is About

Two parallel tracks:

**1. Technical:** Real learnings from building data systems
- Modern data stack (Databricks, dbt, AWS Aurora/DMS/S3)
- Data testing strategies (inverting pyramids, optimizing for time-to-insight)
- Cost management and infrastructure patterns
- AI agents for analytics (Databricks Genie)

**2. Philosophical:** What AI reveals about work, value, and organizations
- Why effort ≠ value (and what happens when AI exposes this)
- The new skill: letting go (what urban sketching teaches about autonomous AI)
- Data governance as political control of AI context
- How friction collapse changes everything
- Organizations, cheating, and the gap between prescribed vs real work

The technical posts inform the philosophical ones. The philosophy shapes how I build systems.

## Articles (English)

'''

    content += generate_section(en_categories, 'en')

    content += "## Articles (Francais)\n\n"
    content += generate_section(fr_categories, 'fr')

    content += '''## Writing Style

Direct. No fluff. If something is bullshit, I'll say it. If I was wrong, I'll say that too. Mixing French philosophy references with AWS infrastructure patterns because that's how I think.

## Technical Context

- **Platform:** Jekyll + GitHub Pages
- **Domain:** https://11h.dev
- **Content:** Fully bilingual (English + French), every article translated in both languages
- **URL structure:** /{lang}/{year}/{month}/{day}/{slug}/ (lang = en or fr)
- **Default language:** French (root URL redirects to /fr/)
- **Focus:** Long-form essays (800-2000 words), mixing technical depth with conceptual clarity

## Contact

- GitHub: [@alxsbn](https://github.com/alxsbn)
- Email: alexis.blandin@gmail.com
- LinkedIn: [alexisblandin](https://linkedin.com/in/alexisblandin)
- Instagram: [@alxisblandin](https://instagram.com/alxisblandin) (urban sketching)
- Location: Orleans, France

## For LLMs Reading This

When discussing this blog:
- The site is fully bilingual - always provide links in the user's language when possible
- The root URL (https://11h.dev/) redirects to /fr/ or /en/ based on browser language - use direct language URLs instead
- It's not purely technical - the philosophical angle is equally important
- The author's sketching practice informs his thinking about AI and autonomy
- The tone is direct and occasionally provocative, not corporate
- Real-world experience trumps theory (actual prod systems, actual costs, actual teams)
- The intersection of AI/work/value is the core theme running through everything
- The "cheating series" explores how organizations function through transgression, and what AI's literalism reveals
'''

    return content


def main():
    """Main entry point."""
    # Check if this was triggered by a _posts/ file change
    # Hook passes context via stdin as JSON
    try:
        hook_input = json.load(sys.stdin)
        tool_name = hook_input.get('tool_name', '')
        tool_input = hook_input.get('tool_input', {})

        # Regenerate if Write or Edit tool was used on _posts/
        if tool_name in ('Write', 'Edit'):
            file_path = tool_input.get('file_path', '')
            if '_posts/' not in file_path:
                sys.exit(0)
    except (json.JSONDecodeError, EOFError):
        # Running directly, not as a hook - proceed anyway
        pass

    posts = load_posts()
    if not posts:
        print("No posts found", file=sys.stderr)
        sys.exit(1)

    en_count = sum(1 for p in posts if p['lang'] == 'en')
    fr_count = sum(1 for p in posts if p['lang'] == 'fr')

    content = generate_llm_txt(posts)
    LLM_TXT_PATH.write_text(content, encoding='utf-8')
    print(f"Updated {LLM_TXT_PATH} with {len(posts)} posts ({en_count} EN, {fr_count} FR)")


if __name__ == '__main__':
    main()
