const mongoose=require('mongoose');

const Contact=new mongoose.Schema({
    name:{
       type: String,
       required:true
    },
    email:String,
   message:String,
    },{
    versionKey:false
});


const contact = new mongoose.model("Contact",Contact);
module.exports = contact;