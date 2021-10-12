const tarekPassword = "12345678";
const tarekEmail = "oktay.copurlu@powercoders.org";
const loginButton = document.querySelector("#login-button");
const userInfo = document.querySelector("#user-info");
const todoListSection = document.querySelector("#todo-list");
const addButton = document.querySelector("#add-todo");
const toDoListSection = document.querySelector("#todo-list");

const selector = (selector)=>{
  return document.querySelector(selector)
}
const toDoList = [];

loginButton.addEventListener("click", checkPassword);
addButton.addEventListener("click", addToDo);

function checkPassword() {
  const password = document.querySelector("#password").value;
  const email = document.querySelector("#email").value;

  const date = new Date().toUTCString();
  const day = new Date().getMonth();
  if (password === tarekPassword && email === tarekEmail) {
    userInfo.innerHTML = `<h1>Welcome Tarek</h1> <strong> ${date} </strong>`;
    selector("#todo-container").style.display = "flex";
  } else {
    alert("Please type correct password and email");
  }
}

function ToDoItem(id, ToDo) {
  this.id = id;
  this.name = ToDo;
  this.state = false;

  this.checkState = function () {
    if (this.state === true) {
      this.state = false;
    } else {
      this.state = true;
    }
  };
}

function addToDo() {
  const todoInput = document.querySelector("#input-todo").value;
  let index = toDoList.length;
  toDoList.push(new ToDoItem(index, todoInput));
  showList();
}

function showList() {
  todoListSection.innerHTML = "";
  for (let index = 0; index < toDoList.length; index++) {
    let todo = toDoList[index];
    todoListSection.innerHTML += `
    <tr class=${todo.state ? "done" : ""}>
      <td class="small-td">${index + 1}</td>
      <td class="small-td"><input id="${index}" ${todo.state ? "checked" : null} value="${index}" type="checkbox"/></td>
      <td class="description-td"><span id="${index}" contentEditable="true"> ${todo.name}</span></td>
      <td class="small-td"><button id="${index}">X </button></td>
    </tr> `;
    
  }
  let todoText = document.querySelectorAll("td > span");
  let deleteButtons = document.querySelectorAll("td > button");
  let checkboxes = document.querySelectorAll('[type="checkbox"]');
  for (let index = 0; index < checkboxes.length; index++) {
    checkboxes[index].addEventListener("change", changeIsDoneStatus);
    deleteButtons[index].addEventListener("click", deleteToDo);

    todoText[index].addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        changeToDo(todoText[index]);
      }
    });
  }
}
function changeIsDoneStatus() {
  let todoID = this.id;
  toDoList[todoID].checkState();
  showList();
}

function deleteToDo() {
  let todoID = this.id;
  toDoList.splice(todoID, 1);
  showList();
}

function changeToDo(prop) {
  let index = prop.id;
  let newToDo = prop.innerText;
  toDoList[index].name = newToDo;
  showList();
}
