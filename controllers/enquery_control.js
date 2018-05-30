var {EnqueryM}=require('../models/enquiry_model.js');

module.exports={

    addInquery(req,res,next){
        var nenquery=new EnqueryM({
            name:req.body.name,
            mobile:req.body.mobile,
            email:req.body.email,
            college:req.body.college,
            courses:req.body.courses,
            special_comment:req.body.special_comment
        });
        nenquery.save().then(()=>{
            res.send(`Enquery Saved Successfully`);
        })
        .catch((e)=>{
            res.send('Error in saving the enquery');
            next();
        });
    },

    findUEnquery(req,res,next){
        EnqueryM.find().then((doc)=>{
            res.send(doc);
        }).catch((e)=>{
            res.send(e);
            next();
        });       
    },

    searchEnquery(req,res,next){
        var sBy=req.body;
        EnqueryM.find(sBy).then((doc)=>{
            res.send(doc);
        }).catch((e)=>{
            res.send(e);
            next();
        });
    }
}