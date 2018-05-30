const {Package}=require('../models/package_model.js');

module.exports={
    getPackages(req,res,next){
        Package.find().then((pack)=>{
            res.send(pack);
        })
        .catch((e)=>{
            res.send(e);
            next();
        })
    },

    addPackage(req,res,next){
        var pkg=new Package({
            name:req.body.name,
            content:req.body.content,
            fees:req.body.fees
        });
        pkg.save().then(()=>{
            res.send('Package Added Successfully');
        })
        .catch((e)=>{
            res.send(e);
        })
    },

    updatePackage(req,res,next){
        var upkg=req.body;
        Package.findOneAndUpdate({
            name:req.body.name
        },{
            $set:upkg
        }).then(()=>{
            res.send('Package Updated Successfully');
        })
        .catch((e)=>{
            res.send(e);
            next();
        })
    }
}