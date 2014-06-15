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

        #data['count'] = Topic.objects.filter(category=cg).count()
        tp_list = Topic.objects.filter(category=cg).order_by('id')[start:end]
        data['count'] = tp_list.count()
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


# get the topic list that is connect to the user --discover.js and discover.html
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
        # recommend topic according to topic category 
        # if this is empty, recommend the topic created by admin@admin.com
        system_user = User.objects.get(username='admin@admin.com')
        rTopic_list_ = Topic.objects.filter(category=user_.interest)
        rTopic_count_ = rTopic_list_.count()
        print rTopic_count_
        
        if rTopic_count_ == 0:
            rTopic_list_ = Topic.objects.filter(creator=system_user)
            rTopic_count_ = rTopic_list_.count()
        
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

	
# search topics base on title  --search.js and search.html
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

# get topic according to user focus	--home.js and home.html
def	userFocus_topic(request):
    data = {'status': 0, 'info': 'error'}
    try:
        authkey = request.REQUEST['authkey']
        auth = Auth.objects.get(key=authkey)
        cur_user = json.loads(auth.data)    # this return "an array" with the properties in an User object.
        user_ = User.objects.get(id=cur_user['id'])

        fTopic_list_ = user_.focus.all()
        fTopic_count_ = user_.focus.count()
        data['fTopic_count'] = fTopic_count_
        data['fTopic_list'] = []
        for ft in fTopic_list_:
            data['fTopic_list'].append(ft.toJsonFormat());
        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))


# create topic
def createTopic(request):
    data = {'status': 0, 'info': 'error'}
    try:
        authkey = request.REQUEST['authkey']
        auth = Auth.objects.get(key=authkey)
        cur_user = json.loads(auth.data)             # this is the json format User, not a class type User
        user_ = User.objects.get(id=cur_user['id'])

        create_time = request.REQUEST['create_time']
        title = request.REQUEST['title']
        begin_time = request.REQUEST['startTime']
        end_time = request.REQUEST['endTime']

        new_topic = Topic(creator=user_, create_time=create_time, category="", title=title, begin_time=begin_time, end_time=end_time)
        new_topic.save()

        data['topicID'] = new_topic.id
        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))