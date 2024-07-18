const mongoose = require("mongoose")
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Employeeschema = new mongoose.Schema({
    firstname:{
       required:[true,"FirstName is required"],
       type:String,
       min:[2,"Name must be have at least 2 characters"],
       max:[20,"Name must be less than 20 characters"]
        },
    lastname:{
        required:[true,"LastName is required"],
        type:String,
        min:[2,"Name must be have at least 2 characters"],
        max:[20,"Name must be less than 20 characters"]
    
    },
    organizationlogo:{
        type:Object,
        default:{
            fileID:"",
            url:"https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww"
        }
    },
    organizationname:{
        required:[true,"organisationName is required"],
        type:String,
        min:[2,"Name must be have at least 2 characters"],
        max:[20,"Name must be less than 20 characters"]
         },
    contact:{       
      type:String,
      required: [true, "contact is required"],
      minLength:[10,"contact must be 10 characters long"],
      maxLength:[10,"contact must be 10 characters long"],
    },
    gender:{
        type:String,
        required: [true, "gender is required"],
        enum: ["male", "female","others"],
    },
    email:{
        unique: true,
        type: String,
        required: [true, "email is required"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
             'Please fill a valid email address'
            ]
    
      },
      password:{
        type: String,
        select:false,
        required: [true, "password is required"],
        minLength:[6,"password must be at least 6 characters"],
        maxLength:[16,"password must be at most 6 characters"]
      },
     internships:[
        {type:mongoose.Schema.Types.ObjectId,ref:'Internship'}
     ],
     jobs:[
        {type:mongoose.Schema.Types.ObjectId,ref:'Job'},
     ],
      resetPasswordToken:{
        type: String,
         default:"0"
      }
},{timestamps:true})

Employeeschema.pre("save",function(){
    if(!this.isModified("password")){
        return;
    }
    let salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password,salt)
})
Employeeschema.methods.comparepassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

Employeeschema.methods.getjwttoken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}

const Employee = mongoose.model("Employee",Employeeschema)

module.exports = Employee;