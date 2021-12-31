const express = require('express')
const router = express.Router()
module.exports = router;

//设置数据请求类型
router.use(express.urlencoded({extended:true}),express.json())


//服务器代理数据
// const {creatProxyMiddleware:proxy} = require('http-proxy-middleware')


// router.use('/api',proxy,({
    // target:'https://www.uniqlo.cn/',//请求接口https://www.uniqlo.cn/data/locales/zh_CN.json
//     changeOrigin:true,
//     //重写路径：请求路径与目标路径不一致时重写路径
//     pathRewirte:{
//         '^/api':'/'
//     }
// }))
// router.use('/',createProxy)

const {createProxyMiddleware} = require('http-proxy-middleware')

const createProxy = createProxyMiddleware({
    target:'https://www.zhipin.com/',//https://www.zhipin.com/wapi/zpuser/countryCode
    changeOrigin:true,
    pathRewrite:{
        '^/api/':'/'
    }
})

router.use('/',createProxy)