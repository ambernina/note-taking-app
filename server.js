const PORT = process.env.PORT || 8000;
const express = require("express");
const fs = require("fs");
const path = require("path");
let app = express();
const writeData = function(){
  fs.writeFile("./Develop/db/db.json", JSON.stringify(data), err =>{
    if (err) throw err;
      // res.end();
});
}
let data = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));
console.log(data);

app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use(express.static("./Develop/public"));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});

app.post("/api/notes", function(req, res) {
  data.push(req.body);
  console.log(data);
  writeData();
  return res.json(data);
});

app.get("/api/notes", function(req, res) {
  return res.json(data);
});

app.delete("/api/notes/:id", function(req, res){
  const id = req.params.id;
  data = data.filter(function(note){
    if (note.id === id){
      return false;
    }
    return true;
  });
  writeData();
  return res.json(data);
});

app.listen(PORT, function() {
  console.log("Server is listening here: ", PORT);
});
