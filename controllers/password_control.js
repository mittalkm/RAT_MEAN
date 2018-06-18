const {Auth}=require('../models/auth_model.js');
const fs=require('fs');
module.exports={

    checkAuth(req,res,next){
        var query={};
        query[req.params.centre]=req.body.pwd;
        Auth.findOne(query).then((result)=>{
            if(result){
                fs.unlink('./controllers/centre.txt', function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                  });
                fs.appendFile('./controllers/centre.txt', `${req.params.centre}`, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                  });
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