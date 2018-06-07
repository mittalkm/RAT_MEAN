const {Student}=require('../models/registration_model.js');
const _=require('lodash');
module.exports={

    updateFee(req,res,next){
        Student.findOne({
            mobile:req.body.mobile
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
            result.fee_due=nduefee;
            if(result.fee_due==0){
                /*result.due_date=[];
                result.pay_date=[];
                result.total_fee=0;*/
                result.last_due=null;
            }
            return result;
        }).then((result)=>{
            return Student.update({mobile:result.mobile},{
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
        Student.find({
           $or:[{
               mobile:req.body.mobile
           },{
               alternate_mobile:req.body.mobile
           }]
        }).then((result)=>{
            result.individual_courses=result.individual_courses.concat(req.body.courses);
            result.individual_courses=_.uniqWith(result.individual_courses);
            result.fee_due=result.fee_due+req.body.fee_due;
            if(result.last_due==null){
                var someDate = new Date(req.body.registration_date);
                var numberOfDaysToAdd = 4;
                someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
                result.last_due=someDate;
            }
            return Student.update({
                mobile:req.body.mobile
            },{
                $set:result
            })
        }).then((result)=>{
            res.send('Student details updated successfully.');
        }).catch((e)=>{
            res.status(404).send(e);
        })
    }

}