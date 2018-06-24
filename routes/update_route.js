const {app}=require('../admin.js');
const control=require('../controllers/update_control.js');

module.exports=(app)=>{
    app.post('/update/fee_details',control.updateFee);
    app.post('/update/student_details',control.updateStudentCourse);
}