const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
//1- create schema (rules) //plugins 
let studentSchema=new mongoose.Schema({
    _id:Number,
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},   //bcrypt
    // department:{type:Number,ref:"departments"}

});
// studentSchema.plugin(autoIncrement);

///2- register  //collection , schma
studentSchema.plugin(AutoIncrement,{inc_field:'_id' ,id:'studentsCounter'});
module.exports=mongoose.model("students",studentSchema);
