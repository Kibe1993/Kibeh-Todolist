const inputBox = document.getElementById('input-box');
const dateBox = document.getElementById('date-box');
const addBtn = document.querySelector('.add-btn');
const listContainer = document.querySelector('.list-container');
const dateContainer = document.querySelector('.date-container');
const buttonCol = document.querySelector('.button-col');
const row = document.querySelector('.row');

let todolist = JSON.parse(localStorage.getItem('todolist')) || []; 
window.addEventListener('load', () => {
  todolist.forEach(todo => addTodoToDOM(todo));
});

addBtn.addEventListener('click', () => {
  addTodo();
});

function addTodo() {
  let todo = inputBox.value.trim();
  let date = dateBox.value.trim();

  if (!todo || !date) {
    alert('No Todo Yet!');
    return;
  }

  const newTodo = { task: todo, due: date };
  todolist.push(newTodo);
  localStorage.setItem('todolist', JSON.stringify(todolist)); 

  addTodoToDOM(newTodo);

  inputBox.value = '';
  dateBox.value = '';
}

function addTodoToDOM(todo) {
  const list = document.createElement('li');
  list.textContent = todo.task;
  list.classList.add('li');

  const dueDate = document.createElement('li');
  dueDate.textContent = todo.due;
  dueDate.classList.add('li');

  const dBtn = document.createElement('button');
  dBtn.classList.add('delete-btn');
  dBtn.textContent = 'Delete';

  dBtn.addEventListener('click', () => {
    list.remove();
    dueDate.remove();
    dBtn.remove();

    todolist = todolist.filter(item => item !== todo);
    localStorage.setItem('todolist', JSON.stringify(todolist));
  });

  listContainer.append(list);
  dateContainer.append(dueDate);
  buttonCol.append(dBtn);
}

row.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('completed');
  }
});
