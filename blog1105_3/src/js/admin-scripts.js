// 公共js



//声明页面端口号
var rootpath = "http://127.0.0.1:5000"

// 页头公共部分渲染
var admin_id=getCookie('huidl_admin_id');

// 页头部分初始化
function header_init(){
	$.ajax({
		type: "post",
		url: rootpath + '/huidl/admin/loginlog_admin_init',
		async: true, //异步
		data: {
			'id': admin_id
		},
		success: function(str) { //成功的回调
			if (str.err == 0) {
				console.log(str.data[0])
				$("#bs-example-navbar-collapse-1 .dropdown-toggle").prepend(str.data[0].name);
				$("#seeUserInfo tbody input[name='truename']").val(str.data[0].name);
				$("#seeUserInfo tbody input[name='username']").val(str.data[0].adminname);
				$("#seeUserInfo tbody input[name='usertel']").val(str.data[0].tel);
			}
		}
	});
}
header_init()










// $.ajax({
// 	type: "post",
// 	url: "../api/login.php",
// 	async: true, //异步
// 	data: { //传过去的数据
// 		"mate": "login", 
// 	},
// 	success: function(str) { //成功的回调
// 		console.log(str)
// 	}
// });






var checkall = document.getElementsByClassName("input-control");
//全选
function select() {
	for (var i = 0; i < checkall.length; i++) {
		checkall[i].checked = true;
		$(".input-control").eq(i).attr('check','check')
	}
};
//反选
function reverse() {
	for (var $i = 0; $i < checkall.length; $i++) {
		if (checkall[$i].checked) {
			checkall[$i].checked = false;
			$(".input-control").eq($i).attr('check','')
		} else {
			checkall[$i].checked = true;
			$(".input-control").eq($i).attr('check','check')
		}
	}
}
//全不选     
function noselect() {
	for (var $i = 0; $i < checkall.length; $i++) {
		checkall[$i].checked = false;
		$(".input-control").eq($i).attr('check','')
	}
}
// 单选
$(".table-responsive").on('click','.input-control',function(){
	if($(this).attr('check')){
		$(this).attr('check','')
	}
	else{
		$(this).attr('check','check')
	}
})


//启用工具提示
// $('[data-toggle="tooltip"]').tooltip();
