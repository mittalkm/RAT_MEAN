const {app}=require('../admin.js');
const control=require('../controllers/course_control.js');

module.exports=(app)=>{
    app.get('/course/allcourse',control.getCourses);
    app.post('/course/add_course',control.addCourse);
    app.post('/course/update_course',control.updateCourse);
};