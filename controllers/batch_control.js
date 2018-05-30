const {Student}=require('../models/registration_model');
const _=require('lodash');
module.exports={
    getStudents(req,res,next){
        var course=req.params.course;
        Student.find({
            individual_courses:{
                $in:[course]
            }
        }).then((doc)=>{
            var arr=[];
            for(let std of doc){
                var obj=_.pick(std,['name','mobile','college']);
                arr.push(obj);
            }
            res.send(arr);
        })
        .catch((e)=>{
            res.status(404).send(e);
        });
    }
}