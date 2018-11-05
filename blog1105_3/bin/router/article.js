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
 * @apiSuccess {String} data.total  总数
 * @apiSuccess {String} data.data  数据
 */

// 初始化文章管理页
Router.post('/article_init',function(req,res){
	let total=0;//总数
	let page=Number(req.body.page);;//当前页码
	let pagesize=Number(req.body.pagesize);;//显示条数
	articleModel.find()
	.then(function(datas){
		total=datas.length
		return articleModel.find().limit(pagesize).skip((page-1)*pagesize)
	})
	.then(function(datalist){
		if(datalist.length>0){
			let data={total:total,data:datalist}
			return res.send({err:0,msg:'加载完成',data:data})
		}
	})
	.catch(function(err){
		console.log(err)
		return res.send({err:-1,msg:'加载失败',data:'null'})
	})
})


/**
 * @api {post} /article/delarticle 删除文章
 * @apiName delarticle
 * @apiGroup delarticle
 *
 *@apiParam {String} id id值
 * 
 * @apiSuccess {String} err 错误码
 * @apiSuccess {String} msg  信息
 */

// 删除文章
Router.post('/delarticle',function(req,res){
	let {id} = req.body;
	
	articleModel.remove({_id:id})
	.then(function(data){
		if(data.ok==1){
			return res.send({err:0,msg:'删除成功'})
		}
	})
	.catch(function(err){
		return res.send({err:-1,msg:'删除失败'})
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
 * @apiParam {String} article_pic 图片
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
	})
	.catch(function(err){
		return res.send({err:-1,msg:'添加失败'})
	})
})





// 修改文章页
// ————————————————————————————————————————————————————————


/**
 * @api {post} /article/update_article_init 初始化文章修改页
 * @apiName update_article_init
 * @apiGroup update_article_init
 * 
 * @apiParam {String} id 文章id
 *
 * @apiSuccess {String} err 错误码
 * @apiSuccess {String} msg  信息
 * @apiSuccess {String} data  返回值
 */

// 初始化文章管理页
Router.post('/update_article_init',function(req,res){
	let {id} = req.body;
	
	articleModel.find({'_id':id})
	.then(function(data){
		if(data.length>0){
			return res.send({err:0,msg:'初始化完成',data:data})
		}
	})
	.catch(function(err){
		return res.send({err:-1,msg:'出错啦',data:null})
	})
})


/**
 * @api {post} /category/update_article 修改文章
 * @apiName update_article
 * @apiGroup update_article
 *
 * @apiParam {String} id id值
 * @apiParam {String} title 文章标题
 * @apiParam {String} article 文章内容
 * @apiParam {String} category 栏目
 * @apiParam {String} article_pic 图片
 * @apiParam {String} date 日期
 *
 * @apiSuccess {String} err 错误码
 * @apiSuccess {String} msg  信息
 */

// 修改文章
Router.post('/update_article',function(req,res){
	let {id,title,article,category,article_pic,date} = req.body;
	articleModel.updateOne({
		_id:id
	},{
		$set:{
			title:title,
			article:article,
			category:category,
			article_pic:article_pic,
			date:date
		}
	})
	.then(function(data){
		if(data.n==1&&data.ok==1){
			return res.send({err:0,msg:'添加成功'})
		}
	})
	.catch(function(err){
		return res.send({err:-1,msg:'添加失败'})
	})
})



module.exports=Router;