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

function displayToDos() {
    const ul = document.getElementById("toDo-list");
    ul.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.task;
        li.classList.add("toDo-item");
        if (task.statut) li.classList.add("completed");

        li.addEventListener("click", () => {
            toggleComplete(task.task);
        });

        li.addEventListener("dblclick", () => {
            removeToDo(task.task);
        });

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