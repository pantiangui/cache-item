# HuiDl blog manage使用日志

## 文件夹对应功能
	bin			相关脚本及后台api
		apidoc		api文档
	docs		项目相关文档
	lib			第三方插件库
	src			源码文件
	tmp			项目使用图片
	README.md	项目介绍
	
	
	
	
## js文件对应功能
	admin-script.js			公共js
	login.js				登录模块js
	category.js				栏目模块js
	article.js				文章模块js
	

	
	
	
## html文件对应功能
	add-article.html	写文章
	add-flink.html		增加友情链接
	add-notice.html		写公告
	article.html		文章
	category.html		栏目
	comment.html		评论
	flink.html			友情链接
	index.html			主页
	login.html			登录
	loginlog.html		登录记录
	manage-user.html	管理用户
	notice.html			公告
	setting.html		常规设置
	update-article.html		文章修改
	update-category.html	修改栏目
	update-flink.html		修改友情链接
	
	
	
## 数据库信息
### users 用户表
		_id					主键
		username			用户名
		userpwd				用户密码
		
		
### category 栏目表
		_id					主键
		name				栏目名
		keywords			关键字
		total				总数
		description			描述
	

### article 文章表
		_id					主键
		title				标题
		article				文章
		category			栏目
		comment				评论
		date				日期
		

	