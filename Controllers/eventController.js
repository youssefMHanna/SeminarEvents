const {validationResult}=require("express-validator");
const Event=require("./../Models/EventsModel");

let validate = (request,role)=>{
    if (role)
        if(!role.includes(request.role))
        {
            throw new Error("Not Authorized");
        }
};

module.exports.getAllEvents=(request,response,next)=>{
    if(["admin","instructor"].includes(request.role))
        Event.find({}).populate(["acceptedBy","assignedTo","rejectedBy","attendees"])
            .then(data=>{response.status(200).json({data});})
            .catch(error=>next(error));
    else    
        Event.find({"acceptedBy.0":{"$exists":true}}).populate(["acceptedBy"]).select(["name","date","acceptedBy"])
            .then(data=>{response.status(200).json({data});})
            .catch(error=>next(error));
};
module.exports.createEvent=(request,response,next)=>{
    validate(request,["admin"]);
    
    let result=validationResult(request);
    if(!result.isEmpty())
    {
        let message=result.array().reduce((current,error)=>current+error.msg+" "," ");
        let error=new Error(message);
        error.status=422;
        throw error;  
    }

    let eve=new Event({
        _id : request.body.id,
        name : request.body.name,
        date : request.body.date,
        assignedTo : request.body.assignedTo,
        acceptedBy : request.body.acceptedBy,
        rejectedBy : request.body.rejectedBy,
        attendees : request.body.attendees
    });
    eve.save()
    .then(()=>{ 
        response.status(200).json({message:"event created"});
    }).catch(error=>next(error));
};

module.exports.updateEvent=(request,response,next)=>{

    validate(request,["admin"]);
    
    Event.updateOne({_id:request.body.id},{
        $set:{
            name : request.body.name,
            date : request.body.date,
            assignedTo : request.body.assignedTo,
            acceptedBy : request.body.acceptedBy,
            rejectedBy : request.body.rejectedBy,
            attendees : request.body.attendees
        }
    }).then(data=>{
        if(data.matchedCount==0)
            throw new Error("event not exists");
        response.status(200).json({message:"event update",data});

    })
    .catch(error=>next(error));
};

module.exports.deleteEvent=(request,response,next)=>{
    validate(request,["admin"]);
    Event.deleteOne({_id:request.body.id})
    .then(data=>{
        if(data.deletedCount==0)
            throw new Error("event not exists");
        response.status(200).json({message:"event deleted",data});
    })
    .catch(error=>next(error));
};