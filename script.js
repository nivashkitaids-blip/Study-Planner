/**
 * Smart Study Planner — script.js
 * Pure vanilla JavaScript. No frameworks or external libraries.
 * Tasks are stored in localStorage under the key "smartStudyPlannerTasks".
 */

// ===== Constants =====
const STORAGE_KEY = 'smartStudyPlannerTasks';

// ===== DOM References =====
const form       = document.getElementById('task-form');
const subjectInput = document.getElementById('subject-input');
const taskInput  = document.getElementById('task-input');
const taskList   = document.getElementById('task-list');
const totalCount = document.getElementById('total-count');

// ===== In-memory task array =====
let tasks = [];

// ============================================================
// Storage helpers
// ============================================================

/**
 * Save the current tasks array to localStorage.
 */
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('saveTasks: could not write to localStorage', err);
  }
}

/**
 * Load tasks from localStorage into the tasks array.
 * Returns an empty array if nothing is stored or the data is corrupt.
 * @returns {Array} Parsed task array.
 */
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('loadTasks: could not parse localStorage data', err);
    return [];
  }
}

// ============================================================
// Task operations
// ============================================================

/**
 * Generate a simple unique ID based on the current timestamp and a random suffix.
 * This ensures no two tasks in the same session share the same ID.
 * @returns {string} A unique identifier string.
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/**
 * Add a new task with the given subject and title.
 * @param {string} subject - The academic subject.
 * @param {string} title   - The specific study task description.
 */
function addTask(subject, title) {
  const task = {
    id: generateId(),
    subject: subject.trim(),
    title: title.trim(),
    completed: false,
  };
  tasks.push(task);
  saveTasks();
  renderTasks();
}

/**
 * Toggle the completed status of a task identified by its ID.
 * @param {string} id - The unique ID of the task to toggle.
 */
function toggleTaskStatus(id) {
  const task = tasks.find(function (t) { return t.id === id; });
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

/**
 * Delete a task identified by its ID from the tasks array.
 * @param {string} id - The unique ID of the task to delete.
 */
function deleteTask(id) {
  tasks = tasks.filter(function (t) { return t.id !== id; });
  saveTasks();
  renderTasks();
}

// ============================================================
// Rendering
// ============================================================

/**
 * Update the "Total Tasks" counter shown below the form.
 */
function updateTotalCount() {
  totalCount.textContent = 'Total Tasks: ' + tasks.length;
}

/**
 * Build a single task card element for the given task object.
 * @param {Object} task - The task data object.
 * @returns {HTMLElement} The constructed card element.
 */
function buildTaskCard(task) {
  const card = document.createElement('div');
  card.className = 'task-card' + (task.completed ? ' completed' : '');
  card.setAttribute('data-id', task.id);

  // Subject label
  const subject = document.createElement('span');
  subject.className = 'task-subject';
  subject.textContent = task.subject;

  // Task title
  const title = document.createElement('p');
  title.className = 'task-title';
  title.textContent = task.title;

  // Action buttons row
  const actions = document.createElement('div');
  actions.className = 'card-actions';

  // Complete / Undo button
  const completeBtn = document.createElement('button');
  completeBtn.className = 'btn-complete' + (task.completed ? ' undo' : '');
  completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
  completeBtn.setAttribute('data-action', 'toggle');
  completeBtn.setAttribute('aria-label',
    (task.completed ? 'Undo task: ' : 'Complete task: ') + task.title);

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-delete';
  deleteBtn.textContent = 'Delete';
  deleteBtn.setAttribute('data-action', 'delete');
  deleteBtn.setAttribute('aria-label', 'Delete task: ' + task.title);

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  card.appendChild(subject);
  card.appendChild(title);
  card.appendChild(actions);

  return card;
}

/**
 * Re-render the entire task list in the DOM.
 * Uses a document fragment to minimise reflows.
 */
function renderTasks() {
  // Clear current list
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    // Show empty state
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'No tasks yet. Add one above!';
    taskList.appendChild(empty);
    updateTotalCount();
    return;
  }

  // Build all cards in a fragment
  const fragment = document.createDocumentFragment();
  tasks.forEach(function (task) {
    fragment.appendChild(buildTaskCard(task));
  });
  taskList.appendChild(fragment);

  updateTotalCount();
}

// ============================================================
// Event Listeners
// ============================================================

/**
 * Handle form submission — validate inputs, then add the task.
 * @param {Event} event - The form submit event.
 */
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const subject = subjectInput.value.trim();
  const title   = taskInput.value.trim();

  if (!subject || !title) {
    // Simple alert for missing fields (keeps the app beginner-friendly)
    alert('Please fill in both the Subject and the Study Task fields.');
    return;
  }

  addTask(subject, title);

  // Clear form after successful add
  subjectInput.value = '';
  taskInput.value    = '';
  subjectInput.focus();
});

/**
 * Event delegation: handle Complete/Undo and Delete clicks on any task card.
 * Listening on the container avoids adding individual listeners per card.
 * @param {Event} event - The click event.
 */
taskList.addEventListener('click', function (event) {
  const btn = event.target.closest('button[data-action]');
  if (!btn) return;

  // Walk up to find the card and its task ID
  const card = btn.closest('.task-card');
  if (!card) return;

  const id = card.getAttribute('data-id');
  const action = btn.getAttribute('data-action');

  if (action === 'toggle') {
    toggleTaskStatus(id);
  } else if (action === 'delete') {
    deleteTask(id);
  }
});

// ============================================================
// Initialise on page load
// ============================================================
tasks = loadTasks();
renderTasks();
