$(document).ready(function() {
	$("#saveTopic").bind('tap', function() {
		if (simpleJs.isNull($("#topicTitle").val()) 
		|| simpleJs.isNull($("#startTime").val()) 
		|| simpleJs.isNull($("#endTime").val())) {
			alert("标题或者日期为空");
		} else {
			var sendData = {
				title: $.trim($("#topicTitle").val()),
				startTime: $("#startTime").val(),
				endTime: $("#endTime").val()
			};
			
			// 上传
			simpleJs.ajaxPost(simpleJs.getURL("createTopic"), sendData, function(returnData){
				// 回调函数，返回槽点ID
				simpleJs.fuzzyRedirect("spitslot", '?topicID=' + result.data.id);
			});
		}
	});
});
