# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from mysite.wetalk.models import *
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
        data['data'] = json.loads(serializers.serialize('json', sp_list))
        # 获取每个槽点的图片的url
        for sp in data['data']:
            sp['img_list'] = []
            for img_id in sp['fields']['imgs']:
                img_url = Image.objects.get(id=img_id).url
                sp['img_list'].append(img_url)

        data['status'] = 1
        data['info'] = 'ok'
    except Exception, e:
        print e
    return HttpResponse(json.dumps(data))

# 根据id获取槽点
def spot(request):
    data = {'status': 0, 'info': 'error'}
    try:
        spot_id = int(request.POST['id'])
        sp = Spot.objects.filter(id=spot_id)
        data['data'] = json.loads(serializers.serialize('json', sp))
        data['status'] = 1
        data['info'] = 'ok'
    except Exception, e:
        print e
    return HttpResponse(json.dumps(data))
