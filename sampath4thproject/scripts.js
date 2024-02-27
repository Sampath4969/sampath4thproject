const form = document.getElementById('task-form');
const taskList = document.querySelector('.task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

renderTasks();

form.addEventListener('submit', addTask);

function addTask(event) {
  event.preventDefault();
  const input = event.target.querySelector('input[type="text"]');
  const task = {
    id: Date.now(),
    text: input.value,
    completed: false
  };
  tasks.push(task);
  input.value = '';
  renderTasks();
  saveTasks();
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.add('task');
    if (task.completed) {
      li.classList.add('completed');
    }
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <button class="complete-btn">${task.completed ? 'Uncomplete' : 'Complete'}</button>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    const completeBtn = li.querySelector('.complete-btn');
    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');
    completeBtn.addEventListener('click', () => {
      task.completed = !task.completed;
      renderTasks();
      saveTasks();
    });
    editBtn.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = task.text;
      li.replaceChild(input, li.querySelector('span'));
      input.addEventListener('blur', () => {
        task.text = input.value;
        renderTasks();
        saveTasks();
      });
    });
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
      saveTasks();
    });
    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}