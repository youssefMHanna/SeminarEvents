const express=require("express");
const {body,param,query}=require("express-validator");
const authMW=require("./../MiddleWares/authMiddleWare");
const router=express.Router();
const controller=require("./../Controllers/studentsController");

router.use(authMW);

router.route("/students")
.get(controller.getAllStudents)
.post(controller.createStudent)
.put(controller.updateStudent)
.delete(controller.deleteStudent);

module.exports=router;