const {Student}=require('../models/registration_model.js');
const {Package}=require('../models/package_model.js');
const _=require('lodash');
module.exports={
    
    addStudent(req,res,next){
        var nulla=[];
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
            installments:nulla,
            comments:req.body.comments
        });
        Student.findOne({
            $and:[req.body.name,req.body.mobile]
        }).then((res)=>{
            if(!res){
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
                        res.status(403).send(e);
                        console.log(e);
                        next();
                    });
                }
                else{
                    std.save().then(()=>{
                        res.send('Registration Successfull');
                    })
                    .catch((e)=>{
                        res.status(403).send(e);
                        console.log(e);
                        next();
                    });
                }
            }
            else{
<<<<<<< HEAD
                res.status(409).send('Student is already registered at R.A.T');
=======
                return res.status(418).send('Student is already registered at R.A.T');
>>>>>>> 69f51328e1845c4e76c925d7757e987c1367ebc3
            }
        });
    }

}