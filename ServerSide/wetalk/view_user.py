# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.contrib.sessions.models import Session
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
             'session_id': session的id}
        否则
            {'status': 0,
             'info': 'error'}
    其他:
        注册成功后，session['user']保存着用户的个人信息
    '''
    data = {'status': 0, 'info': 'error'}
    try:
        user = User()
        user.username = request.REQUEST['username']
        user.password = request.REQUEST['password']
        user.icon = Image.objects.get(id=1)#设置图像
        if user.username.strip() == '' or user.password.strip() == '':
            raise # 账号或者密码为空
        user.save()# 插入数据
        user_data = user.toJsonFormat()
        request.session['user'] = user_data

        data['session_id'] = reqeust.session.session_key
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
             'session_id': session的id}
        否则
            {'status': 0,
             'info': 'error'}
    其他:
        登陆成功后，session['user']保存着用户的个人信息
    '''
    data = {'status': 0, 'info': 'error'}
    try:
        username = request.REQUEST['username']
        password = request.REQUEST['password']

        user = User.objects.get(username=username, password=password)
        user_data = user.toJsonFormat()
        request.session['user'] = user_data

        data['session_id'] = request.session.session_key
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
        session_id = request.REQUEST['session_id']
        session = Session.objects.get(session_key=session_id)
        session.delete()

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
        session_id = request.REQUEST['session_id']
        session = Session.objects.get(session_key=session_id)

        data['data'] = session.get_decoded()
        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))

def user_update(request):
    '''
    修改用户信息

    参数:
        REQUEST
            {'session_id': xxx,
             'update': {'key': xxx,
                        'value': xxx}}
    返回值:

    '''
    data = {'status': 0, 'info': 'error'}
    try:
        session_id = request.REQUEST['session_id']
        session = Session.objects.get(session_key=session_id)
        user_data = session.get_decoded()['user']
        user_id = int(user_data['id'])
        user = User.objects.get(id=user_id)

        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))
