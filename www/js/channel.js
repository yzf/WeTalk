$(document).ready(function() {
	var cur = 0;
	var len = 10;
	var getMessage = function(cgy) {
		// 向服务器请求时发送给服务器的数据
		var requestData = {
            category : cgy,
            start : cur,
			end : cur + len
        };
        // 请求数据的地址
		var requestUrl = hosturl + "topic_list/";
		
		// 回调函数，把服务器返回的数据放在result中，具体的数据结构看服务器决定
        var cb = function (result, requestData) {
			cur += length;
			if (result.status == "1" || result.status == 1) {
				var html = [];
				for(var i = 0; i < result.count; i++) {
					//result.data[i] = eval(result.data[i]);
					html.push('<li><a href="spitslot.html?topicID=' + result.data[i].id + '" rel="external">');
						html.push('<span class="topic-tittle">' + result.data[i].title + '</span>');
						html.push('<span class="ui-li-count">' + result.data[i].spots_count + '</span>');
						html.push('<br />');
						html.push('<span class="time">from ' + result.data[i].begin_time + ' to ' + result.data[i].end_time + '</span>');
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
	
		// 向服务发送请求，参数：地址、发给服务器的数据、回调函数
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


$("#search_button").bind('touchstart mousedown', function() {
	$("#search_text").toggle();
});


$("#personal_button").bind('touchstart mousedown', function() {
	var curaddress = window.location.href.substr(0,(window.location.href.indexOf("html/") + 5));
	window.location.href = curaddress + "setting.html";
	
	var un_start = document.cookie.indexOf("username=");
	var un_end=document.cookie.indexOf(";",c_start)
	
});



