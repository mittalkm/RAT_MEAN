const {Course}=require('../models/course_model.js');

module.exports={
    getCourses(req,res,next){
        Course.find().then((cou)=>{
            res.send(cou);
        })
        .catch((e)=>{
            res.send(e);
            next();
        })
    },

    addCourse(req,res,next){
        Course.findOne({
            name:req.body.name
        }).then((obj)=>{
            if(obj==null){
                var crs=new Course({
                    name:req.body.name,
                    fees:req.body.fees
                });
                crs.save().then(()=>{
                    res.send('Course Added Successfully');
                });
            }
            else{
                res.send('Course Already Exist');
            }
        })
        .catch((e)=>{
            res.send(e);
        })
    },

    updateCourse(req,res,next){
        var ucrs=req.body;
        Course.findOneAndUpdate({
            name:req.body.name
        },{
            $set:ucrs
        }).then(()=>{
            res.send('Course Updated Successfully');
        })
        .catch((e)=>{
            res.send(e);
            next();
        })
    }
}