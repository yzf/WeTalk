$("#loginButton").bind('touchstart mousedown', function () {

	// �жϵ�½����������˺ź������Ƿ����Ϊ��
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
	
	// �ж��û����Ƿ�һ�����䣬�����������������ʽ
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(!reg.test(account_)) {
		alert("Account is not an email address!");
		return;
	}
	
	// ������Ҫ��֤�����6���ַ�
	if(password_.length > 6) {
		alert("Password should be within 6 chars");
		return;
	}
	
	
	// �����ݷ������ݿ⣬��ȡ���ص���Ϣ
	var tryLogin = function(usrn, pwd) {
		// �����������ʱ���͸�������������
		var requestData = {
            username : usrn,
			password : pwd
        };
        // �������ݵĵ�ַ
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
		
		// ����������󣬲�������ַ�����������������ݡ��ص�����
        simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	tryLogin(account_, password_);

});




