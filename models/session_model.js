const mongoose=require('mongoose');
const Session=mongoose.model('session',{
    centre:{
        type:String,
    }
});
module.exports={
    Session:Session
}