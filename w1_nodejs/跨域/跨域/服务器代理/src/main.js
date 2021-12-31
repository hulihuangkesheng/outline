const express =  require('express')
const router = require('./router')
const path = require('path')


const app=express()


//设置绝对路径
app.use(express.static(path.join(__dirname,'../public')))

app.use('/api',router)




app.listen(3136,()=>{
    console.log('server is running at port http://localhost:3136');
})
