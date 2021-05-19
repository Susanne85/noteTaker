
const express = require('express');
const fs = require('fs');
const path = require('path');


// Define a port to listen for incoming requests
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());    
app.use(express.static(path.join(__dirname, 'public')));

const directoryPath = __dirname + '/public/';
let notesArray = [];

app.get('/', (request, result) => result.sendFile(path.join(directoryPath , 'index.html')));

app.get('/notes', (request, result) => result.sendFile(path.join(directoryPath, 'notes.html')));

// Get text from the user and save to notes array, use a Post to add the new note and return the new notes to the user.
app.get('/api/notes', (request, result) => {
  fs.readFile('./db/db.json','utf8', function(err, data){
    if(err) throw err;
     //do operation on data that generates say notesArray;
     notesArray = JSON.parse(data);
     for (let i=0; i<notesArray.length; i++) {
      Object.assign(notesArray[i], {"ID": i});
     }
     return result.json(notesArray);
  });  
});

app.delete('/api/notes/:deleteID', (request, result) => {
  const deleteLine = request.params.deleteID;
  const index = notesArray.indexOf(deleteLine);
 // notesArray.splice(index,1);
  console.log('in here2', notesArray);

});

app.post('/api/notes', (request, result) => {
  const newNotes = request.body;

  notesArray.push(newNotes);

  let notesJSON = JSON.stringify(notesArray);
  
  result.json(notesArray);
 
  fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), notesJSON, 'utf-8');
  
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));