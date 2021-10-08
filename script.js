function addNewTodo() {
  const newTodoEl = document.querySelector("#new-todo");
  const newTodo = newTodoEl.value.trim();

  if (newTodo.lenght === 0) {
    return;
  }

  if (isDuplication(newTodo)) {
    alert("This task is already in your list");
    return;
  }

  const newTodoLi = document.createElement("li");
  newTodoLi.innerText = newTodo;

  newTodoLi.setAttribute("data-todo", newTodo.toLowerCase());

  const todoListEl = document.querySelector("#todo-list");
  todoListEl.appendChild(newTodoLi);

  const todoCheckboxEl = document.createElement("input");
  todoCheckboxEl.setAttribute("type", "checkbox");
  newTodoLi.appendChild(todoCheckboxEl);

  newTodoLi.setAttribute("data-done", false);

  const filterValue = getFilterValue();
  if (filterValue === "done") {
    newTodoLi.hidden = true;
  }

  newTodoEl.value = "";
}

function isDuplication(todo) {
  todo = todo.toLowerCase();
  const todoListEl = document.querySelector("#todo-list");
  for (let i = 0; i < todoListEl.children.length; i++) {
    const currentLiEl = todoListEl.children[i];
    const currentTodo = currentLiEl.getAttribute("data-todo");
    if (currentTodo === todo || currentTodo === " ") {
      return true;
    }
  }

  return false;
}

const addTodoBtn = document.querySelector("#add-todo");
addTodoBtn.addEventListener("click", addNewTodo);

const todoListEl = document.querySelector("#todo-list");
todoListEl.addEventListener("change", toggleTodoState);

function toggleTodoState(event) {
  const checkbox = event.target;
  if (checkbox.checked === true) {
    checkbox.parentElement.classList.add("done");
    checkbox.parentElement.setAttribute("data-done", true);
  } else {
    checkbox.parentElement.classList.remove("done");
    checkbox.parentElement.setAttribute("data-done", false);
  }
}

const todoFilterEl = document.querySelector("#todo-filter");
todoFilterEl.addEventListener("change", filterTodos);
function filterTodos() {
  const filterValue = getFilterValue();

  const todoListEl = document.querySelector("#todo-list");
  for (let i = 0; i < todoListEl.children.length; i++) {
    const currentTodo = todoListEl.children[i];
    if (filterValue === "all") {
      currentTodo.hidden = false;
    } else if (filterValue === "done") {
      currentTodo.hidden = currentTodo.getAttribute("data-done") === "false";
    } else if (filterValue === "open") {
      currentTodo.hidden = currentTodo.getAttribute("data-done") === "true";
    }
  }
}

function getFilterValue() {
  return document.querySelector('#todo-filter input[type="radio"]:checked')
    .value;
}

newLi.setAttribute("data-todo", todoValue.toLowerCase());

const listEl = document.querySelector("#todo-list");
listEl.appendChild(newLi);
