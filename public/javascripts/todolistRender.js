
// const todolist_controller = require(path.join(__dirname, 'controllers/todolistController'))

const addItems = document.querySelector('.add-items');
const todoList = document.querySelector('.todoList');
const filterList = document.querySelector('.filterList');
const Url = `${hostUrl}/todolist/gettodolist`;

let todos;
let todoListDelete;

(async function(){
    await fetch(Url).then(data =>data.json()).then(res=>{console.log(res); todos = [...res]})
    await populateList(todos, todoList);
})()



// let filterSelectIndex = JSON.parse(localStorage.getItem('filterSelectIndex'));

async function addItem(e) {
    e.preventDefault();
    const Url = `${hostUrl}/todolist/`;
    const text = (this.querySelector('[name=item]')).value;
    const todo = {
        text,
        done: false
    }
    // const optParam = {
    //     headers:{
    //         "content-type":"application/json; charset=UTF-8"
    //     },
    //     body:todo,
    //     method:"POST"
    // }
    // fetch(Url, optParam)
    populateList(todos, todoList);
    // axios.post('')
    // localStorage.setItem('todos', JSON.stringify(todos));
    // todolist_controller.todo_post
    this.reset();
}



function populateList(todos = [], todoList) {
    console.log("asd")
    todoList.innerHTML = todos.map((todo, i) => {
        return `
        <li>
        <input class='todoCheck' type="checkbox" data-index=${i} id="item${i}" ${todo.done ? 'checked':''}/>
        <label for="item${i}">${todo.text}</label>
        <input type="button" class="delete" value="❌" data-index=${i} > 
        </li>
        `;
    })
    .join('');
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

addItems.addEventListener('submit', addItem);
todoList.addEventListener('click', toggleDone);
// filterList.addEventListener('click', filterTodo);

// populateFilter(filterSelected,filterList)
