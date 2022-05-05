const {validationResult}=require("express-validator");
const Student=require("./../Models/StudentModel");

let validate = (request,role)=>{
    if (role)
        if(!role.includes(request.role))
        {
            throw new Error("Not Authorized");
        }
};

module.exports.getAllStudents=(request,response,next)=>{
    validate(request,["admin","instructor"]);
    Student.find({})//.populate({path:"department"})
            .then(data=>{
                response.status(200).json({data});
            })
            .catch(error=>next(error));
};
module.exports.createStudent=(request,response,next)=>{
    // validate(["admin","instructor"]);
    
    let result=validationResult(request);
    if(!result.isEmpty())
    {
        let message=result.array().reduce((current,error)=>current+error.msg+" "," ");
        let error=new Error(message);
        error.status=422;
        throw error;  
    }

    let student=new Student({
        _id:request.body.id,
        name:request.body.name,
        email:request.body.email,
        password:request.body.password
    });
    student.save()
    .then(()=>{ 
        response.status(200).json({message:"student created"});
    }).catch(error=>next(error));
};

module.exports.updateStudent=(request,response,next)=>{

    validate(request,["admin","student"]);
    if (request.role=="student" && request.userId!=request.body.id)
        throw new Error("Not Authorized");

    Student.updateOne({_id:request.body.id},{
        $set:{
            name:request.body.name,
            email:request.body.email,
            password:request.body.password
        }
    }).then(data=>{
        if(data.matchedCount==0)
            throw new Error("student not exists");
        response.status(200).json({message:"student update",data});

    })
    .catch(error=>next(error));
};

module.exports.deleteStudent=(request,response,next)=>{
    validate(request,["admin"]);
    Student.deleteOne({_id:request.body.id})
    .then(data=>{
        if(data.deletedCount==0)
            throw new Error("student not exists");
        response.status(200).json({message:"student deleted",data});
    })
    .catch(error=>next(error));
};