
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

//app.get('/', (request, result) => result.send('Hello Susanne'));
const directoryPath = __dirname + '/public/';
let notesArray = [];

app.get('/', (request, result) => result.sendFile(path.join(directoryPath , 'index.html')));

app.get('/notes', (request, result) => result.sendFile(path.join(directoryPath, 'notes.html')));

// Get text from the user and save to notes array, use a Post to add the new note and return the new notes to the user.
app.get('/api/notes', (request, result) => {
  //console.log('Inside get before ', notesArray);
  fs.readFile('./db/db.json','utf8', function(err, data){
    if(err) throw err;
     //do operation on data that generates say resultArray;
     notesArray = JSON.parse(data);
    // console.log('Object ', notesArray);
     return result.json(notesArray);
  });  
});

app.get('/api/notes/:newText', (request, result) => {
  const newText = request.params.character;

  console.log(newText);

});

app.post('/api/notes', (request, result) => {
  const newNotes = request.body;

  console.log(newNotes);

  notesArray.push(newNotes);

  console.log('Notes Array ', newNotes);
  
  result.json(newNotes);
  
  // Title: x, there is a delete function.
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));