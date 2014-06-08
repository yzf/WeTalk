$(document).ready(function() {
	var cur = 0;
	var len = 10;
	var getMessage = function(id) {
		var requestData = {
            id : id,
            start : cur,
			end : cur + len
        };
        var requestUrl = hosturl + "spot_list/";
		var img_url = hosturl;
        var cb = function (result, requestData) {
			cur += length;
			if (result.status == "1" || result.status == 1) {
				var html = [];
				for(var i = 0; i < result.count; i++) {
					html.push('<li class="topic"><a href="weTalk.html?spitlotID=' + result.data[i].id + '" rel="external">');
						if(result.data[i].imgs.length != 0) {
							html.push('<img src="' + img_url + result.data[i].imgs[0].url + '">');
						}
						else {
							html.push('<img src="../images/topic/mahan-small.jpg">');
						}
						html.push('<div class="itemcontent">');
							html.push('<h3>' + result.data[i].title + '</h3>');
							html.push('<p>' + result.data[i].content + '</p>');
						html.push('</div>');
						html.push('<span class="ui-li-count heart">&hearts; ' + result.data[i].up + '</span>');
						html.push('<span class="ui-li-count talk">T ' + result.data[i].comments_count + '</span>');
					html.push('</a></li>');
				}

				html = html.join("");	// ×ª»»³ÉÒ»¸ö×Ö·û´®
				$("#spitslotList").append(html);
				$("#spitslotList").listview('refresh');
			}
			else {
				// Ê§°ÜµÄÇé¿ö£¬µ¯¿òÏÔÊ¾
			}

        };

        simpleJs.ajaxPost(requestUrl, requestData, cb);
	};

	// Í¨¹ýurl»ñÈ¡µ±Ç°µÄtopicID
	var topicID = parseInt(window.location.href.substr((window.location.href.indexOf("=") + 1)));
	simpleJs.setCookie("topicID", topicID);
	getMessage(topicID);

});
