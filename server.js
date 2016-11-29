var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var PORT = 3000;
var app = express();



/////////////////////
//Set up DB
/////////////////////

//create connection
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

//create a schema
var taskSchema = mongoose.Schema({
  username: String,
  task: String,
  done: Boolean
});

var Task = mongoose.model('Task', taskSchema);





////////////////////////
//Set up Middleware / Routes
////////////////////////

//app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/client"));

app.get("/", function(req, res){

  console.log("get query: ", req.query);
  res.send('Got your get');

});


app.get("/api/tasks", function(req, res){

  Task.find()
  .then(function(doc){

    console.log(doc);
    res.status(200).send(doc);

  })



});

app.post('/task', function(req, res) {

  console.log('POST body: ', req.body);

  var task = new Task(req.body);

  task.save(function (err, task) {

    if (err) return console.error(err);
    res.status(201).send(task);

  });

});





// app.post("/*", function(req, res){

//   console.log("post body: ", req.body);
//   res.send('Got your post');

// });




/////////////////
// Fire 'em' up!
/////////////////

db.on('error', function(err){
  console.log("conection error: ", err);
});

db.once('open', function(){

  console.log("Database connection has been established");

  app.listen(PORT, function(){
    console.log("Server listening on port: ", PORT);
  });

});






















