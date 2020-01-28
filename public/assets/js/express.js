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


// routes:
// route to home page
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});
// route to notes page
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, 'notes.html'));
    
    fs.readFile('allnotes.txt', jsonData, function(err) {
        if (err) throw err;
        
    })
});

// grabs info from the notes file(?) and posts to page
app.post('/api/allnotes', function(req, res) {

    fs.writeFile("test.txt", jsonData, function(err) {
        if (err) {
            console.log(err);
        }
    });

	let newReservation = req.body;

	if (reservationsARR.length < 5) {
		reservationsARR.push(newReservation);
		res.send(`${newReservation.name}, your reservation has been confirmed. Welcome to The Livingroom.`)
	} else {
		waitListARR.push(newReservation);
		res.send(`${newReservation.name}, The Livingroom is full, you have been added to the waitlist.`)
	};

	console.log(`New reservation made for ${newReservation.name}`)
	res.json(newReservation);
	// newTable.routeName = newTable.name.replace(/\s+/g, '').toLowerCase();
});

// starts the server & begins to listen
app.listen(PORT, function() {
	console.log('App listening on PORT ' + PORT);
});