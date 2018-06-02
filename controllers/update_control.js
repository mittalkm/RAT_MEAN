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
            result.due_date.push(nduedate);
            result.pay_date.push(new Date());
            result.fee_due=nduefee;
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