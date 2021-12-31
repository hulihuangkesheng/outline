//express静态资源服务器
const express = require('express');
const path = require('path')
const app = express();
//可以把相对路径改为绝对路径
// const realPath = path.resolve('../html')
//__dirname当前index.js所在的目录
//__filename当文件所在路径
const realPath = path.join(__dirname,'../回顾nodejs的框架express')
console.log('realPath',realPath);
// app.use(express.static('./html'))
console.log('__filename',__filename);
console.log('__dirname',__dirname);
app.use(express.static(realPath))
app.listen(8080,()=>{
    console.log('server is running start http://localhost:8080');
})