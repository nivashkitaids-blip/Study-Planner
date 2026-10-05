# Steering: Vanilla HTML/CSS/JS Only

## Purpose

This steering document applies to the Smart Study Planner project. It enforces the constraint that the application consists of exactly three source files and uses no external tools or libraries.

## Rules

### File Constraint
- The application MUST consist of exactly three files: `index.html`, `style.css`, `script.js`.
- No additional application source files may be created (e.g., no `app.js`, `utils.js`, `components/`, `src/`).
- Spec and config files under `.kiro/` do not count toward the three-file limit.

### Technology Constraint
- No React, Vue, Angular, or any JavaScript framework.
- No Node.js, npm, yarn, or any package manager.
- No TypeScript — plain JavaScript only.
- No backend server, database, or API calls.
- No external CSS libraries (no Bootstrap, Tailwind, etc.).
- No external JavaScript libraries loaded via `<script src="https://...">` in the production files.
  - Exception: test-only files may load fast-check from a CDN for property-based tests.
- No build tools (no Webpack, Vite, Rollup, Parcel).

### Code Style (Beginner-Friendly)
- Use `let` and `const` — avoid `var`.
- Use plain functions (`function foo() {}`) rather than classes.
- Keep functions small and focused on a single task.
- Add a JSDoc comment above every function.
- Use descriptive names: `addTask`, `deleteTask`, `renderTasks` — not `fn1`, `x`, `tmp`.
- Use inline comments to explain non-obvious logic (e.g., ID generation strategy, event delegation).

### HTML Conventions
- Use semantic elements: `<header>`, `<main>`, `<section>`, `<form>`, `<button>`.
- Every form input must have a `<label>` with a matching `for` / `id` pair.
- The `<link>` to `style.css` goes in `<head>`; the `<script>` for `script.js` goes before `</body>`.

### CSS Conventions
- Use CSS custom properties (`--color-primary`, etc.) for the color palette.
- Use `box-sizing: border-box` universally.
- Use `system-ui, Arial, sans-serif` — no Google Fonts.
- No glassmorphism, no `backdrop-filter`, no animations longer than 300 ms.

### Opening the App
- The app MUST open correctly by double-clicking `index.html` — no local server required.
