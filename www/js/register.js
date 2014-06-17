$("#registerButton").bind('touchend', function() {
	// �жϵ�½����������˺ź������Ƿ����Ϊ��
	var account_ = $("#registerAccountInput").val();
	var password_ = $("#registerPasswordInput").val();
	var confirm_pwd = $("#registerConfirmPassword").val();
	
	//alert(account_);
	//alert(password_);

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
	
	// �ж��û����Ƿ�һ�����䣬�����������������ʽ
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(!reg.test(account_)) {
		alert("Account should be an email address!");
		return;
	}
	// ���벻һ��
	if(password_ != confirm_pwd) {
		alert("Password confirm failed!");
		return;
	}
	
	if(password_.length > 6) {
		alert("Password should be within 6 chars!");
		return;
	}
	
	// ����ݷ�����ݿ⣬��ȡ���ص���Ϣ
	var tryRegister = function(usrn, pwd) {
		// �����������ʱ���͸�����������
		var requestData = {
            username : usrn,
			password : pwd
        };
        // ������ݵĵ�ַ
		var requestUrl = hosturl + "register/";
		
		var cb = function(result) {
			if(result.status == 1 || result.status == "1") {
			    // ��ǰ��ַ
			    simpleJs.setCookie(simpleJs.seesionid, result[simpleJs.seesionid]);			    
			    simpleJs.fuzzyRedirect("home");
			}
			else {
				alert("Register Failed!");
				return;
			}
				
		};
		
		// ����������󣬲����ַ���������������ݡ��ص�����
        simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	tryRegister(account_, password_);
	
});