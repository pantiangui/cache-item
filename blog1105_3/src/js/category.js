// 栏目
function category() {
	// 添加新栏目
	$(".btn-primary").click(function() {
		var id = $("#category-id").val();
		var name = $("#category-name").val();
		var keywords = $("#category-keywords").val();
		var describe = $("#category-describe").val();
		$.ajax({
			type: "post",
			url: rootpath + '/huidl/category/addcategory',
			async: true, //异步
			data: { //传过去的数据
				"id": id,
				"name": name,
				"keywords": keywords,
				"describe": describe,
			},
			success: function(str) { //成功的回调
				if (str.err == 0) {
					alert("添加成功！")
					managecategory(); //刷新管理面板
					$(".btn-primary").parent().children().find('input').val("")
					$(".btn-primary").parent().children().find('textarea').val("")
				} else {
					alert("添加失败！")
				}
			}
		});
	})




	// 加载右侧管理栏目界面
	function managecategory() {
		$.ajax({
			type: "post",
			url: rootpath + '/huidl/category/managecategory',
			async: true, //异步
			success: function(str) { //成功的回调
				if (str.err == 0) {
					$(".col-md-7>h1 .badge").text(str.data.length)
					$(".table-striped>tbody").html("")
					for (var i = 0; i < str.data.length; i++) {

						var html =
							`<tr>
									<td>${str.data[i]._id}</td>
									<td>${str.data[i].name}</td>
									<td>${str.data[i].total}</td>
									<td><a class='update_c'>修改</a> <a rel='1' class="del">删除</a></td>
								</tr>`

						$(".table-striped>tbody").append(html)
					}
				} else {
					alert("加载失败！")
				}
			}
		});
	}
	managecategory(); //初始化管理面板



	// 管理界面删除按钮
	$("#main").on('click', '.del', function() {

		var res = confirm('您确定删除这条栏目信息吗？删除后将不可恢复……')
		if (res) {
			var id = $(this).parent().parent().children().eq(0).text();
			$.ajax({
				type: "post",
				url: rootpath + '/huidl/category/delcategory',
				async: true, //异步
				data: {
					'id': id
				},
				success: function(str) { //成功的回调
					if(str.err!=0){
						alert('出错啦！请重新操作')
					}
				}
			});
			managecategory(); //刷新管理面板
		}
		managecategory(); //刷新管理面板
	})
	
	
	
	// 管理界面修改按钮
	$("#main").on('click', '.update_c', function() {
		var id = $(this).parent().parent().children().eq(0).text();
		window.location.href="update-category.html?id="+id;
	})
}



//_____________________________________________________________
// 修改栏目
function update_category() {
	// 获取url的参数
	function GetRequest(){
		var url = location.search; //获取url中"?"符后的字串   
		url=url.split("?")[1];//截取？后面的字串
		url=url.split("=");//通过=截取
		var id=url[1]
		return id;
	}
	
	// 初始化请求数据
	function update_category_init(){
		var id=GetRequest();
		$.ajax({
			type: "post",
			url: rootpath + '/huidl/category/update_category_init',
			async: true, //异步
			data: {
				'id': id
			},
			success: function(str) { //成功的回调
				if(str.err==0){
					$("#category-id").val(str.data[0]._id);
					$("#category-name").val(str.data[0].name);
					$("#category-keywords").val(str.data[0].keywords);
					$("#category-describe").val(str.data[0].description);
					
				}
				
				
			}
		});
	}
	update_category_init()
	
	// 修改数据
	$(".btn-primary").click(function(){
		var id=$("#category-id").val();
		var name=$("#category-name").val();
		var keywords=$("#category-keywords").val();
		var description=$("#category-describe").val();
		$.ajax({
			type: "post",
			url: rootpath + '/huidl/category/update_category',
			async: true, //异步
			data: {
				'id': id,
				'name':name,
				'keywords':keywords,
				'description':description
			},
			success: function(str) { //成功的回调
				if(str.err==0){
					var res=confirm('更新成功，是否返回栏目页？')
					if(res){
						window.location.href="category.html";
					}
					else{
						update_category_init();//刷新页面
					}
				}
				
				
			}
		});
	})
}
