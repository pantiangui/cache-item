// 栏目路由



const express=require('express');
const Router=express.Router();
// 引入模型
const categoryModel=require('../model/categoryModel.js');

/**
 * @api {post} /category/addcategory 添加栏目
 * @apiName addcategory
 * @apiGroup addcategory
 *
 * @apiParam {String} id 栏目id
 * @apiParam {String} name 栏目名
 * @apiParam {String} keywords 关键字
 * @apiParam {String} describe 描述
 *
 * @apiSuccess {String} err 错误码
 * @apiSuccess {String} msg  信息
 */

// 添加栏目
Router.post('/addcategory',function(req,res){
	let {id,name,keywords,describe} = req.body;
	categoryModel.insertMany({'_id':id,'name':name,'keywords':keywords,'total':"0",'description':describe})
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



/**
 * @api {post} /category/managecategory 初始化管理栏目
 * @apiName managecategory
 * @apiGroup managecategory
 *
 * @apiSuccess {String} err 错误码
 * @apiSuccess {String} msg  信息
 * @apiSuccess {String} data  返回值
 */

// 初始化管理栏目
Router.post('/managecategory',function(req,res){
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
 * @api {post} /category/delcategory 删除栏目
 * @apiName delcategory
 * @apiGroup delcategory
 *
 *@apiParam {String} id id值
 * 
 * @apiSuccess {String} err 错误码
 * @apiSuccess {String} msg  信息
 */

// 删除栏目
Router.post('/delcategory',function(req,res){
	let {id} = req.body;
	
	categoryModel.remove({_id:id})
	.then(function(data){
		if(data.ok==1){
			return res.send({err:0,msg:'删除成功'})
		}
	})
	.catch(function(err){
		return res.send({err:-1,msg:'删除失败'})
	})
})



//_________________________________________

/**
 * @api {post} /category/update_category_init 初始化修改栏目
 * @apiName update_category_init
 * @apiGroup update_category_init
 *
 *@apiParam {String} id id值
 * 
 * @apiSuccess {String} err 错误码
 * @apiSuccess {String} msg  信息
 * @apiSuccess {String} data  返回数据
 */

// 初始化修改栏目
Router.post('/update_category_init',function(req,res){
	let {id} = req.body;
	// res.send(id)
	categoryModel.find({"_id":id})
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
 * @api {post} /category/update_category 修改栏目
 * @apiName update_category
 * @apiGroup update_category
 *
 *@apiParam {String} id id值
 * @apiParam {String} name 栏目名称
 * @apiParam {String} keywords 关键字
 * @apiParam {String} description 描述
 * 
 * @apiSuccess {String} err 错误码
 * @apiSuccess {String} msg  信息
 */

// 修改栏目
Router.post('/update_category',function(req,res){
	let {id,name,keywords,description} = req.body;
	categoryModel.updateOne({
		_id:id
	},{
		$set:{
			name:name,
			keywords:keywords,
			description:description
		}
	})
	.then(function(data){
		return res.send({err:0,msg:'更新成功'})
	})
	.catch(function(err){
		return res.send({err:-1,msg:'更新失败'})
	})
})








module.exports=Router;