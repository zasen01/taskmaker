var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#task-to-do");



var taskFormHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to complete the task form!");
        return false;
    }
    
    formEl.reset();

    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskEl(taskDataObj);

}

var createTaskEl = function(taskDataObj){
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    //adding HTML content to DIV
    taskInfoEl.innerHTML = " <h3 class='task-name'> " + taskDataObj.name + "</h3><span class'task-type'> " + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);
    taskToDoEl.appendChild(listItemEl);

}


formEl.addEventListener("submit", taskFormHandler);