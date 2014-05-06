# encoding=UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from mysite.wetalk.models import *
import json

# 注册
def register(request):
    data = {'status': 0, 'info': 'register failed'}
    try:
        user = User()
        user.username = request.POST['username']
        user.password = request.POST['password']
        if user.username.strip() == '' or user.password.strip() == '':
            raise # 账号或者密码为空
        user.save()
        data['status'] = 1
        data['info'] = 'register successed'
    except:
        pass
    return HttpResponse(json.dumps(data))

# 登陆
def login(request):
    data = {'status': 0, 'info': 'login failed'}
    try:
        user = User.objects.get(username=request.POST['username'], \
                                password=request.POST['password'])
        request.session['id'] = user.id;
        data['status'] = 1
        data['info'] = 'login successed'
    except:
        pass
    return HttpResponse(json.dumps(data))


