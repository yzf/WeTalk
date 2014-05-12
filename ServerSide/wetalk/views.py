# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.sessions.models import Session
import json

# Create your views here.
from view_user import *
from view_topic import *
from view_spot import *
from view_comment import *
from view_image import *

def test(request):
    data = {'status': 1,
            'info': 'this is just a test'}
    session_id = request.REQUEST['id']
    print session_id
    session = Session.objects.get(session_key=session_id)
    user_data = session.get_decoded()
    data['data'] = user_data
    return HttpResponse(json.dumps(data))

