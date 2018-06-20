const {Session}=require('./models/session_model.js');
var y;
function getValue() {
    return Session.find();
};
getValue().then(function(res) {
    y=res[0].centre;
});
console.log(y);
module.exports={
    y:y
}