const express = require('express')

const router = express.Router()

module.exports = router;

let userList = [];

for(let i = 0;i<10;i++){
    const user = {
        id:i+1,
        name:'user'+i,
        sex:'男',
        heigth:(Math.random()*180).toFixed(2),
    }
    userList.push(user);
}

router.get('/userlist',(req,res)=>{
    console.log('userList');
    res.send(userList)
})
// get /user/login
router.get('/login',function(req,res){
    console.log('login');
    const {id} = req.query;
    const currentUser = userList.find(item=>{
        return item.id == id
    })
    res.send(currentUser);
    // console.log('登录成功');
})

// post /user/reg
router.post('/reg',function(req,res){
    console.log('添加',req.body);
    console.log('请求头',req.get('小红'))
    res.send('注册成功');
})

router.put('/',(req,res)=>{
    const{id} = req.query
    const currenUser  = userList.find(item=>{
        return item.id == id;
    })
    res.send(currenUser)
})

router.delete('/',(req,res)=>{
    const{id} = req.query
    userList = userList.filter(item=>{
        return item.id != id;
    })
    res.send(`通过id删除用户名`)
})