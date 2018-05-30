const app=require('../admin.js');
const control=require('../controllers/package_control.js');

module.exports=(app)=>{
    app.get('/package/allpackage',control.getPackages);
    app.post('/package/add_package',control.addPackage);
    app.post('/package/update_package',control.updatePackage);
};