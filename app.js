const express=require("express");
const body_parser=require("body-parser");
const mongoose=require("mongoose");

// const departmentRouter=require("./Routers/departmentRouter");
const studentRouter=require("./Routers/studentsRouter");
const authRouter=require("./Routers/authRoiuter");
const instructorRouter=require("./Routers/InstructorRouter");
const EventRouter = require("./Routers/EventRouter");
const server=express();
// mongoose.connect("mongodb://localhost:27017/alexDB")
mongoose.connect("mongodb://root:example@localhost:27017/alexDB?authSource=admin&readPreference=primary&ssl=false")
        .then(()=>{
            console.log("DB connectd");
            server.listen(process.env.PORT||7013,()=>{
                console.log("I am Listening ....... ");
            });
        })
        .catch(error=>console.log("DB Connection problem"));

///////// CORS , Cross Domain Allow Orgins 

// Logger MW
server.use((request,response,next)=>{
    console.log(request.url,request.method);
    next();
});
// body parsing middleware
server.use(body_parser.json());
server.use(body_parser.urlencoded({extended:false}));


// Routers
server.use(authRouter);
// server.use(departmentRouter);
server.use(instructorRouter);
server.use(studentRouter);
server.use(EventRouter);

//Not Found MW
server.use((request,response)=>{
    response.status(404).json({meassge:"Page is Not Found"});
 });

//Error
server.use((error,request,response,next)=>{
    response.status(500).json({meassge:error+""});
});



