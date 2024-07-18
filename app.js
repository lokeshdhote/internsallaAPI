require("dotenv").config({path:"./.env"})
const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
const session = require("express-session");
const cookieparser = require("cookie-parser");
const cors = require('cors')


const corsOptions = {

    // origin: 'http://localhost:5173', // Allow specific origin
    origin: 'https://intersalla-react.vercel.app/', // Allow specific origin
    credentials: true // Allow credentials
  };
  
app.use(cors(corsOptions));
  
app.use(session({
    resave: true,
    saveUninitialized:true,
    secret: process.env.SESSION_SECRET,
}))

app.use(cookieparser());

const fileupload = require("express-fileupload");
app.use(fileupload())

require("./models/dbconfig").dbconnection()
app.use(require("morgan")("tiny"))
app.use("/api",require("./routers/studentRoute"))
app.use("/resume",require("./routers/resumeRoute"))
app.use("/api/employee",require("./routers/employeeRoute"))

const ErrorHandler = require("./utils/ErrorHandler")
const {generatedError} = require("./middlewares/error")
app.all("*",(res,req,next)=>{
    next(new ErrorHandler(`Requested URL NOT Found  ${req.url}`,404))
})




app.use(generatedError)
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})