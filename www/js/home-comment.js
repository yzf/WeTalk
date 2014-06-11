// show comments relate to the user
$(document).ready(function(){
	var getOwnComments = function(authkey) {
		var requestUrl = hosturl + "home_ownComment/";
		var requestData = { authkey : authkey };
		var cb = function(result) {
			if(parseInt(result.status) == 1) {
				var comments = [];
				for(var i = 0; i < result.comment_count; i++) {    
					comments.push('<div class="comment-holder">');
						comments.push('<div class="we-talk-style-itemshow">');
							comments.push('<div class="maincontent">');
								comments.push('<div class="talker-info">');
									comments.push('<img src="' + hosturl + result.comment_list[i].creator.icon.url + '" />');
									comments.push('<div class="user">');
										comments.push('<span class="h3">' + result.comment_list[i].creator.name + '</span>');
										comments.push('<br />');
										comments.push('<span class="time">' + result.comment_list[i].create_time + '</span>');
									comments.push('</div>');
								comments.push('</div>');
								comments.push('<div class="show-info">');
									comments.push('<p>' + result.comment_list[i].content + '</p>');
								comments.push('</div>');
								comments.push('<p class="purtitle left">@</p>');
								comments.push('<div class="source-talk left">');
									comments.push('<div class="topic">');	
										comments.push('<a href="weTalk.html?spitlotID=' + result.cor_spots[i].id + '" rel="external">');
										comments.push('<img src="' + result.cor_spots[i].imgs.url + '">');
										comments.push('<div class="itemcontent">');
											comments.push('<h3>' + result.cor_spots[i].title + '</h3>');
											comments.push('<p>' + result.cor_spots[i].content + '</p>');
										comments.push('</div>');
			                            comments.push('<span class="ui-li-count heart">&hearts;' + result.cor_spots[i].up + '</span>');		
			                            comments.push('<span class="ui-li-count talk">T' + result.cor_spots[i].comments_count + '</span>');
			                        comments.push('</div>');
			                    comments.push('</div>');   
			                comments.push('</div>');
			            comments.push('</div>');
			        comments.push('</div>');             	
				}

				comments = comments.join("");
				$("#comments_here").append(comments);
			}
			else {
				alert(result.info);
			}
		};

		simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	var getReceiveComments = function(authkey) {
		var requestUrl = hosturl + "home_receiveComment/";
		var requestData = { authkey : authkey };
		var cb = function(result) {
			if(parseInt(result.status) == 1) {
				var comments = [];
				for(var i = 0; i < result.spots_count; i++) {
					for(var j = 0; j < result.cor_spots[i].comments_count; j++) {
                        if(result.cor_spots[i].comments[j].creator.id != result.cur_user.id) {
                        	comments.push('<div class="comment-holder">');
								comments.push('<div class="we-talk-style-itemshow">');
									comments.push('<div class="maincontent">');
										comments.push('<div class="talker-info">');
											comments.push('<img src="' + hosturl + result.cor_spots[i].comments[j].creator.icon.url + '" />');
											comments.push('<div class="user">');
												comments.push('<span class="h3">' + result.cor_spots[i].comments[j].creator.name + '</span>');
												comments.push('<br />');
												comments.push('<span class="time">' + result.cor_spots[i].comments[j].create_time + '</span>');
											comments.push('</div>');
										comments.push('</div>');
										comments.push('<div class="show-info">');
											comments.push('<p>' + result.cor_spots[i].comments[j].content + '</p>');
										comments.push('</div>');
										comments.push('<p class="purtitle left">@</p>');
										comments.push('<div class="source-talk left">');
											comments.push('<div class="topic">');	
												comments.push('<a href="weTalk.html?spitlotID=' + result.cor_spots[i].id + '" rel="external">');
												comments.push('<img src="' + result.cor_spots[i].imgs.url + '">');
												comments.push('<div class="itemcontent">');
													comments.push('<h3>' + result.cor_spots[i].title + '</h3>');
													comments.push('<p>' + result.cor_spots[i].content + '</p>');
												comments.push('</div>');
					                            comments.push('<span class="ui-li-count heart">&hearts;' + result.cor_spots[i].up + '</span>');		
					                            comments.push('<span class="ui-li-count talk">T' + result.cor_spots[i].comments_count + '</span>');
					                        comments.push('</div>');
				                        comments.push('</div>');
				                    comments.push('</div>');
			            		comments.push('</div>');
			        		comments.push('</div>');          
						}
					}
				}

				comments = comments.join("");
				$("#comments_here").append(comments);
			}
			else {
				alert(result.info);
			}
		};

		simpleJs.ajaxPost(requestUrl, requestData, cb);
	};

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


	var authkey = simpleJs.getCookie(simpleJs.seesionid);
	var commentType = parseInt(window.location.href.substr((window.location.href.indexOf("=") + 1)));

	getUserInfo(authkey);			// get current user info
	if(commentType == 1) {
		getOwnComments(authkey);			// view_comment.py	get comments that user gives out 
	}
	else if(commentType == 2) {
		getReceiveComments(authkey);		// view_comment.py	get comments that received from others which spot is created by this user
	}
	else {
		alert("Comment Type is " + commentType);
		return;
	}
});


// go back
$("#goback").bind('touchstart mousedown', function() {
    window.history.back();
});