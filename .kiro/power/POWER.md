# Study Planner Reviewer Power

## Overview

This Power bundles everything needed to review and validate the Smart Study Planner project:

- **Review Skill** — step-by-step checklist for validating the 3-file constraint, HTML/CSS/JS correctness, responsive design, and UI simplicity
- **Steering Rule** — enforces vanilla HTML/CSS/JS-only rules across all Kiro sessions
- **MCP Integration** — uses the `filesystem` MCP server to read project files directly during review

## What It Does

When activated, this Power enables Kiro to:

1. Use the `filesystem` MCP server to list the project root and read all three app files
2. Run the full review checklist (7 categories, PASS/WARN/FAIL per item)
3. Output a summary table and overall verdict

## MCP Server Used

**Server name:** `filesystem`  
**Tools used:**
- `list_directory` — confirm only 3 app files exist in root
- `read_file` — read `index.html`, `style.css`, `script.js`
- `get_file_info` — check file sizes

## Quick Start

To run a review, simply ask Kiro:
> "Review the Smart Study Planner project"

Kiro will use the filesystem MCP server to read the files and apply the review checklist automatically.

## Files in This Power

```
.kiro/power/
├── POWER.md                  ← this file
├── plugin.json               ← power manifest
├── skills/
│   └── review-skill.md       ← review checklist + MCP usage instructions
└── steering/
    └── vanilla-only.md       ← project constraints steering rule
```
