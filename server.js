// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
const app = express();
const PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Routes to HTML Files
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "..", "..", "index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "..", "..", "notes.html"));
});

// Starts the server to begin listening
app.listen(PORT, function() {
console.log(`App is listening on http://localhost:${PORT}`);
});
