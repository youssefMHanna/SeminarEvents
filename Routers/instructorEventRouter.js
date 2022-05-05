const express=require("express");
const {body,param,query}=require("express-validator");
const authMW=require("./../MiddleWares/authMiddleWare");
const router=express.Router();
const controller=require("./../Controllers/instructorEventController");

router.use(authMW);

router.route("/invitations")
.get(controller.viewInvitations)
.post(controller.addInvitation)
.put(controller.AcceptDecline)
.delete(controller.removeInvitation);

module.exports=router;