const path = require('path')
const express = require('express')
const router = require('./router')

const app = express()

app.use(express.static(path.join(__dirname,'../public')))

// 数据接口
app.use('/api',router)

app.listen(3136,()=>{
    console.log('server is running at port  http://localhost:3136')
})