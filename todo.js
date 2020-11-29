const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-todoList")

const TODOS_LS = 'toDos';
let toDos = [];


function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    toDos = toDos.filter(toDo => toDo.id !== li.id);

    saveToDos();
}

function paintToDo(text) {
    const li = document.createElement("li");

    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDo);

    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    li.appendChild(span)
    li.appendChild(delBtn)
    li.id = `${newId}`;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: `${toDos.length + 1}`,
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);

    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(toDo => paintToDo(toDo.text))
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();
