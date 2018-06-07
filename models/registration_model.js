const mongoose=require('mongoose');
var Student=mongoose.model('student',{
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    },
    mobile:{
        type:Number,
        unique:true
    },
    alternate_mobile:{
        type:Number
    },
    father_name:{
        type:String
    },
    father_mobile:{
        type:Number,
    },
    address:{
        type:String
    },
    email:{
        type:String,
    },
    college:{
        type:String
    },
    package_opted:{
        type:String,
        default:null
    },
    individual_courses:[{
        type:String,
        default:null
    }],
    installments:[{
        type:String
    }],
    total_fee:{
        type:Number,
    },
    fee_paid:{
        type:Number,
    },
    fee_due:{
        type:Number,
        default:0
    },
    pay_date:[
        {
            type:Date
        }
    ],
    last_due:{
        type:Date
    },
    due_date:[{
        type:Date
    }],
    registration_date:{
        type:Date
    },
    comments:{
        type:String,
        default:null
    }
});
module.exports={
    Student:Student
};