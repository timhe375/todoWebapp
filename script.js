console.log("Hello Todo App!");

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
  } else {
    checkbox.parentElement.classList.remove("done");
  }
}
