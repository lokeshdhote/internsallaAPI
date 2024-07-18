const nodemailer = require("nodemailer")
const ErrorHandler = require("./ErrorHandler")

exports.sendmail = (req,res,url,next)=>{
 const transport = nodemailer.createTransport({
    service: "gmail",
    host:"smtp.gmail.com",
    post: 465,
    auth: {
        user:process.env.MAIL_EMAIL_ADDRESS,
        pass:process.env.MAIL_EMAIL_PASS
    }
 })
 
 const mailOptions = {
    from:"Ritesh vkarma pvt limited <vkarmaritesh@gmail.com>",
    to:req.body.email,
    subject: "forget password Link",
    // text: "Don't share this link to anyone"
    html: `
     <h1>click link below to forget password</h1>
     <a href="${url}">Reset Password</a>
     `
 }

 transport.sendMail(mailOptions, (err, info) => {
    if(err){
        return next(new ErrorHandler(err,500))
    }
    console.log(info)
    return res.status(200).json({message:"email sent successfully",url})
 })
}
