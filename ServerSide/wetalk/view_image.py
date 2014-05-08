# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from models import *
from PIL import Image
import json

def image_upload(request):
    data = {'status': 0, 'info': 'error'}
    try:
        img = request.FILES['image']
    except Exception as e:
        data['info'] = e.__str__().strip('"').strip("'")
        print e
    return HttpResponse(json.dumps(data))
