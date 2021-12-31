const express = require('express')
const router = express.Router()
module.exports = router;


const mysql = require('../db/db')


//注册
router.post('/reg',async(req,res)=>{
    const{username,password} = req.body;
    // //回掉函数的写法
    // mysql.query(`insert into user values('${null}','${username}','${password}')`,function(result){
    //     res.send()
    // })

    // //promise写法
    // mysql.query(`insert into user values('${null}','${username}','${password}')`).then((result)=>{
        
    // }).catch((err)=>{})

    //测试，try{}catch(){},测试错误
    // async、await
    try{
        await mysql.query(`insert into user values(${null},'${username}','${password}')`);
        res.send('注册成功')
    }catch(err){
        res.send('注册失败')
        console.log(err);
    }
})


//登录
router.get('/login',async(req,res)=>{
    const {username,password}=req.query;
    try {
        const result = await mysql.query(`select * form user where username = '${username}' AND password ='${password}'`)
        if (result.length>0) {
            res.send(result)
        }else{
            res.send('用户名或密码错误')
        }
    } catch (error) {
        res.send('登录失败')
    }
})

//查询单个用户名
router.get('/:id',(req,res)=>{

})


//删除
router.delete('/:id',(req,res)=>{

})


//添加
router.post('/',(req,res)=>{

})


//修改
router.put('/',(req,res)=>{

})

//获取用户列表