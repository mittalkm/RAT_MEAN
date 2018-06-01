const app=require('../admin.js');
const control=require('../controllers/batch_control.js');
module.exports=(app)=>{
    app.get('/batch/:course',control.getStudents);
    app.post('/batch/create_batch',control.createBatch);
<<<<<<< HEAD
    app.post('/batch/search_bacth',control.searchBatch);
    app.get('/batch/get_college/all',control.getAllCollege);
=======
    app.post('/batch/search_batch',control.searchBatch);
    app.post('/batch/search_one_batch',control.searchOneBatch);
>>>>>>> cf0bd104b3d069190cd1a0ab4cfd17630b50ebb8
}