const express = require('express');

const Router = express.Router();
const {home,
    employeesignin,
    employeesignup,
    employeesignout,
    Currentemployee,
    employeesendmail,
    employeeforgetlink,
    employeeresetpassword,
    employeeupdate,
    employeeavtar,
    createInternship,
    readInternship,
    readSingleInternship,
    createjob,
    readjob,
    readSinglejob,
   
} = require("../controllers/employecontroller");
const {isAuthenticated} = require("../middlewares/auth")
Router.get('/',isAuthenticated,home );

Router.get('/home',isAuthenticated,Currentemployee );
//employee signup
Router.post("/signup",employeesignup)

Router.post("/signin",employeesignin)

Router.get("/signout",isAuthenticated,employeesignout)
Router.post("/sendmail",employeesendmail)
Router.post("/forget-link/:id",employeeforgetlink)
Router.post("/reset-password/:id",isAuthenticated,employeeresetpassword)
Router.post("/update/:id",isAuthenticated,employeeupdate)
Router.post("/avtar/:id",isAuthenticated,employeeavtar)

//internship
Router.post("/internship/create",isAuthenticated,createInternship)
Router.get("/internship/read",isAuthenticated,readInternship)
Router.get("/internship/read/:id",isAuthenticated,readSingleInternship)
///jobs

Router.post("/job/create",isAuthenticated,createjob)
Router.get("/job/read",isAuthenticated,readjob)
Router.get("/job/read/:id",isAuthenticated,readSinglejob)

module.exports = Router;