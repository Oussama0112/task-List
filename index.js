////---------------------my globale variabels-----------------
//---------------------------------------------------------
let myinput = document.querySelector(".task"),
  addTaskBtn = document.querySelector(".addTask"),
  myTaskList = document.querySelector(".myList"),
  taskList = [];
let d = document.querySelector(".toDoStat");
let c = document.querySelector(".completedStat");

//--------------checking the locale storage for saved tasks---------------
//-----------------first we check the tasksList-------------
if (window.localStorage.getItem("myTaskList")) {
  let noTask = document.querySelector(".no-task-to-show");
  if (
    document.body.contains(document.querySelector(".no-task-to-show")) &&
    JSON.parse(window.localStorage.getItem("myTaskList")).length !== 0
  ) {
    noTask.remove();
  }
  taskList = JSON.parse(window.localStorage.getItem("myTaskList"));
  taskList.forEach((element) => {
    addTaskToMyList(element);
  });
}
//----------------------------------------------------------
//------------------second is the todo tasks-----------
//----------------------------------------------------------

if (window.localStorage.getItem("todo")) {
  d.innerText = window.localStorage.getItem("todo");
}

//----------------------------------------------------------
//------------------third is the completed tasks-----------
//----------------------------------------------------------

if (window.localStorage.getItem("completed")) {
  c.innerText = window.localStorage.getItem("completed");
}

//----------------------------------------------------------
//-------------------fourth is the checked task------------------
//----------------------------------------------------------------

if (
  window.localStorage.getItem("checkedTasks") &&
  JSON.parse(window.localStorage.getItem("checkedTasks")).length !== 0
) {
  let myarr = JSON.parse(window.localStorage.getItem("checkedTasks"));
  let allP = document.querySelectorAll(".taskDescription");
  allP.forEach((ele, i) => {
    if (myarr[i] === 1) {
      ele.classList.add("checkedTask");
    }
  });
}
//------------------creating the remove all button with js----------
removeAllBtn();
// /------------------------------------------------------------------
//----------adding the event listner to the buttons---------------------
//-----------------------------------------------------------------
//----------------------Main Event----------------------------
addTaskBtn.addEventListener("click", addTask);
//---------------------delte event---------------------------
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    taskList = taskList.filter((ele, index, arr) => {
      return index !== arr.lastIndexOf(e.target.previousElementSibling.innerHTML);
    });
    window.localStorage.setItem("myTaskList", JSON.stringify(taskList));
    e.target.parentElement.remove();
  }
  if (myTaskList.childElementCount === 0) {
    noTaskToShow();
  }
});
// ---------------------check events-------------------------------------
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("check")) {
    e.target.parentElement.firstElementChild.classList.toggle("checkedTask");
  }
  let completed = document.querySelectorAll(".checkedTask").length;
  let toDo = document.querySelectorAll(".taskMessage").length - completed;
  d.innerText = toDo;
  c.innerText = completed;
  let checkedTasks = checkedarray();
  window.localStorage.setItem("completed", completed);
  window.localStorage.setItem("todo", toDo);
  window.localStorage.setItem("checkedTasks", JSON.stringify(checkedTasks));
});
//---------------------------------------------------------------------
//---------------------function section-------------------------------
//---------------------------------------------------------------------
//--------------function to register the task in my task list-----------

function addTask() {
  if (myinput.value !== "") {
    let noTask = document.querySelector(".no-task-to-show");
    if (document.body.contains(document.querySelector(".no-task-to-show"))) {
      noTask.remove();
    }
    if (taskList.includes(myinput.value)) {
      let confirm = window.confirm(
        "Are you sure you want to duplicate this task because you already have it in your current Task-List"
      );
      if (confirm) {
        taskList = taskList.concat(myinput.value);
        console.log(taskList);
        addTaskToMyList(myinput.value);
      }
    } else {
      taskList = taskList.concat(myinput.value);
      addTaskToMyList(myinput.value);
    }
  }
  window.localStorage.setItem("myTaskList", JSON.stringify(taskList));
  myinput.value = "";
  myinput.focus();
}
//----------------add function--------------------
function addTaskToMyList(ele) {
  let myli = document.createElement("li");
  myli.classList.add("taskMessage");
  let task = document.createElement("p");
  task.className = "taskDescription";
  task.textContent = ele;
  let checkBtn = document.createElement("button");
  checkBtn.classList.add("check");
  checkBtn.innerText = "check";
  let delBtn = document.createElement("button");
  delBtn.className = "delete";
  delBtn.innerText = "delete";
  myli.appendChild(task);
  myli.appendChild(delBtn);
  myli.appendChild(checkBtn);
  myTaskList.appendChild(myli);
}
// -----------------------------------------------------------------------------
function noTaskToShow() {
  let p = document.createElement("p");
  p.className = "no-task-to-show";
  p.innerHTML = "No Tasks To Show";
  myTaskList.appendChild(p);
}
// -----------------------------------------------------------------------------------
function checkedarray() {
  let allP = document.querySelectorAll(".taskDescription");
  let myarr = Array(allP.length).fill(0);
  allP.forEach((ele, i) => {
    if (ele.classList.contains("checkedTask")) {
      myarr[i] = 1;
    } else {
      myarr[i] = 0;
    }
  });
  return myarr;
}
// ------------------------------------------------------------------------------------

function removeAllBtn() {
  let btn = document.createElement("button");
  btn.className = "removeAll";
  btn.innerText = "remove all";
  btn.addEventListener("click", function () {
    let toDelete = document.querySelectorAll(".taskDescription");
    toDelete.forEach((ele) => {
      ele.parentElement.remove();
      window.localStorage.clear();
    });
  });
  document.body.appendChild(btn);
}
