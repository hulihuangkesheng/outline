"use strict";

var express = require('express');

var router = express.Router();
module.exports = router; //设置数据请求类型

router.use(express.urlencoded(), express.json()); //服务器代理数据
// const {creatProxyMiddleware:proxy} = require('http-proxy-middleware')
// router.use('/api',proxy,({
//     target:'https://www.uniqlo.cn/',//请求接口https://www.uniqlo.cn/data/locales/zh_CN.json
//     changeOrigin:true,
//     //重写路径：请求路径与目标路径不一致时重写路径
//     pathRewirte:{
//         '^/api':'/'
//     }
// }))
// // router.use('/',createProxy)

var _require = require('http-proxy-middleware'),
    createProxyMiddleware = _require.createProxyMiddleware;

var createProxy = createProxyMiddleware({
  target: 'https://www.zhipin.com/',
  //https://www.zhipin.com/guangzhou/?sid=sem_pz_bdpc_dasou_title
  changeOrigin: true,
  pathRewrite: {
    '^/api/aaa': '/api'
  }
});
router.use('/aaa', createProxy);