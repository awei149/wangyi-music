const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/wangyiyun',{ useNewUrlParser: true });
const coon = mongoose.connection;
coon.once('open',function callback(){
    console.log('连接数据库成功')
})
coon.on('error',function callback(){
    console.log('数据库连接异常')
})
var UserSchema = mongoose.Schema({
    name:String,
    password:String
})
var User = mongoose.model('User',UserSchema,'user');
module.exports = User;