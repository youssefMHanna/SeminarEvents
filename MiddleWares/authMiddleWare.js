const jwt=require("jsonwebtoken");

module.exports=(request,response,next)=>{
    let token,decodedToken;
    try{
       token=request.get("Authorization").split(" ")[1];
       decodedToken= jwt.verify(token,"EventsToken");
       request.role=decodedToken.role;
       request.userId=decodedToken._id;
      
    }
    catch(error)
    {
        // next(error);
        request.role=null;
        request.userId=null;
        // next(new Error("Not Authenticated"));
    }

//authenticated

    next();
};