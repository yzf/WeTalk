// setting user info
$(document).ready(function() {
    // user info
	var getUserInfo = function(authkey) {
		var requestUrl = hosturl + "user/";
		var requestData = { authkey : authkey };
		var cb = function(result) {
			if(parseInt(result.status) == 1) {
				$("#image").attr("src", hosturl+result.data.icon.url);
				$("#name").html(result.data.name);
				$("#username").html(result.data.username);	
			}
			else {
				alert(result.info);
			}
		};
		simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
    
    var authkey = simpleJs.getCookie(simpleJs.seesionid);
	var infoType = parseInt(window.location.href.substr((window.location.href.indexOf("=") + 1)));
    
    if(infoType == 0) {
        $("#info_type").html("用户名");
    }
    else if(infoType == 1) {
        $("#info_type").html("密码");
    }
    else if(infoType == 2) {
        $("#info_type").html("简介");
    }
    else if(infoType == 3) {
        $("#info_type").html("兴趣");
    }
    else{
        alert("Info type is " + infoType);
    }
    
    getUserInfo(authkey);
});


// hand on the change info
$("#Modify").bind('touchstart mousedown', function() {
    var ModifyInfo = function(authkey, infoType, infoText) {
        var requestUrl = hosturl + "user_update/";     // def modify_user_info in view_user.py
        var requestData = {
            authkey : authkey,
            infoType : infoType,
            infoText : infoText
        };
        var cb = function(result) {
            if(parseInt(result.status) == 1) {
                alert("信息修改成功！");
                // go back to setting.html
                simpleJs.fuzzyRedirect("setting");
            }
            else {
                alert(result.info);
            }
        };
        
        simpleJs.ajaxPost(requestUrl, requestData, cb);
    };
    
    var authkey = simpleJs.getCookie(simpleJs.seesionid);
	var infoType = parseInt(window.location.href.substr((window.location.href.indexOf("=") + 1)));
    var infoText = $("#fname").val();
    
    if(infoText == "") {
        alert("修改的输入信息为空");
        return;
    }
    if(infoType > 3 || infoType < 0) {
        alert("修改的信息类型错误");
        return;
    }
    
    ModifyInfo(authkey, infoType, infoText);
});


// go back
$("#goback").bind('touchstart mousedown', function() {
    window.history.back();
});