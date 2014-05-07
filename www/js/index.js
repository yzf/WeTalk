$(document).ready(function() {
    $("#registerButton").bind('touchstart mousedown', function () {
        var requestData = {
            username : $("#registerAccountInput").val(),
            password : $("#registerPasswordInput").val()
        };
        var requestUrl = "http://192.168.1.186:8000/register/";
        var cb = function (result, requestData) {
            alert(result.status);

        };

        simpleJs.ajaxPost(requestUrl, requestData, cb);
    });

    $("#loginButton").bind('touchstart mousedown', function () {
        var requestData = {
            username: $("#loginAccountInput").val(),
            password: $("#loginPasswordInput").val()
        };
        var requestUrl = "http://192.168.1.186:8000/login/";
        var cb = function (result, requestData) {         
            alert(result.status);
            //if (result.status == "1" || result.status == 1) {
            //    simpleJs.redirect(simpleJs.getPath + "channel");
            //} else {
            //    alert(result.info);
            //}
        };

        simpleJs.ajaxPost(requestUrl, requestData, cb);
    });
});

/*
function eventBackButton() {
    if ($.mobile.activePage.is('#home')) {
        myAlert('再点击一次退出!');
        document.removeEventListener("backbutton", eventBackButton, false); // 注销返回键
        document.addEventListener("backbutton", exitApp, false);// 绑定退出事件
        // 3秒后重新注册
        var intervalID = window.setTimeout(function () {
            window.clearTimeout(intervalID);
            document.removeEventListener("backbutton", exitApp, false); // 注销返回键
            document.addEventListener("backbutton", eventBackButton, false); // 返回键
        }, 3000);
    }
    else {
        navigator.app.backHistory();
    }

}

//退出app
function exitApp() {
    navigator.app.exitApp();
} */
