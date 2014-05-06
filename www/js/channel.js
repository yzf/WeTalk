$(document).ready(function() {
	var cur = 0;
	var len = 10;
	var getMessage = function(cgy) {
		var requestData = {
            category : cgy,
            start : cur,
			end : cur + len
        };
        var requestUrl = "http://192.168.1.186:8000/topic_list/";
        var cb = function (result, requestData) {
        //    alert(result.status);
			cur += length;
			if (result.status == "1" || result.status == 1) {
				var html = [];
				for(var i = 0; i < result.length; i++) {
					//result.data[i] = eval(result.data[i]);
					html.push('<li><a href="spitslot.html&topicID=' + result.data[i].pk + '">');
						html.push('<span class="topic-tittle">' + result.data[i].fields.title + '</span>');
						html.push('<span class="ui-li-count">' + result.data[i].fields.spots.length + '</span>');
						html.push('<br />');
						html.push('<span class="time">from ' + result.data[i].fields.begin_time + ' to ' + result.data[i].fields.end_time + '</span>');
					html.push('</a></li>'); 
				}
				
				html = html.join("");	// 转换成一个字符串
				alert(html);
				$("#topicList").append(html);
			}
			else {
				// 失败的情况，弹框显示
			}
			
        };

        simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	getMessage(0);
});