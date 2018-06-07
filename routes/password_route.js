const app=require('../admin.js');
const control=require('../controllers/password_control.js');

module.exports=(app)=>{
    app.post('/:centre/authenticate',control.checkAuth);
}