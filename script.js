const taskInput = document.getElementById("taskInput")
const addbtn = document.getElementById("addbtn")
const taskList = document.getElementById("taskList")
const filterInput = document.getElementById("filter")


let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function renderTasks() {
    taskList.innerHTML = "";

    const selectedCategory = document.getElementById("filterCategory").value;
    const filteredTasks = selectedCategory === "All"
        ? tasks
        : tasks.filter(t => t.category === selectedCategory)

    const searchTerm = filterInput.value.toLowerCase()

    const searchFilteredTasks = filteredTasks.filter(taskObj =>
        taskObj.task.toLowerCase().includes(searchTerm)
    )

    searchFilteredTasks.forEach((taskObj, index) => {
        const li = document.createElement("li")
        li.className = "list-group-item d-flex justify-content-between align-items-center"

        li.innerHTML = `<div><input type="checkbox" onchange="toggleDone(${index})" ${taskObj.done ? "checked" : ""}>
        <span class="${taskObj.done ? 'text-decoration-line-through' : ''}">
        <strong>${taskObj.task}</strong>
        <br>
        <small class="text-muted">${taskObj.time}</small></span></div>
        <div>
        <span class="badge me-2${getBadgeColor(taskObj.category)}">${taskObj.category}</Span>
        <button class="btn btn-sm btn-outline-info" onclick="editTask(${index})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
        </div>`

        taskList.appendChild(li)
    })
}

let editIndex = null

function editTask(index) {
    const task = tasks[index]

    document.getElementById("editTask").value = task.task;
    document.getElementById("editCategory").value = task.category;
    editIndex = index

    document.getElementById("editSection").classList.remove("d-none")
}


function deleteTask(index) {
    tasks.splice(index, 1)
    saveTasks()
    renderTasks()
}

addbtn.addEventListener("click", () => {
    const task = taskInput.value.trim()
    const category = document.getElementById("category").value

    if (task !== "") {
        const taskObj = {
            task: task,
            category: category,
            time: new Date().toLocaleString(),
            done: false,  // when adding new task
        }

        tasks.push(taskObj)
        saveTasks()
        renderTasks()
        taskInput.value = "";
    }

})

function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}




document.getElementById("updatebtn").addEventListener("click", () => {
    const UpdatedTask = document.getElementById("editTask").value.trim();
    const UpdatedCategory = document.getElementById("editCategory").value;

    if (editIndex !== null && UpdatedTask !== "") {

        tasks[editIndex] = {
            task: UpdatedTask,
            category: UpdatedCategory,
            time: new Date().toLocaleString()
        }
        saveTasks()
        renderTasks()
        editIndex = null

        document.getElementById("editSection").classList.add("d-none")
    }
})


filterInput.addEventListener("input", renderTasks)

document.getElementById("filterCategory").addEventListener("change", renderTasks)



function getBadgeColor(category) {
    if (category === "Personal") return " bg-info text-dark"
    if (category === "Work") return " bg-warning text-dark"
    return " bg-secondary"
}

renderTasks()





