const app=require('../admin.js');
const control=require('../controllers/batch_control.js');
module.exports=(app)=>{
    app.get('/batch/:course',control.getStudents);
    app.post('/batch/create_batch',control.createBatch);
    app.post('/batch/search_batch',control.searchBatch);
    app.post('/batch/search_one_batch',control.searchOneBatch);
}