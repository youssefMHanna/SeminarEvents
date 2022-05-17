const jwt=require('jsonwebtoken');
const Student=require("./../Models/StudentModel");
const Instructor = require("./../Models/InstructorModel");
const Admin = require("./../Models/AdminModel");

let validate = (request,response,schema,schemaName,nextSchema,next) => {
    schema.findOne({email:request.body.email,password:request.body.password}).
    then(data=>{
        if(!data)
        {
            nextSchema();
        }
        else
        {
            token=jwt.sign({_id:data._id,
                email:request.body.email,
                role:schemaName},
                "EventsToken",
                {expiresIn:"12h"});
            response.status(200).json({msg:"login",token});   
        }
    }).catch(error=>next(error));
};

module.exports.login=(request,response,next)=>{
        let err = ()=> {throw new Error("Not Authenticated");};
        let admin = () => {validate(request,response,Admin,"admin",err,next);};
        let instructor = () =>{validate(request,response,Instructor,"instructor",admin,next);};
        let student = () => {validate(request,response,Student,"student",instructor,next);};
        student();
    };
    