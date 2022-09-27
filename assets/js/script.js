var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var taskToDoEl = document.querySelector("#task-to-do");
var taskInProgressEl = document.querySelector("#task-in-progress")
var taskCompletedEl = document.querySelector("#task-completed");
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function(event) {

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //field validation
    if (taskNameInput === "" || taskTypeInput === "") {
        alert("You need to complete the task form!");
        return false;
    }
    //form reset
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex =0;

    var isEdit = formEl.hasAttribute("data-task-id");

    if (isEdit){
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
    
        createTaskEl(taskDataObj);
    }

};

var createTaskEl = function(taskDataObj){
    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    //div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    //adding HTML content to DIV
    taskInfoEl.innerHTML = " <h3 class='task-name'> " + taskDataObj.name + "</h3><span class='task-type'> " + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    //create task Actions
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    taskToDoEl.appendChild(listItemEl);

    taskIdCounter++;

};

var createTaskActions = function(taskId){

    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //Edit Button Creation
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    //Delete Button Creation
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    //Status Selector 
    var statusSelectEl = document.createElement("select");
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    statusSelectEl.className = "select-status";
    actionContainerEl.appendChild(statusSelectEl);

    var statusChoices = ["To Do", "In Progress", "Completed"];

    for(var i =0; i < statusChoices.length; i++){
        //Option Element Creation
        var statusOptionEl = document.createElement("option");
        statusOptionEl.setAttribute("value", statusChoices[i]);
        statusOptionEl.textContent = statusChoices[i];
    
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

    //edit task fumctionality
var completeEditTask = function(taskName, taskType, taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //setting new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    formEl.querySelector("#save-task").textContent = "Add Task";
};


var taskButtonHandler = function(event){
    //get target element from an Event
    var targetEl = event.target;

    if(targetEl.matches(".edit-btn")){
        console.log("edit", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    else if(targetEl.matches(".delete-btn")){
        console.log("delete",targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var taskStatusChangeHandler = function(event){
    console.log(event.target.value);

    var taskId = event.target.getAttribute("data-task-id");
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    var statusValue = event.target.value.toLowerCase();

    if (statusValue === "to do") {
        taskToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        taskInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        taskCompletedEl.appendChild(taskSelected);
    }

};


//Edit Task
var editTask = function(taskId){
    console.log(taskId);
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    
    formEl.setAttribute("data-task-id", taskId);
    formEl.querySelector("#save-task").textContent = "Save Task";

};

//Delete Task Function
var deleteTask = function(taskId){
    console.log(taskId);

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

//new task 
formEl.addEventListener("submit", taskFormHandler);
//edit and delete task buttons
pageContentEl.addEventListener("click", taskButtonHandler);
//task status toggle 
pageContentEl.addEventListener("change", taskStatusChangeHandler);

