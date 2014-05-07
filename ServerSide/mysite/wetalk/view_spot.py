# encoding=UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from mysite.wetalk.models import *
import json

# 根据话题id获取该话题的所有槽点
def spot_list(request):
    data = {'status': 0, 'info': 'error'}
    try:
        topic_id = request.POST['id']
        start = request.POST['start']
        end = request.POST['end']

        #topic_id = 1
        #start = 0
        #end = 4

        sp_list = Topic.objects.get(id=topic_id).spots.all()[start:end]
        print sp_list
        data['status'] = 1
        data['info'] = 'ok'
        data['data'] = json.loads(serializers.serialize('json', sp_list))
    except Exception, e:
        print e
    return HttpResponse(json.dumps(data))

# 根据id获取槽点
def spot(request):
    data = {'status': 0, 'info': 'error'}
    try:
        spot_id = request.POST['id']
        sp = Spot.objects.filter(id=spot_id)
        data['status'] = 1
        data['info'] = 'ok'
        data['data'] = json.loads(serializers.serialize('json', sp))
    except Exception, e:
        print e
    return HttpResponse(json.dumps(data))
