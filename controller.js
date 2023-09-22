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

function changePage(direction) {
    model.paging.pageIndex += direction;
    view();
}

function changePagingLegnth(length) {
    model.paging.pageIndex = 0;
    model.paging.pageLength = length;
    view();
}

function removeLocalStorage() {
    localStorage.removeItem('storedTasks')
}

function getExampleTasks() {
    model.tasks = [
        { id: 'task1', text: 'Test mål', responsible: 'Per', isDone: false, doneDate: null, deleted: false },
        { id: 'task2', text: 'Test mål 2', responsible: 'Pål', isDone: true, doneDate: '2023-09-15', deleted: false },
        { id: 'task3', text: 'Test mål 3', responsible: 'Gud', isDone: true, doneDate: '2022-02-13', deleted: false },
        { id: 'task4', text: 'Test mål 4', responsible: 'Ole', isDone: false, doneDate: null, deleted: false },
        { id: 'task5', text: 'Test mål 5', responsible: 'Ken', isDone: true, doneDate: '2023-03-08', deleted: false },
        { id: 'task6', text: 'Test mål 6', responsible: 'Ole', isDone: false, doneDate: null, deleted: false },
        { id: 'task7', text: 'Test mål 7', responsible: 'Gud', isDone: false, doneDate: null, deleted: false },
        { id: 'task8', text: 'Test mål 8', responsible: 'Pål', isDone: true, doneDate: '2023-09-11', deleted: false },
        { id: 'task9', text: 'Test mål 9', responsible: 'Gud', isDone: false, doneDate: null, deleted: false },
        { id: 'task10', text: 'Test mål 10', responsible: 'Gud', isDone: false, doneDate: null, deleted: false },
        { id: 'task11', text: 'Test mål 11', responsible: 'Pål', isDone: false, doneDate: null, deleted: false },
        { id: 'task12', text: 'Test mål 12', responsible: 'Pål', isDone: true, doneDate: '2017-07-29', deleted: false },
        { id: 'task13', text: 'Test mål 13', responsible: 'ingen', isDone: true, doneDate: '2022-12-23', deleted: false },
        { id: 'task14', text: 'Test mål 14', responsible: 'Ole', isDone: true, doneDate: '2023-03-24', deleted: false },
        { id: 'task15', text: 'Test mål 15', responsible: 'Ole', isDone: false, doneDate: null, deleted: false },
        { id: 'task16', text: 'Test mål 16', responsible: 'Ken', isDone: true, doneDate: '2021-11-01', deleted: false },
    ];
    view();
}