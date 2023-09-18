//model
const model = {
    tasks: [
        { id: 'task1', text: 'Test mål', responsible: 'Per', isDone: false, doneDate: null, deleted: false },
        { id: 'task2', text: 'Test mål 2', responsible: 'Pål', isDone: true, doneDate: '2023-09-15', deleted: false },
        { id: 'task3', text: 'Test mål 3', responsible: 'Gud', isDone: true, doneDate: '2022-02-13', deleted: false },
        { id: 'task4', text: 'Test mål 4', responsible: 'Ole', isDone: false, doneDate: null, deleted: false },
        { id: 'task5', text: 'Test mål 5', responsible: 'Ken', isDone: true, doneDate: '2023-03-08', deleted: false },
        { id: 'task6', text: 'Test mål 6', responsible: 'Ole', isDone: false, doneDate: null, deleted: false },
        { id: 'task7', text: 'Test mål 7', responsible: 'Gud', isDone: false, doneDate: null, deleted: false },
        { id: 'task8', text: 'Test mål 8', responsible: 'Pål', isDone: true, doneDate: '2023-09-11', deleted: false },
        { id: 'task9', text: 'Test mål 9', responsible: 'Gud', isDone: false, doneDate: null, deleted: false },
    ],
    inputs: {
        textInput: '',
        respInput: '',
        responsibleFilter: null,
        dateSortedBy: null,
    },
};

const appElement = document.getElementById('app');

//view
view();
function view() {
    let tasks = model.tasks;
    let inputs = model.inputs;
    tasks = getFilteredListByResponsible(tasks);
    tasks = getSortedListByDate(tasks);
    appElement.innerHTML = /*HTML*/`
        ${getTableHtml(tasks)}
        Oppgave: <input id="taskId" type="text" onchange="model.inputs.textInput = this.value"><br/>
        Ansvarlig: <input id="respId" type="text" onchange="model.inputs.respInput = this.value"><br/>
        <button id="taskButton">Legg til oppgave</button><br/>
        
        ${getFilterByResponsibleHtml()}
        ${getSortedByDateHtml()}
    `;
    inputs.textInput = '';
    inputs.respInput = '';
}

function getFilteredListByResponsible(tasks) {
    const responsible = model.inputs.responsibleFilter;
    if (responsible == null) return tasks;
    return model.tasks.filter(t => t.responsible == responsible);
}

function getSortedListByDate(tasks) {
    const sorted = model.inputs.dateSortedBy
    if (sorted == null) return tasks;
    let doneTasks = tasks.filter(t => t.isDone);
    let notDoneTasks = tasks.filter(t => !t.isDone);

    if (sorted === 'ascending') {
        doneTasks = doneTasks.sort(function (a, b) {
            return (a.doneDate < b.doneDate) ? -1 : ((a.doneDate > b.doneDate) ? 1 : 0);
        });
    }
    else if (sorted === 'descending') {
        doneTasks = doneTasks.sort(function (b, a) {
            return (a.doneDate < b.doneDate) ? -1 : ((a.doneDate > b.doneDate) ? 1 : 0);
        });
    }

    return doneTasks.concat(notDoneTasks);
}

function getTableHtml(taskArray) {
    let tableHtml = /*HTML*/ `
         <table>
             <tr>
                 <th>Oppgave</th>
                 <th>Ansvarlig</th>
                 <th>Ferdig?</th>
                 <th>Ferdig dato</th>
                 <th>Slett</th>
                 <th>Rediger</th>
             </tr>
     `;
    for (i = 0; i < taskArray.length; i++) {
        const task = taskArray[i];
        if (task.deleted) continue;
        tableHtml += /*HTML*/ `
            <tr id="${task.id}">
                <td>${task.text}</td>
                <td>${task.responsible}</td>
                <td class="checkbox"><input type="checkbox" ${task.isDone ? 'checked' : ''}></td>
                <td class="number">${task.doneDate === null ? '' : task.doneDate}</td>
                <td class="delete"><button id="deleteButton">Slett</button></td>
                <td class="edit"><button id="editButton">Rediger</button></td>
            </tr>
        `;
    }
    tableHtml += /*HTML*/`</table>`
    return tableHtml;
}

function getFilterByResponsibleHtml() {
    const namesArray = new Set(model.tasks.map(t => t.responsible));
    let SELECT = /*HTML*/`
         <label for="responsible">Filtrer etter ansvarlig:</label>
         <select name="responsible" id="filter" onchange="filterByResponsible(this.value)">
            <option value="">ikke filtrert</option>
     `;
    for (let name of namesArray) {
        const selected = name == model.inputs.responsibleFilter ? 'selected' : '';
        SELECT += /*HTML*/`
             <option value="${name}" ${selected}>${name}</option>
         `
    }
    SELECT += /*HTML*/ `</select><br/>`
    return SELECT;
}

function getSortedByDateHtml() {
    let select = /*HTML*/`
        <label for="sortedDate">Sorter etter dato:</label>
        <select name="sortedDate" id="sort" onchange="sortByDate(this.value)">
            <option value="">ikke sortert</option>
`;
    select += /*HTML*/ `
        <option value ="ascending" ${'ascending' == model.inputs.dateSortedBy ? 'selected' : ''}>Stigende</option>
        <option value ="descending" ${'descending' == model.inputs.dateSortedBy ? 'selected' : ''}>Sykende</option>
`
    select += /*HTML*/`</select>`
    return select;
}

function getFilteredTable() {
    let filteredTable = '';
    for (i = 0; i < filteredObjects.length; i++) {
        filteredTable += /*HTML*/ `
             <tr id="${filteredObjects[i].id}">
                 <td>${filteredObjects[i].text}</td>
                 <td>${filteredObjects[i].responsible}</td>
                 <td class="checkbox"><input type="checkbox" ${filteredObjects[i].isDone ? 'checked' : ''}></td>
                 <td class="number">${filteredObjects[i].doneDate === null ? '' : filteredObjects[i].doneDate}</td>
                 <td class="delete"><button id="deleteButton">Slett</button></td>
                 <td class="edit"><button id="editButton">Rediger</button></td>
             </tr>
         `
    }
    return filteredTable;
}

document.addEventListener('DOMContentLoaded', function () {
    let storedTasks = localStorage.getItem('storedTasks');

    if (storedTasks) {
        model.tasks = JSON.parse(storedTasks);
        console.log("found local storage");
        view();
    }
    else console.log("no local storage found");
});
