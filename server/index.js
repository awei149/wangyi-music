const express = require('express');
const bodyParser = require('body-parser')//post需要
const routerApi = require('./router')
const cookieParse = require('cookie-parser')
const app = express();

app.use(cookieParse())//设置空间件

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routerApi);
app.listen(3001);
console.log('success 3001');
module.exports = app;