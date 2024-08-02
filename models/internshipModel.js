const mongoose = require('mongoose')

const internshipSchema = new mongoose.Schema({
 students:[{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Student"
 }],
 employee:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Employee"
 },
 city:{
    type:String,
    required: [true, "city is required"],
          },
 profile:String,
 skill:String,
 internshiptype:{
    type:String,
    required:true,
    enum:['In office','Remote','Hybrid']
 },
 internshiptime:{
    type:String,
    required:true,
    enum:['Full-time','Part-time']
 },
 openings:Number,
 from:Date,
 to:Date,
 duration:String,
 responsibility:String,

stipend:{
    status:{
        type:String,
        enum:["Fixed","Negotiable","Performance based","Unpaid"]
    },
    amount:Number,
},
perks:[{
    type:String
}]
,
preferences:String,

assesments:String,


},{timestamps:true})


module.exports = mongoose.model('Internship',internshipSchema)