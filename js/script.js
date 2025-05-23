const tasks = [];

document.addEventListener('DOMContentLoaded', () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks.push(...JSON.parse(storedTasks));
        displayToDos();
    }

    const input = document.getElementById("toDo-input");
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addToDo();
        }
    });
});

function addToDo() {
    const input = document.getElementById("toDo-input").value.trim();
    if (input === "") return;
    const taskExists = tasks.some(task => task.task === input);
    if (taskExists) {
        alert("Cette tâche existe déjà !");
        return;
    }
    tasks.push({task: input, statut: false});
    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("toDo-input").value = "";
    displayToDos();
}

function editToDo(oldText, newText) {
    const task = tasks.find(t => t.task === oldText);
    if (task) {
        task.task = newText;
        displayToDos();
    }
}

function displayToDos() {
    const ul = document.getElementById("toDo-list");
    ul.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("toDo-item");
        if (task.statut) li.classList.add("completed");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.task;
        taskSpan.addEventListener("click", () => {
            toggleComplete(task.task);
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", () => {
            const newText = prompt("Modifier la tâche :", task.task);
            if (newText && newText.trim() !== "") {
                editToDo(task.task, newText.trim());
            }
        });

        li.addEventListener("dblclick", () => {
            removeToDo(task.task);
        });

        li.appendChild(taskSpan);
        li.appendChild(editBtn);
        ul.appendChild(li);
    });
}

function toggleComplete(taskName) {
    tasks.forEach(task => {
        if (task.task === taskName) {
            task.statut = !task.statut;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayToDos();
}

function removeToDo(taskName) {
    const updatedTasks = tasks.filter(task => task.task !== taskName);
    tasks.length = 0;
    tasks.push(...updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayToDos();
}