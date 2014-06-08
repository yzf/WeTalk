# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from models import *
import json

# Create your views here.
from view_user import *
from view_topic import *
from view_spot import *
from view_comment import *
from view_image import *

def test(request):
    data = {'status': 1,
            'info': 'aaa'}
    return HttpResponse(json.dumps(data))

