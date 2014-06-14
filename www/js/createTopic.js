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

			var sd = new Date(Date.parse($("#startTime").val()));
			var ed = new Date(Date.parse($("#endTime").val()));
			if(ed < sd) {
				alert("结束时间早于开始时间");
				return;
			}

			var sendData = {
				authkey : authkey,
				create_time : curDate,
				title: $.trim($("#topicTitle").val()),
				startTime: $("#startTime").val(),
				endTime: $("#endTime").val()
			};
			
			var cb = function(result) {
				if(parseInt(result.status) == 1) {
					simpleJs.fuzzyRedirect("spitslot", '?topicID=' + result.topicID);
				}
				else {
					alert(result.info);
				}
			};

			// 上传
			simpleJs.ajaxPost(simpleJs.getURL("createTopic"), sendData, cb);
		}
	});
});

/*
// go back
$("#goback").bind('touchend', function() {
    window.history.back();
});
*/