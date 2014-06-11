$(document).ready(function() {
	$("#saveTopic").bind('tap', function() {
		if (simpleJs.isNull($("#topicTitle").val()) 
		|| simpleJs.isNull($("#startTime").val()) 
		|| simpleJs.isNull($("#endTime").val())) {
			alert("标题或者日期为空");
		} else {
			var authkey = simpleJs.getCookie(simpleJs.seesionid);
			var now_ = new Date()
			var curDate = "";
			curDate += now_.getFullYear() + "-";
			curDate += (now_.getMonth() + 1) + "-";
			curDate += now_.getDate() + " ";
			curDate += now_.getHours() + ":";
			curDate += now_.getMinutes() + ":";
			curDate += now_.getSeconds();

			var sendData = {
				authkey : authkey,
				create_time : curDate,
				title: $.trim($("#topicTitle").val()),
				startTime: $("#startTime").val(),
				endTime: $("#endTime").val()
			};
			
			// 上传
			simpleJs.ajaxPost(simpleJs.getURL("createTopic"), sendData, function(returnData){
				// 回调函数，返回ID
				simpleJs.fuzzyRedirect("spitslot", '?topicID=' + result.topicID);
			});
		}
	});
});


// go back
$("#goback").bind('touchstart mousedown', function() {
    window.history.back();
});