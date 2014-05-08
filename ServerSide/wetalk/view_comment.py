# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from models import *
import json

def comment_list(request):
    '''
    获取某槽点及其评论

    参数:
        request.POST['id']: 槽点id
        request.POST['start']: 区间的开始值
        request.POST['end']: 区间的结束值
    返回值:
        如果成功，则
            {'status': 1,
             'info': 'ok',
             'data': 数据}
        否则
            {'status': 0,
             'info': 'error'}
    其他:
        区间为左闭右开，即[start, end)
    '''
    data = {'status': 0, 'info': 'error'}
    try:
        spot_id = int(request.POST['id'])
        start = int(request.POST['start'])
        end = int(request.POST['end'])

        #spot_id = 1
        #start = 0
        #end = 1

        sp = Spot.objects.get(id=spot_id)
        data['data'] = sp.toJsonFormat(show_comment=True, start=start, end=end)

        data['status'] = 1
        data['info'] = 'ok'
    except Exception, e:
        print e
    return HttpResponse(json.dumps(data))



