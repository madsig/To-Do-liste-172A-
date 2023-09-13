//model
let task1 = { id: 'task1', text: 'Test mål', responsible: 'Gud', isDone: false, doneDate: null };
let task2 = { id: 'task2', text: 'Test mål 2', responsible: 'Gud', isDone: true, doneDate: '2023-09-08' };
let drawnTasks = [task1, task2];
let tasks = { task1, task2 };
let taskNr = 3;
let textInput;
let respInput;
let namesArray;
let isFiltered = false;
let isSorted = false;
let filteredObjects = [];
const appElement = document.getElementById('app');

//view
view();
function view() {
    namesArray = getNames();
    HTML = getTable(drawnTasks);
    HTML += /*HTML*/`
         Oppgave: <input id="taskId" type="text"  onchange="textInput=this.value"><br/>
         Ansvarlig: <input id="respId" type="text" , onchange="respInput=this.value"><br/>
         <button id="taskButton">Legg til oppgave</button><br/>
     `
    HTML += getFilter();
    textInput = '';
    respInput = '';
    appElement.innerHTML = HTML;
}

function getTable(taskArray) {
    let table = /*HTML*/ `
         <table>
             <tr>
                 <th>Oppgave</th>
                 <th>Ansvarlig</th>
                 <th>Ferdig?</th>
                 <th>Ferdig dato</th>
                 <th>Slett</th>
                 <th>Rediger</th>
             </tr>
     `
     if (isFiltered) {
        table += getFilteredTable();
     }
     else {
         for (i = 0; i < taskArray.length; i++) {
             table += /*HTML*/ `
                  <tr id="${drawnTasks[i].id}">
                      <td>${drawnTasks[i].text}</td>
                      <td>${drawnTasks[i].responsible}</td>
                      <td class="checkbox"><input type="checkbox" ${drawnTasks[i].isDone ? 'checked' : ''}></td>
                      <td class="number">${drawnTasks[i].doneDate === null ? '' : drawnTasks[i].doneDate}</td>
                      <td class="delete"><button id="deleteButton">Slett</button></td>
                      <td class="edit"><button id="editButton">Rediger</button></td>
                  </tr>
              `
         }
     }
    table += /*HTML*/`</table>`
    return table;
}

function getFilter() {
    let SELECT = /*HTML*/`
         <label for="responsible">Filtrer etter ansvarlig:</label>
         <select name="responsible" id="filter">
            <option value="noneSelected">Velg navn</option>
     `;
    for (let names of namesArray) {
        SELECT += /*HTML*/`
             <option value="${names}">${names}</option>
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