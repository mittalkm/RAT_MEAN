const {Auth}=require('../models/auth_model.js');
module.exports={

    checkAuth(req,res,next){
        var query={};
        query[req.params.centre]=req.body.pwd;
        Auth.findOne(query).then((result)=>{
            if(result){
                req.session.centre=req.params.centre;
                res.status(200).send('Auth Successfull');
            }
            else{
                res.status(403).send('Password Error');
            }
        }).catch((e)=>{
            res.status(404);
        })
    }

}