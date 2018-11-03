// 文章js   覆盖3个页面

// __________________________________________________
// 文章
function article() {
	// 初始化文章管理页
	function article_init(){
		$.ajax({
			type: "post",
			url: rootpath + '/huidl/article/article_init',
			async: true, //异步
			success: function(str) { //成功的回调
				if (str.err == 0) {
					for (let i = 0; i < str.data.length; i++) {
						// 二次查找栏目
						$.ajax({
							type: "post",
							url: rootpath + '/huidl/category/update_category_init',
							async: true, //异步
							data: {
								'id': str.data[i].category
							},
							success: function(str2) { //成功的回调
								if(str2.err==0){
									var html=`<tr id="${str.data[i]._id}">
													<td><input type="checkbox" class="input-control" name="checkbox[]" value="" /></td>
													<td class="article-title">${str.data[i].title}</td>
													<td>${str2.data[0].name}</td>
													<td class="hidden-sm">${str.data[i].comment}</td>
													<td>${str.data[i].date}</td>
													<td><a class="update_article">修改</a> <a rel="6" class="del">删除</a></td>
												</tr>`
									
									$(".table-responsive table tbody").append(html)
								}
								
							}
						});
					}
				}
			}
		});
	}
	article_init()
	
	
	
	// 点击修改
	$(".table-responsive").on('click','.update_article',function(){
		var id=$(this).parent().parent().attr('id');
		window.location.href="update-article.html?id="+id;
	})
	
	
	
	
	
	
}



// __________________________________________________
// 添加文章
function add_article() {
	// 初始化栏目
	function category_init() {
		$.ajax({
			type: "post",
			url: rootpath + '/huidl/article/category_init',
			async: true, //异步
			success: function(str) { //成功的回调
				if (str.err == 0) {
					for (var i = 0; i < str.data.length; i++) {
						var html =
							`<li>
          					<label>
          						<input name="category" type="radio" class='radio'>
          						${str.data[i].name} <em class="hidden-md">( ID: <span>${str.data[i]._id}</span> )</em></label>
          				</li>`
						$(".category-list").append(html)
					}
				}
			}
		});
	}
	category_init()

	// 选中栏目按钮
	$(".col-md-3").on('click', '.radio', function() {
		for (let i = 0; i < $(this).parent().parent().parent().children().find('input').length; i++) {
			$(this).parent().parent().parent().children().find('input').attr('check', '')
		}
		$(this).attr('check', 'check')
	})

	// 更新时间
	setInterval(function() {
		var mydate = new Date();
		var date = mydate.toLocaleString('chinese', {
			hour12: false
		});
		$(".article-time-display>input").val(date)
	}, 1000)



	// 图片上传
	$("#pic_btn").click(function() {
		if ($(".pic_list").children().length<5) {
			var formData = new FormData() //创建

			formData.append("test", $("#opt_pic")[0].files[0])
			// console.log(formData.get("test"))  //输出文件详细信息

			$.ajax({
				url: rootpath + '/huidl/article/add_pic',
				type: 'POST',
				data: formData, //图片的相关信息
				cache: false,
				contentType: false,
				processData: false,
				success: function(data) {
					console.log(data)
					if (data.err == 0) {
						var html = `<li class="${data.path}"><img src="${rootpath+"/huidl/"+data.path}" alt=""></li>`
						$(".pic_list").append(html)
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					document.getElementById("status").html("<span style='color:red'>连接不到服务器，请检查网络！</span>");
				}
			});
		}
		else{
			alert('上传图片已达上限')
		}
	})
	
	
	
	// 添加文章
	$(".btn-primary").click(function(){
		var isok=false;
		var title=$("#article-title").val();
		if(!title){
			alert('请输入标题！');
			isok=false;
		}else{
			isok=true;
		}
		var article=$("#article").val();
		if(!article){
			alert('请输入文章内容！');
			isok=false;
		}else{
			isok=true;
		}
		var category=$(".category-list>li>label>input[check='check']").next().children().text();
		if(!category){
			alert('请选择栏目！');
			isok=false;
		}else{
			isok=true;
		}
		var article_pic="";//图片路径
		if($(".pic_list>li").length!=0){
			for(var i=0;i<$(".pic_list>li").length;i++){
				article_pic+="&"+$(".pic_list>li").eq(i).attr('class')
			}
		}
		var date=$(".article-time-display input").val();
		if(isok){
			$.ajax({
				type: "post",
				url: rootpath + '/huidl/article/addarticle',
				async: true, //异步
				data:{
					title:title,
					article:article,
					category:category,
					article_pic:article_pic,
					comment:'0',
					date:date
				},
				success: function(str) { //成功的回调
					if(str.err==0){
						var res=confirm("成功发布！是否返回文章管理页？")
						if(res){
							window.location.href='article.html'
						}
					}else{
						alert('发布失败！')
					}
				}
			});
		}
	})
	
	
	
	
	
	
	
	
	
	
}



// __________________________________________________
// 修改文章
function update_article() {

	// 初始化栏目
	function category_init() {
		$.ajax({
			type: "post",
			url: rootpath + '/huidl/article/category_init',
			async: true, //异步
			success: function(str) { //成功的回调
				if (str.err == 0) {
					for (var i = 0; i < str.data.length; i++) {
						var html =
							`<li>
	          					<label>
	          						<input name="category" type="radio" class='radio'>
	          						${str.data[i].name} <em class="hidden-md">( ID: <span>${str.data[i]._id}</span> )</em></label>
	          				</li>`
						$(".category-list").append(html)
					}
				}
			}
		});
	}
	category_init()

	// 选中栏目按钮
	$(".col-md-3").on('click', '.radio', function() {
		for (let i = 0; i < $(this).parent().parent().parent().children().find('input').length; i++) {
			$(this).parent().parent().parent().children().find('input').attr('check', '')
		}
		$(this).attr('check', 'check')
	})



}
