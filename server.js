const {Session}=require('./models/session_model.js');
const {app}=require('./admin.js');
app.listen(3000,()=>{
    console.log('Server started at port 3000');
});