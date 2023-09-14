//model
const model = {
    tasks: [
        { id: 'task1', text: 'Test mål', responsible: 'Per', isDone: false, doneDate: null },
        { id: 'task2', text: 'Test mål 2', responsible: 'Pål', isDone: true, doneDate: '2023-09-08' },
        { id: 'task2', text: 'Test mål 3', responsible: 'Gud', isDone: true, doneDate: '2023-09-08' },
        { id: 'task2', text: 'Test mål 4', responsible: 'Ole', isDone: true, doneDate: '2023-09-08' },
        { id: 'task2', text: 'Test mål 5', responsible: 'Ken', isDone: true, doneDate: '2023-09-08' },
        { id: 'task2', text: 'Test mål 6', responsible: 'Ole', isDone: true, doneDate: '2023-09-08' },
        { id: 'task2', text: 'Test mål 7', responsible: 'Gud', isDone: true, doneDate: '2023-09-08' },
        { id: 'task2', text: 'Test mål 8', responsible: 'Pål', isDone: true, doneDate: '2023-09-08' },
        { id: 'task2', text: 'Test mål 9', responsible: 'Gud', isDone: true, doneDate: '2023-09-08' },
    ],
    inputs: {
        textInput: '',
        respInput: '',
        responsibleFilter: null,
    },

};

const appElement = document.getElementById('app');

//view
view();
function view() {
    let tasks = model.tasks;
    tasks = getFilteredListByResponsible(tasks);
    appElement.innerHTML = /*HTML*/`
        ${getTableHtml(tasks)}
        Oppgave: <input id="taskId" type="text"  onchange="textInput=this.value"><br/>
        Ansvarlig: <input id="respId" type="text" , onchange="respInput=this.value"><br/>
        <button id="taskButton">Legg til oppgave</button><br/>
        <hr/>
        ${getFilterByResponsibleHtml()}
        <hr/>
    `;
}

function getFilteredListByResponsible(tasks){
    const responsible = model.inputs.responsibleFilter;
    if (responsible == null) return tasks;
    return model.tasks.filter(t=>t.responsible==responsible);      
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
        tableHtml += /*HTML*/ `
            <tr>
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
    const namesArray = new Set(model.tasks.map(t=>t.responsible));
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

function getNames() {
    let nameList = [];
    for (i = 0; i < drawnTasks.length; i++) {
        let id = "task" + (i + 1);
        if (nameList.includes(tasks[id].responsible)) continue;
        else nameList.push(tasks[id].responsible)
    }
    return nameList;
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