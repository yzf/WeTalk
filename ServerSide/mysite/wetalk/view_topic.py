# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from mysite.wetalk.models import *
import json

categories = ('事件', '娱乐', '路过', '怀旧')
# 获取话题
def topic_list(request):
    data = {'status': 0, 'info': 'error'}
    try:
        cg = categories[int(request.POST['category'])]
        start = int(request.POST['start'])
        end = int(request.POST['end'])
        #cg = categories[0]
        #start = 0
        #end = 5
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
