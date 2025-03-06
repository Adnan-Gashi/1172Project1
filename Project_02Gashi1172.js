document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("ToDoList");
    const taskList = document.getElementById("task-list");
    let Items = [];

    taskForm.onsubmit = function (event) {
        event.preventDefault();

        const taskTitle = document.getElementById("task-title").value;
        const taskPriority = document.getElementById("task-priority").value;
        
        //Checks to see if there is a user input
        if (taskTitle.trim() === "") {
            alert("Please enter a name for the item.");
            return;
        }

        
        const item = { title: taskTitle, priority: taskPriority, status: "pending" };
        Items.push(item);

        
        addItem(item, Items.length - 1);
        taskForm.reset();
        document.getElementById("task-title").focus();
    };

    function addItem(item, index) {
        const li = document.createElement("li");
        //Provides CSS and HTML to list items that get created when submitting
        li.className = `list-group-item d-flex justify-content-between align-items-center ${item.status === "completed" ? "completed" : ""}`;
        li.innerHTML = 
            `
            <span>${item.title}, <strong>${item.priority}</strong>, ${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
            <div>
                <button class="btn btn-md btn-primary me-2 mark-complete">Complete</button>
                <button class="btn btn-md btn-danger remove-task">Remove</button>
            </div>
            `;
        li.setAttribute("data-index", index);
        taskList.appendChild(li);

     
        li.querySelector(".mark-complete").addEventListener("click", () => completeTask(index));
      
        li.querySelector(".remove-task").addEventListener("click", () => removeTask(index));
    }
    // Changes the status to completed, adding a completed class that applies the strike-through
    function completeTask(index) {
        Items[index].status = "completed"; 
        const taskItem = taskList.querySelector(`[data-index='${index}']`);
        taskItem.classList.add("completed");
        taskItem.querySelector(".mark-complete").textContent = "Completed";
        taskItem.querySelector("span").innerHTML = `${Items[index].title}, <strong>${Items[index].priority}</strong>, Completed`;
    }
    // Removes tasks from Items array
    function removeTask(index) {
        Items.splice(index, 1); 
        updateDOM(); 
    }

    //Clears and adds tasks onto the list
    function updateDOM() {
        taskList.innerHTML = ""; 
        Items.forEach((task, index) => addItem(task, index)); 
    }
});
