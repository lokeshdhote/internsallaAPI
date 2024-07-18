const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
 students:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Student"
    }
 ],
 employee:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"Employee"
 },
 experience:{
    from:Number,
    to:Number,
 },
 title:String,
 skill:String,
 jobtype:{
    type:String,
    required:true,
    enum:['In office','Remote','Hybrid']
 },
 jobtime:{
    type:String,
    required:true,
    enum:['Full-time','Part-time']
 },
 openings:Number,
 responsibility:String,

salary:{
    from:{
        type:String,
    },
    to:{
        type:String,
    },
},
perks:String,
description:String,
preferences:String,
assesments:String,
},{timestamps:true})


module.exports = mongoose.model('Job',jobSchema)