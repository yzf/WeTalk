// display message
$(document).ready(function() {
    var getMessage = function(authkey) {
        var requestUrl = hosturl + "get_user_message/";     // view_user.py
        var requestData = { authkey : authkey };
        var cb = function(result) {
            if(parseInt(result.status) == 1) {
                var unread_messages_ = [];
                for(var i = 0; i < result.unread_messages_count; i++) {
                    unread_messages_.push('<li class="person">');
                        unread_messages_.push('<a href="messageDetail.html?messageID=' + result.unread_messages[i].id + '" rel="external">');
                            unread_messages_.push('<img src="' + hosturl + result.unread_messages[i].to_user.icon.url + '">');
                            unread_messages_.push('<div>');
                                unread_messages_.push('<span class="h2">' + result.unread_messages[i].from_user.name + '</span>');
                                //unread_messages_.push('<br/>');
                            //    unread_messages_.push('<span class="time">' + result.unread_messages[i].create_time + '</span>');
                            unread_messages_.push('</div>');
                            unread_messages_.push('<p>' + result.unread_messages[i].content + '</p>');
                        unread_messages_.push('</a>');
                    unread_messages_.push('</li>');
                }

                unread_messages_ = unread_messages_.join("");
                $("#unread_messages").append(unread_messages_);
                $("#unread_messages").listview('refresh');

                var read_messages_ = [];
                for(var i = 0; i < result.read_messages_count; i++) {
                    read_messages_.push('<li class="person">');
                        read_messages_.push('<a href="messageDetail.html?messageID=' + result.read_messages[i].id + '" rel="external">');
                            read_messages_.push('<img src="' + hosturl + result.read_messages[i].to_user.icon.url + '">');
                            read_messages_.push('<div>');
                                read_messages_.push('<span class="h2">' + result.read_messages[i].from_user.name + '</span>');
                            //    read_messages_.push('<br />');
                            //    read_messages_.push('<span class="time">' + result.read_messages[i].create_time + '</span>');
                            read_messages_.push('</div>');
                            read_messages_.push('<p>' + result.read_messages[i].content + '</p>');
                        read_messages_.push('</a>');
                    read_messages_.push('</li>');
                }

                read_messages_ = read_messages_.join("");
                $("#read_messages").append(read_messages_);
                $("#read_messages").listview('refresh');
            }
            else {
                alert(result.info);
            }
        };

        simpleJs.ajaxPost(requestUrl, requestData, cb);
    };

    var authkey = simpleJs.getCookie(simpleJs.seesionid);
    getMessage(authkey);
});