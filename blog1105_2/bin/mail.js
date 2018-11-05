'use strict';
const nodemailer = require('nodemailer');

// nodemailer.createTestAccount((err, account) => {
let transporter = nodemailer.createTransport({
	service: '163', //邮箱的服务商
	port: 465, //true为465，默认false为587
	secure: true, //端口号参数  false为http,true为https
	auth: {
		user: "pantiangui2806@163.com", // 默认邮箱
		pass: 'asdf1234' // //smtp 授权码
	}
});


function sendmail(email, msg) {
	return new Promise(function(resolve, reject) {

		// 发送邮件相关信息（接收端）
		let mailOptions = {
			from: 'pantiangui2806@163.com', //发送方
			to: email, // 接收方
			subject: 'xxx管理系统注册验证', // 标题
			html: '您的验证码为：<b style="color: royalblue;">' + msg + '</b>,如果不是本人操作，请忽略此邮件' // 创建html结构
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				reject(error);
			}
			resolve()
		});
	})
}

// sendmail('848190423@qq.com',2212)
module.exports = {
	sendmail
};
// });
