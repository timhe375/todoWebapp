class TodoApp {
  //Properties
  todoData = [];
  url = "http://localhost:4730/todos";

  constructor() {
    this.fetchDataFromApi();
    this.initEventListeners();
    this.filterTodos();
  }

  initEventListeners() {
    const addTodoBtn = document.querySelector("#add-todo");
    addTodoBtn.addEventListener("click", () => this.postDataToApi());
    const todoListEl = document.querySelector("#todo-list");
    todoListEl.addEventListener("change", (e) => this.toggleTodoState(e));
    const todoFilterEl = document.querySelector("#todo-filter");
    todoFilterEl.addEventListener("change", () => this.filterTodos());
  }

  renderTodos() {
    const todoListEl = document.querySelector("#todo-list");
    todoListEl.innerHTML = "";

    this.todoData.forEach((currentTodo) => {
      const newTodoLiEl = document.createElement("li");
      newTodoLiEl.innerText = currentTodo.description;
      newTodoLiEl.setAttribute("data-id", currentTodo.id);

      //const todoListEl = document.querySelector("#todo-list");
      todoListEl.appendChild(newTodoLiEl);

      const todoCheckboxEl = document.createElement("input");
      todoCheckboxEl.setAttribute("type", "checkbox");

      todoCheckboxEl.checked = currentTodo.done;
      newTodoLiEl.appendChild(todoCheckboxEl);

      const todoDeleteButton = document.createElement("button");
      todoDeleteButton.innerHTML = "Löschen";
      //console.log(todoDeleteButton);
      newTodoLiEl.appendChild(todoDeleteButton);
      todoDeleteButton.addEventListener("click", (e) =>
        this.deleteDataFromApi(e)
      );

      if (currentTodo.done === true) {
        newTodoLiEl.classList.add("done");
      }

      newTodoLiEl.todo = currentTodo;

      const filterValue = this.getFilterValue();
      if (filterValue === "done") {
        newTodoLiEl.hidden = true;
      }

      todoListEl.append(newTodoLiEl);
    });
    this.filterTodos();
  }
  //is Duplicated
  isDuplicate(todo) {
    const newData = todo;
    for (let i = 0; i < this.todoData.length; i++) {
      const currentTodo = this.todoData[i].description;
      if (currentTodo === newData) {
        return true;
      }
    }
    return false;
  }

  //toggle ziwschen true/false
  toggleTodoState(event) {
    let id = event.target.parentElement.getAttribute("data-id");
    const checkbox = event.target;
    this.patchDataFromApi(id, checkbox.checked);
    console.log(event.target.checked);
  }

  //filter all todos
  filterTodos() {
    const filterValue = this.getFilterValue();
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

  getFilterValue() {
    return document.querySelector('#todo-filter input[type="radio"]:checked')
      .value;
  }
  checkValid(textInput) {
    if (textInput.length === 0) {
      return false;
    }
    // duplicate check
    if (this.isDuplicate(textInput)) {
      return false;
    }
    return true;
  }
  getCurrentTodo() {
    const newTodoEl = document.querySelector("#new-todo");
    const textInput = newTodoEl.value.trim();

    const newTodo = {
      description: textInput,
      done: false,
    };
    return newTodo;
  }

  fetchDataFromApi() {
    fetch(this.url)
      .then((response) => response.json())
      .then((data) => {
        this.todoData = data;
        this.renderTodos();
      });
  }

  //Post Data from Api
  postDataToApi() {
    const todo = this.getCurrentTodo();
    let myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    let requestOptions = {
      method: "POST",
      headers: myHeader,
      body: JSON.stringify(todo),
      redirect: "follow",
    };
    if (this.checkValid(todo.description)) {
      fetch(this.url, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          this.todoData.push(data);
          this.renderTodos();
        });
    } else {
      alert("This todo is already in the list");
    }
  }
  deleteDataFromApi(e) {
    let myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    let requestOptions = {
      method: "DELETE",
      headers: myHeader,
      redirect: "follow",
    };
    let deletedId = e.target.parentElement.getAttribute("data-id");
    fetch(this.url + "/" + deletedId, requestOptions)
      .then((response) => response.json())
      .then(() => {
        alert("Object wurde gelöscht");
        this.fetchDataFromApi();
        this.renderTodos();
      });
  }
  patchDataFromApi(id, state) {
    let myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");
    console.log(this.url, id);
    let requestOptions = {
      method: "PATCH",
      headers: myHeader,
      body: JSON.stringify({ done: state }),
      redirect: "follow",
    };
    fetch(this.url + `/${id}`, requestOptions)
      .then((response) => response.json())
      .then(() => {
        this.fetchDataFromApi();
      });
  }
}
