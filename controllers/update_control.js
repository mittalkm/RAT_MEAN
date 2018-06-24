const {Student}=require('../models/registration_model.js');
const _=require('lodash');
const {Session}=require('../models/session_model.js');
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

    updateFee(req,res,next){
        const centren=y;
        Student.findOne({
            $or:[{mobile:req.body.mobile},{alternate_mobile:req.body.mobile}],
            centre:centren
        }).then((result)=>{
            if(!result){
                return res.status(418).send('Student Not Found!!!');
            }
            const nduefee=result.fee_due-req.body.apaid;
            result.fee_paid=Number(result.fee_paid)+Number(req.body.apaid);
            const nduedate=req.body.due_date;
            result.installments.push(req.body.apaid);
            if(result.due_date.length>=2 && result.fee_due>req.body.apaid){
                return res.status(409).send('Max 3 installments are allowed');
            }
            if(result.due_date.length<=2){
                result.due_date.push(nduedate);
            }
            if(result.due_date.length!=0){
                result.last_due=result.due_date[result.due_date.length-1];
            }
            result.pay_date.push(new Date());
            var objd={};
            objd.installment=req.body.apaid;
            objd.date=new Date();
            result.pay_details.push(objd);
            result.fee_due=nduefee;
            if(result.fee_due==0){
                result.due_date=[];
                result.last_due=null;
            }
            return result;
        }).then((result)=>{
            return Student.update({mobile:result.mobile,centre:centren},{
                $set:result
            });
        })
        .then(()=>{
            res.send('Details updated successfully');
        })
        .catch((e)=>{
            res.status(404).send(e);
        });
    },
    
    updateStudentCourse(req,res,next){
        // This will add new course to student opted courses.
        const centren=y;
        Student.findOne({
          $or:[{mobile:req.body.mobile},{alternate_mobile:req.body.mobile}],
          centre:centren  
        }).then((result)=>{
            if(!result){
                return res.send('No Student Found Having This Mobile Number');
            }
            else{
                result.individual_courses=_.uniqWith(result.individual_courses.concat(req.body.courses));
                result.total_fee=result.total_fee+req.body.fee;
                result.fee_due=result.fee_due+req.body.fee;
                var someDate;
                if(result.due_date.length==0){
                    someDate = new Date();
                    var numberOfDaysToAdd = 4;
                    someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                    result.last_due=someDate;
                }
                Student.update({
                    $or:[{mobile:req.body.mobile},{alternate_mobile:req.body.mobile}],
                    centre:centren
                },{
                    $set:result
                }).then(()=>{
                    res.send('Hey ! Registration Successfull...');
                })
            }
        }).catch((e)=>{
            res.status(403).send(e);
        });
    }

}