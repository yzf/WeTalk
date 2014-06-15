$(document).ready(function() {
	var cur = 0;
	var len = 3;
	var getMessage = function(cgy) {
		var requestData = {
            category : cgy,
            start : cur,
			end : cur + len
        };

		var requestUrl = hosturl + "topic_list/";
		
        var cb = function (result, requestData) {
			if (result.status == "1" || result.status == 1) {
				var html = [];
				for(var i = 0; i < result.count; i++) {
					html.push('<li><a href="spitslot.html?topicID=' + result.data[i].id + '" rel="external">');
						html.push('<span class="topic-tittle">' + result.data[i].title + '</span>');
						html.push('<span class="ui-li-count">' + result.data[i].spots_count + '</span>');
						html.push('<br />');
						html.push('<span class="time">from ' + result.data[i].begin_time.substr(0, 10) + ' to ' + result.data[i].end_time.substr(0, 10) + '</span>');
					html.push('</a></li>'); 
				}
				
				html = html.join("");
				$("#topicList").append(html);
				$("#topicList").listview('refresh');
			}
			else {
				alert(result.info);
			}
			
        };

        simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	var startPage = 0;
	
	getMessage(startPage);
	
	$("#listV li a").bind('touchend', function () {
		$("#topicList").empty();
		cur = 0;
		getMessage(parseInt($(this).attr("category")));
		startPage = parseInt($(this).attr("category"));
	});
	
	$("#topicList").bind('swipeleft', function() {
		if(startPage >= 0) {
			startPage--;
			$("#topicList").empty();
			cur = 0;
			getMessage(startPage);
		}
	});
	
	$("#topicList").bind('swiperight', function() {
		if(startPage < 4) {
			startPage++;
			$("#topicList").empty();
			cur = 0;
			getMessage(startPage);
		}
	});

	$("#loadMore").bind('mousedown', function() {
		cur += len;
		$("#topicList").empty();
		getMessage(startPage);
//		simpleJs.fuzzyRedirect("channel");
	});

	document.addEventListener("deviceready", onDeviceReady, false); 
	function onDeviceReady() {
		document.addEventListener("backbutton", onBackKeyDown, false); 
		//BackButton按钮
		function onBackKeyDown() {
			//alert("call onBackKeyDown");
		    //navigator.app.backHistory();
		    // if(cur >= 0) {
		    	cur -= len;
		    	if(cur >= 0) {
		    		$("#topicList").empty();
					getMessage(startPage);
				}
		    // }
		    else {
		    	navigator.app.backHistory();
		    }
		}
	}
});



/*
$("#search_button").bind('touchend', function() {
	$("#search_text").toggle();
});


$("#personal_button").bind('touchend', function() {
	var curaddress = window.location.href.substr(0,(window.location.href.indexOf("html/") + 5));
	window.location.href = curaddress + "setting.html";
	
	var un_start = document.cookie.indexOf("username=");
	var un_end=document.cookie.indexOf(";",c_start);
	
});
*/



