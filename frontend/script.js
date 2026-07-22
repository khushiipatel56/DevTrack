console.log("JavaScript Loaded");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
console.log(addTaskBtn);
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", function () {

    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task;

    li.appendChild(taskText);

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.classList.add("complete-btn");
    completeBtn.onclick = function () {
        taskText.style.textDecoration = "line-through";
        taskText.style.color = "green";
        saveTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.onclick = function () {
        li.remove();
        updateTaskCount();
        saveTasks();
    };

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    updateTaskCount();

    taskInput.value = "";
    saveTasks();
});
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", function () {
    document.getElementById("dashboard").scrollIntoView({
        behavior: "smooth"
    });
});
function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

window.onload = function () {

    const savedTasks = localStorage.getItem("tasks");
    updateGoalCount();

    if (savedTasks) {

        taskList.innerHTML = savedTasks;

        document.querySelectorAll("#taskList li").forEach(function (li) {

            const completeBtn = li.querySelector(".complete-btn");
            const deleteBtn = li.querySelector("button:last-child");
            const taskText = li.querySelector("span");

            completeBtn.onclick = function () {
                taskText.style.textDecoration = "line-through";
                taskText.style.color = "#666";
                saveTasks();
            };
            deleteBtn.onclick = function () {
                li.remove();
                updateTaskCount();
                saveTasks();
            };
           
        });

    }
    updateTaskCount();

};
updateTaskCount();
function updateTaskCount() {
    const totalTasks = taskList.children.length;
    document.getElementById("taskCount").textContent = totalTasks + " Tasks";
}
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeBtn.textContent = "☀️ Light Mode";
    } else {
        themeBtn.textContent = "🌙 Dark Mode";
    }

});
function updateGoalCount() {
    const totalGoals = document.querySelectorAll(".goal-list li").length;
    document.getElementById("goalCount").textContent = totalGoals + " Goals";
}
const goalChecks = document.querySelectorAll(".goalCheck");

function updateGoalCount() {

    let completed = 0;

    goalChecks.forEach(function(goal){
        if(goal.checked){
            completed++;
        }
    });

    document.getElementById("goalCount").textContent =
        completed + " Goals";
}

goalChecks.forEach(function(goal){
    goal.addEventListener("change", updateGoalCount);
});

updateGoalCount();