const express=require('express');
const {Auth}=require('../models/auth_model.js');
const {Session}=require('../models/session_model.js');
module.exports={

    checkAuth(req,res,next){
        var query={};
        query[req.params.centre]=req.body.pwd;
        Auth.findOne(query).then((result)=>{
            if(result){
                Session.remove().then(()=>{
                    var sessiond=new Session({
                        centre:req.params.centre
                    });
                    return sessiond.save();
                }).then(()=>{
                    res.status(200).send('Auth Successfull');
                });
            }
            else{
                res.status(403).send('Password Error');
            }
        }).catch((e)=>{
            res.status(404);
        })
    }

}