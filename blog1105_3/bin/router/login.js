const express=require('express');
const Router=express.Router();
// 引入邮箱模块
const mail = require('../mail.js')
// 引入模型
const adminModel=require('../model/adminModel.js');
// 引入时间
var sd = require('silly-datetime');

 let obj={}
/**
 * @api {post} /admin/getcode 获取验证码
 * @apiName getcode
 * @apiGroup getcode
 *
 * @apiParam {String} email 用户名邮箱
 *
 * @apiSuccess {String} err 错误码
 * @apiSuccess {String} msg  信息
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       err:0,
 * 	     msg:'ok',
 *     }
 */

// 获取验证码
Router.post('/getcode', function(req, res) {
	let {email} = req.body;
	// console.log(email)
	if(!email||email==''){return res.send({err:-1,msg:'参数错误',data:null})}
	// 生成验证码
	let nums=(parseInt(Math.random()*900000+100000)).toString();
	// console.log(nums)
	// 发送邮件
	mail.sendmail(email,nums)
	.then((data) => {
		//保存验证码信息
		obj[email]=nums;
		res.send({err:0,msg:'验证码已发送'})
	})
	.catch((err) => {
		res.send({err:-1,msg:'验证码发送失败'})
	});
});


/**
 * @api {post} /admin/login 获取验证码
 * @apiName login
 * @apiGroup login
 *
 * @apiParam {String} adminname 用户名
 * @apiParam {String} adminpwd 用户名邮箱
 * @apiParam {String} code 验证码
 * @apiParam {String} ip ip地址
 *
 * @apiSuccess {String} err 错误码
 * @apiSuccess {String} msg  错误信息
 * @apiSuccess {String} data  admin信息
 */

// 登录
Router.post('/login',function(req,res){
	let {adminname,adminpwd,code,ip} = req.body;
	if(obj[adminname]!=code){return res.send({err:-1,msg:"验证码错误"})}
	
	// 获取当前时间
	var sd = require('silly-datetime');
	var date=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
	
	adminModel.find({adminname,adminpwd})
	.then(function(data){
		// console.log(data)
		let dates=data[0].date;
		let ips=data[0].ip;
		
		adminModel.updateOne({
			adminname:adminname,
			adminpwd:adminpwd
		},{
			$set:{
				"date":dates+'&'+date,
				"ip":ips+'&'+ip
			}
		})
		.then(function(aa){
		})
		return res.send({err:0,msg:'登录中……',data:data})
	})
	.catch(function(err){
		return res.send({err:-1,msg:'请重新登录',data:null})
	})
})


module.exports=Router;