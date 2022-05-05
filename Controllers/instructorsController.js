const {validationResult}=require("express-validator");
const Instructor=require("./../Models/InstructorModel");

let validate = (request,role)=>{
    if (role)
        if(!role.includes(request.role))
        {
            throw new Error("Not Authorized");
        }
};
module.exports.getAllInstructors =(request,response,next)=>{
    validate(request,["admin"]);
    Instructor.find({})//.populate({path:"department"})
            .then(data=>{
                response.status(200).json({data});
            })
            .catch(error=>next(error));
};
module.exports.createInstructor=(request,response,next)=>{
    // let result=validationResult(request);
    // if(!result.isEmpty())
    // {
    //     let message=result.array().reduce((current,error)=>current+error.msg+" "," ");
    //     let error=new Error(message);
    //     error.status=422;
    //     throw error;  
    // }
    validate(request,["admin"]);
    let _Instructor=new Instructor({
        _id:request.body.id,
        name:request.body.name,
        email:request.body.email,
        password:request.body.password
    });
    _Instructor.save()
    .then(()=>{ 
        response.status(200).json({message:"instructor created"});
    }).catch(error=>next(error));
};

module.exports.updateInstructor=(request,response,next)=>{

    validate(request,["admin","instructor"]);
    if (request.role=="instructor" && request.userId!=request.body.id)
        throw new Error("Not Authorized");

    Instructor.updateOne({_id:request.body.id},{
        $set:{
            name:request.body.name,
            email:request.body.email,
            password:request.body.password
        }
    }).then(data=>{
        if(data.matchedCount==0)
            throw new Error("instructor not exists");
        response.status(200).json({message:"instructor update",data});

    })
    .catch(error=>next(error));
};
module.exports.deleteInstructor=(request,response,next)=>{
    validate(request,["admin"]);
    Instructor.deleteOne({_id:request.body.id})
    .then(data=>{
        if(data.deletedCount==0)
            throw new Error("instructor not exists");
        response.status(200).json({message:"instructor deleted",data});
    })
    .catch(error=>next(error));
};