$(document).ready(function() {
	var cur = 0;
	var len = 10;
	var getMessage = function(id) {
		var requestData = {
            id : id,
            start : cur,
			end : cur + len
        };
        var requestUrl = "http://192.168.1.186:8000/spot_list/";
        var cb = function (result, requestData) {
			cur += length;
			if (result.status == "1" || result.status == 1) {
				var html = [];
				for(var i = 0; i < result.data.length; i++) {
					html.push('<li><a href="weTalk.html?spitlotID=' + result.data[i].pk + '" rel="external">');
						if(result.data[i].img_list.length != 0) {
							html.push('<img src="' + result.data[i].img_list[0] + '">');
						}
						else {
							html.push('<img src="../images/topic/mahan-small.jpg">');
						}
						html.push('<div class="itemcontent">');
							html.push('<h3>' + result.data[i].fields.title + '</h3>');
							html.push('<p>' + result.data[i].content + '</p>');
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
	var topicID = parseInt(window.location.href.substr((window.location.href.indexOf("=") + 1)));
	
	getMessage(topicID);
	
});