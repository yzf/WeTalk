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
        #spot_id = int(request.POST['id'])
        #start = int(request.POST['start'])
        #end = int(request.POST['end'])

        spot_id = 1
        start = 0
        end = 4

        sp = Spot.objects.filter(id=spot_id)
        data['data'] = json.loads(serializers.serialize('json', sp))
        # 生成图片url
        tmp = data['data'][0]
        tmp['img_list'] = []
        for img_id in tmp['fields']['imgs']:
            img_url = Image.objects.get(id=img_id).url
            tmp['img_list'].append(img_url)
        # 生成评论
        cm_list = Spot.objects.get(id=spot_id).comments.all()[start:end]
        data['data'][0]['cm_list'] = json.loads(serializers.serialize('json', cm_list))

        data['data'] = data['data'][0]
        data['status'] = 1
        data['info'] = 'ok'
        # 删除多余的字段
        data['data'].pop('model')
        data['data']['fields'].pop('comments')
        data['data']['fields'].pop('imgs')
        for cm in data['data']['cm_list']:
            cm.pop('model')
    except Exception, e:
        print e
    return HttpResponse(json.dumps(data))



