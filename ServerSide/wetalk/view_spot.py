# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from models import *
import json, util, string, random
import base64

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

        topic = Topic.objects.get(id=topic_id)
        data['count'] = topic.spots.count()
        sp_list = Topic.objects.get(id=topic_id).spots.all()[start:end]
        data['data'] = []
        for sp in sp_list:
            data['data'].append(sp.toJsonFormat())

        data['topic'] = topic.toJsonFormat()
        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))


# create spot       --createSplitslot.js
def createSplitslot(request):
    data ={'status': 0, 'info': 'error'}
    try:
        # 获取当前用户
        authkey = request.REQUEST['authkey']
        auth = Auth.objects.get(key=authkey)
        cur_user = json.loads(auth.data)             # this is the json format User, not a class type User
        user_ = User.objects.get(id=cur_user['id'])

        # 获取createSplitlot.js传过来的数据
        title = request.REQUEST['title']
        content = request.REQUEST['content']
        topicID = request.REQUEST['topicID']
        createTime = request.REQUEST['create_time']

        # 创建新的spot，但未关联对应的images
        new_spot = Spot(creator=user_, create_time=createTime, title=title, content=content, up=0)
        new_spot.save()

        image_strings = request.REQUEST['imgs']

        # 解码images并保存到数据库，及关联到new_spot
        imageList = image_strings.split(';')
        for il in imageList:
            img_name = ''.join([random.choice(string.ascii_letters + string.digits) \
                           for i in range(15)])
            img_url = 'resource/images/' + img_name + '.jpeg'
            
            imgData = base64.b64decode(il)
            tmp = open(img_url,'wb')
            tmp.write(imgData)
            tmp.close()
            image = Image(url=img_url)
            image.save()
            print image.url
            new_spot.imgs.add(image)
        
        # 关联new_spot与对应的topic
        new_spot.save()
        topic = Topic.objects.get(id=topicID)
        topic.spots.add(new_spot)
        topic.save()
        
        data['spotID'] = new_spot.id
        data['status'] = 1 
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))


# get topic by the spot id ()   --weTalk.js
def get_Topic(request):
    data = {'status': 0, 'info': 'error'}
    try:
        spotID = request.REQUEST['spitlotID']
        spot_ = Spot.objects.get(id=spotID)
        topicList = spot_.topic_set.all()   # acttrually only one
        topicID = -1
        for tl in topicList:
            topicID = tl.id
        data['topicID'] = topicID
        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))