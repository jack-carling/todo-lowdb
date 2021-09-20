const express = require('express');
const lowdb = require('lowdb');
const bodyParser = require('body-parser');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const database = new lowdb(adapter);
const app = express();
const port = 8888;

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/api/tasks', (require, response) => {
  const data = database.get('tasks').value();
  response.send(data);
});

app.post('/api/tasks', (require, response) => {
  if (require.body.task !== undefined) {
    addData(require.body.task);
  }
  if (require.body.id !== undefined) {
    completeData(require.body.id);
  }
  response.json({ success: true });
});

app.delete('/api/tasks/:id', (require, response) => {
  deleteData(require.params.id);
  response.json({ success: true });
});

function addData(inputTask) {
  const checkDatabase = database.getState();
  let databaseElem;
  let newNumber;
  if (checkDatabase.tasks.length > 0) {
    //Om databasen är tom börjar ID nummer om från 1, annars hämta sista
    databaseElem = database.get('tasks').takeRight(1).value();
    newNumber = databaseElem[0].id + 1;
  } else {
    newNumber = 1;
  }
  database.get('tasks').push({ id: newNumber, task: inputTask, completed: false }).write();
}

function completeData(inputID) {
  inputID = Number(inputID);
  const search = database.get('tasks').find({ id: inputID }).value();
  if (search.completed === true) {
    database.get('tasks').find({ id: inputID }).assign({ completed: false }).write();
  } else {
    database.get('tasks').find({ id: inputID }).assign({ completed: true }).write();
  }
}

function deleteData(deleteID) {
  deleteID = Number(deleteID);
  const search = database.get('tasks').remove({ id: deleteID }).write();
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
