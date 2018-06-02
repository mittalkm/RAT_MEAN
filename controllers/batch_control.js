const {Student}=require('../models/registration_model');
const {Batch}=require('../models/batch_model.js');
const nodemailer=require('nodemailer');
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
                return res.status(404).send('No Student Have This Mobile No.');
            }
            res.send(result);
        })
        .catch((e)=>{
            res.status(418).send(e);
        })
    },

    getStdName(req,res,next){
        Student.findOne({
            name:req.body.name
        }).then((result)=>{
            if(!result){
                return res.status(404).send('No Student Have This Mobile No.');
            }
            res.send(result);
        })
        .catch((e)=>{
            res.status(418).send(e);
        })
    },

    getAllStudent(req,res,next){
        Student.find().then((result)=>{
            var arr=[];
            for(let item of result){
            var obj=_.pick(item,['name']);
            arr.push(obj.name);
        }
        res.send(arr);
        })
    },

    getDueStudent(req,res,next){
        var date=new Date();
        Student.find({
            $and:[{
            fee_due:{
                $gt:0
            }},{
                last_due:{
                    $lte:date
                }    
            }]}).then((result)=>{
            if(result.length==0){
                return res.status(404).send('No Student Found');
            }
            var data=[];
            for(let item of result){
                vdata=_.pick(item,['name','mobile','email','last_due','fee_due']);
                data.push(vdata);
            }
            res.send(data);
        })
        .catch((e)=>{
            res.send(404).send(e);
        })
    },

    sendMail(req,res,next){
        var auser="mailbhejo90@gmail.com";
        var password="nodemail";
        var subject=req.body.subject;
        var text=req.body.text;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: auser,
              pass: password,
            }
          });
          
          var mailOptions = {
            from: auser,
            to: req.body.user,
            subject: subject,
            text: text
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              return res.send(error);
            } else {
              res.send('Email sent');
            }
          });
    },

}