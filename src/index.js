const express = require("express");
const app = express();
// const date = require('date-and-time')
const path = require("path");
const port = process.env.PORT || 3007;
var bodyParser=require("body-parser");
require("./db/conn");
const Register = require("./models/user");
const contact = require("./models/contact");

const {json, response} = require("express");
const static_path = path.join(__dirname,"../public/css")
const template_path = path.join(__dirname,"../views")

const multer = require('multer');
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path)

app.get("/submit",(req,res)=>{
    res.render("home");
});

//storge for uploaded file
const storage = multer.diskStorage({
    destination:function(request,file,callback){
        callback(null,'../public/uploads');
    },

    //add back extention
    filename:function(request,file,callback){
        callback(null,file.originalname);
    },
});

//upload parameters for multer
const upload = multer({
    storage: storage,
    limits:{
        fileSize:1024*1024*3,
    },
});


app.post("/assignment", upload.single('sub_file'),async(req,res) => {
    try{
        const stdsub = new Register({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            eno:req.body.eno,
            branch:req.body.branch,
            submain:req.body.submain,
            subject:req.body.subject,
           // file:req.file.filename,
        })
        const submitted=await stdsub.save();
        res.status(201).render("index");
    }
    catch(error){
        
        res.status(400).send(error);
    }
    
});
app.post("/contact",async(req,res) => {
    try{
        const cont = new contact({
            name:req.body.name,
            email:req.body.email,
            message:req.body.message,
        })
        const submitted=await cont.save();
        res.status(201).render("contact.ejs");
    }
    catch(error){
        
        res.status(400).send(error);
    }
    
});


app.get("/viewsub", async(req,res) => {
    Register.find((err,docs)=>{
        if(!err){
            res.render("search",{
                list: docs
            });
        }
        else{
            console.log(err);
        }
    });
});
app.get("/index", (req,res) => {    
    res.render("index");
});
app.get("/", (req,res) => {    
    res.render("login.ejs");
});


app.listen(port , () => {
    console.log("server is running!!!");
})




// todo code:
var task = [];
 
var complete = [];
 
app.post("/addtask", function(req, res) {
var newTask = req.body.newtask;
task.push(newTask);
res.redirect("/todo");
});

app.post("/removetask", function(req, res) {
var completeTask = req.body.check;
//check for the “typeof” the different completed task, then add into the complete task
if (typeof completeTask === "string") {
complete.push(completeTask);
//check if the completed task already exits in the task when checked, then remove it
task.splice(task.indexOf(completeTask), 1);
} else if (typeof completeTask === "object") {
for (var i = 0; i < completeTask.length; i++) {
complete.push(completeTask[i]);
task.splice(task.indexOf(completeTask[i]), 1);
}
}
res.redirect("/todo");
});

app.post("/clear", function(req, res){
     task = [];
 
     complete = [];
    res.redirect("/todo");
   
});

    let date_ob= new Date();
    let date=("0"+date_ob.getDate()).slice(-2);
    let month=("0"+(date_ob.getMonth()+1)).slice(-2);
    let year =date_ob.getFullYear();
    console.log(date+"-"+month+"-"+year);
    var Fdate=date+"-"+month+"-"+year;

 
app.get("/todo", function(req, res) {
res.render("todo.ejs", { task: task, complete: complete,Fdate: Fdate});
});
app.get("/contact", function(req, res) {
res.render("contact.ejs");
});
app.get("/login", function(req, res) {
    res.render("login.ejs");
    });
    app.get("/welcom", function(req, res) {
        res.render("welcom");
        });

