// ===============================================================================
// LOAD DATA
// Linking routes to a notes.json file "data" source.
// Load fs package to write and read from the notes.json file.
//================================================================================
var notes = require("../db/notes.json");
const fs = require("fs");
// ===============================================================================
// Module export of ROUTING functions
// ===============================================================================
module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // Get notes data from the notes.json file and post to screen.
  app.get("/api/notes", (req, res) => {
    //Return notes
    res.json(notes);
  });
  //Get the note of corresponding id to post to screen.
  app.get("/api/notes/:id", (req, res) => {
      //Find the note to get and assign to note
      const note = notes.find(c => c.id === parseInt(req.params.id));
      //Send 404 for no note found
      if (!note) return res.status(404).send('This note was not found');
  });
  //Post new note to the notes.json file.
  app.post('/api/notes', (req, res) => {
      // Send error 404 if note is not entered at the time save button is hit.
      if (!req.body.title) res.status(404).send(`A new note is required`);
      // Assign note values to the new note
      const note = {
          id: notes.length + 1,
          title: req.body.title,
          text: req.body.text
      };
      //Attach new note to the notes array.
      notes.push(note);
      //Rewrite the new notes list to list to notes.json
      fs.writeFile("./db/notes.json", JSON.stringify(notes), function (err) {
        if (err) throw err;
        console.log("Writing to json file");
      });
      res.send(note);
  });
  //Delete selected note from the notes.json file.
  app.delete("/api/notes/:id", (req, res) => {
    //Find the note to delete
    var note = notes.find(c => c.id === parseInt(req.params.id));
    //Send 404 for no note found
    if (!note) return res.status(404).send('This note was not found');
    //Assign the index of the note to the variable index.
    const index = notes.indexOf(note);
    //Remove note from notes using the provided index
    notes.splice(index,1);
    //Write to json file updated list of notes
    fs.writeFile("./db/notes.json", JSON.stringify(notes), function (err) {
        if (err) throw err;
        console.log("Deleting note from json file");
        res.end();
      });
    res.send(note);  
});
};
