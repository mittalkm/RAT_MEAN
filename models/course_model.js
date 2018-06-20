const mongoose=require('mongoose');
var Course=mongoose.model('course',{
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    },
    opted:{
        type:Boolean
    },
    fees:{
        type:Number,
        required:true      
    }
});
module.exports={
    Course:Course
};