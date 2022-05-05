const mongoose=require("mongoose");

//1- create schema (rules) //plugins 
let studentSchema=new mongoose.Schema({
    _id:Number,
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},   //bcrypt
    // department:{type:Number,ref:"departments"}

});

//2- register  //collection , schma
module.exports=mongoose.model("students",studentSchema);
// mongoose.plugin(autocomplete)