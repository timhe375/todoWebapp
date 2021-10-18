let todos = [];

function readTodosFromLocalStorage() {
  const todosFromStorage = localStorage.getItem("todos");
  if (todosFromStorage !== null) {
    todos = JSON.parse(todosFromStorage);
  }
}

function saveTodosToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

const newTodoEl = document.querySelector("#new-todo");
const newTodoText = newTodoEl.value.trim();
// function addNewTodo() {
//   // length check
//   if (newTodoText.length === 0) {
//     return;
//   }

//   // duplicate check
//   if (isDuplicate(newTodoText) === true) {
//     alert("This todo is already in the list");
//     return;
//   }

//   const newTodo = {
//     description: newTodoText,
//     done: false,
//   };

//   todos.push(newTodo);
//   renderTodos();
//   //saveTodosToLocalStorage();

//   newTodoEl.value = "";
// }
const addTodoBtn = document.querySelector("#add-todo");

//addTodoBtn.addEventListener("click", addNewTodo);
function renderTodos() {
  const todoListEl = document.querySelector("#todo-list");
  todoListEl.innerHTML = "";

  todos.forEach(function (currentTodo) {
    const newTodoLiEl = document.createElement("li");
    newTodoLiEl.innerText = currentTodo.description;

    const todoListEl = document.querySelector("#todo-list");
    todoListEl.appendChild(newTodoLiEl);

    const todoCheckboxEl = document.createElement("input");
    todoCheckboxEl.setAttribute("type", "checkbox");
    todoCheckboxEl.checked = currentTodo.done;
    newTodoLiEl.appendChild(todoCheckboxEl);

    if (currentTodo.done === true) {
      newTodoLiEl.classList.add("done");
    }

    newTodoLiEl.todo = currentTodo;

    const filterValue = getFilterValue();
    if (filterValue === "done") {
      newTodoLiEl.hidden = true;
    }

    todoListEl.append(newTodoLiEl);
  });
  filterTodos();
}
//is Duplicated
function isDuplicate(todo) {
  newData = todo;
  for (let i = 0; i < todos.length; i++) {
    console.log(newData);
    const currentTodo = todos[i].description;
    console.log(currentTodo);
    if (currentTodo === newData) {
      return true;
    }
  }
  return false;
}

const todoListEl = document.querySelector("#todo-list");
todoListEl.addEventListener("change", toggleTodoState);

//toggle ziwschen true/false
function toggleTodoState(event) {
  const checkbox = event.target;
  if (checkbox.checked === true) {
    checkbox.parentElement.classList.add("done");
    checkbox.parentElement.todo.done = true;
  } else {
    checkbox.parentElement.classList.remove("done");
    checkbox.parentElement.todo.done = false;
  }

  saveTodosToLocalStorage();
}

const todoFilterEl = document.querySelector("#todo-filter");
todoFilterEl.addEventListener("change", filterTodos);

//filter all todos
function filterTodos() {
  const filterValue = getFilterValue();
  const todoListEl = document.querySelector("#todo-list");
  for (let i = 0; i < todoListEl.children.length; i++) {
    const currentTodo = todoListEl.children[i];
    if (filterValue === "all") {
      currentTodo.hidden = false;
    } else if (filterValue === "open") {
      currentTodo.hidden = currentTodo.todo.done;
    } else if (filterValue === "done") {
      currentTodo.hidden = !currentTodo.todo.done;
    }
  }
}
function getFilterValue() {
  return document.querySelector('#todo-filter input[type="radio"]:checked')
    .value;
}

const url = "http://localhost:4730/todos";
//get Data from Api
function fetchDataFromApi() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      todos = data;
      renderTodos();
    });
}
//Post Data from Api
function postDataToApi() {
  let myHeader = new Headers();
  myHeader.append("Content-Type", "application/json");
  let textInput = newTodoEl.value.trim();
  if (textInput.length === 0) {
    return;
  }
  console.log(textInput);
  // duplicate check
  if (isDuplicate(textInput)) {
    alert("This todo is already in the list");
    return;
  }

  const newTodo = {
    description: textInput,
    done: false,
  };

  let requestOptions = {
    method: "POST",
    headers: myHeader,
    body: JSON.stringify(newTodo),
    redirect: "follow",
  };
  fetch(url, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      todos.push(data);
      renderTodos();
    });
}
addTodoBtn.addEventListener("click", postDataToApi);

//Aufruf bei App start der fetchDataFrom Api
function initTodoApp() {
  fetchDataFromApi();
}
initTodoApp();
