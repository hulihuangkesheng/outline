const express = require('express')
const db = require('../db/CRUD')
const { formatData } = require('../utils')
const router = express.Router()
module.exports = router

// const mysql = require('../db/db')

//获取商品列表
router.get('/list', async (req, res) => {
    const {
        page = 1, size = 10, sort
    } = req.query;
    //sort=[sort,decs]
    const limit = Number(size)
    const skip = (page - 1) * size
    try {
        const result =  await db.query(colName,{},{limit,skip,sort})
        res.send(formatData.success(result))
    } catch (error) {
        res.send(formatData.fail())
    }
})

//获取单个商品元素
router.get('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const result =  await db.query(colName,{_id:id})
        res.send(formatData.success(result[0]))//不是数组加[0]
    } catch (error) {
        res.send(formatData.fail())
    }
})


//添加商品数据
router.post('/', (req, res) => {
    const {
        name,
        price,
        imgurl
    } = req.body

})


// 删除商品
router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const result =  await db.query(colName,{_id:id})
        res.send(formatData({
            code: result?200:400
        }))//不是数组加[0]
    } catch (error) {
        res.send(formatData.fail())
    }
})

// 修改商品
router.put('/:id', (req, res) => {
    const {
        id
    } = req.params;
})

// 搜索商品
// get /api/goods/search?keyword=xxx
router.get('/search', (req, res) => {
    const {
        keyword
    } = req.query;
})








//批量删除
//地址  delete / api/goods
router.delete('/', async(req, res) => {
    const {
        ids
    } = req.body; //IDS ===[id1,id2,id3]
    try {
        const result = await db.del(colName, ({_id: ids}))
        //id为字符串：{ _id:ObjectId(id) }
        //filter = { _id:{ $in:[ObjectId(id1),Object1(id2)]} }
        res.send(formatData({
            code:result?200:400
        }))
    } catch (error) {
        res.send(formatData.fail())
    }
})