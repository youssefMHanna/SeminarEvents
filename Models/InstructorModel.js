const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
//1- create schema (rules)
let InstructorSchema=new mongoose.Schema({
    _id:Number,
    name:{type:String,required:true},//unique:true}
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},   //bcrypt
    
});

//2- register  //collection , schma
InstructorSchema.plugin(AutoIncrement,{inc_field:'_id' ,id:'instructorCounter'});


module.exports=mongoose.model("instructors",InstructorSchema);

// mongoose.model("collection",schema);//setting
// mongoose.model("collection");//getting