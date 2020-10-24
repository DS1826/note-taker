// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
const app = express();
const PORT = 8080;
const mainDir = path.join(__dirname, "/public");

// Sets up the Express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes to HTML Files
app.get("/", function (req, res) {
    res.sendFile(path.join(mainDir, "index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(mainDir, "notes.html"));
});

// Routes to GET and POST saved notes 
app.get("/api/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// const savedNotes = fs.readFileSync("./db/db.json").toString();
// console.log(savedNotes);

app.post("/api/notes", function (req, res) {
    // creates const to parse JSON file
    let savedData = fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        let savedNotes = JSON.parse(data);
        console.log(savedNotes);

        let newNote = req.body;
        console.log(newNote);

        savedNotes.push(newNote);

        savedNotes = JSON.stringify(savedNotes);

        // create writeFile function to save new notes  
        fs.writeFile("./db/db.json", savedNotes, "utf8", (err) => {
            if (err) throw err;
            console.log("New Note written to file");
        });

        res.json(JSON.parse(savedNotes));


    });

});

// Starts the server to begin listening
app.listen(PORT, function () {
    console.log(`App is listening on http://localhost:${PORT}`);
});
