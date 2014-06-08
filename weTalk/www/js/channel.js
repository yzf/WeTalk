$(document).ready(function() {
	var cur = 0;
	var len = 10;
	var getMessage = function(cgy) {
		// �����������ʱ���͸�����������
		var requestData = {
            category : cgy,
            start : cur,
			end : cur + len
        };
        // ������ݵĵ�ַ
		var requestUrl = hosturl + "topic_list/";
		
		// �ص�����ѷ��������ص���ݷ���result�У��������ݽṹ������������
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
						html.push('<span class="time">from ' + result.data[i].begin_time.substr(0, 10) + ' to ' + result.data[i].end_time.substr(0, 10) + '</span>');
					html.push('</a></li>'); 
				}
				
				html = html.join("");	// ת����һ���ַ�
				$("#topicList").append(html);
				$("#topicList").listview('refresh');
			}
			else {
				// ʧ�ܵ������������ʾ
			}
			
        };
	
		// ����������󣬲����ַ���������������ݡ��ص�����
        simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	var startPage = 0;
	
	// ��һ�μ���Ĭ��
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



