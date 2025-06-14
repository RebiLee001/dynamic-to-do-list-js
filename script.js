document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const clearButton = document.getElementById("clear-task-btn");
  const taskCount = document.getElementById("task-count");

  // load task count from localStorage
  loadTasks();

  // Add event listener for add button
  addButton.addEventListener("click", () => addTask(taskInput.value));

  // Add event listener for add button
  addButton.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask(taskInput.value);
    }
  });

  //function to add task
  function addTask(taskText, save = true) {
    const trimmedText = taskText.trim();
    if (trimmedText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create list item and remove button
    const li = document.createElement("li");
    li.textContent = trimmedText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeTask(trimmedText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
    taskInput.value = "";
    updateTaskCount();

    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(trimmedText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
      saveTask(trimmedText);
    }
  }

  // Function to load tasks
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((task) => addTask(task, false));
  }

  // Function to remove tasks from localStorage
  function removeTask(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = storedTasks.filter((task) => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    updateTaskCount();
  }
});
