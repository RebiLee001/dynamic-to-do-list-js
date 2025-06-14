document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false));
  }

  // Save all tasks to Local Storage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach((li) => {
      tasks.push(li.firstChild.textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add a new task
  function addTask(taskText, save = true) {
    if (!taskText || taskText.trim() === "") {
      alert("Please enter a task.");
      return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    removeBtn.onclick = () => {
      li.remove();
      saveTasks();
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
      saveTasks();
    }

    taskInput.value = "";
  }

  // Event listener for Add Task button
  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    addTask(taskText);
  });

  // Event listener for pressing Enter
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const taskText = taskInput.value.trim();
      addTask(taskText);
    }
  });

  // Initial load
  loadTasks();
});
