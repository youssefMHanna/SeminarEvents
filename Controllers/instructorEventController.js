const {validationResult}=require("express-validator");
const Event=require("./../Models/EventsModel");

let validate = (request,role)=>{
    if (role)
        if(!role.includes(request.role))
        {
            throw new Error("Not Authorized");
        }
};

module.exports.AcceptDecline=(request,response,next)=>{

    validate(request,["instructor"]);
    if (request.role=="instructor" && request.userId!=request.body.id)
        throw new Error("Not Authorized");


    let result=validationResult(request);
    
    if(!result.isEmpty())
    {
        let message=result.array().reduce((current,error)=>current+error.msg+" "," ");
        let error=new Error(message);
        error.status=422;
        throw error;  
    }
    if(request.body.accept)
        this.acceptInvitation(request,response,next);
    else
        this.rejectInvitation(request,response,next);
};

module.exports.viewInvitations=(request,response,next)=>{
    validate(request,["admin","instructor"]);

    let result=validationResult(request);
    
    if(!result.isEmpty())
    {
        let message=result.array().reduce((current,error)=>current+error.msg+" "," ");
        let error=new Error(message);
        error.status=422;
        throw error;  
    }

    Event.findById(request.body.id).then(data=>{
        data = data.populate("assignedTo rejectedBy acceptedBy");
        if(!data)
            throw new Error("event not exists");
        response.status(200).json({invited:data.assignedTo,accepted:data.acceptedBy,rejected:data.rejectedBy});  
    }).catch(error=>next(error));

};

module.exports.acceptInvitation=(request,response,next)=>{
    Event.findById(request.body.id).then(data=>{
        if(!data)
            throw new Error("event not exists");
        if(data.assignedTo.includes(request.userId)) 
        {
            if(data.acceptedBy.includes(request.userId))
                throw new Error("Already Confirmed");
            if(data.rejectedBy.includes(request.userId))
                throw new Error("Already Rejected");
            data.acceptedBy.push(request.userId);
            data.save().then(data=>{
                response.status(200).json({message:"event confirmed",data});
            })
            .catch(error=>next(error));
        }
        else 
        
            throw new Error("instructor not assigned to this Event");
    }).catch(error=>next(error));

};

module.exports.rejectInvitation=(request,response,next)=>{

    Event.findById(request.body.id).then(data=>{
        if(!data)
            throw new Error("event not exists");
        if(data.assignedTo.includes(request.userId)) 
        {
            if(data.acceptedBy.includes(request.userId))
                throw new Error("Already Confirmed");
            if(data.rejectedBy.includes(request.userId))
                throw new Error("Already Rejected");
            data.rejectedBy.push(request.userId);
            data.save().then(data=>{
                response.status(200).json({message:"event confirmed",data});
            })
            .catch(error=>next(error));
        }
        else 
        
            throw new Error("instructor not assigned to this Event");
    }).catch(error=>next(error));

};

module.exports.addInvitation=(request,response,next)=>{
    validate(request,["admin"]);
    let result=validationResult(request);
    
    if(!result.isEmpty())
    {
        let message=result.array().reduce((current,error)=>current+error.msg+" "," ");
        let error=new Error(message);
        error.status=422;
        throw error;  
    }

    Event.findById(request.body.id).then(data=>{
        if(!data)
            throw new Error("event not exists");
        if(data.assignedTo.includes(request.body.SpeakerId)) 
            throw new Error("instructor already assigned to this Event");
        data.assignedTo.push(push(request.body.SpeakerId));        
    }).catch(error=>next(error));

};

module.exports.removeInvitation=(request,response,next)=>{
    validate(request,["admin"]);
    let result=validationResult(request);
    
    if(!result.isEmpty())
    {
        let message=result.array().reduce((current,error)=>current+error.msg+" "," ");
        let error=new Error(message);
        error.status=422;
        throw error;  
    }

    Event.findById(request.body.id).then(data=>{
        if(!data)
            throw new Error("event not exists");
        if(!data.assignedTo.includes(request.body.SpeakerId)) 
            throw new Error("instructor not assigned to this Event");
        
        data.assignedTo.splice(data.assignedTo.indexOf(request.body.SpeakerId),1);  

    }).catch(error=>next(error));

};