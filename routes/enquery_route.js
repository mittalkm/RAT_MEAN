const app=require('../admin.js');
const econtroller=require('../controllers/enquery_control.js');
module.exports=(app)=>{
    app.post('/enquery/save_enquery',econtroller.addInquery);
    app.get('/enquery/getall',econtroller.findUEnquery);
    app.post('/enquery/search',econtroller.searchEnquery);
};
