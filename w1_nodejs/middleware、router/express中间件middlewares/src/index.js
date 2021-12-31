const express = require('express');
const path = require('path');

const app = express();

//静态资源配置
// app.use(express.static('..'))//相对路径
//绝对路径
const staticMiddleware = express.static(path.join(__dirname, '../public'))

//中间件middle
app.use(staticMiddleware);
// console.log('staticMiddleware', staticMiddleware);

//中间件的格式
/*
app.use(middleware);
app.use('/api',mifdleware)
app.use('/api',middleware1,mifdleware2)
*/

//自定义中间
// app.use(function(req,res,next){
//     console.log('自定义中间件1');
//     next()
// })
// app.use(function(req,res,next){
//     console.log('自定义中间件2');
//     next()
// }),
// app.use(function(){
//     console.log('自定义中间件3');
// })

//携带路径的中间件
// app.use('/goods',(req,res)=>{
//     console.log('goods中间件');
// })
/*中间件的参数
request
repponse
next
*/

// app.use('/login',function(req,res){
//     console.log('login');
//     res.send("登陆成功");
// })
// app.use('/reg',function(req,res){
//     console.log('reg');
//     res.send("注册成功");
// })

//请求类型
//>接口规范：RESFUL：根据请求类型和路径实现不同的接口
// get(查),post(增),put/patch(改),delete(删);
// app.get('/login',(req,res)=>{
//     console.log('login');
//     res.send("登陆成功")
// })
// app.post('/reg',(req,res)=>{
//     console.log('reg');
//     res.send("注册成功")
// })
// app.put('/put',(req,res)=>{
//     console.log('reg');
//     res.send("修改成功")
// })
// app.delete('/delete',(req,res)=>{
//     console.log('reg');
//     res.send("删除成功")
// })
let goodslist = []
app.get('/goodslist', (req, res) => {
    // console.log('goodslist');
    // let goodslist = []

    for (let i = 0; i < 20; i++) {
        const goods = {
            id: i + 1,
            name: 'goods' + i,
            price: (Math.random() * 1000).toFixed(2),
            imgurl: `img/goods${i}.jpg`
        }
        goodslist.push(goods);
    }
    res.send(goodslist)
})

//获取商品id
app.get('/goods', (req, res) => {
    const {
        id
    } = req.query
    const currentGoods = goodslist.find((item) => {
        return item.id == id
    })
    res.send(currentGoods)
})
//删除商品id
app.delete('/goods', (req, res) => {
    const {
        id
    } = req.query;
    goodslist = goodslist.filter(item => {
        return item.id != id
    })
    res.send(`删除商品${id}成功`)
})
//修改商品id
app.put('/goods', (req, res) => {
    const {
        id
    } = req.query;
    const {
        id2
    } = req.query;
    goodslist = goodslist.updateOne(item => {
        return item.id == id2
    })
    res.send(`修改商品${id}成功`)
})
app.post('/goods',(req,res)=>{
    const goods = {
        id: i + 1,
        name: 'goods' + i,
        price: (Math.random() * 1000).toFixed(2),
        imgurl: `img/goods${i}.jpg`
    }=req.query;
    goodslist = goodslist.insert(   )

})
app.listen(3136, () => {
    console.log('server is running at port http://localhost:3136');
})