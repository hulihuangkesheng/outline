const express = require('express')

const router = express.Router()

module.exports = router;
//一个订单里面可能有多个商品
let orderList = [];

for(let i =0 ;i<10;i++){
    const order = {
        id:i+1,
        name:'order'+i,
        price:(Math.random()*1000).toFixed(2)
    }
    orderList.push(order)
}
router.get('/orderlist',(req,res)=>{
    console.log('orderList',orderList);
    res.send(orderList)
})
//添加订单
router.post('/order',(req,res)=>{
    console.log('添加',req.body);
    console.log('请求头',req.get('罐头'))
    res.send('添加成功')
})

//查找订单
router.get('/order',(req,res)=>{
    const { id } = req.query;
    const currentOrder = orderList.find(item=>{
        return item.id = id;
    })
    res.send(currentOrder)
})

//修改订单
router.put('/',(req,res)=>{
    const {id} = req.query
    const currenOrder = orderList.find((item)=>{
        return item.id == id
    })
    console.log('update',req.body);

    res.send(currenOrder)
})

//删除订单
router.delete('/',(req,res)=>{
    console.log('delete',req.body)
    const {id} = req.query;
    orderList = orderList.filter(item=>{
       return item.id != id
   })

    res.send(`删除订单${id}成功`)
})