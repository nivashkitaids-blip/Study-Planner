# Requirements Document

## Introduction

The Smart Study Planner is a client-side web application delivered as exactly three files: `index.html`, `style.css`, and `script.js`. It lets students add, complete, and delete study tasks, view a progress dashboard, and persist their data across browser sessions via `localStorage`. No backend, framework, or external library is used.

## Glossary

- **App**: The Smart Study Planner web application.
- **Task**: A study item with a subject, title, due date, priority, and completion status.
- **Subject**: The academic subject the task belongs to (e.g., "Math", "History").
- **Task_Title**: The specific study topic or activity within a subject.
- **Dashboard**: The summary area showing task counts and a progress bar.
- **Progress_Bar**: A visual bar that reflects the ratio of completed tasks to total tasks.
- **Filter**: A control that limits the displayed task list to All, Pending, or Completed tasks.
- **Search**: A text input that further narrows the displayed task list by subject or title.
- **Storage**: The browser's `localStorage` API used to persist tasks between sessions.
- **Validator**: The client-side logic that checks form inputs before a task is created.
- **Renderer**: The JavaScript function that rebuilds the task list in the DOM.

---

## Requirements

### Requirement 1: Page Structure and Branding

**User Story:** As a student, I want to see a clearly titled page, so that I know I am using the Smart Study Planner.

#### Acceptance Criteria

1. THE App SHALL display the heading "Smart Study Planner" as the primary page title.
2. THE App SHALL display the subtitle "Plan your study tasks easily" beneath the heading.
3. THE App SHALL link `style.css` from `index.html` using a `<link rel="stylesheet">` element in `<head>`.
4. THE App SHALL load `script.js` from `index.html` using a `<script src="script.js">` element before `</body>`.
5. THE App SHALL use semantic HTML elements: `<header>`, `<main>`, `<section>`, `<form>`, and `<button>`.

---

### Requirement 2: Dashboard Statistics

**User Story:** As a student, I want to see a summary of my task counts, so that I can track my overall study progress at a glance.

#### Acceptance Criteria

1. THE Dashboard SHALL display the total number of tasks.
2. THE Dashboard SHALL display the number of completed tasks.
3. THE Dashboard SHALL display the number of pending tasks.
4. THE Dashboard SHALL display the completion percentage, rounded to the nearest whole number.
5. WHEN the total task count is zero, THE Dashboard SHALL display 0% completion.
6. WHEN a task is added, completed, or deleted, THE Dashboard SHALL update all statistics immediately.
7. IF a dashboard calculation error occurs, THEN THE Dashboard SHALL display an inline error message without disrupting the task list.

---

### Requirement 3: Progress Bar

**User Story:** As a student, I want to see a visual progress bar, so that I can understand my completion ratio at a glance.

#### Acceptance Criteria

1. THE Progress_Bar SHALL always display a fill width between 0% and 100% inclusive.
2. WHEN zero tasks exist, THE Progress_Bar SHALL display a fill width of 0%.
3. WHEN all tasks are completed, THE Progress_Bar SHALL display a fill width of 100%.
4. THE Progress_Bar SHALL update its fill width whenever the task list changes.
5. THE Progress_Bar SHALL display a numeric percentage label alongside the bar.

---

### Requirement 4: Add Task Form

**User Story:** As a student, I want to fill in a form to add a new study task, so that I can record what I need to study.

#### Acceptance Criteria

1. THE App SHALL display a form containing a Subject input, a Task input, and an "Add Task" button.
2. WHEN the "Add Task" button is clicked with any required field empty, THE Validator SHALL display an error message adjacent to each empty field without adding a task.
3. IF the due date is a past date, THEN THE Validator SHALL display an error message on the date field without adding a task.
4. WHEN all fields are valid, THE App SHALL create a new Task with the entered subject, title, date, and priority, and with `completed` set to `false`.
5. WHEN a task is successfully added, THE App SHALL clear the form fields.
6. WHEN a task is successfully added, THE App SHALL update the task list and dashboard immediately.

---

### Requirement 5: Task Identity

**User Story:** As a student, I want each task to have a unique identity, so that complete and delete actions target the correct task.

#### Acceptance Criteria

1. THE App SHALL assign each new Task a unique `id` at creation time.
2. THE App SHALL generate each `id` so that no two tasks created in the same session share the same `id`.
3. THE App SHALL preserve each Task's `id` unchanged after the task is created.
4. THE App SHALL use the `id` as the sole key for locating a task during toggle and delete operations.

---

### Requirement 6: Task Card Display

**User Story:** As a student, I want each task displayed as a card, so that I can see its details and act on it easily.

#### Acceptance Criteria

1. THE Renderer SHALL display each Task as a card showing the subject, title, due date, and priority.
2. WHEN the task list is empty, THE Renderer SHALL display an empty-state message.
3. THE Renderer SHALL show a "Complete" button on each incomplete task card.
4. THE Renderer SHALL show an "Undo" button on each completed task card.
5. THE Renderer SHALL apply a visual distinction (muted background and strikethrough text) to completed task cards.
6. THE Renderer SHALL display each task's priority using a color-coded badge (green for Low, amber for Medium, red for High).

---

### Requirement 7: Complete and Delete Actions

**User Story:** As a student, I want to mark tasks complete and delete them, so that I can manage my task list.

#### Acceptance Criteria

1. WHEN the "Complete" button is clicked, THE App SHALL set the task's `completed` status to `true` and re-render the task list.
2. WHEN the "Undo" button is clicked, THE App SHALL set the task's `completed` status to `false` and re-render the task list.
3. WHEN the "Delete" button is clicked, THE App SHALL remove the task from the list and update the dashboard.

---

### Requirement 8: Filter Tasks

**User Story:** As a student, I want to filter tasks by status, so that I can focus on pending or completed work.

#### Acceptance Criteria

1. THE App SHALL display filter buttons for "All", "Pending", and "Completed" above the task list.
2. WHEN a filter button is clicked, THE App SHALL mark it as active with a distinct visual style.
3. WHEN the "All" filter is active, THE Renderer SHALL display all tasks.
4. WHEN the "Pending" filter is active, THE Renderer SHALL display only tasks where `completed` is `false`.
5. WHEN the "Completed" filter is active, THE Renderer SHALL display only tasks where `completed` is `true`.
6. WHEN the active filter produces no matching tasks, THE Renderer SHALL display an empty-state message.

---

### Requirement 9: Search Tasks

**User Story:** As a student, I want to search tasks by subject or title, so that I can find a specific task quickly.

#### Acceptance Criteria

1. THE App SHALL display a text input for searching tasks by subject or title.
2. WHEN the search input value changes, THE Renderer SHALL update the displayed task list immediately.
3. THE Renderer SHALL display only tasks whose subject or title contains the search query (case-insensitive).
4. WHEN the search query is empty, THE Renderer SHALL display all tasks matching the active status filter.
5. WHEN the search produces no matching tasks, THE Renderer SHALL display an empty-state message.

---

### Requirement 10: Persist Tasks with localStorage

**User Story:** As a student, I want my tasks to be saved between sessions, so that I do not lose my study plan when I close the browser.

#### Acceptance Criteria

1. THE Storage SHALL save the full task array to `localStorage` whenever a task is added, completed, or deleted.
2. WHEN the App loads, THE Storage SHALL read the task array from `localStorage` and restore the task list.
3. THE Storage SHALL use the key `"smartStudyPlannerTasks"` for all read and write operations.
4. FOR ALL valid task arrays, serializing via `saveTasks()` then deserializing via `loadTasks()` SHALL produce a task array equal to the original (round-trip property).
5. WHEN `localStorage` is empty or the key is absent, THE Storage SHALL initialize the task array to an empty array.
6. IF the stored value cannot be parsed as JSON, THEN THE Storage SHALL initialize the task array to an empty array without throwing an error.

---

### Requirement 11: Responsive Layout

**User Story:** As a student, I want the app to work on both my phone and desktop, so that I can plan my studies on any device.

#### Acceptance Criteria

1. THE App SHALL display without horizontal scrolling at a viewport width of 320px.
2. THE App SHALL adjust the layout for mobile (320–767px), tablet (768–1279px), and desktop (≥1280px) viewports.
3. THE App SHALL center the main container on desktop viewports using a maximum content width.
4. THE App SHALL use a touch target size of at least 44×44 CSS pixels for all interactive controls.

---

### Requirement 12: Accessibility

**User Story:** As a student using assistive technology, I want the form to be accessible, so that I can add tasks with a keyboard or screen reader.

#### Acceptance Criteria

1. THE App SHALL associate every form input with a visible `<label>` using matching `for` and `id` attributes.
2. THE App SHALL allow all interactive controls to be reached and activated using the keyboard Tab and Enter keys.
3. THE App SHALL provide sufficient color contrast (minimum 4.5:1 ratio) for all text against its background.
4. THE App SHALL include a `<meta name="viewport">` tag to prevent unwanted scaling on mobile.
5. WHEN a validation error is displayed, THE App SHALL set `aria-describedby` on the offending input to reference the adjacent error message element.

---

### Requirement 13: Code Quality and Beginner Friendliness

**User Story:** As a beginner developer reviewing this project, I want the code to be clear and well-commented, so that I can understand how each part works.

#### Acceptance Criteria

1. THE App SHALL define all JavaScript functions at the top level of `script.js` so they are globally accessible.
2. THE App SHALL use a plain JavaScript object to represent each Task (no classes required).
3. THE App SHALL include JSDoc comments on every function describing its purpose, parameters, and return value.
4. THE App SHALL use descriptive variable and function names (no single-letter names outside loop counters).

---

### Requirement 14: Visual Design Constraints

**User Story:** As a student, I want a clean, simple UI, so that the app is easy to use without visual distractions.

#### Acceptance Criteria

1. THE App SHALL use rounded corners (`border-radius`) on cards, inputs, and buttons.
2. THE App SHALL use a light background color for the page body.
3. THE App SHALL use no glassmorphism effects (no `backdrop-filter`, no translucent layered backgrounds).
4. THE App SHALL use no CSS animations or transitions longer than 300ms.
5. THE App SHALL use CSS custom properties (variables) for colors to ensure a consistent palette.
6. THE App SHALL use only system fonts (no external font libraries such as Google Fonts).
