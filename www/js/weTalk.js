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
				// ��ӱ���
				$("#hear_title").html(result.data.title);
				
				// �۵�ԭ��
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
				
				// ���޺�������
				$("#heart_num").html(result.data.up);
				$("#comment_num").html(result.data.comments.length);
				
				// ����
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
				
				comment_ = comment_.join("");	// ת����һ���ַ���
				$("#comment_List").append(comment_);
				$("#comment_List").listview('refresh');
			}
			else {
				// ʧ�ܵ������������ʾ
			}
			
        };
		
        simpleJs.ajaxPost(requestUrl, requestData, cb);
	};
	
	// ͨ��url��ȡ��ǰ��spitlotID
	var spitlotID = parseInt(window.location.href.substr((window.location.href.indexOf("=") + 1)));
	
	getMessage(spitlotID);
	
});