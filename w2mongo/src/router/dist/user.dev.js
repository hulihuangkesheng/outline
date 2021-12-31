"use strict";

var express = require('express');

var router = express.Router();
module.exports = router;

var mysql = require('../db/db'); //注册


router.post('/reg', function _callee(req, res) {
  var _req$body, username, password;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password; // //回掉函数的写法
          // mysql.query(`insert into user values('${null}','${username}','${password}')`,function(result){
          //     res.send()
          // })
          // //promise写法
          // mysql.query(`insert into user values('${null}','${username}','${password}')`).then((result)=>{
          // }).catch((err)=>{})
          //测试，try{}catch(){},测试错误
          // async、await

          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(mysql.query("insert into user values(".concat(null, ",'", username, "','").concat(password, "')")));

        case 4:
          res.send('注册成功');
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          res.send('注册失败');
          console.log(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
}); //登录

router.get('/login', function _callee2(req, res) {
  var _req$query, username, password, result;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$query = req.query, username = _req$query.username, password = _req$query.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(mysql.query("select * form user where username = '".concat(username, "' AND password ='").concat(password, "'")));

        case 4:
          result = _context2.sent;

          if (result.length > 0) {
            res.send(result);
          } else {
            res.send('用户名或密码错误');
          }

          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          res.send('登录失败');

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); //查询单个用户名

router.get('/:id', function (req, res) {}); //删除

router["delete"]('/:id', function (req, res) {}); //添加

router.post('/', function (req, res) {}); //修改

router.put('/', function (req, res) {}); //获取用户列表