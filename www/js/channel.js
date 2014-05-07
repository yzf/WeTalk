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
			cur += length;
			if (result.status == "1" || result.status == 1) {
				var html = [];
				for(var i = 0; i < result.length; i++) {
					//result.data[i] = eval(result.data[i]);
					html.push('<li><a href="spitslot.html?topicID=' + result.data[i].pk + '" rel="external">');
						html.push('<span class="topic-tittle">' + result.data[i].fields.title + '</span>');
						html.push('<span class="ui-li-count">' + result.data[i].fields.spots.length + '</span>');
						html.push('<br />');
						html.push('<span class="time">from ' + result.data[i].fields.begin_time + ' to ' + result.data[i].fields.end_time + '</span>');
					html.push('</a></li>'); 
				}
				
				html = html.join("");	// 转换成一个字符串
				$("#topicList").append(html);
				$("#topicList").listview('refresh');
			}
			else {
				// 失败的情况，弹框显示
			}
			
        };

        simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	var startPage = 0;
	
	// 第一次加载默认
	getMessage(startPage);
	
	$("#listV li a").bind('touchstart mousedown', function () {
		$("#topicList").empty();
		getMessage(parseInt($(this).attr("category")));
		startPage = parseInt($(this).attr("category"));
	});
	
	$("#topicList").bind('swipeleft', function() {
		if(startPage >= 0) {
			startPage--;
			$("#topicList").empty();
			getMessage(startPage);
		}
	});
	
	$("#topicList").bind('swiperight', function() {
		if(startPage < 4) {
			startPage++;
			$("#topicList").empty();
			getMessage(startPage);
		}
	});
});

$(doucument).ready(function() {
	$("#search_button").bind('touchstart mousedown', function() {
		$("#search_text").toggle();
	});
});



