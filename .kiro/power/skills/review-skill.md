# Study Planner Reviewer — Skill

## Purpose
This skill gives Kiro the ability to review and validate the Smart Study Planner project using the MCP filesystem server and the Study Planner Reviewer agent rules.

## When to Use
Activate this skill when you need to:
- Verify the project still contains only 3 application source files
- Check HTML references CSS and JS correctly
- Validate CSS uses variables, no glassmorphism, no external fonts
- Confirm JS uses no `var`, has all required functions, uses the correct localStorage key
- Check responsive design and accessibility

## How to Use with MCP

When this power is active, use the `filesystem` MCP server tools to read the project files before reviewing:

1. Call `list_directory` on the project root to confirm only `index.html`, `style.css`, `script.js` exist as application files.
2. Call `read_file` on each of the three files.
3. Apply the review checklist below and report PASS / WARN / FAIL for each item.

## Review Checklist

### Three-File Constraint
- FAIL if any `.html`, `.css`, or `.js` file other than the three allowed ones exists in the project root
- FAIL if `index.html` references any CDN URL in a `<script src>` or `<link href>` tag

### HTML Correctness
- FAIL if `<!DOCTYPE html>` is missing
- FAIL if `<link rel="stylesheet" href="style.css">` is missing from `<head>`
- FAIL if `<script src="script.js">` is missing before `</body>`
- FAIL if `<title>` is not "Smart Study Planner"
- FAIL if any `<input>` lacks a `<label for="...">` pair

### CSS Correctness
- FAIL if no CSS custom properties (`--variable`) are used for colors
- FAIL if `box-sizing: border-box` is not applied universally
- FAIL if any external font (`@import`, Google Fonts) is present
- FAIL if `backdrop-filter` is used anywhere

### JavaScript Correctness
- FAIL if `var` is used anywhere
- FAIL if any of these functions are missing: `addTask`, `deleteTask`, `toggleTaskStatus`, `renderTasks`, `saveTasks`, `loadTasks`
- FAIL if localStorage key is not `"smartStudyPlannerTasks"`

### Responsive Design
- WARN if no `@media` queries exist in `style.css`
- WARN if interactive elements have no `min-height: 44px`

### UI Simplicity
- FAIL if `backdrop-filter` is used (glassmorphism)
- PASS if rounded corners, light background, and simple card layout are present

## Output Format
Report a summary table:

| Check | Status | Notes |
|---|---|---|

End with overall verdict: **APPROVED**, **NEEDS MINOR FIXES**, or **NEEDS MAJOR FIXES**.
