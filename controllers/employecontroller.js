const { catchAsyncError } = require("../middlewares/catchAsyncError");
const {sendtoken} = require("../utils/sendtoken")
const {sendmail} = require("../utils/nodemailer")
const internshipModel = require('../models/internshipModel')
const jobModel = require('../models/jobmodel')
const EmployeeModel = require("../models/employemodel");
const ErrorHandler = require("../utils/ErrorHandler");
const imagekit = require("../utils/imagekit").initImagekit();
const path = require("path");
const { log } = require("console");

exports.home = catchAsyncError(async (req, res) => {
  res.json({ message: 'Secure homepage' });
})

exports.employeesignup = catchAsyncError(async (req, res) => {
        console.log(req.body.gender);
      const Employee = await new EmployeeModel(req.body).save();
      console.log(Employee);
      sendtoken(Employee,200,res)
//       res.status(200).json(Employee)
})

exports.Currentemployee = catchAsyncError(async (req, res) => {
        const Employee = await EmployeeModel.findById(req.id).exec()
       
        res.status(200).json(Employee)
  })    
  

exports.employeesignin = catchAsyncError(async (req,res,next) => {
        const Employee = await EmployeeModel.findOne({email:req.body.email})
        .select("+password")
        .exec()
        if(!Employee){
          return next(new ErrorHandler("Employee with this email if not found",404) )
        }
        const isMatch =  Employee.comparepassword(req.body.password)
        if(!isMatch){
           return next(new ErrorHandler("Wrong crendentials",404))
        }
        // console.log(req.body);
        sendtoken(Employee,200,res)

        // res.status(200).json(Employee) 
})

exports.employeesendmail = catchAsyncError(async (req, res,next) => {
        const Employee = await EmployeeModel.findOne({email:req.body.email}).exec();
        if(!Employee){
                return next(new ErrorHandler("User with this email if not found",404) )
        }
        const url = `${req.protocol}://${req.get("host")}/employee/forget-link/${Employee.id}`
        sendmail(req,res,url,next)
        Employee.resetPasswordToken = "1"
        await Employee.save()
        res.json({Employee,url})
 })
  


exports.employeeforgetlink = catchAsyncError(async (req, res,next) => {
        const Employee = await EmployeeModel.findById(req.params.id).exec();
        if(!Employee){
                return next(new ErrorHandler("User with this email if not found",404) )
        }
        if(Employee.resetPasswordToken == "1"){
                Employee.password = req.body.password;
                Employee.resetPasswordToken = "0"
                await Employee.save();
        }else{
          return next(new ErrorHandler("This link is already used",404) )
        }
        res.json({message:"successfully changed password"})
 })

exports.employeeresetpassword = catchAsyncError(async (req, res,next) => {
        const Employee = await EmployeeModel.findById(req.id).exec();
        if(!Employee){
                return next(new ErrorHandler("User not found",500) )
        }
        Employee.password = req.body.password;
        await Employee.save()
        sendtoken(Employee,200,res)
 })

 exports.employeeupdate= catchAsyncError(async (req, res,next) => {
        const Employee = await EmployeeModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true}
        ).exec();
        if(!Employee){
                return next(new ErrorHandler("Employee not found",500) )
        }
       
        await Employee.save()
        res
        .status(200)
        .json(Employee)
 })
 exports.employeeavtar = catchAsyncError(async (req, res,next) => {
        const Employee = await EmployeeModel.findById(req.params.id).exec();
       
        console.log(req.files);
        const file = req.files.organizationlogo
        const modifiedfilename = `resumebuilder-${Date.now()}${path.extname(file.name)}`
        const {fileId,url} = await imagekit.upload({
                file:file.data,
                fileName:modifiedfilename,
        })
        if(Employee.organizationlogo.fileId !== ""){
                await imagekit.deleteFile(Employee.organizationlogo.fileId)
        }
         Employee.organizationlogo = {fileId,url}
         await Employee.save()
         res.status(200).json({success:true,message:"image uploaded Successfully"})
 })


exports.employeesignout = catchAsyncError(async (req, res,next) => {
        res.clearCookie("token")
        res.json({ message: 'SignOut successfully' });
})


//internship
exports.createInternship = catchAsyncError(async (req, res) => {
        const employee = await EmployeeModel.findById(req.id).exec()
        const internship = await new internshipModel(req.body).save();
        internship.employee = employee._id;
        employee.internships.push(internship._id)
        await internship.save()
        await employee.save()
        res.status(200).json({success:true,internship})
})

exports.readInternship = catchAsyncError(async (req, res) => {
        const {internships} = await EmployeeModel.findById(req.id).populate("internships").exec()
        res.status(200).json({success:true,internships})
})

exports.readSingleInternship = catchAsyncError(async (req, res) => {
        const internship = await internshipModel.findById(req.params.id).exec();
        res.status(200).json({success:true,internship})
})



exports.createjob = catchAsyncError(async (req, res) => {
        const employee = await EmployeeModel.findById(req.id).exec()
        const job = await new jobModel(req.body).save();
        job.employee = employee._id;
        employee.jobs.push(job._id)
        await job.save()
        await employee.save()
        res.status(200).json({success:true,job})
})

exports.readjob = catchAsyncError(async (req, res) => {
        const {jobs} = await EmployeeModel.findById(req.id).populate("jobs").exec()
        res.status(200).json({success:true,jobs})
})

exports.readSinglejob = catchAsyncError(async (req, res) => {
        const job = await jobModel.findById(req.params.id).exec();
        res.status(200).json({success:true,job})
})

