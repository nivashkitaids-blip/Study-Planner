# Implementation Plan: Smart Study Planner

## Overview

Implement the Smart Study Planner as three files: `index.html`, `style.css`, and `script.js`. Tasks proceed in layers — HTML shell → CSS layout → JS data model → JS logic functions → wiring and event listeners — so every step builds on the previous one and the app is always in a runnable state.

## Tasks

- [x] 1. Create `index.html` — application shell and structure
  - Create `index.html` in the project root with `<!DOCTYPE html>`, `<meta charset>`, `<meta viewport>`, and `<title>Smart Study Planner</title>`
  - Add `<link rel="stylesheet" href="style.css">` inside `<head>` and `<script src="script.js"></script>` immediately before `</body>`
  - Add `<header>` with `<h1>Smart Study Planner</h1>` and subtitle paragraph
  - Add `<main>` containing three `<section>` elements: `#dashboard`, `#add-task-section`, `#task-list-section`
  - Inside `#dashboard`: add stat `<div>` elements for total, completed, pending, percentage; add `#progress-bar-container` with `#progress-bar-fill` and `#progress-label`; add `#dashboard-error` with `role="alert"` and `aria-live="polite"`
  - Inside `#add-task-section`: add `<form id="task-form" novalidate>` with labeled inputs for subject (`maxlength="100"`), task-title (`maxlength="100"`), due-date (`type="date"`), priority `<select>` with Low/Medium/High options, and `<button type="button" id="add-task-btn">Add Task</button>`; add `<span class="error-msg">` elements with unique ids (`subject-error`, `title-error`, `date-error`) adjacent to each input; wire `aria-describedby` on each input to its error span id
  - Inside `#task-list-section`: add filter buttons (`data-filter="All|Pending|Completed"`), search input (`type="text"` `id="search-input"` `maxlength="100"` `aria-label="Search tasks"`), and empty `<div id="task-list">`
  - Use semantic HTML elements throughout (`<header>`, `<main>`, `<section>`, `<form>`, `<button>`)
  - Ensure all form inputs have `<label>` elements with matching `for`/`id` attributes
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 4.1, 12.1, 12.4_

- [ ] 2. Create `style.css` — layout, typography, and visual design
  - [ ] 2.1 Set up CSS reset, custom properties (CSS variables), and base styles
    - Define color variables: `--color-primary`, `--color-bg`, `--color-card`, `--color-border`, `--color-text`, `--color-muted`
    - Define priority badge colors: `--color-low` (green), `--color-medium` (amber/orange), `--color-high` (red)
    - Set `box-sizing: border-box` universally; set `font-family` to `system-ui, Arial, sans-serif`; set `font-size: 16px` on `body`
    - _Requirements: 14.5, 14.6_

  - [~] 2.2 Style the header and dashboard section
    - Header: centered text, background color from palette, padding
    - Dashboard: CSS Grid or Flexbox row displaying four stat boxes; each stat box with border-radius, border/shadow, padding
    - Progress bar container: full-width bar track; `#progress-bar-fill` uses `width` CSS property (set via JS), background color, border-radius, transition `width 100ms`
    - `#progress-label` positioned on or adjacent to the bar
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.4, 14.1_

  - [~] 2.3 Style the add-task form
    - `.form-group`: flex column layout, label above input, `margin-bottom` spacing
    - Inputs and select: `width: 100%`, `min-height: 44px`, `padding`, `border`, `border-radius`
    - `#add-task-btn`: minimum `44×44px` touch target, primary background color, contrasting text, `border-radius`
    - `.error-msg`: red text, small font, hidden by default (`display: none`); visible class shows it
    - _Requirements: 4.1, 11.4, 12.1, 14.1_

  - [~] 2.4 Style the task list, filter bar, search, and task cards
    - Filter bar: flex row of buttons; `.filter-btn.active` gets a distinct `background-color` different from inactive buttons
    - `#search-input`: full-width, `min-height: 44px`, `border`, `border-radius`, `padding`
    - `.task-card`: `border-radius`, `box-shadow` or `border`, `padding`, `margin-bottom`, white/card background
    - `.task-card.completed`: muted background color, `.task-title` gets `text-decoration: strikethrough`
    - `.priority-badge`: inline block, `border-radius`, padding; `.priority-low` green bg, `.priority-medium` amber bg, `.priority-high` red bg; text color meeting 4.5:1 contrast on each badge
    - `.toggle-btn` and `.delete-btn`: `min-width/height: 44px`, `border-radius`, distinct colors
    - Empty-state message: centered, muted text
    - _Requirements: 6.1, 6.5, 6.6, 8.8, 11.4, 14.1, 14.2, 14.3, 14.4_

  - [~] 2.5 Add responsive media queries
    - Mobile (320–767px): single-column layout for dashboard stats and form; full-width task cards
    - Tablet (768–1279px): two-column dashboard stats; wider form
    - Desktop (≥1280px): max-width container centered; multi-column dashboard stats
    - Verify no horizontal scroll at 320px; all text ≥ 16px body, ≥ 20px headings at all breakpoints
    - _Requirements: 11.1, 11.2, 11.3_

- [ ] 3. Create `script.js` — data model, storage, and core functions
  - [~] 3.1 Define state variables and Task typedef
    - Declare `let tasks = []`, `let activeFilter = "All"`, `let searchQuery = ""`
    - Add JSDoc `@typedef` block for the Task object: `{ id: string, subject: string, title: string, date: string, priority: "Low"|"Medium"|"High", completed: boolean }`
    - _Requirements: 13.1, 13.2_

  - [~] 3.2 Implement `saveTasks()` and `loadTasks()`
    - `saveTasks()`: serialize `tasks` array to JSON and write to `localStorage` key `"smartStudyPlannerTasks"`; wrap in `try/catch` to handle storage-full errors gracefully (display non-blocking error if write fails)
    - `loadTasks()`: read and `JSON.parse` from localStorage key; wrap in `try/catch` — on failure set `tasks = []`; if key absent initialize `tasks = []`
    - Add JSDoc comments with `@returns` and `@description`
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 13.3_

  - [ ]* 3.3 Write property test for localStorage round-trip
    - **Property 10: localStorage persistence round-trip**
    - **Validates: Requirements 10.1, 10.2, 10.3, 10.4**
    - Use fast-check to generate arbitrary Task arrays; call `saveTasks()` then `loadTasks()`; assert result is deep-equal to input

  - [~] 3.4 Implement `addTask()`
    - Read form field values (subject, title, date, priority)
    - Call validation logic: check required fields are non-empty (trimmed), check date is a valid calendar date that is today or in the future
    - On validation failure: populate error span text, set `aria-describedby` on inputs, show error spans, return early without adding task
    - On validation success: construct Task object with `id = String(Date.now()) + "-" + Math.random().toString(36).slice(2,9)`, `completed: false`; push to `tasks`; call `saveTasks()`; call `renderTasks()`; call `updateProgress()`; reset form fields and priority to "Low"
    - Add JSDoc comments; add inline comments for ID generation strategy
    - _Requirements: 4.2, 4.3, 4.4, 4.5, 4.6, 5.1, 13.3_

  - [ ]* 3.5 Write property test for task creation
    - **Property 3: Task creation preserves input data**
    - **Validates: Requirements 4.4, 13.2**
    - Generate valid subject/title/date/priority combinations; call `addTask()`; assert resulting Task has matching property values and `completed === false`

  - [ ]* 3.6 Write property test for ID uniqueness
    - **Property 4: Task ID uniqueness**
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.4**
    - Generate N (≥ 2) valid task inputs; create tasks sequentially; assert all ids are pairwise distinct using a Set size check

  - [ ]* 3.7 Write property test for form validation
    - **Property 11: Form validation rejects invalid inputs**
    - **Validates: Requirements 4.2, 4.3**
    - Generate form inputs where at least one required field is empty or date is in the past; assert `tasks.length` does not increase and error spans are visible

- [~] 4. Checkpoint — Ensure core data functions pass all tests, ask the user if questions arise.

- [ ] 5. Implement `deleteTask()`, `toggleTaskStatus()`, and `updateProgress()`
  - [~] 5.1 Implement `deleteTask(id)`
    - Filter `tasks` to exclude the task with matching `id`; reassign `tasks`; call `saveTasks()`; call `renderTasks()`; call `updateProgress()`
    - Guard: if no task with that `id` exists, no-op silently
    - Add JSDoc `@param {string} id` comment
    - _Requirements: 7.3, 13.3_

  - [ ]* 5.2 Write property test for delete
    - **Property 7: Delete removes exactly one task**
    - **Validates: Requirements 7.3**
    - Generate a task array with at least one task; pick a random id; call `deleteTask(id)`; assert the id is absent from `tasks` and all other tasks are still present

  - [~] 5.3 Implement `toggleTaskStatus(id)`
    - Find the task in `tasks` by `id`; flip its `completed` boolean; call `saveTasks()`; call `renderTasks()`; call `updateProgress()`
    - Guard: if no task with that `id` exists, no-op silently
    - Add JSDoc comment
    - _Requirements: 7.1, 7.2, 13.3_

  - [ ]* 5.4 Write property test for toggle round-trip
    - **Property 6: Toggle complete/undo round-trip**
    - **Validates: Requirements 7.1, 7.2**
    - Generate tasks with arbitrary `completed` values; call `toggleTaskStatus` twice; assert each task's `completed` value equals its original value

  - [~] 5.5 Implement `updateProgress()`
    - Compute `totalCount = tasks.length`, `completedCount = tasks.filter(t => t.completed).length`, `pendingCount = totalCount - completedCount`
    - Compute `percentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)`
    - Update DOM: `#stat-total`, `#stat-completed`, `#stat-pending`, `#stat-percentage` text content
    - Set `#progress-bar-fill` style `width` to `percentage + "%"`; set `#progress-label` text to `percentage + "%"`
    - Wrap in `try/catch`; on error display message in `#dashboard-error` without affecting task list
    - Add JSDoc comment
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 3.1, 3.3, 3.4, 3.5, 13.3_

  - [ ]* 5.6 Write property test for dashboard statistics accuracy
    - **Property 1: Dashboard statistics accuracy**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**
    - Generate random Task arrays; set global `tasks`; call `updateProgress()`; read DOM values; assert they match computed correct values

  - [ ]* 5.7 Write property test for progress bar bounds invariant
    - **Property 2: Progress bar bounds invariant**
    - **Validates: Requirements 3.1, 3.2, 3.4, 3.5**
    - Generate arbitrary Task arrays; call `updateProgress()`; read `#progress-bar-fill` width style; assert `0 <= value <= 100`

- [ ] 6. Implement `filterTasks()`, `searchTasks()`, and `renderTasks()`
  - [~] 6.1 Implement `filterTasks()`
    - Accept no parameters; use module-level `activeFilter` and `tasks`
    - Return full `tasks` array when `activeFilter === "All"`; return tasks where `completed === false` when `"Pending"`; return tasks where `completed === true` when `"Completed"`
    - Add JSDoc `@returns {Task[]}` comment
    - _Requirements: 8.3, 8.4, 8.5, 8.6, 13.3_

  - [ ]* 6.2 Write property test for filter correctness
    - **Property 8: Status filter correctness**
    - **Validates: Requirements 8.3, 8.4, 8.5, 8.6**
    - Generate task arrays with arbitrary `completed` values and each filter value; call `filterTasks()`; assert all results satisfy the predicate and none are missed

  - [~] 6.3 Implement `searchTasks()`
    - Accept no parameters; call `filterTasks()` to get the status-filtered list; further filter by `searchQuery` — include only tasks where `subject.toLowerCase()` or `title.toLowerCase()` contains `searchQuery.toLowerCase()`; return result
    - If `searchQuery` is empty, return `filterTasks()` result unchanged
    - Add JSDoc comment
    - _Requirements: 9.2, 9.3, 9.4, 13.3_

  - [ ]* 6.4 Write property test for search filter correctness
    - **Property 9: Search filter correctness**
    - **Validates: Requirements 9.2, 9.3, 9.4**
    - Generate task arrays and arbitrary non-empty query strings; set `searchQuery`; call `searchTasks()`; assert every result contains the query in `subject` or `title` (case-insensitive) and satisfies the active filter; assert no qualifying tasks are excluded

  - [~] 6.5 Implement `renderTasks()`
    - Call `searchTasks()` to get the display list
    - If list is empty, set `#task-list` innerHTML to `<p class="empty-state">No study tasks yet. Add your first task!</p>` and return
    - Otherwise, map each task to a Task Card HTML string (subject, title, date, priority badge with correct class, toggle button with "Complete"/"Undo" label based on `completed`, Delete button); set `#task-list` innerHTML
    - Add JSDoc comment; add inline comment explaining priority badge class mapping
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 8.2, 8.7, 9.5, 13.3_

  - [ ]* 6.6 Write property test for task card rendering completeness
    - **Property 5: Task card rendering completeness**
    - **Validates: Requirements 6.1, 6.3, 6.5, 6.6**
    - Generate random Task objects; call `renderTasks()` with a single-task `tasks` array; query the resulting DOM; assert subject, title, date, priority text are all present; assert toggle button label is "Complete" when `completed === false` and "Undo" when `completed === true`; assert priority badge has the correct class

- [~] 7. Checkpoint — Ensure all rendering and filter tests pass, ask the user if questions arise.

- [ ] 8. Wire event listeners and initialise the app
  - Inside a `DOMContentLoaded` event handler (or at bottom of `script.js`):
    - Call `loadTasks()`, `renderTasks()`, `updateProgress()`
    - Attach `click` listener to `#add-task-btn` → calls `addTask()`
    - Attach `click` listener on `#task-list` (event delegation) → on `.toggle-btn` click call `toggleTaskStatus(dataset.id)`; on `.delete-btn` click call `deleteTask(dataset.id)`
    - Attach `click` listener on filter buttons container → on `.filter-btn` click set `activeFilter = button.dataset.filter`; update active button class (remove `active` from all, add to clicked); call `renderTasks()`
    - Attach `input` listener on `#search-input` → set `searchQuery = event.target.value.trim()`; call `renderTasks()`
    - Ensure `#add-task-btn` and form do not cause page navigation (form uses `type="button"`, not `type="submit"`)
    - Add inline comments explaining event delegation pattern
    - _Requirements: 4.6, 7.1, 7.2, 7.3, 8.1, 8.2, 8.8, 9.1, 9.2, 13.3_

  - [ ]* 8.1 Write property test for aria-describedby on errors
    - **Property 12: Accessibility — aria-describedby on errors**
    - **Validates: Requirements 12.5**
    - Simulate form submissions with various empty fields; assert each offending input's `aria-describedby` attribute points to a visible, non-empty error span

- [~] 9. Final checkpoint — Ensure all tests pass and the app opens correctly in a browser by loading `index.html` directly (no server). Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional testing sub-tasks and can be skipped for a faster MVP build.
- Property tests use **fast-check** (no bundler needed; load from CDN in test HTML or via npm for Jest/Jasmine).
- Each property test should run a minimum of 100 iterations.
- All three files (`index.html`, `style.css`, `script.js`) live in the same directory.
- No external libraries, npm packages, or build tools are used in the production files.
- The test suite (if added) is separate from the three production files and does not affect the app's file-count constraint.

## Task Dependency Graph

```json
{
  "waves": [
    { "wave": 1, "tasks": ["1"] },
    { "wave": 2, "tasks": ["2"] },
    { "wave": 3, "tasks": ["3"] },
    { "wave": 4, "tasks": ["4"] },
    { "wave": 5, "tasks": ["5"] },
    { "wave": 6, "tasks": ["6"] },
    { "wave": 7, "tasks": ["7"] },
    { "wave": 8, "tasks": ["8"] },
    { "wave": 9, "tasks": ["9"] }
  ]
}
```
