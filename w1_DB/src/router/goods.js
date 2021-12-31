const express = require('express')
const router = express.Router()
module.exports = router

const mysql = require('../db/db')

//获取商品列表
router.get('/list',async(req,res)=>{
    let sql = "select * from goods";
    console.log('sql',sql);

    //判断是否存在错误
    try {
        const result = await mysql.query(sql)
        res.send(result)
    } catch (error) {
        res.send('获取失败')
    }
})

//获取单个商品元素
router.get('/:id',(req,res)=>{

})


//添加商品数据
router.post('/',(req,res)=>{
    const {name,price,imgurl} = req.body

})


// 删除商品
router.delete('/:id',(req,res)=>{
    const {id} = req.params;
})

// 修改商品
router.put('/:id',(req,res)=>{
    const {id} = req.params;
})

// 搜索商品
// get /api/goods/search?keyword=xxx
router.get('/search',(req,res)=>{
   const {keyword} = req.query;
})