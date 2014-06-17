// display the topic of the current User
$(document).ready(function() {
	var getMessage = function(authkey) {
		var requestData = {
            authkey : authkey
        };
        var requestUrl = hosturl + "discover_topic/";
        var cb = function(result) {
        	if(result.status == "1" || result.status == 1) { 
        		// recommand_topic 
                var recommand_topic = [];
                // how to get the correct topics is up to "def discover_topic(request)", here focus on displaying them
                for(var i = 0; i < result.rTopic_count; i++) {
                    recommand_topic.push('<li><a href="spitslot.html?topicID=' + result.rTopic_list[i].id + '" rel="external">');
                        recommand_topic.push('<span class="topic-tittle">' + result.rTopic_list[i].title + '</span>');
                        recommand_topic.push('<span class="ui-li-count">' + result.rTopic_list[i].spots_count + '</span>');
                        recommand_topic.push('<br />');
                        recommand_topic.push('<span class="time">from ' + result.rTopic_list[i].begin_time.substr(0, 10) + ' to ' + result.rTopic_list[i].end_time.substr(0, 10) + '</span>');
                    recommand_topic.push('</a></li>');
                }

                recommand_topic = recommand_topic.join("");     // this is necessary
                $("#recommand_topic").append(recommand_topic);
                $("#recommand_topic").listview('refresh');

                // interest_topic
                var interest_topic = [];
                for(var i = 0; i < result.iTopic_count; i++) {
                    interest_topic.push('<li><a href="spitslot.html?topicID=' + result.iTopic_list[i].id + '" rel="external">');
                        interest_topic.push('<span class="topic-tittle">' + result.iTopic_list[i].title + '</span>');
                        interest_topic.push('<span class="ui-li-count">' + result.iTopic_list[i].spots_count + '</span>');
                        interest_topic.push('<br />');
                        interest_topic.push('<span class="time">from ' + result.iTopic_list[i].begin_time.substr(0, 10) + ' to ' + result.iTopic_list[i].end_time.substr(0, 10) + '</span>');
                    interest_topic.push('</a></li>');
                }

                interest_topic = interest_topic.join("");       // this is necessary
                $("#interest_topic").append(interest_topic);
                $("#interest_topic").listview('refresh');

        	}
        	else {
        		alert("result.status is error!");
        	}
        };

        simpleJs.ajaxPost(requestUrl, requestData, cb);
    };

    var authkey = simpleJs.getCookie(simpleJs.seesionid);
    getMessage(authkey);
});