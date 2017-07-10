var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../config/sqlInfo');

//创建连接池
var pool  = mysql.createPool($sql.mysql);

//查询语句
var queryAll = 'select * from goods';

//向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			'status': 'error',
			'msg': '失败'
		})
	}
	else {
		res.json({'status': 'success','msg': '成功','data':ret})
	}
};


router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Hi,你好' });
});
//返回所有商品信息
router.get('/queryAllGood', function(req, res, next) {
  	pool.getConnection(function (err, connection) {
		connection.query(queryAll, function (err, result) {
			jsonWrite(res, result)
		})
	})
});

module.exports = router;