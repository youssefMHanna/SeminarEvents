const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
// const autoIncrement = AutoIncrementFactory(mongoose.connection);
//1- create schema (rules)
let EventSchema=new mongoose.Schema({
    _id:Number,
    name:{type:String,required:true},//unique:true}
    date:{type:Date,required:true},
    assignedTo:{type:[{type:Number,required:true,ref:"instructors",unique:true}],minlength:1},
    acceptedBy:{type:[{type:Number,required:true,ref:"instructors",unique:true}],default:[]},
    rejectedBy:{type:[{type:Number,required:true,ref:"instructors",unique:true}],default:[]},
    attendees:{type:[{type:Number,required:true,ref:"students",unique:true}],default:[]}
});
// EventSchema.plugin(autoIncrement);
//2- register  //collection , schma
EventSchema.plugin(AutoIncrement,{inc_field:'_id' ,id:'eventsCounter'});
module.exports=mongoose.model("events",EventSchema);

// mongoose.model("collection",schema);//setting
// mongoose.model("collection");//getting