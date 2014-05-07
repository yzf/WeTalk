# encoding=UTF-8
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
from mysite.wetalk.view_user import *
from mysite.wetalk.view_topic import *
from mysite.wetalk.view_spot import *
from mysite.wetalk.view_comment import *

def test(request):
    data = {}
    obj = Topic.objects.get(id=1)
    data['data'] = obj.toJsonFormat(show_spot=True, show_comment=True)
    return HttpResponse(json.dumps(data))
