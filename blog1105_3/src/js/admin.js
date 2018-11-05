
// 管理员js


// ____________________________________________________________
function manage_admin(){
	
	// 初始化管理员页
	function manage_admin_init(){
		$.ajax({
			type: "post",
			url: rootpath + '/huidl/admin/manage_admin_init',
			async: true, //异步
			success: function(str) { //成功的回调
				if (str.err == 0) {
					console.log(str.data)
					$("#main .badge").text(str.data.length)
					$(".table-striped tbody").html("")
					for (var i = 0; i < str.data.length; i++) {
						// 截取时间
						var data_len=str.data[i].date.split("&").length;
						var date=str.data[i].date.split("&")[data_len-1]
						var html =
							`<tr>
						<td>${str.data[i]._id}</td>
						<td>${str.data[i].adminname}</td>
						<td>${str.data[i].adminpwd}</td>
						<td>${str.data[i].name}</td>
						<td>${date}</td>
						<td><a name="look" class="look">查看</a>  <a rel="1" class="del" name="delete">删除</a></td>
					</tr>`
						
						$(".table-striped tbody").append(html)
					}
				}
			}
		});
	}
	manage_admin_init();
	
	
	// 增加管理员
	$("#addadmin").click(function(){
		var id=$("#addUser tbody input[name='id']").val();
		var name=$("#addUser tbody input[name='truename']").val();
		var adminname=$("#addUser tbody input[name='username']").val();
		var tel=$("#addUser tbody input[name='usertel']").val();
		var adminpwd=$("#addUser tbody input[name='password']").val();
		var new_password=$("#addUser tbody input[name='new_password']").val();
		// 时间
		var mydate = new Date();
		var date = mydate.toLocaleString('chinese', {
			hour12: false
		});
		var ip=returnCitySN["cip"];
		
		if(name==""||adminname==""||tel==""||adminpwd==""||new_password==""){
			alert("请完整填写内容")
		}else{
			if(adminpwd!=new_password){
				alert('密码与确认密码不符')
			}else{
				if(date==""||ip==""){
					alert("服务器跑丢了！请刷新页面重试！")
				}
				else{
					$.ajax({
						type: "post",
						url: rootpath + '/huidl/admin/addadmin',
						async: true, //异步
						data: {
							id:id,
							name: name,
							adminname: adminname,
							tel: tel,
							adminpwd: adminpwd,
							date: date+"&"+date+"&"+date+"&"+date+"&"+date+"&"+date+"&"+date,
							ip: ip+"&"+ip+"&"+ip+"&"+ip+"&"+ip+"&"+ip+"&"+ip
						},
						success: function(str) { //成功的回调
						// console.log(str)
							if (str.err == 0) {
								var res = confirm("添加成功！是否返回？")
								if (res) {
									window.location.href = 'manage-admin.html';
									manage_admin_init();
								}
							} else {
								alert('添加失败！')
							}
						}
					});
				}
			}
		}
	})
	
	
	
	// 查看管理员
	$(".table-striped").on('click','.look',function(){
		var id=$(this).parent().parent().children().eq(0).text();
		window.location.href = "loginlog-admin.html?id=" + id;
	})
	
	
	
	// 删除管理员
	$(".table-striped").on('click','.del',function(){
		var id=$(this).parent().parent().children().eq(0).text();
		var res = confirm('您确定删除此管理员信息吗？删除后将不可恢复……')
		if (res) {
			$.ajax({
				type: "post",
				url: rootpath + '/huidl/admin/deladmin',
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
			manage_admin_init();
		}
		manage_admin_init();
	});
	
	
	
	
	
	
	
}




// 登录日志管理____________________________________________________________
function loginlog_admin(){
	
	// 获取url的参数
	function GetRequest() {
		var url = location.search; //获取url中"?"符后的字串   
		url = url.split("?")[1]; //截取？后面的字串
		url = url.split("="); //通过=截取
		var id = url[1]
		return id;
	}
	
	
	// 初始化页面
	function loginlog_admin_init() {
		var id = GetRequest();
		$.ajax({
			type: "post",
			url: rootpath + '/huidl/admin/loginlog_admin_init',
			async: true, //异步
			data: {
				'id': id
			},
			success: function(str) { //成功的回调
				if (str.err == 0) {
					// console.log(str.data[0])
					// 渲染页面
					var len=str.data[0].date.split("&").length;
					$(".page-header span").text(len)
					
					for(var i=0;i<len;i++){
						var date=str.data[0].date.split("&")[i];
						var ip=str.data[0].ip.split("&")[i];
							var html=`<tr>
						<td>${str.data[0]._id}</td>
						<td class="article-title">${str.data[0].name}</td>
						<td>${date}</td>
						<td>${ip}</td>
						<td><a rel="1" class="del">删除</a></td>
						</tr>`
						
						$(".table-responsive tbody").append(html)
					}
					
				}
			}
		});
	}
	loginlog_admin_init()
	
	
	
	
	
	
}
