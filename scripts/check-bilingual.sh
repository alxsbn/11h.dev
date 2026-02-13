#!/usr/bin/env bash
#
# check-bilingual.sh — Verify that every post exists in both _posts/en/ and _posts/fr/
#
# Compares posts by their `ref` front matter field. Any post with a ref that
# exists in one language but not the other is reported as an error.

set -euo pipefail

POSTS_DIR="${1:-_posts}"
EN_DIR="$POSTS_DIR/en"
FR_DIR="$POSTS_DIR/fr"

errors=0

# Extract ref values from front matter of all .md files in a directory
get_refs() {
    local dir="$1"
    for file in "$dir"/*.md; do
        [ -f "$file" ] || continue
        # Read ref from YAML front matter (between --- delimiters)
        ref=$(sed -n '/^---$/,/^---$/{ s/^ref: *//p }' "$file" | tr -d '"' | tr -d "'" | head -1)
        if [ -n "$ref" ]; then
            echo "$ref"
        else
            echo "WARNING: No ref found in $file" >&2
        fi
    done
}

# Build ref -> filename mappings
declare -A en_refs
declare -A fr_refs

while IFS= read -r file; do
    [ -f "$file" ] || continue
    ref=$(sed -n '/^---$/,/^---$/{ s/^ref: *//p }' "$file" | tr -d '"' | tr -d "'" | head -1)
    [ -n "$ref" ] && en_refs["$ref"]="$file"
done < <(find "$EN_DIR" -name '*.md' -type f 2>/dev/null)

while IFS= read -r file; do
    [ -f "$file" ] || continue
    ref=$(sed -n '/^---$/,/^---$/{ s/^ref: *//p }' "$file" | tr -d '"' | tr -d "'" | head -1)
    [ -n "$ref" ] && fr_refs["$ref"]="$file"
done < <(find "$FR_DIR" -name '*.md' -type f 2>/dev/null)

# Check for EN posts missing FR counterpart
for ref in "${!en_refs[@]}"; do
    if [ -z "${fr_refs[$ref]+x}" ]; then
        echo "MISSING FR: ref='$ref' exists in ${en_refs[$ref]} but has no French version"
        ((errors++))
    fi
done

# Check for FR posts missing EN counterpart
for ref in "${!fr_refs[@]}"; do
    if [ -z "${en_refs[$ref]+x}" ]; then
        echo "MISSING EN: ref='$ref' exists in ${fr_refs[$ref]} but has no English version"
        ((errors++))
    fi
done

# Summary
if [ "$errors" -gt 0 ]; then
    echo ""
    echo "FAIL: $errors post(s) missing a translation."
    exit 1
else
    echo "OK: All posts have both FR and EN versions."
    exit 0
fi
