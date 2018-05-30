const mongoose=require('mongoose');
var Package=mongoose.model('package',{
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:1
    },
    content:[{
        type:String,
    }],
    fees:{
        type:Number,
        required:true      
    }
});
module.exports={
    Package:Package
};