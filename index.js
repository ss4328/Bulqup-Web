var express = require("express");
var app = express();
const fs = require('fs');
var mongoose = require("mongoose");

console.log("above fs shit")

let rawdata = fs.readFileSync('public/other-resources/config.JSON');
let JSONFromConfig = JSON.parse(rawdata);  
console.log(JSONFromConfig);

mongoose.connect(JSONFromConfig.connectionString);

//mongoose.connect("mongodb://localhost/test");
var workoutSchema = new mongoose.Schema({
    workoutName: String,
    videoLink: String,
    Rating: Number,
    QuickFacts: {
                MusclesWorked: String,
                WorkoutType: String,
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
    
});

var workoutModel = mongoose.model("WORKOUTSCHEMA",workoutSchema); 

var workoutExample=new workoutModel({workoutName: "Bench-PressFROMDB", videoLink:"", Rating: 1, QuickFacts:{MusclesWorked:"a", type:"B", SkillLevel:"C", GeneralRemark:"D"}, WorkoutLoad: {EasyCount:10, MediumCount:20, HardCount:30}, imagelink:"", workoutInstructions:["a"], tips:["b"]});


//dont uncomment this


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
    res.redirect('/workouts');
    // res.render('home');
});

app.get("/home", function(req, res){
    res.render('new_homepage');
});

// app.get("/home", function(req,res){
//     res.render('new_homepage');
// })

app.get("/dbadd", function(req,res){
    res.render('dbadd');
});

app.post("/populateTables", function(req,res){
    console.log("reached populateTables");
    
    var workoutName = req.body.workoutName;
    var tutorialLink  = req.body.tutorialLink;
    var displayImage = req.body.displayImage;
    var rating  = req.body.rating;
    
    var musclesWorked = req.body.musclesWorked;
    var workoutType = req.body.workoutType;
    var skillLevel=req.body.skillLevel;
    var generalRemarks=req.body.generalRemarks;
    
    var easyCount=req.body.easyCount;
    var mediumCount=req.body.mediumCount;
    var hardCount =req.body.hardCount;
    
    var relworkout1 = req.body.relworkout1;
    var relworkout2 = req.body.relworkout2;
    var relworkout3 = req.body.relworkout3;
    
    var ins1 = req.body.ins1;
    var ins2 = req.body.ins2;
    var ins3 = req.body.ins3;
    var ins4 = req.body.ins4;
    
    var tip1 =req.body.tip1;
    var tip2 =req.body.tip2;
    var tip3 =req.body.tip3;
    var tip4 =req.body.tip4;
    
    var workoutToAdd=new workoutModel({workoutName: workoutName, videoLink:tutorialLink, Rating: rating, QuickFacts:{MusclesWorked:musclesWorked, WorkoutType:workoutType, SkillLevel:skillLevel, GeneralRemark:generalRemarks}, WorkoutLoad: {EasyCount:easyCount, MediumCount:mediumCount, HardCount:hardCount}, imagelink:displayImage, workoutInstructions:[ins1, ins2, ins3, ins4], tips:[tip1,tip2,tip3,tip4]});
    
    
    workoutToAdd.save(function(err, cat){
    if(err){
        console.log("ERROR GENERATED!: "+err);
    }
    else{    
        console.log("WE SAVED THE OBJECT THE THE DB");
        console.log(workoutToAdd);
    }
});
    
    console.log(req.body.mainForm);
    console.log('Workout Name: '+ workoutName);
    console.log((req.xhr).toString());
    res.redirect('/dbadd');
});

app.get("/workouts", function(req,res){
    res.render('workouts');
    // res.render('home');
});

app.get("/workouts/:workoutRequested", function(req,res){
    var databaseId ="";
    if(req.params.workoutRequested=="benchPress"){
        console.log("requested benchPress");
        databaseId=JSONFromConfig.benchPressID.toString();
    }
    else if(req.params.workoutRequested=="barbellRow"){
        console.log("requested barbellRow");    
        databaseId=JSONFromConfig.barbellRowID.toString();
    }
    else if(req.params.workoutRequested=="deadlift"){
        console.log("requested deadlift");    
        databaseId=JSONFromConfig.deadliftID.toString();
    }
    else if(req.params.workoutRequested=="overheadPress"){
        console.log("requested overheadPress");    
        databaseId=JSONFromConfig.overheadPressID.toString();
    }else if(req.params.workoutRequested=="squat"){
        console.log("requested squat");    
        databaseId=JSONFromConfig.squatID.toString();
    }
    
    
    workoutModel.findById(databaseId, function(err, obj){
        if(err){
            console.log("OH NO! We got an error here! " + err);
        }
        else{
            console.log("No error connecting to DB");
            console.log(obj);
            console.log(obj.workoutName);
            res.render('workoutTemplate', {objpassed:obj});
        }
    })
   //res.render('workoutTemplate'); 
});

app.get('*', function(req, res){
  res.render('routeNotFound');
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has Started!");
});