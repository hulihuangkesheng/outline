const express = require('express')

const router = express.Router()

module.exports = router;

let goodslist = [];
 
for(let i=0;i<20;i++){
    const goods = {
        id:i+1,
        name:'goods' + i,
        price:(Math.random()*1000).toFixed(2),
        imgurl:`img/goods${i}.jpg`
    }
    goodslist.push(goods)
}

//商品列表
router.get('/list',(req,res)=>{
    console.log('goodslist');
    res.send(goodslist)
})

//通过商品Id获取商品信息
router.get('/:id/:type?',(req,res)=>{
    const{id} = req.params;
    console.log('params',req.params);
    const currenGoods = goodslist.find(item=>{
        return item.id ==id
    })
    res.send(currenGoods)
})

//增加
router.post('/',(req,res)=>{
    // const {id}=req.query
    console.log('添加',req.body);
    console.log('请求头',req.get('hello'))
    res.send('添加成功')
})

//修改
// router.put('/:id',(req,res)=>{
//     const {id} = req.params
//     const currentGoods = goodslist.find((item)=>{
//         return item.id == id
//     })
//     console.log('update',req.body);

//     res.send(currentGoods)
// })
// 修改: put /api/goods
router.put('/:id', (req, res) => {
    const { id } = req.params

    const currentGoods = goodslist.find((item) => {
        return item.id == id
    })
    console.log('update', req.body);

    res.send(currentGoods)
})

//删除  通过路由传参
router.delete('/:id',(req,res)=>{
    console.log('delete',req.params)
    const {id} = req.params;
   goodslist = goodslist.filter(item=>{
       return item.id != id
   })
    res.send(`删除商品${id}成功`)
})