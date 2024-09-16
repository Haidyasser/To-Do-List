let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let removeAll = document.querySelector(".removeAll");
let divTasks = document.querySelector(".tasks");
let innerDiv = document.querySelector(".buttons");
let tasksArray = [];
// check if there is tasks in local storage
if (localStorage.getItem("tasks")) {
  tasksArray = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocatStorage();

submit.onclick = () => {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
};

removeAll.onclick = () => {
  tasksArray = [];
  addDataToLocalStorage(tasksArray);
  divTasks.innerHTML = "";
};

divTasks.addEventListener("click", (e) => {
  //Delete button
  if (e.target.classList.contains("del")) {
    // Remove task from local storage add from array
    deleteTaskWith(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
    // Remove task from page
    e.target.parentElement.parentElement.remove();
  }
  // task button
  if (e.target.classList.contains("finish")) {
    // toggle comopleted for the task
    toggleStatusTaskWith(
      e.target.parentElement.parentElement.getAttribute("data-id")
    );
    // toggle class done for the task
    e.target.parentElement.parentElement.classList.toggle("done");
  }
});

const addTaskToArray = (taskText) => {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // push task to array of tasks
  tasksArray.push(task);
  // Add tasks to page
  addElementToPage(tasksArray);
  // Add tasks to local storage
  addDataToLocalStorage(tasksArray);
};

function addElementToPage(tasksArray) {
  // empty tasks div
  divTasks.innerHTML = "";

  tasksArray.forEach((task) => {
    // create div element
    let div = document.createElement("div");
    // check if task is done
    if (task.completed) div.classList = "task done";
    else div.classList = "task";
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    //create div to contain buttons
    let innerDiv = document.createElement("div");
    innerDiv.classList = "buttons";

    //create delete button
    let span = document.createElement("span");
    span.classList = "del";
    span.appendChild(document.createTextNode("Delete"));
    innerDiv.appendChild(span);
    div.appendChild(innerDiv);
    divTasks.appendChild(div);

    // create finish button
    let finish = document.createElement("span");
    finish.classList = "finish";
    finish.appendChild(document.createTextNode("Finished"));
    // div.appendChild(finish);
    innerDiv.appendChild(finish);
  });
}

const addDataToLocalStorage = (tasksArray) => {
  window.localStorage.setItem("tasks", JSON.stringify(tasksArray));
};

function getDataFromLocatStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementToPage(tasks);
  }
}

function deleteTaskWith(id) {
  tasksArray = tasksArray.filter((task) => task.id != id);
  addDataToLocalStorage(tasksArray);
}

function toggleStatusTaskWith(id) {
  tasksArray.forEach((task) => {
    if (task.id == id) {
      task.completed = !task.completed;
    }
  });
  addDataToLocalStorage(tasksArray);
}
