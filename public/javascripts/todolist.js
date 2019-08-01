const addItems = document.querySelector('.add-items');
const todoList = document.querySelector('.todoList');

let todoListDelete;

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
        <input class='todoCheck' type="checkbox" data-index=${i} id="item${i}" ${todo.done ? 'checked':''}/>
        <label for="item${i}">${todo.text}</label>
        <input type="button" class="delete" value="❌" data-index=${i} > 
      
        </li>
    `;
    }).join('');
    if(todoList.length!=0 && todoList != null){
        todoListDelete = document.querySelectorAll('.todoList .delete');
        todoListDelete.forEach(deleteButton=>{deleteButton.addEventListener('click', deleteTodo)});

    }
}

function toggleDone(e) {
    
    if (!e.target.matches('input.todoCheck')) return;
    const el = e.target;
    const index = el.dataset.index;
    todos[index].done = !todos[index].done;
    localStorage.setItem('todos', JSON.stringify(todos));
    populateList(todos, todoList)
}

function deleteTodo(e){
    const el = e.target;
    const index = el.dataset.index;
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));

    populateList(todos, todoList);
}

addItems.addEventListener('submit', addItem);
todoList.addEventListener('click', toggleDone);


populateList(todos, todoList);
