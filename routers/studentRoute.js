const express = require('express');

const Router = express.Router();
const {home,
    studentsignin,
    studentsignup,
    studentsignout,
    Currentstudent,
    studentsendmail,
    studentforgetlink,
    studentresetpassword,
    studentupdate,
    studentavtar,
    studentapplyjobs,
    studentapplyinternship

} = require("../controllers/studentcontroller");
const {isAuthenticated} = require("../middlewares/auth")
Router.get('/',isAuthenticated,home );

Router.get('/student',isAuthenticated,Currentstudent );
//student signup
Router.post("/student/signup",studentsignup)

//student signin
Router.post("/student/signin",studentsignin)

//student signout
Router.get("/student/signout",isAuthenticated,studentsignout)
Router.post("/student/sendmail",studentsendmail)
Router.post("/student/forget-link/:id",studentforgetlink)
Router.post("/student/reset-password/:id",isAuthenticated,studentresetpassword)
Router.post("/student/update/:id",isAuthenticated,studentupdate)
Router.post("/student/avtar/:id",isAuthenticated,studentavtar)
Router.post("/student/apply/internship/:id",isAuthenticated,studentapplyinternship)
Router.post("/student/apply/job/:id",isAuthenticated,studentapplyjobs)


module.exports = Router;