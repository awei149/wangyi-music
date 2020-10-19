const express = require('express');
const router = express.Router();
const api = require('./api');
// const app = require('./index')
// const cookieParse = require('cookie-parser')
// app.use(cookieParse('123456'))//设置空间件

router.get('/getValues',(req,res,next)=>{
    // console.log('cookie'+req.signedCookies.name)
    api.getValues(req,res,next);
})
router.post('/addValues',(req,res,next)=>{
    console.log('数据'+req.body.username);
    // res.cookie("name",'zhangsan',{maxAge:600000,httpOnly:true,signed:true})
    api.addValues(req,res,next);
})
router.post('updateValues',(req,res,next)=>{
    api.updateValues(req,res,next);
})
router.post('/deleteValues',(req,res,next)=>{
    api.deleteValues(req,res,next);
})
router.get('/readLyric',(req,res,next)=>{
    api.readLyric(req,res,next);
})
// app.use('/api',router)
// app.listen(3001);
// console.log('success 3001');
module.exports = router;