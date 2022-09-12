var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#task-to-do");



var createTaskHandler = function() {
    
    event.preventDefault();

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new Task.";
    taskToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", createTaskHandler);