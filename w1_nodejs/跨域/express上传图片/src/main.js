const express = require('express')
const path = require('path')
const router = require('./router')

const app = express()


//静态资源绝对路径
app.use(express.static(path.join(__dirname,'../../pubilc')))//根目录穿透问题

//数据接口
app.use('/api',router)
//端口
app.listen(3136,()=>{
    console.log('server is running at port http://localhost:3136');
})