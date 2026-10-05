# Design Document — Smart Study Planner

## Overview

A single-page client-side application delivered as exactly **three files**: `index.html`, `style.css`, `script.js`. No build step, no server, no external dependencies. Open `index.html` in any modern browser to run the app.

---

## Architecture

```
index.html  ──loads──▶  style.css   (presentation)
            ──loads──▶  script.js   (all logic)
                            │
                            ▼
                      localStorage
                  key: "smartStudyPlannerTasks"
```

All state lives in a single in-memory array (`tasks[]`) that is read from and written to `localStorage` on every change.

---

## Data Model

Each task is a plain JavaScript object:

```js
{
  id:        string,   // unique — Date.now().toString(36) + random suffix
  subject:   string,   // e.g. "Mathematics"
  title:     string,   // e.g. "Read Chapter 5"
  completed: boolean   // false = pending, true = done
}
```

---

## JavaScript Functions

| Function | Description |
|---|---|
| `loadTasks()` | Reads JSON from localStorage; returns `[]` on error |
| `saveTasks()` | Writes `tasks` array as JSON to localStorage |
| `generateId()` | Returns a unique string ID |
| `addTask(subject, title)` | Creates task, pushes to array, saves, re-renders |
| `toggleTaskStatus(id)` | Flips `completed`, saves, re-renders |
| `deleteTask(id)` | Filters task out, saves, re-renders |
| `buildTaskCard(task)` | Returns a DOM element for one card |
| `renderTasks()` | Clears list, rebuilds all cards, updates counter |
| `updateTotalCount()` | Sets `#total-count` text |

---

## UI Layout

```
┌─────────────────────────────────┐
│       Smart Study Planner       │  ← h1 (--color-primary)
│   Plan your study tasks easily  │  ← subtitle
├─────────────────────────────────┤
│  Subject  [ input            ]  │
│  Task     [ input            ]  │
│        [ Add Task ]             │
├─────────────────────────────────┤
│  Total Tasks: N                 │
├─────────────────────────────────┤
│  ┌───────────────────────────┐  │
│  │ MATHEMATICS               │  │  ← .task-subject
│  │ Read Chapter 5            │  │  ← .task-title
│  │ [Complete]  [Delete]      │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

Max-width container (600 px), centered, light `--color-bg` background.

---

## CSS Strategy

- CSS custom properties for the entire color palette.
- `box-sizing: border-box` on everything.
- System font stack — no Google Fonts.
- `@media (max-width: 479px)` stacks card buttons vertically.
- No glassmorphism, no animations > 300 ms.

---

## localStorage Round-Trip Property

`loadTasks(saveTasks())` must return an array equal to the original `tasks` array. This is verified by the property-based tests in `tests/pbt.html`.

---

## Property-Based Tests

Located in `tests/pbt.html` (exempt from the 3-file app constraint — test-only file). Uses [fast-check](https://fast-check.dev) loaded from CDN. Checks:

1. Adding a task increases count by exactly 1.
2. Deleting a task decreases count by exactly 1.
3. Completing a task sets `completed = true`.
4. Every task has a non-empty string `id`.
5. Task count never goes negative.
6. `saveTasks` / `loadTasks` round-trip produces equal arrays.
