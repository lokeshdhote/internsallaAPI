const express = require('express');

const Router = express.Router();
const {
    resume,
    addeducation,
    editeducation,
    deleteeducation,
    addinternship,
    deleteinternship,
    editinternship,
    addcourses,
    editcourses,
    deletecourses,
    addprojects,
    editprojects,
    deleteprojects,
    addskills,
    deleteskills,
    editskills,
    addjob,
    deletejob,
    editjob,
    addaccomplishments,
    deleteaccomplishments,
    editaccomplishments,
    addresponsibilities,
    deleteresponsibilities,
    editresponsibilities
   
} = require("../controllers/resumecontroller");
const {isAuthenticated} = require("../middlewares/auth")
Router.post('/',isAuthenticated,resume );
//education routes
Router.post('/add-edu',isAuthenticated,addeducation );
Router.post('/edit-edu/:id',isAuthenticated,editeducation );
Router.post('/del-edu/:id',isAuthenticated,deleteeducation);
//interships routes
Router.post('/addintern',isAuthenticated,addinternship );
Router.post('/editintern/:id',isAuthenticated,editinternship );
Router.post('/delintern/:id',isAuthenticated,deleteinternship);

//courses 

Router.post('/addcourse',isAuthenticated,addcourses );
Router.post('/editcourse/:id',isAuthenticated,editcourses );
Router.post('/delcourse/:id',isAuthenticated,deletecourses);

//projects

Router.post('/addproject',isAuthenticated,addprojects );
Router.post('/editproject/:id',isAuthenticated,editprojects );
Router.post('/delproject/:id',isAuthenticated,deleteprojects);

//skills

Router.post('/addskill',isAuthenticated,addskills );
Router.post('/delskill/:id',isAuthenticated,deleteskills);
Router.post('/editskill/:id',isAuthenticated,editskills);

//job

Router.post('/addjob',isAuthenticated,addjob );
Router.post('/deljob/:id',isAuthenticated,deletejob);
Router.post('/editjob/:id',isAuthenticated,editjob);

//accomplishments
        
Router.post('/addaccomplishment',isAuthenticated,addaccomplishments );
Router.post('/delaccomplishment/:id',isAuthenticated,deleteaccomplishments);
Router.post('/editaccomplishment/:id',isAuthenticated,editaccomplishments);

//responsibilities

Router.post('/addresponsibility',isAuthenticated,addresponsibilities );
Router.post('/delresponsibility/:id',isAuthenticated,deleteresponsibilities);
Router.post('/editresponsibility/:id',isAuthenticated,editresponsibilities);

module.exports = Router;