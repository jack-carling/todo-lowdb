const inputElem = document.querySelector('#input');
const submitBtn = document.querySelector('#submit');
const listElem = document.querySelector('#list');

let data = [];

function prepareData() { //Förbereder data | Error om inputfältet är tomt
  const input = inputElem.value;
  if (input !== '') {
    addData(input);
    inputElem.value = '';
    inputElem.focus();
  } else {
    submitBtn.classList.remove('shake');
    void submitBtn.offsetWidth; //För att nollställa animation
    submitBtn.classList.add('shake');
  }
  //
}

async function addData(input) { //Skickar data till databas
  const task = {task: input};
  const url = 'http://localhost:8888/api/tasks';
  const response = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task)
  });
  const data = await response.json();
  getData();
}

async function getData() { //Hämtar data från databas
  const url = 'http://localhost:8888/api/tasks';
  const response = await fetch(url);
  data = await response.json();
  displayData();
}

getData();

function displayData() { //Visar all data från databas
  listElem.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
    let node = document.createElement('li');
    let deleteIcon = `<i class="material-icons" delete-id="${data[i].id}">delete</i>`;
    let checkIcon;
    if (data[i].completed === true) { //Om completed:true ska class=check vara med så den är grön
      checkIcon = `<i class="material-icons check" check-id="${data[i].id}">check_box</i>`;
    } else {
      checkIcon = `<i class="material-icons" check-id="${data[i].id}">check_box</i>`;
    }
    node.innerHTML = deleteIcon + checkIcon + data[i].task;
    listElem.append(node);
  }
}

async function deleteData(deleteID) { //Tar bort data
  const url = `http://localhost:8888/api/tasks/${deleteID}`;
  const response = await fetch(url, {method: 'DELETE'});
  const data = await response.json();
  getData();
}

async function completeData(checkID) { //Checkar data
  const task = {id: checkID};
  const url = 'http://localhost:8888/api/tasks';
  const response = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(task)
  });
  const data = await response.json();
  getData();
}

submitBtn.addEventListener('click', () => {
  prepareData();
});

inputElem.addEventListener('keyup', (event) => {
 if (event.key === 'Enter') {
   prepareData();
 }
});

listElem.addEventListener('click', (event) => {
  /*
  När användaren klickar på li-elementen får man antingen
  Attributet delete-id från papperskorg-ikonen
  Attributet check-id från check-ikonen
  Detta visar vilken av funktionerna som ska göras
  ID-numret skickas vidare för att berätta vilken av li-elementen som ska tas bort eller checkas av
  */
  const deleteID = event.target.getAttribute('delete-id');
  const checkID = event.target.getAttribute('check-id');
  if (deleteID !== null) {
    deleteData(deleteID);
  }
  if (checkID !== null) {
    completeData(checkID);
  }
});