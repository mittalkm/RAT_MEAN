const {Student}=require('../models/registration_model.js');
const {Package}=require('../models/package_model.js');
const _=require('lodash');
module.exports={
    
    addStudent(req,res,next){
        var std=new Student({
            name:req.body.name,
            mobile:req.body.mobile,
            email:req.body.email,
            college:req.body.college,
            package_opted:req.body.package_opted,
            individual_courses:req.body.individual_courses,
            total_fee:req.body.total_fee,
            due_date:req.body.due_date,
            registration_date:req.body.registration_date,
            fee_paid:req.body.fee_paid,
            fee_due:req.body.fee_due,
            comments:req.body.comments
        });
        if(std.package_opted){
            Package.findOne({
                name:std.package_opted
            })
            .then((pkd)=>{
                for(let cnt of pkd.content){
                    std.individual_courses.push(cnt);
                }
                return std;
            })
            .then((std)=>{
                std.individual_courses=_.uniqWith(std.individual_courses);
                std.save()
            })
            .then(()=>{
                    res.send('Registration Successfull');
            })
            .catch((e)=>{
                res.status(400).send(e);
                console.log(e);
                next();
            });
        }
        else{
            std.save().then(()=>{
                res.send('Registration Successfull');
            })
            .catch((e)=>{
                res.status(400).send(e);
                console.log(e);
                next();
            });
        }
    }

}