const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var BatchSchema=new Schema({
    name:{
        type:String,
    },
    centre:{
        type:String,
    },
    course:{
        type:String
    },
    faculty:{
        type:String
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    centre:{
        type:String,
        required:true
    },
    students:[{
        name:{
            type:String
        },
        mobile:{
            type:Number
        }
    }]  
});
var Batch=mongoose.model('batche',BatchSchema);
module.exports={
    Batch:Batch
};