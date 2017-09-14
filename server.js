var express    = require("express");
var path = require('path');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var login_status = 0;
//var myWindow = window.open("", "Error", "width=200,height=100");
 var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : 'root',
   database : 'user'
 });
 var app = express();

 connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");
 } else {
     console.log("Error connecting database ... \n\n");
 }
 });


app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/', function(req, res) {
  // res.sendFile(path.join(__dirname,'main.html'))
  if (login_status > 0)
     res.sendFile(path.join(__dirname,  'sample.html'));
  else  res.sendFile(path.join(__dirname,  'login.html'));
});
app.get('/new-webpage', function(req, res) {
  // res.sendFile(path.join(__dirname,'ui','main.html'))
  if (login_status > 0)
    res.sendFile(path.join(__dirname,  'sample.html'));
  else  res.sendFile(path.join(__dirname,  'login.html'));
});


app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname,  'login.html'));
});
app.post('/login_post', function(req, res) {
  if (req.method == "POST") {
    //var sql = "select * from users where email='allanjojoa@gmail.com' and password='allan';";
    console.log(req.body.userid);
    var sql = "select * from users where username='" + req.body.userid + "' and password='" + req.body.password + "';";
    connection.query(sql, function(err, result) {
      numRows = result.length;
      if (numRows > 0) {
        login_status = 1;
         res.sendFile(path.join(__dirname,  'sample.html'));
      } else 
alert("I am an alert box!");
res.sendFile(path.join(__dirname,  'su.html'));
});

  }
});



app.post('/sign_in', function(req, res) {
if (req.method == "POST") {
  res.sendFile(path.join(__dirname, 'su.html'));
}
});


app.post("/signup_post", function(req, res) {
  if (req.method == 'POST') {
    var sql = "INSERT INTO users (username,email,password) VALUES ('" + req.body.fname + "','" + req.body.email + "','" + req.body.password + "')";
    connection.query(sql, function(err, result) {
      if (err) 
      console.log("1 new user");
    });
    res.sendFile(path.join(__dirname,  'login.html'));
  }
});

app.listen(3000);
