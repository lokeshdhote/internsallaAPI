const jwt  = require('jsonwebtoken');
const ErrorHandler = require("../utils/ErrorHandler");
const {catchAsyncError} = require('./catchAsyncError')

exports.isAuthenticated =  catchAsyncError(async function(req,res,next){
    const {token} = req.cookies;
   if(!token) return next(new ErrorHandler("please login to access the resource",401));
   const {id} = jwt.verify(token,process.env.JWT_SECRET )
   req.id = id;
    // res.json({id,token})
    next();
})  