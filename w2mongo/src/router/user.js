const express = require('express')
const {
    createHmac
} = await import('crypto');//密文
const router = express.Router()
module.exports = router;

// const mysql = require('../db/mySQL');

const {
    formatData,
    formatParams,
    Token
} = require('../utils');
const colName = 'user'

//注册
router.post('/reg', async (req, res) => {
    //1.接收前段参数
    const {
        username,
        password
    } = req.body;

    //@MySQL
    // //回掉函数的写法
    // mysql.query(`insert into user values('${null}','${username}','${password}')`,function(result){
    //     res.send()
    // })

    // //promise写法
    // mysql.query(`insert into user values('${null}','${username}','${password}')`).then((result)=>{

    // }).catch((err)=>{})

    //测试，try{}catch(){},测试错误
    // async、await
    // try{
    //     await mysql.query(`insert into user values(${null},'${username}','${password}')`);
    //     res.send('注册成功')
    // }catch(err){
    //     res.send('注册失败')
    //     console.log(err);
    // }
    //对密码进行单项加密
    const secret = 'abcdefg';//密钥
    const hash = createHmac('sha256', secret) //sha256是加密方法 MD5，sha1,sha128,sha512
        .update('I love cupcakes') //加密数据
        .digest('hex'); //密文
    console.log(hash);


    //@mongodb 
    const result = await db.insert(colName, {
        username,
        password
    })
    // if (result) {
    //     res.send({
    //         code: 200,
    //         msg: 'success',
    //         data: []
    //     })
    // } else {
    //     res.send({
    //         code: 400,
    //         msg: 'fail',
    //         data: []
    //     })
    // }
    res.send(
        formatData({
            code: result ? 200 : 400
        })
    )
})


//登录
router.get('/login', async (req, res) => {
    const {
        username,
        password
    } = req.query;
    // try {
    //     const result = await mysql.query(`select * form user where username = '${username}' AND password ='${password}'`)
    //     if (result.length>0) {
    //         res.send(result)
    //     }else{
    //         res.send('用户名或密码错误')
    //     }
    // } catch (error) {
    //     res.send('登录失败')
    // }

    const result = await db.query(colName, {
        username,
        password,
        mdl
    })
    //单项加密
    const hash = createHmac('sha256', secret) //sha256是加密方法 MD5，sha1,sha128,sha512
        .update('I love cupcakes') //加密数据
        .digest('hex'); //密文
    console.log(hash);

    console.log('result', result)
    //判断是否要
    let authorization
    if (mdl === 'ture') {
        //生成一个有效期为n天的token
        authorization = Token.create({
            username
        }, 'n')
    } else {
        authorization = Token.create([username])
    }
    //在后端设置cookie：设置`Set-Cookie`响应头
    // res.set({
    //     'Set-Cookie':`authorization = ${authorization}`
    // })
    result[0].authorization = authorization;
    if (result.length > 0) {
        res.send(formatData.success(result))
    } else {
        res.send(formatData.fail())
    }
})



//查询单个用户名
router.get('/:id', (req, res) => {
    const {
        page,
        size
    } = req.query;

    //计算跳过的数量和限制数量
    const skip = (page - 1) * size
    const limit = Number(size);

    const result = await db.query(colName, {}, {
        skip,
        limit,
        projection: {
            password: 0
        }
    })
    res.send(result)
})


//添加
// router.post('/', (req, res) => {

// })


//修改
// router.put('/', (req, res) => {

// })

//获取用户列表
// router.get('/list', async (req, res) => {
//     const {
//         page,
//         size
//     } = req.query;
//     //计算跳过来的数量和限制数量
//     const skip = (page - 1) * size
//     const limit = Number(size);

//     const result = await db.query(colName, {}, {
//         //projection 映射
//         skip,
//         limit,
//         projection: {
//             password: 0
//         }
//     })
//     // res.send(result);
//     res.send(
//         formatData.success(result)
//     )
// })

//验证用户名是否存在
router.get('/check', async (req, res) => {
    const {
        username
    } = req.query;

    const result = await db.query(colName, {
        username
    })

    if (result.length > 0) {
        // res.send({
        //     code:400,
        //     msg:'user is exists'
        // })
        res.send(
            formatData({
                code: 400,
                msg: 'user is exists'
            })
        )
    } else {
        // res.send({
        //     code:200,
        //     msg:'ok'
        // });
        res.send(
            formatData()
        )
    }
})

//更新数据
router.put('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    // const {
    //     password,
    //     age,
    //     role,
    //     gender
    // } = req.body;
    //调用封装的数据格式化工具
    const newData = formatParams(req.body, ['password', 'age', 'role', 'gender'])
    console.log(newData);
    // 练习：封装一个方法formatData()实现参数处理
    // const newData = formatData(req.body,['password','age','role','gender'])
    // const newData = {}
    // if (password) {
    //     newData.password = password
    // }
    // if (age) {
    //     newData.age = age
    // }
    // if (role) {
    //     newData.role = role
    // }
    // if (gender) {
    //     newData.gender = gender
    // }

    let result;
    try {
        await db.update(colName, {
            _id: id
        }, {
            $set: newData
        })
        result = true;
    } catch (err) {
        result = false;
    }

    res.send(
        formatData({
            code: result ? 200 : 400
        })
    )
})



// 删除
router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params
    const result = await db.del(colName, {
        _id: id
    })
    res.send(
        formatData({
            code: result ? 200 : 400
        })
    )
})