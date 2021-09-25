const mongoose=require('mongoose');

const user=new mongoose.Schema({
    firstName:{
       type: String,
       required:true
    },
    lastName:String,
    eno:Number
    },{
    versionKey:false
});

// module.exports = User = mongoose.model('user',user);
// const User = mongoose.model('USER', user);

// module.exports = User;
const Register = new mongoose.model("Register",user);
module.exports = Register;