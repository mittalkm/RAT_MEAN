const {Student}=require('../models/registration_model.js');

module.exports={

    updateFee(req,res,next){
        Student.findOne({
            mobile:req.body.mobile
        }).then((result)=>{
            if(!result){
                return res.status(418).send('Student Not Found!!!');
            }
            const nduefee=result.fee_due-req.body.apaid;
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
            result.fee_paid=result.fee_paid+req.body.apaid;
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
    }

}