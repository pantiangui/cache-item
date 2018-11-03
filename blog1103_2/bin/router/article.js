// 文章路由


const express=require('express');
const Router=express.Router();
const fs = require('fs');
const path = require("path")

// 引入模型
const articleModel=require('../model/articleModel.js');
const categoryModel=require('../model/categoryModel.js');


// 文章管理页主页
// ————————————————————————————————————————————————————————


/**
 * @api {post} /article/article_init 初始化文章管理页
 * @apiName article_init
 * @apiGroup article_init
 *
 * @apiSuccess {String} err 错误码
 * @apiSuccess {String} msg  信息
 * @apiSuccess {String} data  返回值
 */

// 初始化文章管理页
Router.post('/article_init',function(req,res){
	articleModel.find()
	.then(function(data){
		if(data.length>0){
			return res.send({err:0,msg:'加载完成',data:data})
		}
	})
	.catch(function(err){
		return res.send({err:-1,msg:'加载失败',data:'null'})
	})
})


















// 添加文章页
// ————————————————————————————————————————————————————————

/**
 * @api {post} /category/managecategory 初始化右侧栏目
 * @apiName managecategory
 * @apiGroup managecategory
 *
 * @apiSuccess {String} err 错误码
 * @apiSuccess {String} msg  信息
 * @apiSuccess {String} data  返回值
 */

// 初始化右侧栏目
Router.post('/category_init',function(req,res){
	categoryModel.find()
	.then(function(data){
		if(data.length>0){
			return res.send({err:0,msg:'加载完成',data:data})
		}
	})
	.catch(function(err){
		return res.send({err:-1,msg:'加载失败',data:'null'})
	})
})




/**
 * @api {post} /upload/img/ 图片上传
 * @apiName uploadimg
 * @apiGroup upload
 *
 * @apiParam {String} test formdata .
 *
 * @apiSuccess {String} err 错误码
 * @apiSuccess {String} msg  信息.
 * @apiSuccess {String} path 图片的服务器路径
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       err:0,
 * 	     msg:'ok',
 *		 path:'img/1540796695024.png'
 *     }
 */

// 图片上传

const multer = require('multer') //解析图片
let upload = multer({
	dest: '../../tmp/cache_img'
}) //设置图片保存的临时路径（在缓存中）

Router.post('/add_pic', upload.single('test'), (req, res) => {
	
	// console.log(req.file) //获取缓存中的文件路径
	
	fs.readFile(req.file.path, (err, data) => { //读取文件
		if (err) {
			return res.send("上传错误")
		} //出错提示
		//没有错误则进行写入操作
		let filename = new Date().getTime() + parseInt(Math.random(0, 1) * 1000) + "." + req.file.mimetype.split('/')[1]; //重命名文件名
		//写入文件
		// console.log(filename)
		fs.writeFile(path.join(__dirname, '../../tmp/article_img', filename), data, (err) => {
			if (err) return res.send("上传错误")
			let array = {
				err: 0,
				msg: 'ok',
				path: 'article_img/' + filename
			}
			res.send(array)
		});
	})
})



/**
 * @api {post} /category/addarticle 添加文章
 * @apiName addarticle
 * @apiGroup addarticle
 *
 * @apiParam {String} title 文章标题
 * @apiParam {String} article 文章内容
 * @apiParam {String} category 栏目
 * @apiParam {String} comment 评论
 * @apiParam {String} date 日期
 *
 * @apiSuccess {String} err 错误码
 * @apiSuccess {String} msg  信息
 */

// 添加文章
Router.post('/addarticle',function(req,res){
	let {title,article,category,article_pic,comment,date} = req.body;
	articleModel.insertMany({title,article,category,article_pic,comment,date})
	.then(function(data){
		if(data.length>0){
			return res.send({err:0,msg:'添加成功'})
		}
		console.log(data)
	})
	.catch(function(err){
		return res.send({err:-1,msg:'添加失败'})
	})
})




// 修改文章页
// ————————————————————————————————————————————————————————





module.exports=Router;