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
        user.icon = Image.objects.get(id=1) #设置默认头像
        if user.username.strip() == '' or user.password.strip() == '':
            raise # 账号或者密码为空
        user.save()# 插入数据
        user_data = user.toJsonFormat()

        auth = Auth()
        auth.key = util.generate_random_string(32)
        auth.data = json.dumps(user_data)
        auth.save()

        # system send a welcome message to user
        system_user = User.objects.get(username="admin@admin.com")
        welcome = Message(to_user=user, from_user=system_user, is_read=False, content="Welcome to WeTalk!")
        welcome.save()

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
        cur_user = json.loads(auth.data)             # this is the json format User, not a class type User
        user_ = User.objects.get(id=cur_user['id'])
        data['data'] = user_.toJsonFormat()
        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))


# udpate user info
def user_update(request):
    data = {'status': 0, 'info': 'error'}
    try:
        authkey = request.REQUEST['authkey']
        auth = Auth.objects.get(key=authkey)
        cur_user = json.loads(auth.data)             # this is the json format User, not a class type User
        user_ = User.objects.get(id=cur_user['id'])
        
        infoType = request.REQUEST['infoType']
        infoText = request.REQUEST['infoText']

        if infoType == '0':
            user_.name = infoText
        if infoType == '1':
            user_.password = infoText
        if infoType == '2':
            user_.intro = infoText
        if infoType == '3':
            user_.interest = infoText
        print user_.name
        user_.save()

        data['user'] = user_.toJsonFormat()
        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))


# get all the message to user     --message.js and message.html
def get_user_message(request):
    data = {'status': 0, 'info': 'error'}
    try:
        authkey = request.REQUEST['authkey']
        auth = Auth.objects.get(key=authkey)
        cur_user = json.loads(auth.data)             # this is the json format User, not a class type User
        user_ = User.objects.get(id=cur_user['id'])

        unread_messages = Message.objects.filter(to_user=user_, is_read=False)
        unread_messages_count = unread_messages.count()
        data['unread_messages_count'] = unread_messages_count
        data['unread_messages'] = []
        for urm in unread_messages:
            data['unread_messages'].append(urm.toJsonFormat())

        read_messages = Message.objects.filter(to_user=user_, is_read=True)
        read_messages_count = read_messages.count()
        data['read_messages_count'] = read_messages_count
        data['read_messages'] = []
        for rm in read_messages:
            data['read_messages'].append(rm.toJsonFormat())    

        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))


# return the detail of the message   --messageDetail.js and messageDetail.html
def get_message_detail(request):
    data = {'status': 0, 'info': 'error'}
    try:
        messageID = request.REQUEST['messageID']
        message = Message.objects.get(id=messageID)
        data['message'] = message.toJsonFormat()
        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))