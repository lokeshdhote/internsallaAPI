const { catchAsyncError } = require("../middlewares/catchAsyncError");
const {v4:uuidv4} = require("uuid");
const StudentModel = require("../models/studentmodel");
const ErrorHandler = require("../utils/ErrorHandler");
const path = require("path");

exports.resume = catchAsyncError(async (req, res) => {
    const {resume} = await StudentModel.findById(req.id).exec()
    res.status(200).json(resume)
})

exports.addeducation = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
    Student.resume.education = {...req.body,id:uuidv4()}
    await Student.save()
    res.status(200).json({message:"Education Added Successfully"})
})

exports.editeducation = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
    const Index =  Student.resume.education.findIndex((i)=>i.id === req.params.id)
    Student.resume.education[Index] = {...Student.resume.education[Index],...req.body}
    await Student.save()
    res.status(200).json({message:"Education Updated successfully"})
})

exports.deleteeducation = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
    const filteredEdu =  Student.resume.education.filter((i)=>i.id !== req.params.id)
    // console.log(filteredEdu);
    Student.resume.education = filteredEdu
    await Student.save()
    res.status(200).json({message:"Education deleted successfully"})
})

exports.addinternship = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
     Student.resume.internships = {...req.body,id:uuidv4()}
    await Student.save()
    res.status(200).json({message:"internship Added successfully"})
})

exports.editinternship = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
     let index = Student.resume.internships.findIndex((i) => i.id === req.params.id)
     Student.resume.internships[index] = {...Student.resume.internships[index],...req.body}
    await Student.save()
    res.status(200).json({message:"internship Updated successfully"})
})

exports.deleteinternship = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
    let Filteredinternship =  Student.resume.internships.filter((i)=>i.id !== req.params.id)
    Student.resume.internships = Filteredinternship
    await Student.save()
    res.status(200).json({message:"internship Deleted successfully"})
})

exports. addresponsibilities = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
     Student.resume.responsibilites = {...req.body,id:uuidv4()}
    await Student.save()
    res.status(200).json({message:"responsibilites Added successfully"})
})

exports.editresponsibilities = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
     let index = Student.resume.responsibilities.findIndex((i) => i.id === req.params.id)
     Student.resume.responsibilities[index] = {...Student.resume.responsibilites[index],...req.body}
    await Student.save()
    res.status(200).json({message:"responsibilities Updated successfully"})
})

exports.deleteresponsibilities = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
    let Filteredresponsibilities =  Student.resume.responsibilities.filter((i)=>i.id !== req.params.id)
    Student.resume.responsibilities = Filteredresponsibilities
    await Student.save()
    res.status(200).json({message:"responsibilities Deleted successfully"})
})



exports.addjob = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
     Student.resume.job = {...req.body,id:uuidv4()}
    await Student.save()
    res.status(200).json({message:"Job Added successfully"})
})

exports.editjob = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
     let index = Student.resume.job.findIndex((i) => i.id === req.params.id)
     Student.resume.job[index] = {...Student.resume.job[index],...req.body}
    await Student.save()
    res.status(200).json({message:"job Updated successfully"})
})

exports.deletejob = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
    let Filteredjob =  Student.resume.job.filter((i)=>i.id !== req.params.id)
    Student.resume.job = Filteredjob
    await Student.save()
    res.status(200).json({message:"job Deleted successfully"})
})




exports.editcourses = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
     let index = Student.resume.courses.findIndex((i) => i.id === req.params.id)
     Student.resume.courses[index] = {...Student.resume.courses[index],...req.body}
    await Student.save()
    res.status(200).json({message:"courses Updated successfully"})
})

exports.deletecourses = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
    let Filteredcourses =  Student.resume.courses.filter((i)=>i.id !== req.params.id)
    Student.resume.courses = Filteredcourses
    await Student.save()
    res.status(200).json({message:"courses Deleted successfully"})
})


exports.addcourses = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
     Student.resume.courses = {...req.body,id:uuidv4()}
    await Student.save()
    res.status(200).json({message:"courses Added successfully"})
})


exports.addprojects = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
     Student.resume.projects = {...req.body,id:uuidv4()}
    await Student.save()
    res.status(200).json({message:"projects Added successfully"})
})
exports.editprojects = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
     let index = Student.resume.projects.findIndex((i) => i.id === req.params.id)
     Student.resume.projects[index] = {...Student.resume.projects[index],...req.body}
    await Student.save()
    res.status(200).json({message:"projects Updated successfully"})
})

exports.deleteprojects = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
    let Filteredprojects =  Student.resume.projects.filter((i)=>i.id !== req.params.id)
    Student.resume.projects = Filteredprojects
    await Student.save()
    res.status(200).json({message:"projects Deleted successfully"})
})

exports.editskills = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
     let index = Student.resume.skills.findIndex((i) => i.id === req.params.id)
     Student.resume.skills[index] = {...Student.resume.skills[index],...req.body}
    await Student.save()
    res.status(200).json({message:"skills Updated successfully"})
})

exports.deleteskills = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
    let Filteredskills =  Student.resume.skills.filter((i)=>i.id !== req.params.id)
    Student.resume.skills = Filteredskills
    await Student.save()
    res.status(200).json({message:"skills Deleted successfully"})
})


exports.addskills = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
     Student.resume.skills = {...req.body,id:uuidv4()}
    await Student.save()
    res.status(200).json({message:"skills Added successfully"})
})


exports.editaccomplishments = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
     let index = Student.resume.accomplishments.findIndex((i) => i.id === req.params.id)
     Student.resume.accomplishments[index] = {...Student.resume.accomplishments[index],...req.body}
    await Student.save()
    res.status(200).json({message:"accomplishments Updated successfully"})
})

exports.deleteaccomplishments = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
    let Filteredaccomplishments =  Student.resume.accomplishments.filter((i)=>i.id !== req.params.id)
    Student.resume.accomplishments = Filteredaccomplishments
    await Student.save()
    res.status(200).json({message:"accomplishments Deleted successfully"})
})


exports.addaccomplishments = catchAsyncError(async (req, res) => {
    const Student = await StudentModel.findById(req.id).exec()
     Student.resume.accomplishments = {...req.body,id:uuidv4()}
    await Student.save()
    res.status(200).json({message:"accomplishments Added successfully"})
})
