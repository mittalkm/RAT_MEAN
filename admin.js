const mongoose=require('./mongoconf/mongoconf.js');
const express=require('express');
const enquery_route=require('./routes/enquery_route.js');
const package_route=require('./routes/package_route.js');
const course_route=require('./routes/course_route.js');
const register_route=require('./routes/register_route.js');
const batch_route=require('./routes/batch_route.js');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors');
app.use(cors())
app.use(bodyParser.json());
enquery_route(app);
package_route(app);
course_route(app);
register_route(app);
batch_route(app);
const enqueryr=require('./routes/enquery_route.js');
module.exports=app;