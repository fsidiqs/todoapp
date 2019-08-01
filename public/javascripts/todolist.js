const addItems = document.querySelector('.add-items');
const todoList = document.querySelector('.todoList');
const todos = JSON.parse(localStorage.getItem('todos')) || [];

function addItem(e) {
    e.preventDefault();

    const text = (this.querySelector('[name=item]')).value;
    const todo = {
        text,
        done: false
    }
    todos.push(todo);
    populateList(todos, todoList);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.reset();
}

function populateList(todos = [], todoList) {
    todoList.innerHTML = todos.map((todo, i) => {
        return `
        <li>
        <input type="checkbox" data-index=${i} id="item${i}" ${todo.done ? 'checked':''}/>
        <label for="item${i}">${todo.text}</label>
        <span class="delete">❌</span>
        </li>
    `;
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) return;
    const el = e.target;
    const index = el.dataset.index;
    todos[index].done = !todos[index].done;
    localStorage.setItem('todos', JSON.stringify(todos));
    populateList(todos, todoList)
}

addItems.addEventListener('submit', addItem);
todoList.addEventListener('click', toggleDone)

populateList(todos, todoList);
