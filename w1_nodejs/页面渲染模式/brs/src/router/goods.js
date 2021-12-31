const express = require('express')
const router = express.Router()
module.exports = router


let goodslist=[]
for(let i=0;i<20;i++){
    const goods = {
        id:i+1,
        name:'goods'+i,
        price:(Math.random()*1000).toFixed(2),
        imgurl:`img/goods${i}.jpg`
    }
    goodslist.push(goods)
}

//获取商品信息
router.get('/list',(req,res)=>{
    console.log('goodslist',goodslist);
    res.send(goodslist)
})


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