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

// Function to convert 24-hour time to 12-hour format
function convertTo12Hour(time24) {
  if (!time24) return "";

  const [hours, minutes] = time24.split(":").map(Number);

  if (isNaN(hours)) return time24;

  const period = hours >= 12 ? "PM" : "AM";

  let hours12 = hours % 12;
  if (hours12 === 0) hours12 = 12;

  const minutesStr = minutes.toString().padStart(2, "0");

  return `${hours12}:${minutesStr} ${period}`;
}

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

    // Convert time to 12-hour format for display
    const time12Hour = convertTo12Hour(time);

    const html = `
            <div class="name">${name}</div>
            <div class="date">${date}</div>
            <div class="time">${time12Hour}</div>
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
    time, // Store the original 24-hour time
  });

  inputElement.value = "";
  dueInputElement.value = "";
  timeInputElement.value = "";
  renderTodoList();
  saveToStorage();
}
