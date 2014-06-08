# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from models import *
import json, util

def register(request):
    '''
    注册新用户

    参数:
        request.REQUEST['username']: 账号
        request.REQUEST['password']: 密码
    返回值:
        如果成功，则返回
            {'status': 1,
             'info': 'ok',
        否则
            {'status': 0,
             'info': 'error'}
    其他:
    '''
    data = {'status': 0, 'info': 'error'}
    try:
        user = User()
        user.username = request.REQUEST['username']
        user.password = request.REQUEST['password']
        user.icon = Image.objects.get(id=1)#设置默认头像
        if user.username.strip() == '' or user.password.strip() == '':
            raise # 账号或者密码为空
        user.save()# 插入数据
        user_data = user.toJsonFormat()

        auth = Auth()
        auth.key = util.generate_random_string(32)
        auth.data = json.dumps(user_data)
        auth.save()

        data['authkey'] = auth.key
        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))

def login(request):
    '''
    登陆系统

    参数:
        request.REQUEST['username']: 账号
        request.REQUEST['password']: 密码
    返回值:
        如果成功，则返回
            {'status': 1,
             'info': 'ok',
        否则
            {'status': 0,
             'info': 'error'}
    其他:
    '''
    data = {'status': 0, 'info': 'error'}
    try:
        username = request.REQUEST['username']
        password = request.REQUEST['password']

        user = User.objects.get(username=username, password=password)
        user_data = user.toJsonFormat()

        auth = Auth()
        auth.key = util.generate_random_string(32)
        auth.data = json.dumps(user_data)
        auth.save()

        data['authkey'] = auth.key
        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))

def logout(request):
    '''
    登出
    '''
    data = {'status': 0, 'info': 'error'}
    try:
        authkey = request.REQUEST['authkey']
        auth = Auth.objects.get(key=authkey)
        auth.delete()
        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))

def user(request):
    '''
    获取个人信息，必须登陆后才行

    参数:

    返回值:
        没有任何异常，则
            {'status': 1,
             'info': 'ok',
              'data': 用户的信息}
        否则
            {‘status': 0,
             'info': 'error'}
    '''
    data = {'status': 0, 'info': 'error'}
    try:
        authkey = request.REQUEST['authkey']
        auth = Auth.objects.get(key=authkey)
        data['data'] = json.loads(auth.data)
        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))

def user_update(request):
    data = {'status': 0, 'info': 'error'}
    try:
        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))
