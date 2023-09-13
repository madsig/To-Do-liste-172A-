//controller
appElement.addEventListener("click", function (event) {
    if (event.target.id === "taskButton") {
        let taskName = "task" + taskNr;
        createTask(taskName);
    }
    if (event.target.type === "checkbox") {
        checkTask(event);
    }
    if (event.target.id === "deleteButton") {
        deleteTask(event);
    }
    if (event.target.id === "editButton") {
        editTask(event);
    }
})

function createTask(name) {
    let text = textInput;
    let responsible = respInput;
    let isDone = false;
    let doneDate = null;

    if (text === undefined || text === null || text === "") {
        text = "Oppgave " + taskNr;
    }
    if (responsible === undefined || responsible === null || responsible === "") {
        responsible = "ingen";
    }
    taskNr++;

    const taskName = name;
    tasks[taskName] = { id: name, text, responsible, isDone, doneDate };

    drawnTasks.push(tasks[taskName]);
    view();
}

function checkTask(event) {
    const id = event.target.parentElement.parentElement.id;

    if (tasks[id].isDone) {
        console.log('no');
        console.log(tasks[id].isDone);
        tasks[id].isDone = false;

        tasks[id].doneDate = null
    }
    else {
        tasks[id].isDone = true;
        console.log('yes');
        console.log(tasks[id].isDone);

        let currentDate = new Date();
        let isoString = currentDate.toISOString();
        let dateOnly = isoString.split('T')[0];
        tasks[id].doneDate = dateOnly;
    }
    view();
    console.log(id);
    console.log(event);
}

function deleteTask(event) {
    const id = event.target.parentElement.parentElement.id;
    console.log(id + " deleted");
    drawnTasks = drawnTasks.filter(task => task.id !== id);
    view();
}

function editTask(event) {
    const id = event.target.parentElement.parentElement.id;

    let text = textInput;
    let responsible = respInput;

    if (text === undefined || text === null || text === "") {
        text = tasks[id].text;
    }
    if (responsible === undefined || responsible === null || responsible === "") {
        responsible = tasks[id].responsible;
    }

    tasks[id].text = text;
    tasks[id].responsible = responsible;
    view();
}


appElement.addEventListener("change", function (event) {
    if (event.target.id === "filter") {
        filterByNames(event);
        console.log("test test")
    }
})

function filterByNames(event) {
    filteredObjects = [];
    let filter = event.target.value;
    console.log(filter)
    if (filter === "noneSelected") {
        isFiltered = false;
        view();
        return;
    }
    isFiltered = true;
    for (let task of drawnTasks) {
        if (task.responsible === filter) {
            filteredObjects.push(task)
        }
    }
    view(); 
}