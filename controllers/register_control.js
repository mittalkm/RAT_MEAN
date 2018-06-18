const {Student}=require('../models/registration_model.js');
const {Package}=require('../models/package_model.js');
const _=require('lodash');
module.exports={
    addStudent(req,res,next){
        //console.log(req.session.centre);
        var nulla=[];
        var darr=[];
        var someDate = new Date(req.body.registration_date);
        var numberOfDaysToAdd = 4;
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
        var std=new Student({
            name:req.body.name,
            mobile:req.body.mobile,
            centre:req.session.centre,
            alternate_mobile:req.body.alternate_mobile,
            father_name:req.body.father_name,
            father_mobile:req.body.father_mobile,
            address:req.body.address,
            email:req.body.email,
            college:req.body.college,
            package_opted:req.body.package_opted,
            individual_courses:req.body.individual_courses,
            centre:req.session.centre,
            total_fee:req.body.total_fee,
            due_date:darr,
            pay_date:nulla,
            last_due:someDate,
            registration_date:req.body.registration_date,
            fee_paid:req.body.fee_paid,
            fee_due:req.body.fee_due,
            installments:nulla,
            comments:req.body.comments
        });
        Student.findOne({
            $and:[{name:req.body.name},{mobile:req.body.mobile},{centre:req.session.centre}]
        }).then((result)=>{
            if(!result){
                if(std.package_opted){
                    Package.findOne({
                        name:std.package_opted
                    })
                    .then((pkd)=>{
                        if(pkd.content)
                        {
                            for(let cnt of pkd.content){
                                std.individual_courses.push(cnt);
                            }
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
                 res.status(409).send('Student is already registered at R.A.T');
            }
        });
    },
    viewAllDateWise(req,res,next){
        // view all students b/w having registration_date in a range given.
        var text = fs.readFileSync('./controllers/centre.txt','utf8')
        Student.find({
            $and:[{centre:req.session.centre},{
                registration_date:{
                    $gte:req.body.ldate
                }
            },{
                registration_date:{
                    $lte:req.body.mdate
                }
            },{
                centre:req.session.centre
            }]
        }).then((result)=>{
            var arr=[];
            for(let cnt of result){
                arr.push(_.pick(cnt,['name','email','mobile','registration_date']));
            }
            res.send(arr);
        }).catch((e)=>{
            res.status(404).send(e);
        });
    }
}