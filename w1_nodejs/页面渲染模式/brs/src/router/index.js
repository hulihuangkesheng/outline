const express = require('express')
const router = express.Router()
module.exports = router
const CORS = require('../filtle/cors')

const GoodsRouter = require('./goods')

//允许跨域
router.use(CORS)

//中间件
router.use(express.urlencoded({extends:true}),express.json())

router.use('/goods',GoodsRouter)

