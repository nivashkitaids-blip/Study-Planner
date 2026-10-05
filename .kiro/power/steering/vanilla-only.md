# Steering: Vanilla HTML/CSS/JS Only (Power Copy)

This is the project steering rule bundled with the Study Planner Reviewer Power.

## Rules

- Application MUST consist of exactly 3 files: `index.html`, `style.css`, `script.js`
- No frameworks, no npm, no TypeScript, no backend, no external libraries
- Use `let`/`const` only — no `var`
- JSDoc comments on every function
- System fonts only — no Google Fonts
- No glassmorphism (`backdrop-filter` is banned)
- App opens by double-clicking `index.html` — no server required

## MCP Usage

When the `filesystem` MCP server is available, use it to:
- `list_directory` the project root to check the 3-file constraint
- `read_file` on `index.html`, `style.css`, `script.js` for the review
- `get_file_info` to verify file sizes are reasonable (each under 50KB)
