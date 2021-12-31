const express = require('express')
const router = express.Router()
module.exports = router;

//数据接口(路由)
router.use(express.urlencoded(),express.json())


const data = {
    id:1,
    name:'laohuang',
    age:23,
    sex:'男',
    height:178
}
//api/jsonp
router.get('/jsonp',(req,res)=>{
    const {callback} = req.query;
    // res.send(`${callback}(${JSON.stringify(data)})`)
    // console.log(console.log(6666666));
    // res.send(console.log(66666))
    console.log(console.log(`${callback}(${JSON.stringify(data)})`));
})

// router.get('/jsonp',(req,res)=>{
//     console.log(console.log(88888));
//     // 接收参数你
//     // const {callback} = req.query;
//     // // res.send('hello jsonp')
//     // res.send(console.log(000000000))
//     // res.send(`${callback}(${JSON.stringify(data)})`)
//     const {callback} = req.query;
//     // res.send('hello jsonp')
//     res.send(`${callback}(${JSON.stringify(data)})`)
// })