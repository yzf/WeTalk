// First show the user info and the fcous topic
$(document).ready(function() {
	var authkey = simpleJs.getCookie(simpleJs.seesionid);

	// user info
	var getUserInfo = function(authkey) {
		var requestUrl = hosturl + "user/";
		var requestData = { authkey : authkey };
		var cb = function(result) {
			if(parseInt(result.status) == 1) {
				$("#image").attr("src", hosturl+result.data.icon.url);
				$("#intro").html(result.data.intro);
				$("#interest").html("兴趣爱好： " + result.data.interest);	
			}
			else {
				alert(result.info);
			}
		};

		simpleJs.ajaxPost(requestUrl, requestData, cb);
	};

	
	// focus topic base on the user focus
	var getUserFocusTopic = function(authkey) {
		var requestUrl = hosturl + "userFocus_topic/";
		var requestData = { authkey : authkey };
		var cb = function(result) {
			if(parseInt(result.status) == 1) {
				var foucs_topic = [];
                // how to get the correct topics is up to "def discover_topic(request)", here focus on displaying them
                for(var i = 0; i < result.fTopic_count; i++) {
                    foucs_topic.push('<li><a href="spitslot.html?topicID=' + result.fTopic_list[i].id + '" rel="external">');
                        foucs_topic.push('<span class="topic-tittle">' + result.fTopic_list[i].title + '</span>');
                        foucs_topic.push('<span class="ui-li-count">' + result.fTopic_list[i].spots_count + '</span>');
                        foucs_topic.push('<br />');
                        foucs_topic.push('<span class="time">from ' + result.fTopic_list[i].begin_time + ' to ' + result.fTopic_list[i].end_time + '</span>');
                    foucs_topic.push('</a></li>');
                }

                foucs_topic = foucs_topic.join("");     // this is necessary
                $("#focus_topic").append(foucs_topic);
                $("#focus_topic").listview('refresh');
			}
			else {
				alert(result.info);
			}
		};
        
        simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	getUserInfo(authkey);
	getUserFocusTopic(authkey);
		
});

/*
// go back
$("#goback").bind('touchend', function() {
    window.history.back();
});
*/