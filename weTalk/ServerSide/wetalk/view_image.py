# coding: UTF-8
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from PIL import Image as PILImage
from wetalk.models import Image
import json, string, random, util

def image_upload(request):
    data = {'status': 0, 'info': 'error'}
    try:
        size = 200, 200
        img_name = ''.join([random.choice(string.ascii_letters + string.digits) \
                           for i in range(15)])

        upload_img = request.FILES['image']
        img = PILImage.open(upload_img)
        img.thumbnail(size, PILImage.ANTIALIAS)
        img_url = 'resource/images/' + img_name + '.png'
        img.save(img_url, 'png')

        image = Image()
        image.url = img_url
        image.save()

        data['status'] = 1
        data['info'] = 'ok'
        data['url'] = img_url
    except Exception as e:
        data['info'] = util.get_exception_message(e)
        print e
    return HttpResponse(json.dumps(data))
