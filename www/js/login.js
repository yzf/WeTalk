$("#loginButton").bind('touchend', function () {

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
	

	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(!reg.test(account_)) {
		alert("Account is not an email address!");
		return;
	}
	

	if(password_.length > 6) {
		alert("Password should be within 6 chars");
		return;
	}
	
	
	var tryLogin = function(usrn, pwd) {

		var requestData = {
            username : usrn,
			password : pwd
        };

		var requestUrl = hosturl + "login/";
		
		var cb = function(result) {
		    if (result.status == 1) {
		        simpleJs.setCookie(simpleJs.seesionid, result[simpleJs.seesionid])	
		        //simpleJs.ajaxPost(simpleJs.getURL("user")); 
		        simpleJs.fuzzyRedirect("channel");
			}
			else {
				alert("Password does not match the account!");
				return;
			}
				
		};
		
        simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	tryLogin(account_, password_);

});




