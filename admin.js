const mongoose=require('./mongoconf/mongoconf.js');
const express=require('express');
const enquery_route=require('./routes/enquery_route.js');
const package_route=require('./routes/package_route.js');
const course_route=require('./routes/course_route.js');
const register_route=require('./routes/register_route.js');
const batch_route=require('./routes/batch_route.js');
const update_route=require('./routes/update_route.js');
const password_route=require('./routes/password_route.js');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const session = require('express-session');
var MongoStore = require("connect-mongo")(session);
const app=express();
const cors=require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret:'ratsession',resave: true, 
saveUninitialized: true,
rolling: true,
store: new MongoStore({mongooseConnection:mongoose.connection}),
cookie: {
    httpOnly: false, 
    secure: false,
    maxAge:86000
}}));
password_route(app);
enquery_route(app);
package_route(app);
course_route(app);
register_route(app);
batch_route(app);
update_route(app);
const enqueryr=require('./routes/enquery_route.js');
module.exports=app;