const express = require('express')
const router = express.Router()
module.exports = router;

const goodsRouter = require('./goods')


// 数据接口（路由）简单跨域
// router.use(express.urlencoded(),express.json())

// router.use(function(req,res,next){
//     res.set({
//         'Access-Control-Allow-Origin':"*"
//     })
//     next()
// })
//设置响应头 复杂跨域
const whilelist = ["http://localhost:8080","http://localhost:3136"]
// router.use(function(req,res,next){
//     // 获取请求源（从哪发起的请求）
//     const Origin = req.get('Origin')

//     // 判断请求源是否在白名单中
//     if(whilelist.includes(Origin)){
//         res.set({
//             'Access-Control-Allow-Origin':Origin
//         })
//     }

//     // 处理复杂跨域中的预检请求
//     if(req.method=="OPTIONS") {
//         res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//         res.header("Access-Control-Allow-Methods","PUT,POST,GET,PATCH,DELETE,OPTIONS");
//         res.sendStatus(200);/*让options请求快速返回*/
//     }else{

//         next();
//     }

// })
router.use(function(req,res,next){
    // //当有多个端口不一样的时候
    // const Origin = req.get(Origin)
    //判断是否在白名单中
    if(whilelist.includes(req.get(Origin))){
        res.set({
            'Access-Control-Allow-Origin':req.get(Origin)
        })
    }
         // res.set({
    //     'Access-Control-Allow-Origin':'*'
    // })
    if(req.method == 'OPTIONS'){
        res.header("Access-Control-Allow-Headers","Content-type,Content-length,Accept,Authorization,X-Requested-With")
        res.header("Access-Control-Allow-Methods","PUT,DELETE,POST,GET,PATCH,OPTIONS");
        res.sendStatus (200)
    }else{
        next()
      }
    
})
router.use(express.urlencoded(),express.json())

// /api/goods
router.use('/goods',goodsRouter)





