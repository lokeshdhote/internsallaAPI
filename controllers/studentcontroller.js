const { catchAsyncError } = require("../middlewares/catchAsyncError");
const {sendtoken} = require("../utils/sendtoken")
const {sendmail} = require("../utils/nodemailer")

const StudentModel = require("../models/studentmodel");
const ErrorHandler = require("../utils/ErrorHandler");
const { response } = require("express");

exports.home = catchAsyncError(async (req, res) => {
  res.json({ message: 'Secure homepage' });
})

exports.studentsignup = catchAsyncError(async (req, res) => {
      

      const Student = await StudentModel.create(req.body).save();
      sendtoken(Student,200,res)
      res.status(200).json(Student)
})

exports.Currentstudent = catchAsyncError(async (req, res) => {
        const Student = await StudentModel.findById(req.id).exec()
        res.status(200).json(Student)
  })
  

exports.studentsignin = catchAsyncError(async (req,res,next) => {
        const Student = await StudentModel.findOne({email:req.body.email})
        .select("+password")
        .exec()
        if(!Student){
          return next(new ErrorHandler("User with this email if not found",404) )
        }
        const isMatch =  Student.comparepassword(req.body.password)
        if(!isMatch){
                return next(new ErrorHandler("Wrong crendentials",404))
        }
        // console.log(req.body);
        sendtoken(Student,200,res)

        // res.status(200).json(Student) 
})

exports.studentsendmail = catchAsyncError(async (req, res,next) => {
        const Student = await StudentModel.findOne({email:req.body.email}).exec();
        if(!Student){
                return next(new ErrorHandler("User with this email if not found",404) )
        }
        const url = `${req.protocol}://${req.get("host")}/student/forget-link/${Student.id}`
        sendmail(req,res,url,next)
        Student.resetPasswordToken = "1"
        await Student.save()
        res.json({Student,url})
 })
  


exports.studentforgetlink = catchAsyncError(async (req, res,next) => {
        const Student = await StudentModel.findById(req.params.id).exec();
        if(!Student){
                return next(new ErrorHandler("User with this email if not found",404) )
        }
        if(Student.resetPasswordToken == "1"){
                Student.password = req.body.password;
                Student.resetPasswordToken = "0"
                await Student.save();
        }else{
          return next(new ErrorHandler("This link is already used",404) )
        }
        res.json({message:"successfully changed password"})
 })

exports.studentresetpassword = catchAsyncError(async (req, res,next) => {
        const Student = await StudentModel.findById(req.id).exec();
        if(!Student){
                return next(new ErrorHandler("User not found",500) )
        }
        Student.password = req.body.password;
        await Student.save()
        sendtoken(Student,200,res)
 })


exports.studentsignout = catchAsyncError(async (req, res,next) => {
        res.clearCookie("token")
        res.json({ message: 'SignOut successfully' });
})
