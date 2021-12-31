"use strict";

var mysql = require('mysql'); //方式一、
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


var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  //port:'3136',
  password: '123456',
  database: 'goodslist' // multipleStatements:true

}); //回调函数：返回值，result
// function query(sql,callback){
//     pool.query(sql,function(err,result){
//         callback(result)
//     })
// }
//Promis

function query(sql) {
  return new Promise(function (resolve, reject) {
    pool.query(sql, function (err, result) {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  });
}

module.exports = {
  query: query
};