$(document).ready(function() {
	var pictureSource;
	//图片来源
	var destinationType;
	//设置返回值的格式
	var pictureIndex = 1;
	var havePictures = 0;
	var pictureNum = 3;
	var windowWidth = parseInt($(window).width());

	// 等待PhoneGap连接设备
	document.addEventListener("deviceready", onDeviceReady, false);

	// PhoneGap准备就绪，可以使用！
	function onDeviceReady() {
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;
	}

	// 当成功获得一张照片的Base64编码数据后被调用
	function onPhotoDataSuccess(imageData) {		
		$("#picturesBox").append(
		    '<div class="picture" id="picture' + pictureIndex + '" style="width:' + windowWidth * 0.29 + 'px;" >' +
				'<img src="data:image/jpeg;base64,' + imageData + '" class="showImage" width="' + windowWidth * 0.29 + 'px" />' +
				'<a href="javascript:void(0);" class="deleteIcon" id="deleteIcon' + pictureIndex + '" index="' + pictureIndex + '"><img src="../images/icons-png/delete-black.png" /></a>' +
			'</div>'
        );
	    $("#deleteIcon" + pictureIndex).bind('tap', function () {
		    var index = $(this).attr("index");
		    $("#picture" + index).remove();
		    havePictures--;
		});
		pictureIndex++;
		havePictures++;
	}

	// 当成功得到一张照片的URI后被调用
	function onPhotoURISuccess(imageURI) {
	    $("#picturesBox").append(
		    '<div class="picture" id="picture' + pictureIndex + '" style="width:' + windowWidth * 0.29 + 'px;" >' +
				'<img src="' + imageURI + '" class="showImage" width="' + windowWidth * 0.29 + 'px" />' +
				'<a href="javascript:void(0);" class="deleteIcon" id="deleteIcon' + pictureIndex + '" index="' + pictureIndex + '"><img src="../images/icons-png/delete-black.png" /></a>' +
			'</div>'
        );
	    $("#deleteIcon" + pictureIndex).bind('tap', function () {
		    var index = $(this).attr("index");
		    $("#picture" + index).remove();
		    havePictures--;
		});
		pictureIndex++;
		havePictures++;
	}

	// “Capture Photo”按钮点击事件触发函数
	function capturePhoto() {

		// 使用设备上的摄像头拍照，并获得Base64编码字符串格式的图像
		navigator.camera.getPicture(onPhotoDataSuccess, onFail, {			
			encodingType : Camera.EncodingType.JPEG,
			destinationType : destinationType.DATA_URL,
			quality : 75
		});
	}

	// “Capture Editable Photo”按钮点击事件触发函数
	function capturePhotoEdit() {

		// 使用设备上的摄像头拍照，并获得Base64编码字符串格式的可编辑图像
		navigator.camera.getPicture(onPhotoURISuccess, onFail, {
			quality : 20,			
			destinationType : destinationType.FILE_URI,
			allowEdit : true
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

	$("#camera").bind('tap', function () {
		if (havePictures < pictureNum) {
			capturePhoto();
		} else {
			alert("Too many photos.");
		}
	});
	
	$("#photos").bind('tap', function () {
	    if (havePictures < pictureNum) {
	        getPhoto(pictureSource.SAVEDPHOTOALBUM);
	    } else {
	        alert("Too many photos.");
	    }
	});
	

	$("#saveSplitslot").bind('tap', function() {
		if ($("#SplitslotTitle").val() != "" && $("#SplitslotContent").val() != "") {
			var imgContainer = [];	// 数组用于存放已经选择的图片数据
			$("#picturesBox .showImage").each(function() {	// 获取图片数据
				var that = $(this);
				var imgHead = "data:image/jpeg;base64,";
				imgContainer.push(that.attr("src").sub(imgHead.length));
			});
			
			// 上传的数据
			var sendData = {
				title: $("#SplitslotTitle").val(),
				content: $("#SplitslotContent").val(),
				topicID: simpleJs.getCookie("topicID"),
				imgs: imgContainer.join(";")	// 图片数据以';'间隔
			};
			
			// 上传
			simpleJs.ajaxPost(simpleJs.getURL("createSplitslot"), sendData, function(returnData){
				// 回调函数，返回槽点ID
				simpleJs.fuzzyRedirect("weTalk", '?spitlotID=' + result.data.id);
			});
			
		} else {
			alert("Title or Content is null.");
		}

	}); 

});
