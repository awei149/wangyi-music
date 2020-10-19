const User = require('./db')
const fs = require('fs')
module.exports = {
    //查询数据
    getValues(req,res,next){
        console.log('成功进去')
        let name = ''+req.query.username;
        let password = ''+req.query.password;
        console.log(name+password)
        User.find({"name":name,"password":password},function(err,doc){
            if(err){
                console.log(err)
                return
            }
            console.log(doc)
            res.json(doc)
        })
    },
    //添加数据
    addValues(req,res,next){
        let name = req.body.username;
        let password = req.body.password;
        console.log(name + password)
        var u = new User({
            name:name,
            password:password
        })
        u.save(function(err){
            if(err){
                console.log(err)
                return
            }
            console.log('添加成功')
        })
    },
    //更新数据
    updateValues(req,res,next){
        User.updateOne({'name':name,'password':password},function(err,res){
            if(err){
                console.log(err)
                return
            }
            console.log('成功')
        })
    },
    //删除数据
    deleteValues(req,res,next){
        User.deleteOne({'name':name},function(err,doc){
            if(err){
                console.log(err)
                return
            }
            console.log('删除成功')
        })
    },
    //读取歌曲文件
    readLyric(req,res,next){
        let name = req.query.name;
        // console.log(name)
        fs.readFile('./lyric/'+name+'.txt',(err,data)=>{
            if(err){
                console.log(err)
                return
            }
            // console.log(data.toString())
            res.json(data.toString())
        })
    }
}