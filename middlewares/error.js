exports.generatedError = (err,req,res,next)=>{
    const statusCode = res.statusCode || 500;
    console.log(err)
    if(
        err.name == "MongoServerError" && err.message.includes("E11000 duplicate key")
    ){
        err.message = "Student with this email already exists"
    }
    // console.log(err)
    res.status(statusCode).json({message:err.message,errName:err.name});
}   