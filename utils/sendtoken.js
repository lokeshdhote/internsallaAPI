exports.sendtoken = function(student,statusCode,res) {
    // console.log(student +"stu");
   const token = student.getjwttoken();
//    console.log(token+"stutoken");
//    console.log(process.env.COOKIE_EXPIRE);

   const options = {
    //    expires: new Date(Date.now() +Number (process.env.COOKIE_EXPIRE*1000 * 60 * 60 * 24)),
       httpOnly: true,
       secure:true,
 
   }    
//    console.log(options.expires);
   res.status(statusCode)
   .cookie("token",token,options)
   .json({Succes:true,token,id:student._id})
}







// const jwt = require("jsonwebtoken");

// exports.sendtoken = (student, statusCode, res) => {
//     // Generate JWT token
//     const token = student.getjwttoken(); // Assuming this method exists on the student object
//     console.log(`Student token: ${token}`);
//     console.log(`Cookie expiry: ${process.env.COOKIE_EXPIRE}`);

//     // Cookie options
//     const options = {
//         expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * 1000 * 60 * 60 * 24),
//         httpOnly: true,
//         // secure: false, // Set to true in production with HTTPS
//         // sameSite: 'None'
//     };
//     console.log(`Cookie options: ${JSON.stringify(options)}`);

//     // Set cookie and send response
//     res.status(statusCode).cookie("token", token, options).json({ success: true, id: student._id, token });
// };








// const jwt = require("jsonwebtoken");

// exports.sendtoken = (student,statusCode,res)=>{
//     // const token = student.getjwttoken();
//     let token= jwt.sign({email:student.email},process.env.JWT_SECRET )

    
//     const options = {
//         expires :new Date(Date.now() + 1*24*60*60*1000),
//         httpOnly:true
//     }
    
//     res.status(statusCode).cookie("token",token,options)
//     .json({success:true,id:student._id,token});
//     res.json({token})
// }









// const jwt = require("jsonwebtoken");

// exports.sendtoken = (student, statusCode, res) => {
//     // Generate JWT token
//     const token = student.getjwttoken(); // Assuming this method exists on the student object
//     console.log(`Student token: ${token}`);
//     console.log(`Cookie expiry: ${process.env.COOKIE_EXPIRE}`);

//     // Cookie options
//     const options = {
//         expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * 1000 * 60 * 60 * 24),
//         httpOnly: true,
//         // secure: false, // Set to true in production with HTTPS
//         // sameSite: 'None'
//     };
//     console.log(`Cookie options: ${JSON.stringify(options)}`);

//     // Set cookie and send response
//     res.status(statusCode).cookie("token", token, options).json({ success: true, id: student._id, token });
// };








// const jwt = require("jsonwebtoken");

// exports.sendtoken = (student,statusCode,res)=>{
//     // const token = student.getjwttoken();
//     let token= jwt.sign({email:student.email},process.env.JWT_SECRET )

    
//     const options = {
//         expires :new Date(Date.now() + 1*24*60*60*1000),
//         httpOnly:true
//     }
    
//     res.status(statusCode).cookie("token",token,options)
//     .json({success:true,id:student._id,token});
//     res.json({token})
// }



