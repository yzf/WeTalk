$("#registerButton").bind('click', function() {

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
	

	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(!reg.test(account_)) {
		alert("Account should be an email address!");
		return;
	}

	if(password_ != confirm_pwd) {
		alert("Password confirm failed!");
		return;
	}
	
	if(password_.length > 6) {
		alert("Password should be within 6 chars!");
		return;
	}
	

	var tryRegister = function(usrn, pwd) {
		var now_ = new Date();
		var create_time = "";
		create_time += now_.getFullYear() + "-";
		create_time += (now_.getMonth() + 1) + "-";
		create_time += now_.getDate() + " ";
		create_time += now_.getHours() + ":";
		create_time += now_.getMinutes() + ":";
		create_time += now_.getSeconds();

		var requestData = {
            username : usrn,
			password : pwd,
			create_time : create_time
        };

		var requestUrl = hosturl + "register/";
		
		var cb = function(result) {
			if(result.status == 1 || result.status == "1") {
			    simpleJs.setCookie(simpleJs.seesionid, result[simpleJs.seesionid]);			    
			    simpleJs.fuzzyRedirect("home");
			}
			else {
				alert("Register Failed!");
				return;
			}
				
		};
		
        simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	tryRegister(account_, password_);
	
});