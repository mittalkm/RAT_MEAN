const mongoose=require('mongoose');

const Auth=mongoose.model('auth',{
    tr:{
        type:String
    },
    pn:{
        type:String
    }
});

module.exports={
    Auth
}