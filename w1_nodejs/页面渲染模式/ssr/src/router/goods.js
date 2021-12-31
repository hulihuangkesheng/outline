const express = require('express')
const router = express.Router()
module.exports = router

let goodslist = []

for(let i=0;i<20;i++){
    let goods = {
        id:i+1,
        name:'goods'+i,
        price:(Math.random()*1000).toFixed(2),
        imgurl:`img/goods${i}.jpg`
    }
    goodslist.push(goods)
}

router.get('/list',(req,res)=>{
    res.send(goodslist)
})