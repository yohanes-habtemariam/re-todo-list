let todoList = JSON.parse(localStorage.getItem("todoList")) || [
  {
    name: "Make dinner",
    date: "12/09/2025",
    time: "18:00",
  },
  {
    name: "play football",
    date: "12/09/2025",
    time: "15:00",
  },
];

saveToStorage();
function saveToStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

renderTodoList();

function renderTodoList() {
  let todoListHTML = "";
  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    let { name, date, time } = todoObject;

    const html = `
            <div class="name">${name}</div>
            <div class="date">${date}</div>
            <div class="time">${time}</div>
            <button class="delete-button" onclick="
              todoList.splice(${i}, 1)
              renderTodoList();
            ">Delete</button>
             
         `;
    todoListHTML += html;
  }
  document.querySelector(".js-result").innerHTML = todoListHTML;
  saveToStorage();
}

function addTodoName() {
  const inputElement = document.querySelector(".js-input-name");
  const name = inputElement.value;

  const dueInputElement = document.querySelector(".js-date-input");
  const date = dueInputElement.value;
  const timeInputElement = document.querySelector(".js-time-input");
  const time = timeInputElement.value;

  todoList.push({
    name,
    date,
    time,
  });

  inputElement.value = "";
  dueInputElement.value = "";
  timeInputElement.value = "";
  renderTodoList();
  saveToStorage();
}
