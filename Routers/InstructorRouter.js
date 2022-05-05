const express=require("express");
const {body,param,query}=require("express-validator");
const authMW=require("./../MiddleWares/authMiddleWare");
const router=express.Router();
const controller=require("./../Controllers/instructorsController");

router.use(authMW);

router.route("/instructor")
.get(controller.getAllInstructors)
.post(controller.createInstructor)
.put(controller.updateInstructor)
.delete(controller.deleteInstructor);

module.exports=router;