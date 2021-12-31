const mysql = require('mysql');

//方式一、
// //设置数据库
// const con = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'123456',
//     database:'gooodslist'
// })
// //链接数据库
// con.connect()

// //断开数据库
// con.end()


//方式二、
//连接池方式，默认会在链接池中创建十个对象（connectionLimit），使用完成自动放回连接池，不需要手动关闭
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    //port:'3136',
    password:'123456',
    database:'goodslist',
    // multipleStatements:true
});


//回调函数：返回值，result
// function query(sql,callback){
//     pool.query(sql,function(err,result){
//         callback(result)
//     })
// }

//Promis对象把结果result传递给后端
function query(sql){
    return new Promise((resolve,reject)=>{
        pool.query(sql,function(err,result){
            if(err){
                reject(err);
            }
            resolve(result)
        })
    })
}

module.exports = {query}
