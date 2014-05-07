$(document).ready(function() {
	var cur = 0;
	var len = 10;
	var getMessage = function(id) {
		var requestData = {
            id : id,
            start : cur,
			end : cur + len
        };
        var requestUrl = "http://192.168.1.186:8000/comment_list/";
        var cb = function (result, requestData) {
			cur += length;
			if (result.status == "1" || result.status == 1) {
				// 添加标题
				var headerHTML = '<h1>' + result.data.fields.title + '</h1>';
				$("#back_button").after(headerHTML);
			
				var html = [];
				for(var i = 0; i < result.data.cm_list.length; i++) {
					html.push('<p>' + result.data.cm_list[i] + '</p>');
						html.push('</div>');
						html.push('<span class="ui-li-count heart">' + result.data[i].up + '</span>');
						html.push('<span class="ui-li-count talk">' + result.data[i].fields.comments.length + '</span>');
					html.push('</a></li>'); 
				}
				
				html = html.join("");	// 转换成一个字符串
				$("#spitslotList").append(html);
				$("#spitslotList").listview('refresh');
			}
			else {
				// 失败的情况，弹框显示
			}
			
        };
		
        simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	// 通过url获取当前的topicID
	var spitlotID = parseInt(window.location.href.substr((window.location.href.indexOf("=") + 1)));
	
	getMessage(spitlotID);
	
});