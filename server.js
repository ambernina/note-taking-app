// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

// set up the express app
let app = express();
const PORT = process.env.PORT || 3000;

// handles the data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
console.log(data);

const writeNote = function(){
	fs.writeFile("./db/db.json", JSON.stringify(data), err => {
		if (err) throw err;
	});
};



app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// grabs info from the notes file(?) and posts to page
app.post('/api/notes', function(req, res) {
	let newNote = req.body;
	if (data.length === 0) {
		let id = 1;
	} else {
		let id = parseInt(data[data.length - 1].id) + 1;
	}
	newNote.id = id;
	data.push(newNote);
	console.log(newNote);
	writeNote();
	return res.json(data);
});

app.get('/api/notes', function(req, res) {
	fs.readFile('.db/db.json', 'utf8', (err, data) => {
		console.log(data);
		if (err) throw err;
		const note = JSON.parse(data);
		return res.json(data);
	})
});

app.delete('/api/notes/:id', function(req, res) {
	let newData = [];
	for (var i = 0; i < data.length; i++) {
		if(data[i].id !== parseInt(req.params.id)) {
			newData.push(data[i]);
		}
	}
	data = newData;
	writeNote();
	res.json(data);
})

app.listen(PORT, function() {
	console.log('Listening on PORT ' + PORT);
});