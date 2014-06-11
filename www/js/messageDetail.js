// display detail of a message
$(document).ready(function() {
    var getMessageDetail = function(messageID) {
        var requestUrl = hosturl + "get_message_detail/";       // view_user.py
        var requestData = { messageID : messageID };
        var cb = function(result) {
            if(parseInt(result.status) == 1) {
                $("#to_user").html(result.message.to_user.name);
                $("#from_user_icon").attr("src", result.message.from_user.icon.url);
                $("#from_user").html(result.message.from_user.name);
                $("#create_time").html(result.message.create_time);
                $("#content").html(result.message.content);
            }
            else {
                alert(result.info);
            }
        };

        simpleJs.ajaxPost(requestUrl, requestData, cb);
    };

    var messageID = parseInt(window.location.href.substr((window.location.href.indexOf("=") + 1)));
    getMessageDetail(messageID);
});