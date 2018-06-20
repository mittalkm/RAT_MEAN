const {Student}=require('../models/registration_model');
const {Batch}=require('../models/batch_model.js');
const nodemailer=require('nodemailer'); 
const {Session}=require('../models/session_model.js');
const _=require('lodash');
var y;
setInterval(()=>{
    Session.find().then(function(res) {
        if(res.length!=0){
            y=res[0].centre;
        }
        else{
            y='tr';
        }
    });
},2000);
module.exports={
    getStudents(req,res,next){
        const centren=y;
        var course=req.params.course;
        Student.find({
            individual_courses:{
                $in:[course]
            },
            centre:centren
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
        const centren=y;
        var arrn=[];
        let iarr=req.body.batch_students.map(Number);
        console.log(iarr);
        Student.find({
            mobile:{
                $in:iarr
            },
            centre:centren
        })
        .then((result)=>{
            for(let item of result){
                arrn.push({
                    name:item.name,
                    mobile:item.mobile,
                    centre:item.centre
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
                centre:centren,
                date:req.body.date,
                time:req.body.time,
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
        const centren=y;
        Batch.find({
            faculty:req.body.faculty,
            course:req.body.subject,
            centre:centren
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
        const centren=y;
        Batch.findOne({
            faculty:req.body.faculty,
            name:req.body.name,
            centre:centren
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
        const centren=y;
        Student.find({
            centre:centren
        }).then((result)=>{
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
        const centren=y;
        Student.find({
            college:req.body.college,
            centre:centren
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
        const centren=y;
        Student.find({
            individual_courses:req.body.subject,
            centre:centren
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
        const centren=y;
        var alter_number;
        if(req.body.alternate_number){
            alter_number=req.body.alternate_mobile;
        }
        Student.findOne({
            $and:[
            {mobile:req.body.mobile},
            {centre:centren}
            ,{alternate_number:alter_number}
            ]}).then((result)=>{
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
        console.log(y);
        const centren=y;

        console.log(centren);
        Student.findOne({
            name:req.body.name,
            centre:centren
        }).then((result)=>{
            if(!result){
                return res.status(404).send('No Student Have This Name');
            }
            res.send(result);
        })
        .catch((e)=>{
            res.status(418).send(e);
        })
    },

    getAllStudent(req,res,next){
        const centren=y;
        Student.find({
            centre:centren
        }).then((result)=>{
            var arr=[];
            for(let item of result){
            var obj=_.pick(item,['name']);
            arr.push(obj.name);
        }
        res.send(arr);
        })
    },

    getDueStudent(req,res,next){
        const centren=y;
        var date=new Date();
        Student.find({
            $and:[
                {centre:centren},{
            fee_due:{
                $gt:0
            }}]}).then((result)=>{
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
                console.log(error);
              return res.send(error);
            } else {
              res.send('Email sent');
            }
          });
    },

}