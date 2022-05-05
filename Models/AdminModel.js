const mongoose=require("mongoose");
//1- create schema (rules)
let AdminSchema=new mongoose.Schema({
    _id:Number,
    name:{type:String,required:true},//unique:true}
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},   //bcrypt
    
});

//2- register  //collection , schma
module.exports=mongoose.model("admins",AdminSchema)
    .find({_id:1})
    .then(data=>
        {
            if(!data)
            {
                let admin = new mongoose.model("admins")({ 
                    _id:1,
                    name:"admin",
                    email:"admin@admin.com",
                    password:"admin"
                });
                admin.save();
            }
        }
    );

// mongoose.model("collection",schema);//setting
// mongoose.model("collection");//getting