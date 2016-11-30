var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var shortid = require('shortid');
var bcrypt = require('bcrypt');

var PORT = 3000;
var app = express();



/////////////////////
//Set up DB
/////////////////////

//create connection
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;



/////////////////////
//Create DB Schema
/////////////////////


var taskSchema = mongoose.Schema({
  id: String,
  username: String,
  task: String,
  done: Boolean,
  subTasks: Array
});

var Task = mongoose.model('Task', taskSchema);

var userSchema = mongoose.Schema({
  id: String,
  username: String,
  hashedPW: String
});

var User = mongoose.model('User', userSchema);





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

    //console.log("doc doc doc ", doc);
    res.status(200).send(doc);

  })



});

/////////////
// Add Task
/////////////
app.post('/task', function(req, res) {
  req.body.id = shortid.generate();
  req.body.done = false;

  //console.log('POST body: ', req.body);

  var task = new Task(req.body);

  task.save(function (err, task) {

    if (err) return console.error(err);
    console.log("task in callback ", task);
    res.status(201).send(task);

  });

});


///////////////
// Toggle Done 
///////////////
app.post('/task/update', function(req, res) {
  console.log('Server Updating Task: ', req.body);
  console.log(Array.isArray(req.body.subTasks));

  if(req.body.purpose === "done"){

    Task.update({id: req.body.id },{ done: req.body.done }).exec();

  } else if(req.body.purpose === "subTasks"){

    console.log("inside subTask Updater");

    Task.update({id: req.body.id }, {subTasks: req.body.subTasks })
    .exec()



  }


});


////////////////
// Delete Task
////////////////
app.post('/task/delete', function(req, res) {
  console.log('Server deleting Task: ', req.body);

  taskId = req.body.secret === "I'm not a hacker" ? req.body.id : "FakeId"; 

  Task.remove({id: taskId }).exec();

});


///////////////
// Register New User and Password
///////////////
app.post('/user/create', function(req, res) {
  console.log('Server Creating USER & PW Combo: ', req.body);

  var id = shortid.generate();
  var username = req.body.username;
  var password = req.body.password;



  User.find({username: username})
  .then(function(found){
    if(!found[0]){
      console.log("no user found :)")

      bcrypt.hash(password, 13, function(err, hash){
        if(err) {
          console.log(err)
        } else {
          var newUser = new User({id: id, username: username, hashedPW: hash});
          newUser.save()
          // .then Redirect???
        }
      });

    } else {
      console.log("found...? ", found);
      //Error, USERNAME ALREADY EXISTS

    }
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






















