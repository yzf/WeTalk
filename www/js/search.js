$("#search").bind('change', function(){
	var getMessage = function(title) {
		var requestUrl = hosturl + "search_topic/";
		var requestData = { title : title };
		var cb = function(result) {
			if(parseInt(result.status) == 1) {
				$("#search_result").html("");
				var search_topicList = [];
                // how to get the correct topics is up to "def discover_topic(request)", here focus on displaying them
                for(var i = 0; i < result.topic_count; i++) {
                    search_topicList.push('<li><a href="spitslot.html?topicID=' + result.topic_list[i].id + '" rel="external">');
                        search_topicList.push('<span class="topic-tittle">' + result.topic_list[i].title + '</span>');
                        search_topicList.push('<span class="ui-li-count">' + result.topic_list[i].spots_count + '</span>');
                        search_topicList.push('<br />');
                        search_topicList.push('<span class="time">from ' + result.topic_list[i].begin_time + ' to ' + result.topic_list[i].end_time + '</span>');
                    search_topicList.push('</a></li>');
                }

                search_topicList = search_topicList.join("");     // this is necessary
                $("#search_result").append(search_topicList);
                $("#search_result").listview('refresh');
			}
			else {
				alert(result.info)
			}
		};

		simpleJs.ajaxPost(requestUrl, requestData, cb);
	};

	var title = $("#search").val();
	getMessage(title);
});

// go back
$("#goback").bind('touchstart mousedown', function() {
    window.history.back();
});