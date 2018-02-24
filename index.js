var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render('home');
});

app.get("/workout", function(req,res){
   res.render('workout'); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has Started!");
})