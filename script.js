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
