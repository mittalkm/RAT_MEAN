const app=require('../admin.js');
const control=require('../controllers/batch_control.js');
module.exports=(app)=>{
    app.post('/email',control.sendMail);
    app.get('/search/duefee',control.getDueStudent);
    app.post('/search/by_mobile',control.getStdMobile);
    app.post('/search/by_subject',control.getStdSubject);
    app.post('/search/by_college',control.getStdCollege);
    app.get('/batch/get_college/all',control.getAllCollege);
    app.get('/batch/:course',control.getStudents);
    app.post('/batch/create_batch',control.createBatch);
    app.post('/batch/search_batch',control.searchBatch);
    app.post('/batch/search_one_batch',control.searchOneBatch);
}