/**
 * 吴学锋使用的命名空间
 * 
 * 除了	ajax提交函数为了方便修改
 * 		dialog.js中的弹出框的函数方便表示
 * 		editor.js中的函数在tiny_mce控件中被引用，而不依赖于simpleJs
 * 外
 * 所有的吴学锋写的js代码都在这个命名空间中。
 */ 
var simpleJs = {};

// JS在动态加载图片时将会调用该函数
simpleJs.getPath = function (pagename) {
    var curpath = window.href;
    var index = curpath.lastIndexOf("#");
    
    return curpath.substr(0, index) + "#" + pagename;
};

// JS生成ajax发送的url，为了统一，方便修改
simpleJs.getURL = function(controller, action) {
	var baseURL = "../logic/yue.php"
	
	return baseURL + "?controller=" + controller + "&action=" + action; 
}

/**
 * ajax post方法
 * 封装了jquery 提供的ajax post方法，使得通过闭包
 * 使得回调函数能够获得发送出去的内容
 * 并且可以使用默认参数，减少每次需要写的参数 
 */ 
simpleJs.ajaxPost = function(requestUrl, requestData, callBack, errorNotice, async, complete_function){
	
	if (requestUrl == "") {
		Alert(simpleJs.config.debugOutput);
		return false;
	}
	
	async = async || true;	
	requestData = requestData || {};
	
	requestData.ajax = true;
	$.ajax({
		type:"POST",
		url:requestUrl,
		async:async,
		data:requestData,
		dataType:"json",
		success:function(result){
			if(callBack){
				callBack(result, requestData);
			}else{
				alert(result.msg);
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
		simpleJs.redirect(pagePath + name + ".php");
	}
};

// 带参数导航函数
simpleJs.nav = function(pageName, parameters) {
	pageName = pageName || "";
	parameters = parameters || "";
	if (pageName != "") {
		var page_url = window.location.href;
		var plc = page_url.lastIndexOf("\/") + 1;
		var pagePath = page_url.substr(0, plc);
		if (parameters == "") {
			simpleJs.redirect(pagePath + pageName + ".php");
		}
		else {
			simpleJs.redirect(pagePath + pageName + ".php?" + parameters);
		}
	}
};

/**
 * 在需要表单提交是可以调用该函数，
 * 
 * @requestUrl	提交的url地址
 * @requestData 提交的数据json格式
 * @name		表单名称及id
 */
simpleJs.ajax_form = function(requestUrl, requestData, name) {
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
}


// 这个会因为所处网络群而改变，故需要实时人手更新
var hosturl = "http://192.168.0.85:8000/";
