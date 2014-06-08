$("#registerButton").bind('touchstart mousedown', function() {
	// 判断登陆界面输入的账号和密码是否存在为空
	var account_ = $("#registerAccountInput").val();
	var password_ = $("#registerPasswordInput").val();
	var confirm_pwd = $("#registerConfirmPassword").val();
	
	if(account_.length == 0) {
		alert("Account number is empty!");
		return;
	}
	if(password_.length == 0) {
		alert("Password is empty!");
		return;
	}
	if(confirm_pwd.length == 0) {
		alert("Confirm Password is empty!");
		return;
	}
	
	// 判断用户名是否一个邮箱，以下是邮箱的正则表达式
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(!reg.test(account_)) {
		alert("Account should be an email address!");
		return;
	}
	// 密码不一致
	if(password_ != confirm_pwd) {
		alert("Password confirm failed!");
		return;
	}
	
	if(password_.length > 6) {
		alert("Password should be within 6 chars!");
		return;
	}
	
	// 把数据发给数据库，获取返回的信息
	var tryRegister = function(usrn, pwd) {
		// 向服务器请求时发送给服务器的数据
		var requestData = {
            username : usrn,
			password : pwd
        };
        // 请求数据的地址
		var requestUrl = hosturl + "register/";
		
		var cb = function(result) {
			if(result.status == 1) {
			    // 当前地址
			    simpleJs.setCookie(simpleJs.seesionid, result[simpleJs.seesionid]);			    
			    simpleJs.fuzzyRedirect("home");
			}
			else {
				alert("Register Failed!");
				return;
			}
				
		};
		
		// 向服务发送请求，参数：地址、发给服务器的数据、回调函数
        simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	tryRegister(account_, password_);
	
});