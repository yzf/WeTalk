$("#loginButton").bind('touchstart mousedown', function () {

	// 判断登陆界面输入的账号和密码是否存在为空
	var account_ = $("#loginAccountInput").val();
	var password_ = $("#loginPasswordInput").val();
	
	if(account_.length == 0) {
		alert("Account number is empty!");
		return;
	}
	if(password_.length == 0) {
		alert("Password is empty!");
		return;
	}
	
	// 判断用户名是否一个邮箱，以下是邮箱的正则表达式
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(!reg.test(account_)) {
		alert("Account is not an email address!");
		return;
	}
	
	// 秘密需要保证不错过6个字符
	if(password_.length > 6) {
		alert("Password should be within 6 chars");
		return;
	}
	
	
	// 把数据发给数据库，获取返回的信息
	var tryLogin = function(usrn, pwd) {
		// 向服务器请求时发送给服务器的数据
		var requestData = {
            username : usrn,
			password : pwd
        };
        // 请求数据的地址
		var requestUrl = hosturl + "login/";
		
		var cb = function(result) {
		    if (result.status == 1) {
		        simpleJs.setCookie("sessionid", result["sessionid"]);
			    simpleJs.fuzzyRedirect("channel");
			}
			else {
				alert("Password does not match the account!");
				return;
			}
				
		};
		
		// 向服务发送请求，参数：地址、发给服务器的数据、回调函数
        simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	tryLogin(account_, password_);

});




