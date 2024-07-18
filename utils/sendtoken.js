exports.sendtoken = function(student,statusCode,res) {
   const token = student.getjwttoken()
   const options = {
       expires: new Date(Date.now() + process.env.COOKIE_EXPIRE*1000 * 60 * 60 * 24),
       httpOnly: true,
   }    
   res.status(statusCode).cookie("token",token,options).json({Succes:true,token,id:student._id})
}

