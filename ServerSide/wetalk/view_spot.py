# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from models import *
import json

# 根据话题id获取该话题的所有槽点
def spot_list(request):
    data = {'status': 0, 'info': 'error'}
    try:
        topic_id = int(request.POST['id'])
        start = int(request.POST['start'])
        end = int(request.POST['end'])

        #topic_id = 1
        #start = 0
        #end = 4

        sp_list = Topic.objects.get(id=topic_id).spots.all()[start:end]
        data['data'] = []
        for sp in sp_list:
            data['data'].append(sp.toJsonFormat())

        data['status'] = 1
        data['info'] = 'ok'
    except Exception, e:
        print e
    return HttpResponse(json.dumps(data))
