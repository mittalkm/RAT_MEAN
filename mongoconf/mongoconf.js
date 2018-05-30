const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/ratdb',err=>{
    if(!err)
    {
        console.log('connected to database');
    }
});
module.exports=mongoose;