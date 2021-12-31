const express = require('express')
const router = require('./router')
const path = require('path')
const ssrRouter = require('./ssr')
const app = express()

app.use(express.static(path.join(__dirname,'../public')))

app.use('/api',router)

//设置模板引擎
app.set('views',path.join(__dirname,'./template'));
app.set('views engine','ejs')
// app.set('views engine','pug')

//接口
app.use('/ssr',ssrRouter)
const port = 3136
app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}  !`))