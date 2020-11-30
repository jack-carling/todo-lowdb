const lowdb = require('lowdb'); 
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json');
const database = new lowdb(adapter);

//console.log() är allt ni behöver för den första lowdb-övningen
console.log(database.get('names').value());