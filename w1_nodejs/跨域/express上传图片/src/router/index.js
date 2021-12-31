const express = require('express')
const router = express.Router()
module.exports = router;


const uploadRouter =  require('./upload')

//设置响应头
router.use(function(req,res,next){
    res.set({
        'Access-Control-Allow-Origin':"*"
    })
    next()
})
//数据接口(路由)
//传递参数的方法
router.use(express.urlencoded(),express.json())

//简单跨域问题
// router.use(function(req,res){
//     res.set('Access-Control-Allow-Origin','*')
// })

router.use('/upload',uploadRouter)