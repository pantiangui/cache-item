// 公共js



//声明页面端口号
var rootpath = "http://127.0.0.1:5000"

// 页头公共部分渲染











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






var checkall = document.getElementsByName("checkbox[]");
//全选
function select() {
	for (var $i = 0; $i < checkall.length; $i++) {
		checkall[$i].checked = true;
	}
};
//反选
function reverse() {
	for (var $i = 0; $i < checkall.length; $i++) {
		if (checkall[$i].checked) {
			checkall[$i].checked = false;
		} else {
			checkall[$i].checked = true;
		}
	}
}
//全不选     
function noselect() {
	for (var $i = 0; $i < checkall.length; $i++) {
		checkall[$i].checked = false;
	}
}


//启用工具提示
// $('[data-toggle="tooltip"]').tooltip();
