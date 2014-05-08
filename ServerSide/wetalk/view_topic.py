# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from models import *
import json

categories = ('事件', '娱乐', '路过', '怀旧')
def topic_list(request):
    '''
    获取话题

    参数:
        request.POST['category']: 类型的下标
        request.POST['start']: 区间的开始值
        request.POST['end']: 区间的结束值
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
        cg = categories[int(request.POST['category'])]
        start = int(request.POST['start'])
        end = int(request.POST['end'])
        #cg = categories[0]
        #start = 0
        #end = 1
        data['count'] = Topic.objects.filter(category=cg).count()
        tp_list = Topic.objects.filter(category=cg).order_by('id')[start:end]
        data['data'] = []
        for tp in tp_list:
            data['data'].append(tp.toJsonFormat())
        data['status'] = 1
        data['info'] = 'ok'
    except Exception, e:
        print e
    return HttpResponse(json.dumps(data))

# 添加话题
def topic_add(request):
    data = {'status': 0, 'info': 'error'}
    try:
        topic = Topic()
    except Exception, e:
        print e
    return HttpResponse(json.dumps(data))
