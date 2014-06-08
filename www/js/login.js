$("#loginButton").bind('touchstart mousedown', function () {

	// ÅÐ¶ÏµÇÂ½½çÃæÊäÈëµÄÕËºÅºÍÃÜÂëÊÇ·ñ´æÔÚÎª¿Õ
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
	
	// ÅÐ¶ÏÓÃ»§ÃûÊÇ·ñÒ»¸öÓÊÏä£¬ÒÔÏÂÊÇÓÊÏäµÄÕýÔò±í´ïÊ½
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(!reg.test(account_)) {
		alert("Account is not an email address!");
		return;
	}
	
	// ÃØÃÜÐèÒª±£Ö¤²»´í¹ý6¸ö×Ö·û
	if(password_.length > 6) {
		alert("Password should be within 6 chars");
		return;
	}
	
	
	// °ÑÊý¾Ý·¢¸øÊý¾Ý¿â£¬»ñÈ¡·µ»ØµÄÐÅÏ¢
	var tryLogin = function(usrn, pwd) {
		// Ïò·þÎñÆ÷ÇëÇóÊ±·¢ËÍ¸ø·þÎñÆ÷µÄÊý¾Ý
		var requestData = {
            username : usrn,
			password : pwd
        };
        // ÇëÇóÊý¾ÝµÄµØÖ·
		var requestUrl = hosturl + "login/";
		
		var cb = function(result) {
		    if (result.status == 1) {
		        simpleJs.setCookie(simpleJs.seesionid, result[simpleJs.seesionid])	
		        simpleJs.ajaxPost(simpleJs.getURL("user"));
		        simpleJs.fuzzyRedirect("channel");
			}
			else {
				alert("Password does not match the account!");
				return;
			}
				
		};
		
		// Ïò·þÎñ·¢ËÍÇëÇó£¬²ÎÊý£ºµØÖ·¡¢·¢¸ø·þÎñÆ÷µÄÊý¾Ý¡¢»Øµ÷º¯Êý
        simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	tryLogin(account_, password_);

});




