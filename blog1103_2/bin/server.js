const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const db=require('./model/dbconnect.js');
const path=require('path')

//post参数解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//静态文件开启
app.use('/huidl',express.static(path.join(__dirname,'../src')));
app.use('/huidl',express.static(path.join(__dirname,'../tmp')));


// 路由配置
const user=require('./router/user.js');//用户
const category=require('./router/category.js');//栏目
const article=require('./router/article.js');//文章



// 路由指向
app.use('/huidl/user',user);//用户
app.use('/huidl/category',category);//栏目
app.use('/huidl/article',article);//文章




app.listen(5000,()=>{
	console.log("服务器启动")
})
