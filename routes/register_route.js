const {app}=require('../admin.js');
const control=require('../controllers/register_control.js');
module.exports=(app)=>{
    app.post('/register/add_student',control.addStudent);
    app.post('/search/by_date',control.viewAllDateWise);
}