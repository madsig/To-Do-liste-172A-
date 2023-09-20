//controller
appElement.addEventListener("click", function (event) {
    let taskNr = model.tasks.length + 1;
    if (event.target.id === "taskButton") {
        let taskName = "task" + taskNr;
        createTask(taskName, taskNr);
        taskNr++;
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

function createTask(name, taskNr) {
    let text = model.inputs.textInput;
    let responsible = model.inputs.respInput;
    let isDone = false;
    let doneDate = null;
    let deleted = false

    if (text === undefined || text === null || text === "") {
        text = "Oppgave " + taskNr;
    }
    if (responsible === undefined || responsible === null || responsible === "") {
        responsible = "ingen";
    }

    const taskName = name;
    model.tasks.push({ id: name, text, responsible, isDone, doneDate, deleted });

    storedTasks = JSON.stringify(model.tasks);
    localStorage.setItem('storedTasks', storedTasks);

    view();
}

function checkTask(event) {
    const tasks = model.tasks;
    let id = event.target.parentElement.parentElement.id;
    index = id.substring(4) - 1;

    if (tasks[index].isDone) {
        tasks[index].isDone = false;

        tasks[index].doneDate = null
    }
    else {
        tasks[index].isDone = true;

        let currentDate = new Date();
        let isoString = currentDate.toISOString();
        let dateOnly = isoString.split('T')[0];
        tasks[index].doneDate = dateOnly;
    }

    storedTasks = JSON.stringify(model.tasks);
    localStorage.setItem('storedTasks', storedTasks);

    view();
}

function deleteTask(event) {
    const id = event.target.parentElement.parentElement.id;
    index = id.substring(4) - 1;
    console.log(id + " deleted");
    model.tasks[index].deleted = true;

    storedTasks = JSON.stringify(model.tasks);
    localStorage.setItem('storedTasks', storedTasks);

    view();
}

function editTask(event) {
    const tasks = model.tasks;
    const inputs = model.inputs;
    let id = event.target.parentElement.parentElement.id;
    index = id.substring(4) - 1;

    let text = inputs.textInput;
    let responsible = inputs.respInput;

    if (text === undefined || text === null || text === "") {
        text = tasks[index].text;
    }
    if (responsible === undefined || responsible === null || responsible === "") {
        responsible = tasks[index].responsible
    }

    tasks[index].text = text;
    tasks[index].responsible = responsible;

    storedTasks = JSON.stringify(model.tasks);
    localStorage.setItem('storedTasks', storedTasks);

    view();
}

//Terje
function filterByResponsible(name){    
    model.inputs.responsibleFilter = name == '' ? null : name;
    view();
}

function sortByDate(sortType) {
    console.log("sortType " + sortType);
    console.log("var before " + model.inputs.dateSortedBy);
    if (sortType == '') model.inputs.dateSortedBy = null;
    else model.inputs.dateSortedBy = sortType;
    console.log("var after " + model.inputs.dateSortedBy);
    view();
}

function removeLocalStorage() {
    localStorage.removeItem('storedTasks')
}