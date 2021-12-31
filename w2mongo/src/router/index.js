const express = require('express')
const router = express.Router()
module.exports = router;
const CORS = require('../filtle/cors')

const userRouter = require('./user')
const goodsRouter = require('./goods')
const uploadRouter = require('./upload')


//允许跨域
router.use(CORS)



//中间件
router.use(express.urlencoded({extended:true}),express.json())

router.use('/user',userRouter)
router.use('/goods',goodsRouter)
router.use('/upload',uploadRouter)