
var istrue=true;

// 用户名不能为空
$('#username').blur(function(){
	var myreg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
	if ($(this).val() != '') {
		if(myreg.test($(this).val())){
			$(this).css('border','1px solid #CCC');
			istrue=true;
		}
		else{
			$(this).css('border','1px solid red');
			istrue=false;
		}
	}
	else{
		$(this).css('border','1px solid red');
		istrue=false;
	}
});


// 密码不能为空
$('#userpwd').blur(function(){
	var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
	if ($(this).val() != '') {
		if (pPattern.test($(this).val())) {
			$(this).css('border','1px solid #CCC');
			istrue=true;
		}
		else{
			$(this).css('border','1px solid red');
			istrue=false;
		}
	}
	else{
		$(this).css('border','1px solid red');
		istrue=false;
	}
});


// 获取验证码
$('#code_btn').click(function(){
	var email=$('#username').val();
	if(!istrue||$("#username").val()==""||$("#userpwd").val()==""){
		$('#code_btn').val('哪里出错啦');
	}else{
		$('#username').css('border','1px solid #CCC');
		// 发送ajax
		$.post(rootpath+'/huidl/user/getcode',
		{email:email},
		function(str){
			console.log(str)
			if(str.err==0){
				$('#code_btn').val('发送中……');
			}
			else{
				$('#code_btn').val('请重新获取');
			}
		});
	}
});	
	
// 验证码不能为空
$('#codenum').blur(function(){
	if ($(this).val() != '') {
		if (/^\d{6}$/.test($(this).val())) {
			$(this).parent().css('border','1px solid #CCC');
			istrue=true;
		}
		else{
			$(this).parent().css('border','1px solid red');
			istrue=false;
		}
	}
	else{
		$(this).parent().css('border','1px solid red');
		istrue=false;
	}
});

	
// 登录
$('#signinSubmit').click(function() {
	if(istrue&&$("#username").val()!=""&&$("#userpwd").val()!=""&&$("#codenum ").val()!=""){
		$('#signinSubmit').text("登录");
		$('#signinSubmit').css("color","white");
		// 发送请求
		$.post(rootpath+'/huidl/user/login',
		{username:$("#username").val(),
		userpwd:$("#userpwd").val(),
		code:$("#codenum ").val()
		},
		function(str){
			console.log(str)
			if(str.err==0){
				$('#signinSubmit').text(str.msg);
				$('#signinSubmit').css("color","white");
				setTimeout(function(){
					window.location.href="index.html"
				},500)
			}
			else{
				$('#signinSubmit').text(str.msg);
				$('#signinSubmit').css("color","red");
			}
		});
		
	}else{
		$('#signinSubmit').text("输入信息不完整");
		$('#signinSubmit').css("color","red");
	}
});
