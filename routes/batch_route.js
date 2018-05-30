const app=require('../admin.js');
const control=require('../controllers/batch_control.js');
module.exports=(app)=>{
    app.get('/batch/:course',control.getStudents);
}