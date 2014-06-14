// show current user's info
$(document).ready(function() {
	
	
    var authkey = simpleJs.getCookie(simpleJs.seesionid);

	// user info
	var getUserInfo = function(authkey) {
		var requestUrl = hosturl + "user/";
		var requestData = { authkey : authkey };
		var cb = function(result) {
			if(parseInt(result.status) == 1) {
				$("#image").attr("src", hosturl + result.data.icon.url);
                $("#name").html(result.data.name);
				$("#info").html(result.data.username);      // account email
			}
			else {
				alert(result.info);
			}
		};

		simpleJs.ajaxPost(requestUrl, requestData, cb);
	};

	getUserInfo(authkey);
});

/*
// go back
$("#goback").bind('touchend', function() {
    window.history.back();
});
*/


// for logout
$("#logout").bind('touchend', function() {
	var logout = function(authkey) {
		var requestUrl = hosturl + "logout/";
		var requestData = { authkey : authkey }; 
		var cb = function(result) {
			if(parseInt(result.status) == 1) {
			//	simpleJs.fuzzyRedirect("login");
			}
			else {
				alert(result.info);
			}
		};

		simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	var authkey = simpleJs.getCookie(simpleJs.seesionid);
	logout(authkey);
	localStorage.removeItem("authkey");
	simpleJs.fuzzyRedirect("login");
	//navigator.app.exitApp();
});
