# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from models import *
import util
import json

def comment_list(request):
    '''
    获取某槽点及其评论

    参数:
        request.REQUEST['id']: 槽点id
        request.REQUEST['start']: 区间的开始值
        request.REQUEST['end']: 区间的结束值
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
        spot_id = int(request.REQUEST['id'])
        start = int(request.REQUEST['start'])
        end = int(request.REQUEST['end'])

        #spot_id = 1
        #start = 0
        #end = 1

        sp = Spot.objects.get(id=spot_id)
        data['data'] = sp.toJsonFormat(show_comment=True, start=start, end=end)

        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))


# add up num of a topic --weTalk.html and weTalk.js
def add_up(request):
    '''
    add up of a spot
    '''
    data = {'status': 0, 'info': 'error'}
    try:
        spot_id = int(request.REQUEST['id'])
        spot_ = Spot.objects.get(id=spot_id)
        spot_.up = int(spot_.up) + 1
        spot_.save()
        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))


# add a new comment of a spot --weTalk.html and weTalk.js
def add_comments(request):
    data = {'status': 0, 'info': 'error'}
    try:
        # create new comment.
        authkey = request.REQUEST['creator_authkey']
        auth = Auth.objects.get(key=authkey)
        comment_creator = json.loads(auth.data)    # this return "an array" with the properties in an User object.
        creator_ = User.objects.get(id=comment_creator['id'])

        comment_creat_time = request.REQUEST['create_time_']
        comment_content = request.REQUEST['content_']
        # problem is here.............................................
        comment_ = Comment(creator=creator_, create_time=comment_creat_time, content=comment_content)
        comment_.save()
        
        # add the comment to the cooresponding spot
        spot_id = request.REQUEST['id']
        spot_ = Spot.objects.get(id=spot_id)
        spot_.comments.add(comment_)           # comment_ must be saved first, as add() only connects them without any copy.
        spot_.save()

        data['comment'] = comment_.toJsonFormat()         # to show the comment_ info in the new comment.
        #data['user'] = creator_.toJsonFormat()
        data['spot'] = spot_.toJsonFormat()
        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))    


# get comments that user gives out --home-comment.js and home-comment.html
def home_ownComment(request):
    data = {'status': 0, 'info': 'error'}
    try:
        # get current user
        authkey = request.REQUEST['authkey']
        auth = Auth.objects.get(key=authkey)
        cur_user = json.loads(auth.data)    # this return "an array" with the properties in an User object.
        user_ = User.objects.get(id=cur_user['id'])

        # the comment need to corespond to a spot, so we need to find out the comment and spot together 
        comment_list = Comment.objects.filter(creator=user_)
        comment_count = Comment.objects.filter(creator=user_).count()
        data['comment_count'] = comment_count
        
        # as the comment_list and cor_spots in the correct coresponding order, so we can return this to js
        data['comment_list'] = []
        data['cor_spots'] = []
        for cl in comment_list:
            data['comment_list'].append(cl.toJsonFormat())
            print 'comment_list'
            # here is the problem
            cor_spot = cl.spot_set.all()       # get the first one, in fact there is only one, but the return is a struct of arrary
            for cors in cor_spot:
                print 'cor_spots'
                data['cor_spots'].append(cors.toJsonFormat(show_comment=True))

        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))


# get comments that received from others which spot is created by this user
def home_receiveComment(request):
    data = {'status': 0, 'info': 'error'}
    try:
        # get current user
        authkey = request.REQUEST['authkey']
        auth = Auth.objects.get(key=authkey)
        cur_user = json.loads(auth.data)    # this return "an array" with the properties in an User object.
        user_ = User.objects.get(id=cur_user['id'])
        data['cur_user'] = user_.toJsonFormat()
        # the comment need to corespond to a spot, so we need to find out the comment and spot together
        own_spots = Spot.objects.filter(creator=user_)
        data['spots_count'] = own_spots.count()
        data['cor_spots'] = []
        for cs in own_spots:
            # here need to cancl the comment created by user_, but can not do this here
            data['cor_spots'].append(cs.toJsonFormat(show_comment=True, start=0, end=10))   # get the first 10 

        data['status'] = 1
        data['info'] = 'ok'
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))

	
	
	


	