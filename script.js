document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const clearButton = document.getElementById("clear-task-btn");
  const taskCount = document.getElementById("task-count");

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create list item and remove button
    const li = document.createElement("li");
    li.textContent = taskText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      updateTaskCount();
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
    taskInput.value = "";
    updateTaskCount();
  }

  addButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
