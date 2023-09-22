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
        { id: 'task10', text: 'Test mål 10', responsible: 'Gud', isDone: false, doneDate: null, deleted: false },
        { id: 'task11', text: 'Test mål 11', responsible: 'Pål', isDone: false, doneDate: null, deleted: false },
        { id: 'task12', text: 'Test mål 12', responsible: 'Pål', isDone: true, doneDate: '2017-07-29', deleted: false },
        { id: 'task13', text: 'Test mål 13', responsible: 'ingen', isDone: true, doneDate: '2022-12-23', deleted: false },
        { id: 'task14', text: 'Test mål 14', responsible: 'Ole', isDone: true, doneDate: '2023-03-24', deleted: false },
        { id: 'task15', text: 'Test mål 15', responsible: 'Ole', isDone: false, doneDate: null, deleted: false },
        { id: 'task16', text: 'Test mål 16', responsible: 'Ken', isDone: true, doneDate: '2021-11-01', deleted: false },
    ],
    inputs: {
        textInput: '',
        respInput: '',
        responsibleFilter: null,
        dateSortedBy: null,
    },
    paging: {
        pageIndex: 0,
        pageLength: 10,
        filteredListLength: 0,
    },
};

const appElement = document.getElementById('app');

//view
view();
function view() {
    let tasks = model.tasks;
    let inputs = model.inputs;
    let paging = model.paging;
    tasks = filterOutDeleted(tasks);
    tasks = getFilteredListByResponsible(tasks);
    tasks = getSortedListByDate(tasks);
    tasks = getPagingList(tasks, paging.pageLength, paging.pageIndex);
    appElement.innerHTML = /*HTML*/`
        ${getTableHtml(tasks)}
        ${getPagingHtml()}
        Oppgave: <input id="taskId" type="text" onchange="model.inputs.textInput = this.value"><br/>
        Ansvarlig: <input id="respId" type="text" onchange="model.inputs.respInput = this.value"><br/>
        <button id="taskButton">Legg til oppgave</button><br/>
        
        ${getFilterByResponsibleHtml()}
        ${getSortedByDateHtml()}
    `;
    inputs.textInput = '';
    inputs.respInput = '';
}

function filterOutDeleted(tasks) {
    let filteredList = tasks.filter(t => t.deleted == false);
    return filteredList;
}

function getFilteredListByResponsible(tasks) {
    const responsible = model.inputs.responsibleFilter;
    model.paging.filteredListLength = tasks.length
    if (responsible == null) return tasks;
    let filteredList = model.tasks.filter(t => t.responsible == responsible);
    model.paging.filteredListLength = filteredList.length;
    return filteredList;
}

function getSortedListByDate(tasks) {
    const sorted = model.inputs.dateSortedBy
    if (sorted == null) return tasks;
    let doneTasks = tasks.filter(t => t.isDone);
    let notDoneTasks = tasks.filter(t => !t.isDone);

    let order = sorted == 'ascending' ? -1 : 1;
    doneTasks = doneTasks.sort(function (a, b) {
        return (a.doneDate < b.doneDate) ? order : ((a.doneDate > b.doneDate) ? -order : 0);
    });

    return doneTasks.concat(notDoneTasks);
}

function getPagingList(tasks, length, index) {
    let filterDeleted = tasks.filter(t => t.deleted == false);
    let page = index * length;
    let pageNr = page + length;
    let pagingList = filterDeleted.slice(page, pageNr);
    return pagingList;
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
                <td class="checkbox"><input type="checkbox" ${task.isDone ? 'checked' : ''} name="${task.text + ' checkbox'}"></td>
                <td class="number">${task.doneDate === null ? '' : task.doneDate}</td>
                <td class="delete"><button id="deleteButton">Slett</button></td>
                <td class="edit"><button id="editButton">Rediger</button></td>
            </tr>
        `;
    }
    tableHtml += /*HTML*/`</table>`
    return tableHtml;
}

function getPagingHtml() {
    let maxIndex = Math.ceil(model.paging.filteredListLength / model.paging.pageLength) - 1;
    let pagingHtml = /*HTML*/ `
        <button ${model.paging.pageIndex < 1 ? 'disabled' : ''} onclick="changePage(-1)">⟵</button>
        <button ${model.paging.pageIndex < maxIndex ? '' : 'disabled'} onclick="changePage(1)">⟶</button>
        <select onchange="changePagingLegnth(parseInt(this.value))" name="page length">
            <option value=10 ${10 == model.paging.pageLength ? 'selected' : ''}>10</option>
            <option value=25 ${25 == model.paging.pageLength ? 'selected' : ''}>25</option>
            <option value=50 ${50 == model.paging.pageLength ? 'selected' : ''}>50</option>
        </select><br/>
    `
    return pagingHtml;
}

function getFilterByResponsibleHtml() {
    const namesArray = new Set(model.tasks.map(t => t.responsible));
    let SELECT = /*HTML*/`
         <label for="filter">Filtrer etter ansvarlig:</label>
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
        <label for="sort">Sorter etter dato:</label>
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

document.addEventListener('DOMContentLoaded', function () {
    let storedTasks = localStorage.getItem('storedTasks');

    if (storedTasks) {
        model.tasks = JSON.parse(storedTasks);
        console.log("found local storage");
        view();
    }
    else console.log("no local storage found");
});