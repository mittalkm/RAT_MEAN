const {Student}=require('../models/registration_model');
const {Batch}=require('../models/batch_model.js');
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
    },

    createBatch(req,res,next){
        var arrn=[];
        let iarr=req.body.batch_students.map(Number);
        console.log(iarr);
        Student.find({
            mobile:{
                $in:iarr
            }
        })
        .then((result)=>{
            for(let item of result){
                arrn.push({
                    name:item.name,
                    mobile:item.mobile
                });
            }
            return arrn;    
        })
        .then((arrd)=>{
            var sbatch=new Batch({
                name:req.body.name,
                course:req.body.subject,
                faculty:req.body.faculty,
                students:arrd,
                date:req.body.date,
                time:req.body.time
            });
            return sbatch.save()
        }).then(()=>{
            res.send('Batch Data Saved Successfully');
        })
        .catch((e)=>{
            res.status(404).send(e);
        });
    },
    
    searchBatch(req,res,body){
        Batch.find({
            faculty:req.body.faculty,
            course:req.body.subject
        }).then((result)=>{
            if(!result){
                return res.status(403).send('Not Found')
            }
            res.send(result);
        })
        .catch((e)=>{
            res.status(404).send(e);
        })
    },

    searchOneBatch(req,res,body){
        Batch.findOne({
            faculty:req.body.faculty,
            course:req.body.course,
            name:req.body.name
        }).then((result)=>{
            if(!result){
                return res.status(403).send('Not Found')
            }
            res.send(result);
        })
        .catch((e)=>{
            res.status(404).send(e);
        })
    },

    getAllCollege(req,res,next){
        Student.find().then((result)=>{
            var carr=[];
            if(!result){
                return res.status(404).send('No Record Found');
            }
            for(let item of result){
                carr.push(_.pick(item,['college']).college);
            }
            res.send(_.uniqWith(carr));
        }).catch((e)=>{
            res.send(e);
        });
    },
    
    getStdCollege(req,res,next){
        Student.find({
            college:req.body.college
        }).then((result)=>{
            var data=[];
            for(let item of result){
                vdata=_.pick(item,['name','mobile','email']);
                data.push(vdata);
            }
            res.send(_.orderBy(data,['name'],['asc']));
        })
        .catch((e)=>{
            res.status(404).send(e);
        });
    },

    getStdSubject(req,res,next){
        Student.find({
            individual_courses:req.body.subject
        }).then((result)=>{
            var data=[];
            for(let item of result){
                vdata=_.pick(item,['name','mobile','email']);
                data.push(vdata);
            }
            res.send(_.orderBy(data,['name'],['asc']));
        }).catch((e)=>{
            res.status(404).send(e);
        });
    },

    getStdMobile(req,res,next){
        Student.findOne({
            mobile:req.body.mobile
        }).then((result)=>{
            if(!result){
                return res.send('No Student Have This Mobile No.');
            }
            res.send(result);
        })
        .catch((e)=>{
            res.status(418).send(e);
        })
    }
}