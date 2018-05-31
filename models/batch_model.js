const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var BatchSchema=new Schema({
    name:{
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