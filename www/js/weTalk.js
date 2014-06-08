$(document).ready(function() {
	var cur = 0;
	var len = 10;
	var getMessage = function(id) {
		var requestData = {
            id : id,
            start : cur,
			end : cur + len
        };
        var requestUrl = hosturl + "comment_list/";
		var img_url = hosturl;
        var cb = function (result, requestData) {
			cur += length;
			if (result.status == "1" || result.status == 1) {
				// 添加标题
				$("#hear_title").html(result.data.title);
				
				// 槽点原文
				var creator_ = [];
				creator_.push('<img src="' + img_url + result.data.creator.icon.url + '" />');
				creator_.push('<div class="user">');
					creator_.push('<span class="h3">' + result.data.creator.name + '</span>');
					creator_.push('<br />');
					creator_.push('<span class="time">' + result.data.create_time + '</span>');
				creator_.push('</div>');

				creator_ = creator_.join("");
				$('#creator_info').append(creator_);
				
				$("#content_text").html(result.data.content);
				var original_ = [];
				for(var i = 0; i < result.data.imgs.length; i++) {
					original_.push('<img src="' + img_url + result.data.imgs[i].url + '" />');
				}
				original_ = original_.join("");
				$("#original_text").append(original_);
				
				// 点赞和评论数
				$("#heart_num").html(result.data.up);
				$("#comment_num").html(result.data.comments.length);
				
				// 评论
				var comment_ = [];
				for(var i = 0; i < result.data.comments.length; i++) {
					comment_.push('<li><a href="#" >');
						comment_.push('<div class="we-talk-style-itemshow">');
							comment_.push('<div class="maincontent">');
								comment_.push('<div class="talker-info">');
									comment_.push('<img src="' + img_url + result.data.comments[i].creator.icon.url + '" />');
									comment_.push('<div class="user">');
										comment_.push('<span class="h3">' + result.data.comments[i].creator.name + '</span>');
										comment_.push('<br />');
										comment_.push('<span class="time">' + result.data.comments[i].create_time + '</span>');
									comment_.push('</div>');
								comment_.push('</div>');
								comment_.push('<div class="show-info">');
									comment_.push('<p>' + result.data.comments[i].content + '</p>');
								comment_.push('</div>');
							comment_.push('</div>');
						comment_.push('</div>');
					comment_.push('</a></li>');
				}
				
				comment_ = comment_.join("");	// 转换成一个字符串
				$("#comment_List").append(comment_);
				$("#comment_List").listview('refresh');
			}
			else {
				// 失败的情况，弹框显示
			}
			
        };
		
        simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	// 通过url获取当前的spitlotID
	var spitlotID = parseInt(window.location.href.substr((window.location.href.indexOf("=") + 1)));
	getMessage(spitlotID);
	
});

// "dian zan" which also the same as addup the heart_num	
$("#heart_num").bind('touchstart mousedown', function() {
	var addUp = function(id) {
		var requestUrl = hosturl + "add_up/";
		var requestData = { id : id };
	  	var cb = function(result) {
	  		if (result.status == "1" || result.status == 1) {
	  			// after change the id = "heart_num"'s data instead of loading the whole page
	  			var up_num = parseInt($("#heart_num").html());
	  			$("#heart_num").html(up_num + 1);
	        }
	        else {
	        	alert("result.status is Error!");
	        }
	    };

	    simpleJs.ajaxPost(requestUrl, requestData, cb);
	};

	// As spotslot.html jump from spitlot.html, and the url with spitlotID.
	var spitlotID = parseInt(window.location.href.substr((window.location.href.indexOf("=") + 1)));
	addUp(spitlotID);
});


// add comment
$("#add_comment").bind("touchstart mousedown", function() {
	var content = $("#Text1").val();
	//var create_time = new Date();
	
	var now_ = new Date();
	var create_time = "";
	create_time += now_.getFullYear() + "-";
	create_time += (now_.getMonth() + 1) + "-";
	create_time += now_.getDate() + " ";
	create_time += now_.getHours() + ":";
	create_time += now_.getMinutes() + ":";
	create_time += now_.getSeconds();
	// var creator_;					// get user info from localstorage, and localstorage only offers the authkey.
										// then we need to push authkey to view_comment.py and get the user data there.
	var authkey = simpleJs.getCookie(simpleJs.seesionid);

	if(content == null || content == "") {
		alert("Comment is empty!");
		return;
	}

	var img_url = hosturl;
	var addComment = function(id) {
		var requestUrl = hosturl + "add_comments/";
		var requestData = { 
			id : id,
			creator_authkey : authkey,
			create_time_ : create_time,
			content_ : content
		};
		var cb = function(result) {
			if(parseInt(result.status) == 1) {
				// add the new comment to the comment list dynamically instead of load the whole page.
				// do not need to get data from database, just use the input one
				var new_comment = [];
				
				new_comment.push('<li><a href="#" >');
					new_comment.push('<div class="we-talk-style-itemshow">');
						new_comment.push('<div class="maincontent">');
							new_comment.push('<div class="talker-info">');
								// the creator info should get from cookie 
								new_comment.push('<img src="' + img_url + result.comment.creator.icon.url + '" />');
								new_comment.push('<div class="user">');
									new_comment.push('<span class="h3">' + result.comment.creator.name + '</span>');
									new_comment.push('<br />');
									new_comment.push('<span class="time">' + result.comment.create_time + '</span>');
								new_comment.push('</div>');
							new_comment.push('</div>');
							new_comment.push('<div class="show-info">');
								new_comment.push('<p>' + result.comment.content + '</p>');
							new_comment.push('</div>');
						new_comment.push('</div>');
					new_comment.push('</div>');
				new_comment.push('</a></li>');

				new_comment = new_comment.join("");
				$("#comment_List").append(new_comment);
				$("#comment_List").listview('refresh');
			}
			else {
				alert("result.status is error!");
			}
		};

		simpleJs.ajaxPost(requestUrl, requestData, cb);
	};

	var spitlotID = parseInt(window.location.href.substr((window.location.href.indexOf("=") + 1)));
	addComment(spitlotID); 
});
