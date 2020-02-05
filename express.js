// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// set up the express app
const app = express();
const PORT = process.env.PORT || 8000;

// handles the data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const writeData = function(){
	fs.writeFile("./db/db.json", JSON.stringify(data), err => {
		if (err) throw err;
	});
};

let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
console.log(data);


app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// grabs info from the notes file(?) and posts to page
app.post('/api/notes', function(req, res) {
	data.push(req.body);
	console.log(data);
	writeData();
	return res.json(data);
});

app.get('/api/notes', function(req, res) {
	return res.json(data);
});

app.delete('/api/notes/:id', function(req, res) {
	const id = req.params.id;
	data = data.filter(function(note) {
		if (note.id === id) {
			return false;
		}
		return true;
	});
	writeData();
	return res.json(data);
})

app.listen(PORT, function() {
	console.log('Listening on PORT ' + PORT);
});