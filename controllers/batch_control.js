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
            var frr=[];
            for(let std of doc){
                var obj=_.pick(std,['name','mobile','college','registration_date']);
                arr.push(obj);
                arr.sort(function(a,b){
                    var c = new Date(a.registration_date);
                    var d = new Date(b.registration_date);
                    return d-c;
                });
            }
            for(let dta of arr){
                var odb=_.pick(dta,['name','mobile','college']);
                frr.push(odb);
            }
            res.send(frr);
        })
        .catch((e)=>{
            res.status(404).send(e);
        });
    }
}