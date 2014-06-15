var isPhoteChange = false;

// setting user info
$(document).ready(function() {
	/************************** get photo *******************************************/
	//var isPhoteChange = false;
	var pictureSource;
	//图片来源
	var destinationType;
	//设置返回值的格式
 
	// 等待PhoneGap连接设备
	document.addEventListener("deviceready", onDeviceReady, false);

	// PhoneGap准备就绪，可以使用！
	function onDeviceReady() {
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;
	}

	// 当成功获得一张照片的Base64编码数据后被调用
	function onPhotoDataSuccess(imageData) {		
		isPhoteChange = true;
		$("#image").attr("src", 'data:image/jpeg;base64,' + imageData);
	}
	
	// “Capture Photo”按钮点击事件触发函数
	function capturePhoto() {
        alert('使用摄像头拍照');
		// 使用设备上的摄像头拍照，并获得Base64编码字符串格式的图像
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, {			
			//encodingType : Camera.EncodingType.JPEG,
			//destinationType : destinationType.DATA_URL,
			quality : 80,
            encodingType : Camera.EncodingType.JPEG,
            sourceType : Camera.PictureSourceType.CAMERA,
            destinationType : destinationType.DATA_URL
		});
	}

	//“From Photo Library”/“From Photo Album”按钮点击事件触发函数
	function getPhoto(source) {
		// 从设定的来源处获取图像文件URI
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
			quality : 75,			
			destinationType : destinationType.DATA_URL,
			sourceType : source
		});
	}

	// 当有错误发生时触发此函数
	function onFail(mesage) {
		alert('Failed because: ' + message);
	}	
	/************************** get photo *******************************************/	
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
    else if (infoType == 4) {
    	$("#info_type").html("头像");
    	$("#inputBox").hide();
    	$("#image").bind('taphold', function() {
    		capturePhoto();    		
    	});
    	$("#image").bind('tap', function() {
    		getPhoto(pictureSource.SAVEDPHOTOALBUM);
    	});
        // $("#image").bind('tap', function() {
        //     getPhoto(pictureSource.SAVEDPHOTOALBUM);
        // }).bind('taphold', function() {
        //     capturePhoto();  
        // });
    }
    else{
        alert("Info type is " + infoType);
    }
    
    getUserInfo(authkey);
});


// hand on the change info
/*$("#Modify").bind('touchstart mousedown', function() {
    
});*/


// go back
$("#goback").bind('tap', function() {
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
    			//window.history.back();
            }
            else {
                alert(result.info);
            }
        };
        
        simpleJs.ajaxPost(requestUrl, requestData, cb);
    };
    
    var authkey = simpleJs.getCookie(simpleJs.seesionid);
	var infoType = parseInt(window.location.href.substr((window.location.href.indexOf("=") + 1)));
    var infoText = '';

    if (infoType == 0 || infoType == 1 || infoType == 2 || infoType == 3) {
     	infoText = $("#fname").val();
    } else if (infoType == 4 && isPhoteChange == true) {
    	var imgHead = "data:image/jpeg;base64,";
		infoText = $("#image").attr("src").substr(imgHead.length);
    }

    if(infoText == '') {
        //simpleJs.fuzzyRedirect("setting");
        //window.history.back();
    } else {
    	ModifyInfo(authkey, infoType, infoText);
        //simpleJs.fuzzyRedirect("setting");
    }
});