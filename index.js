var express = require("express");
var app = express();

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");

var workoutSchema = new mongoose.Schema({
    workoutName: String,
    videoLink: String,
    Rating: Number,
    QuickFacts: {
                MusclesWorked: String,
                Type: String,
                SkillLevel: String,
                GeneralRemark: String
    },
    WorkoutLoad: {
                EasyCount: Number,
                MediumCount: Number,
                HardCount: Number
    },
    imagelink: String,
    workoutInstructions: [{type: String}],
    tips: [{type: String}]
    
})

var workoutModel = mongoose.model("WORKOUTSCHEMA",workoutSchema); 

var workoutExample=new workoutModel({workoutName: "Bench-PressFROMDB", videoLink:"", Rating: 1, QuickFacts:{MusclesWorked:"a", type:"B", SkillLevel:"C", GeneralRemark:"D"}, WorkoutLoad: {EasyCount:10, MediumCount:20, HardCount:30}, imagelink:"", workoutInstructions:["a"], tips:["b"]});

// workoutExample.save(function(err, workout){
//     if(err){
//         console.log("Error Generated while saving object");
//     }
//     else{
//         console.log("we saved the obj to db");
//         console.log(workoutExample);
//     }
// });




// var testSchema = new mongoose.Schema({
//     content1: String,
//     content2: Number,
//     content3: String
// });

//var TESTCLASSMODEL = mongoose.model("TESTSCHEMA", testSchema);
//var testExample = new TESTCLASSMODEL({content1: "This is the string message", content2: 45, content3: "This is message two!"});

// testExample.save(function(err, cat){
//     if(err){
//         console.log("ERROR GENERATED!");
//     }
//     else{
//         console.log("WE SAVED THE OBJECT THE THE DB");
//         console.log(testExample);
//     }
// });

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render('home');
});

app.get("/home", function(req,res){
    res.render('new_homepage');
})

app.get("/dbadd", function(req,res){
    res.render('dbadd');
});

app.get("/workout", function(req,res){
    workoutModel.find({}, function(err, obj){
        if(err){
            console.log("OH NO! We got an error here!");
        }
        else{
            console.log(obj);
            console.log(obj[0].workoutName);
            res.render('workout', {objpassed:obj});
        }
    })
   //res.render('workout'); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has Started!");
})