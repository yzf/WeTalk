
var simpleJs = {};


// 这个会因为所处网络群而改变，故需要实时人手更新
var hosturl = "http://yuanzhf.info:8000/";

// JS生成ajax发送的url，为了统一，方便修改
simpleJs.getURL = function (action) {
    var baseURL = hosturl;
    return baseURL + action + "/";
};

/**
 * ajax post方法
 * 封装了jquery 提供的ajax post方法，使得通过闭包
 * 使得回调函数能够获得发送出去的内容
 * 并且可以使用默认参数，减少每次需要写的参数 
 */ 
simpleJs.ajaxPost = function(requestUrl, requestData, callBack, errorNotice, async, complete_function){	
	async = async || true;	
	requestData = requestData || {};
	requestData["sessionid"] = simpleJs.getCookie("sessionid");

	requestData.ajax = true;
	$.ajax({
		type:"POST",
		url:requestUrl,
		async:async,
		data:requestData,
		dataType:"json",
		success:function(result){
			if(callBack){
				callBack(result);
			}else{
				alert(result.info);
			}
		},
		error: errorNotice || function (XMLHttpRequest, textStatus, errorThrown) {
		    alert(textStatus);
		},
		complete: complete_function || function(){}
	});
};

// url重定向函数
simpleJs.redirect = function(url){
	window.location.href = url;
};

// 无参数简单导航函数，方便在页面跳转中使用
// 对url的实现有较大依赖，
// 如果url规则改变，需要重写该函数
// 目前是只改最后一个'/'和'.'之间的内容
simpleJs.fuzzyRedirect = function(name) {
	name = name || "";
	if (name != "") {
		var page_url = window.location.href;
		var plc = page_url.lastIndexOf("\/") + 1;
		var pagePath = page_url.substr(0, plc);
		simpleJs.redirect(pagePath + name + ".html");
	}
};


/**
 * 在需要表单提交是可以调用该函数，
 * 
 * @requestUrl	提交的url地址
 * @requestData 提交的数据json格式
 * @name		表单名称及id
 */
simpleJs.ajax_form = function (requestUrl, requestData, name) {
    var name = name || "";
    var html = [];
    var date = new Date();
    var formId = name + date.getTime();

    html.push('<form id="' + formId + '" name="' + formId + '" method="post" action="' + requestUrl + '" style="display:none;">');

    for (key in requestData) {
        html.push('<input type="text" name="' + key + '" value="' + requestData[key] + '" />');
    }
    html.push('<input type="submit" name="button" value="submit" id="' + name + '" />');
    html.push("</form>");

    html = html.join("");

    $("body").after(html);
    document.getElementById(formId).submit();
};

/**
 * 设置cookie
 * 
 * @c_name      cookie域名称
 * @value       cookie值
 * @expiredays  过期时间（天为单位）
 */
simpleJs.setCookie = function (c_name, value, expiredays) {
    var exdate = new Date();
    expiredays = expiredays || 365 * 2;
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

/**
 * 设置cookie
 * 
 * @c_name      cookie域名称 

 * @return      返回相应的cookie值，若为空，返回“”
 */
simpleJs.getCookie = function (c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            var c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}