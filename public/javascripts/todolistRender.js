const hostUrl = 'https://todoappfajar.herokuapp.com'

const addItems = document.querySelector('.add-items');
const todoList = document.querySelector('.todoList');
const filterList = document.querySelector('.filterList');
const getTodolistUrl = `${hostUrl}/todolist/gettodolist`;
const todoUrl = `${hostUrl}/todolist`;

let todoListDelete;
let selectedFilter;



function getTodolist() {
 return fetch(getTodolistUrl).then(data => data.json());
}

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
       
        await populateList(await getTodolist(), todoList);

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

    await fetch(todoUrl + '/' + _id + '/update', optParam)
    .then(async () => { 
        await populateList(await getTodolist(), todoList);
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
    await fetch(todoUrl + '/' + _id + '/delete', optParam)
    .then(async () => { 
        await populateList(await getTodolist(), todoList);
    })
    .catch(error => console.error('Error:', error));
}


async function filterEvent(e){
    if (!e.target.matches('button[data-filter]')) return;
    const el = e.target;
    selectedFilter = el.dataset.filter;
    await populateList(await getTodolist(), todoList);

}



function populateList(todos = [], todoList) {
    if(selectedFilter !== "all"){todos = todos.filter((todo) => selectedFilter === "done" ? todo.done : selectedFilter === "not-done" ? todo.done === false : true);}
    todoList.innerHTML = todos.map((todo) => { 
            return `
        <li>
        <input class='todoCheck' type="checkbox" data-_id=${todo._id} id="item${todo._id}" ${todo.done ? 'checked':''}/>
        <label for="item${todo._id}">${todo.text}</label>
        <input type="button" class="delete" value="❌" data-_id=${todo._id} > 
        </li>
        `;
        })
        .join('')   ;

    if (todoList.length != 0 && todoList != null) {
        todoListDelete = document.querySelectorAll('.todoList .delete');
        todoListDelete.forEach(deleteButton => {
            deleteButton.addEventListener('click', deleteTodo)
        });
    }

    renderFilterlist(selectedFilter);
}

function renderFilterlist(selectedFilter = "all"){
    
   
    filterList.innerHTML = `
    <button ${selectedFilter==="all"?'class="active"':''} data-filter="all">All</button>
    <button ${selectedFilter==="not-done"?'class="active"':''} data-filter="not-done">Active</button>
    <button ${selectedFilter==="done"?'class="active"':''} data-filter="done">Done</button>
    `

}

//-------Start fetching data
(async function () {
   
    // await renderFilterlist()
    await populateList(await getTodolist(), todoList);
})() 

addItems.addEventListener('submit', addItem);
todoList.addEventListener('click', toggleDone);
filterList.addEventListener('click', filterEvent);