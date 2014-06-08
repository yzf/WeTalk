# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from models import *
import json, util

categories = ('事件', '娱乐', '路过', '怀旧')
def topic_list(request):
    '''
    获取话题

    参数:
        request.REQUEST['category']: 类型的下标
        request.REQUEST['start']: 区间的开始值
        request.REQUEST['end']: 区间的结束值
    返回值:
        如果成功，则
            {'status': 1,
             'info': 'ok',
             'count': 该类型的总话题个数
             'data': [话题们]}
        否则
            {'status': 0,
             'info': 'error'}
    其他:
        区间为[start, end)
    '''
    data = {'status': 0, 'info': 'error'}
    try:
        cg = categories[int(request.REQUEST['category'])]
        start = int(request.REQUEST['start'])
        end = int(request.REQUEST['end'])

        data['count'] = Topic.objects.filter(category=cg).count()
        tp_list = Topic.objects.filter(category=cg).order_by('id')[start:end]
        data['data'] = []
        for tp in tp_list:
            data['data'].append(tp.toJsonFormat())
        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))


# 添加话题
def topic_add(request):
    data = {'status': 0, 'info': 'error'}
    try:
        topic = Topic()
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))


# get the topic list that is connect to the user
def discover_topic(request):
    data = {'status': 0, 'info': 'error'}
    try:
        # get the current user from database
        authkey = request.REQUEST['authkey']
        auth = Auth.objects.get(key=authkey)
        cur_user = json.loads(auth.data)    # this return "an array" with the properties in an User object.
        user_ = User.objects.get(id=cur_user['id'])

        # set iTopic list and iTopic count
        iTopic_list_ = user_.focus.all()
        iTopic_count_ = user_.focus.count()
        data['iTopic_count'] = iTopic_count_
        data['iTopic_list'] = []
        for it in iTopic_list_:
            data['iTopic_list'].append(it.toJsonFormat())
        
        # set rTopic list and rTopic count
        system_user = User.objects.get(username='admin@admin.com')
        rTopic_list_ = Topic.objects.filter(creator=system_user)
        rTopic_count_ = Topic.objects.filter(creator=system_user).count()
        data['rTopic_count'] = rTopic_count_
        data['rTopic_list'] = []
        for rt in rTopic_list_:
            data['rTopic_list'].append(rt.toJsonFormat())

        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))


def search_topic(request):
    data = {'status': 0, 'info': 'error'}
    try:
        title_ = request.REQUEST['title']
        # match the topic title contain key "title" from request
        # "PorpertyName__contains" is a way offer from Django
        topic_list = Topic.objects.filter(title__contains=title_)
        topic_count = topic_list.count()
        data['topic_count'] = topic_count
        data['topic_list'] = []
        for tl in topic_list:
            data['topic_list'].append(tl.toJsonFormat())

        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))
