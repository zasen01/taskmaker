var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#task-to-do");



var createTaskHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log(taskNameInput);

    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    //adding HTML content to DIV
    taskInfoEl.innerHTML = " <h3 class='task-name'> " + taskNameInput + "</h3><span class'task-type'> " + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);
    taskToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", createTaskHandler);