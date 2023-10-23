const taskInput = document.getElementById("inputTask");
const addTaskButton = document.getElementById("inputBtn");
const taskList = document.getElementById("todoList");
let itemCounter = 1; //initialize the item counter
//check if there is data in localStorage and load it
const savedData = localStorage.getItem("todolist");
if (savedData) {
  const tasks = JSON.parse(savedData);
  //add the task to the list
  tasks.forEach((task) => {
    addTask(task);
  });
}

//function to add a new task to the table
function addTask(newTask) {
  //create a new table row
  const newRow = document.createElement("tr");

  //create a cell for the item index table (table data)
  const indexCell = document.createElement("td");
  indexCell.textContent = itemCounter; //use item counter for numbering
  itemCounter++;
  console.log("itemcounter", itemCounter);

  //create a cell for the task text(table data)
  const taskCell = document.createElement("td");
  taskCell.textContent = newTask;
  // Create a cell for the date and time stamp (table data).

  //create a cell for the action buttons (table data)
  const actionCell = document.createElement("td");
  //create a button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.style.backgroundColor = "red";
  deleteButton.style.color = "white";
  deleteButton.style.border = "none";
  deleteButton.style.height = "1.5rem";
  deleteButton.style.borderRadius = "3px";

  deleteButton.addEventListener("click", function () {
    newRow.remove();
    updateItemNumbers(); //update item numbers after deletion
    updateLocalStorage();
  });

  //create edit button
  const markButton = document.createElement("button");
  markButton.textContent = "Mark";
  markButton.style.backgroundColor = "green";
  markButton.style.color = "white";
  markButton.style.border = "none";
  markButton.style.height = "1.5rem";
  markButton.style.borderRadius = "3px";
  markButton.style.paddingRight = "5px"; // Remove the space before "5px"

  markButton.addEventListener("click", function () {
    // handle edit functionalithy here
    newRow.classList.toggle("marked");
    updateLocalStorage();
  });
  // append the action buttons to the action cell
  actionCell.appendChild(deleteButton);
  actionCell.appendChild(markButton);

  //append the task cell to the row
  newRow.appendChild(indexCell);
  newRow.appendChild(taskCell);
  newRow.appendChild(actionCell);

  //append the row to the table body
  taskList.appendChild(newRow);
  updateLocalStorage();
}
//function to updadete localStorage with the current list data

//function to update item numbers after deletion
function updateItemNumbers() {
  const rows = taskList.querySelectorAll("tr");
  itemCounter = 1;
  rows.forEach((row) => {
    row.querySelector("td:first-child").textContent = itemCounter;
    itemCounter++;
  });
}
addTaskButton.addEventListener("click", function () {
  const newTask = taskInput.value;
  if (newTask.trim() !== "") {
    addTask(newTask);
    taskInput.value = "";
  }
});
function updateLocalStorage() {
  const rows = taskList.querySelectorAll("tr");
  const data = [];

  rows.forEach((row) => {
    const task = row.querySelector("td:nth-child(2)").textContent;
    data.push(task);
  });
  localStorage.setItem("todolist", JSON.stringify(data));
}
