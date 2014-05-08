# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from models import *
import json

def register(request):
    '''
    注册新用户

    参数:
        request.POST['username']: 账号
        request.POST['password']: 密码
    返回值:
        如果成功，则返回
            {'status': 1,
             'info': 'ok'}
        否则
            {'status': 0,
             'info': 'error'}
    其他:
        注册成功后，session['user']保存着用户的个人信息
    '''
    data = {'status': 0, 'info': 'error'}
    try:
        user = User()
        user.username = request.POST['username']
        user.password = request.POST['password']
        user.icon = Image.objects.get(id=1)
        if user.username.strip() == '' or user.password.strip() == '':
            raise # 账号或者密码为空
        user.save()
        user_data = user.toJsonFormat()
        request.session['user'] = user_data

        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = e.__str__().strip('"').strip("'")
        print e
    return HttpResponse(json.dumps(data))

def login(request):
    '''
    登陆系统

    参数:
        request.POST['username']: 账号
        request.POST['password']: 密码
    返回值:
        如果成功，则返回
            {'status': 1,
             'info': 'ok'}
        否则
            {'status': 0,
             'info': 'error'}
    其他:
        登陆成功后，session['user']保存着用户的个人信息
    '''
    data = {'status': 0, 'info': 'error'}
    try:
        username = request.POST['username']
        password = request.POST['password']
        #username = r'admin@admin.com'
        #password = r'1'
        user = User.objects.get(username=username, password=password)
        user_data = user.toJsonFormat()
        request.session['user'] = user_data

        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = e.__str__().strip('"').strip("'")
        print e
    return HttpResponse(json.dumps(data))

def user(request):
    '''
    获取个人信息

    参数:
        request.POST['id']: 用户的id
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
        user_id = int(request.POST['id'])
        #user_id = 1
        user = User.objects.get(id=user_id)
        data['data'] = user.toJsonFormat()

        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = e.__str__().strip('"').strip("'")
        print e
    return HttpResponse(json.dumps(data))

def user_update(request):
    '''
    修改用户信息

    参数:
        POST
            {'id': xxx,
             'update': {'key': xxx,
                        'value': xxx}}
    返回值:

    '''
    data = {'status': 0, 'info': 'error'}
    try:
        user_id = int(request.POST['id'])
    except Exception as e:
        data['info'] = e.__str__().strip('"').strip("'")
        print e
    return HttpResponse(json.dumps(data))
