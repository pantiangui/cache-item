// 文章js   覆盖3个页面

// __________________________________________________
// 文章
function article() {
	var pagesize = 3; //定义一页显示的数据数量
	var total = 0;
	var total_page = 0
	// 初始化文章管理页
	function article_init(page) {
		$.ajax({
			type: "post",
			url: rootpath + '/huidl/article/article_init',
			async: true, //异步
			data: {
				page: page,
				pagesize: pagesize
			},
			success: function(str) { //成功的回调
				// console.log(str)
				if (str.err == 0) {
					total = str.data.total; //定义总数
					$(".page-header .badge").text(total)

					total_page = Math.ceil(total / pagesize); //总页数
					$(".pagination .total_page").text(total_page)

					$(".table-responsive table tbody").html('')
					for (let i = 0; i < str.data.data.length; i++) {
						// 二次查找栏目
						$.ajax({
							type: "post",
							url: rootpath + '/huidl/category/update_category_init',
							async: true, //异步
							data: {
								'id': str.data.data[i].category
							},
							success: function(str2) { //成功的回调

								if (str2.err == 0) {
									var html =
										`<tr id="${str.data.data[i]._id}">
													<td><input type="checkbox" class="input-control" name="checkbox[]" value="" /></td>
													<td class="article-title">${str.data.data[i].title}</td>
													<td>${str2.data[0].name}</td>
													<td class="hidden-sm">${str.data.data[i].comment}</td>
													<td>${str.data.data[i].date}</td>
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
	$(".table-responsive").on('click', '.update_article', function() {
		var id = $(this).parent().parent().attr('id');
		window.location.href = "update-article.html?id=" + id;
	})

	// 点击删除
	$(".table-responsive").on('click', '.del', function() {
		var res = confirm('您确定删除这条栏目信息吗？删除后将不可恢复……')
		if (res) {
			var id = $(this).parent().parent().attr("id")
			$.ajax({
				type: "post",
				url: rootpath + '/huidl/article/delarticle',
				async: true, //异步
				data: {
					'id': id
				},
				success: function(str) { //成功的回调
					if (str.err != 0) {
						alert('出错啦！请重新操作')
					}
				}
			});
			window.location.reload();
		}
		window.location.reload();

	})



	// 分页
	var targetPage = 1;

	function goPage(type) {

		switch (type) {
			// ——————————————————————
			case 'first':
				article_init(1);
				targetPage = 1;
				$(".pagination .current").text(targetPage);
				break;
				// ——————————————————————
			case 'prev':
				if (targetPage == 1) {
					alert('已经在第一页啦！');
					targetPage = 1;
				} else {
					targetPage = targetPage - 1;
					article_init(targetPage);
				}
				$(".pagination .current").text(targetPage);
				break;
				// ——————————————————————
			case 'next':
				if (targetPage == total_page) {
					targetPage = total_page;
					alert('已经在最后啦！');
				} else {
					targetPage = targetPage + 1;
					article_init(targetPage);
				}
				$(".pagination .current").text(targetPage);
				break;
				// ——————————————————————
			case 'last':
				targetPage = total_page;
				article_init(total_page);
				$(".pagination .current").text(targetPage);
				break;
		}
	}

	// 点击事件
	$(".first").click(function() {
		goPage('first')
	})
	$(".prev").click(function() {
		goPage('prev')
	})
	$(".next").click(function() {
		goPage('next')
	})
	$(".last").click(function() {
		goPage('last')
	})



	// 选择删除
	$("#all_del").click(function() {
		var res = confirm('您确定要删除选中的项目吗？删除后将不可恢复')
		if (res) {
			for (var i = 0; i < $(".input-control").length; i++) {
				if ($(".input-control").eq(i).attr('check')) {
					var id=$(".input-control").eq(i).parent().parent().attr('id');
					$.ajax({
						type: "post",
						url: rootpath + '/huidl/article/delarticle',
						async: true, //异步
						data: {
							'id': id
						},
						success: function(str) { //成功的回调
							if (str.err != 0) {
								alert('出错啦！请重新操作')
							}
						}
					});
				}
			}
			window.location.reload();
		}
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
			$(this).parent().parent().parent().children().find('input').eq(i).attr('check', '')
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
		if ($("#opt_pic").get(0).files[0]) {
			if ($(".pic_list").children().length < 5) {
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
			} else {
				alert('上传图片已达上限')
			}
		} else {
			alert('请选择图片！')
		}
	})



	// 添加文章
	$(".btn-primary").click(function() {
		var isok = false;
		var title = $("#article-title").val();
		if (!title) {
			alert('请输入标题！');
			isok = false;
		} else {
			isok = true;
		}
		var article = $("#article").val();
		if (!article) {
			alert('请输入文章内容！');
			isok = false;
		} else {
			isok = true;
		}
		var category = $(".category-list>li>label>input[check='check']").next().children().text();
		if (!category) {
			alert('请选择栏目！');
			isok = false;
		} else {
			isok = true;
		}
		var article_pic = ""; //图片路径
		if ($(".pic_list>li").length != 0) {
			for (var i = 0; i < $(".pic_list>li").length; i++) {
				article_pic += "&" + $(".pic_list>li").eq(i).attr('class')
			}
		} else {
			article_pic = "null"
		}
		var date = $(".article-time-display input").val();
		if (isok) {
			$.ajax({
				type: "post",
				url: rootpath + '/huidl/article/addarticle',
				async: true, //异步
				data: {
					title: title,
					article: article,
					category: category,
					article_pic: article_pic,
					comment: '0',
					date: date
				},
				success: function(str) { //成功的回调
					if (str.err == 0) {
						var res = confirm("成功发布！是否返回文章管理页？")
						if (res) {
							window.location.href = 'article.html'
						} else {
							window.location.reload();
						}
					} else {
						alert('发布失败！')
					}
				}
			});
		}
	})



}



// _______________________________________________________________________________
// 修改文章
function update_article() {
	// 初始化栏目页
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



	// 获取url的参数
	function GetRequest() {
		var url = location.search; //获取url中"?"符后的字串   
		url = url.split("?")[1]; //截取？后面的字串
		url = url.split("="); //通过=截取
		var id = url[1]
		return id;
	}

	// 初始化页面
	function update_article_init() {
		var id = GetRequest();
		$.ajax({
			type: "post",
			url: rootpath + '/huidl/article/update_article_init',
			async: true, //异步
			data: {
				'id': id
			},
			success: function(str) { //成功的回调
				if (str.err == 0) {
					// console.log(str.data[0])

					// 渲染页面
					$("#article-title").val(str.data[0].title);
					$("#article").val(str.data[0].article);
					// 栏目
					for (let i = 0; i < $(".category-list>li>label>input").length; i++) {
						var category = $(".category-list>li>label>input").eq(i).next().children().text();
						if (category == str.data[0].category) {
							$(".category-list>li>label>input").eq(i).attr('check', 'check')
							$(".category-list>li>label>input").eq(i).attr('checked', 'checked')
						}

					}
					// 图片
					var article_pic = str.data[0].article_pic.split("&")
					for (var i = 1; i < article_pic.length; i++) {
						// console.log(article_pic[i])
						var html = `<li class="${article_pic[i]}"><img src="${rootpath+"/huidl/"+article_pic[i]}" alt=""></li>`
						$(".pic_list").append(html);
					}

					var date = $(".article-time-display input").val(str.data[0].date);





				}


			}
		});
	}
	update_article_init()


	// 图片上传
	$("#pic_btn").click(function() {
		if ($("#opt_pic").get(0).files[0]) {
			if ($(".pic_list").children().length < 5) {
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
			} else {
				alert('上传图片已达上限')
			}
		} else {
			alert('请选择图片！')
		}
	})


	// 选中栏目按钮
	$(".col-md-3").on('click', '.radio', function() {
		for (let i = 0; i < $(this).parent().parent().parent().children().find('input').length; i++) {
			$(this).parent().parent().parent().children().find('input').eq(i).attr('check', '')
		}
		$(this).attr('check', 'check')
	})


	// 更新时间
	setInterval(function() {
		var mydate = new Date();
		var date = mydate.toLocaleString('chinese', {
			hour12: false
		});
		$(".article-time-now>input").val(date)
	}, 1000)


	// 修改文章
	$(".btn-primary").click(function() {
		var isok = false;
		var id = GetRequest();
		var title = $("#article-title").val();
		if (!title) {
			alert('请输入标题！');
			isok = false;
		} else {
			isok = true;
		}
		var article = $("#article").val();
		if (!article) {
			alert('请输入文章内容！');
			isok = false;
		} else {
			isok = true;
		}
		var category = $(".category-list>li>label>input[check='check']").next().children().text();
		if (!category) {
			alert('请选择栏目！');
			isok = false;
		} else {
			isok = true;
		}
		var article_pic = ""; //图片路径
		if ($(".pic_list>li").length != 0) {
			for (var i = 0; i < $(".pic_list>li").length; i++) {
				article_pic += "&" + $(".pic_list>li").eq(i).attr('class')
			}
		}
		var date = $(".article-time-now input").val();
		if (isok) {
			$.ajax({
				type: "post",
				url: rootpath + '/huidl/article/update_article',
				async: true, //异步
				data: {
					id: id,
					title: title,
					article: article,
					category: category,
					article_pic: article_pic,
					date: date
				},
				success: function(str) { //成功的回调
					if (str.err == 0) {
						var res = confirm("更新完成！是否返回文章管理页？")
						if (res) {
							window.location.href = 'article.html'
						} else {
							window.location.reload();
						}
					} else {
						alert('更新失败！')
					}
				}
			});
		}
	})



}
