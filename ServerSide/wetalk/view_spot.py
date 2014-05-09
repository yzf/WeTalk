# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from models import *
import json, util

def spot_list(request):
    '''
    根据话题id获取该话题的所有槽点

    参数:
        request.REQUEST['id']: 话题的id
        request.REQUEST['start']: 区间的开始值
        request.REQUEST['end']: 区间的结束值
    返回值:
        如果成功，则
            {'status': 1,
             'info': 'ok',
             'count': 该话题的总槽点个数,
             'data': [槽点们]}
        否则
            {'status': 0,
             'info': 'error'}
    其他:
        区间为[start, end)
    '''
    data = {'status': 0, 'info': 'error'}
    try:
        topic_id = int(request.REQUEST['id'])
        start = int(request.REQUEST['start'])
        end = int(request.REQUEST['end'])

        #topic_id = 1
        #start = 0
        #end = 2

        data['count'] = Topic.objects.get(id=topic_id).spots.count()
        sp_list = Topic.objects.get(id=topic_id).spots.all()[start:end]
        data['data'] = []
        for sp in sp_list:
            data['data'].append(sp.toJsonFormat())

        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))
