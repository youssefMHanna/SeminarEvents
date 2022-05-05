const express=require("express");
const {body,param,query}=require("express-validator");
const authMW=require("./../MiddleWares/authMiddleWare");
const router=express.Router();
const controller=require("./../Controllers/eventController");

router.use(authMW);

router.route("/event")
.get(controller.getAllEvents)
.post(controller.createEvent)
.put(controller.updateEvent)
.delete(controller.deleteEvent);

module.exports=router;