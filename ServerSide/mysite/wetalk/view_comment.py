# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from mysite.wetalk.models import *
import json

# 根据槽点id获取该槽点的所有评论
def comment_list(request):
    data = {'status': 0, 'info': 'error'}
    try:
        spot_id = int(request.POST['id'])
        start = int(request.POST['start'])
        end = int(request.POST['end'])

        #spot_id = 1
        #start = 0
        #end = 4

        sp = Spot.objects.get(id=spot_id)
        data['data'] = sp.toJsonFormat(show_comment=True)

        data['status'] = 1
        data['info'] = 'ok'
    except Exception, e:
        print e
    return HttpResponse(json.dumps(data))



