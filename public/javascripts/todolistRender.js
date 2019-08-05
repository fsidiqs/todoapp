

// const todolist_controller = require(path.join(__dirname, 'controllers/todolistController'))

const addItems = document.querySelector('.add-items');
const todoList = document.querySelector('.todoList');
const filterList = document.querySelector('.filterList');
const getTodolistUrl = `${hostUrl}/todolist/gettodolist`;
const todoUrl = `${hostUrl}/todolist`;


let todos;
let todoListDelete;




async function getTodolist() {
    todos = await fetch(getTodolistUrl).then(data => data.json()).then(res => res);
  
}

async function getTodo(_id) {
    return await fetch(todoUrl + '/' + _id).then(data => data.json()).then(res => res);
}
// let filterSelectIndex = JSON.parse(localStorage.getItem('filterSelectIndex'));

async function addItem(e) {
    e.preventDefault();

    const text = (this.querySelector('[name=item]')).value;
    const todo = {
        text,
        done: false
    }
    const optParam = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            todo
        })
    }

    const addItem = await fetch(todoUrl, optParam).then(data => data.json()).then(res => res)
    if (await addItem === "success") {
        await getTodolist();
        await populateList(todos, todoList);

    }
    this.reset();
}


async function toggleDone(e) {
    if (!e.target.matches('input.todoCheck')) return;

    const el = e.target;
    const _id = el.dataset._id;

    const optParam = {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }   
    }

    await fetch(todoUrl + '/' + _id, optParam)
    .then(async () => { 
        await getTodolist();
        await populateList(todos, todoList);
    })
    .catch(error => console.error('Error:', error));
}

async function deleteTodo(e) {
    const el = e.target;
    const _id = el.dataset._id;
    const optParam = {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    await fetch(todoUrl + '/' + _id, optParam)
    .then(async () => { 
        await getTodolist();
        await populateList(todos, todoList);
    })
    .catch(error => console.error('Error:', error));
}

function populateList(todos = [], todoList) {
    
    todoList.innerHTML = todos.map((todo) => {
     
            return `
        <li>
        <input class='todoCheck' type="checkbox" data-_id=${todo._id} id="item${todo._id}" ${todo.done ? 'checked':''}/>
        <label for="item${todo._id}">${todo.text}</label>
        <input type="button" class="delete" value="❌" data-index=${todo._id} > 
        </li>
        `;
        })
        .join('');
    if (todoList.length != 0 && todoList != null) {
        todoListDelete = document.querySelectorAll('.todoList .delete');
        todoListDelete.forEach(deleteButton => {
            deleteButton.addEventListener('click', deleteTodo)
        });

    }
}

// function filterTodo(e){
//     const el = e.target;
//     const filter = el.dataset.filter;
//     filterSelected = filter;

//     localStorage.setItem('filterSelected', JSON.stringify(filterSelected));
//     populateFilter(filterSelected, filterList)
//     populateList(todos, todoList, filterSelected)
// }

// function populateFilter(filterSelected = 0, filterList){
//     filterList.innerHTML = 
//     `<button ${filterSelected == "all" ? 'class="active"':''} data-filter="all">All</button>
//     <button ${filterSelected == "done" ? 'class="active"':''} data-filter="done">Done</button>
//     <button ${filterSelected == "not-done" ? 'class="active"':''} data-filter="not-done">Active</button>`

// }

//-------Start fetching data
(async function () {
    await getTodolist();
    await populateList(todos, todoList);
})() 

addItems.addEventListener('submit', addItem);
todoList.addEventListener('click', toggleDone);



// filterList.addEventListener('click', filterTodo);

// populateFilter(filterSelected,filterList)
