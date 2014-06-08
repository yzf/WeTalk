# coding: UTF-8
from django.conf.urls import patterns, include, url
from wetalk.views import *
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'mysite.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    #url(r'^admin/', include(admin.site.urls)),
    (r'^test/', test),
    # 与用户相关
    (r'^register/', register),
    (r'^login/', login),
    (r'^logout/', logout),
    (r'^user/', user),
    (r'^user_update/', user_update),
    # 与话题相关
    (r'^topic_list/', topic_list),
    (r'^topic_add/', topic_add),
    (r'^discover_topic/', discover_topic),
    (r'^search_topic/', search_topic),
    # 与槽点相关
    (r'^spot_list/', spot_list),
    # 与评论相关
    (r'^comment_list/', comment_list),
    (r'^add_up/', add_up),
    (r'^add_comments/', add_comments),
    # 与图片相关
    (r'^image_upload/', image_upload),
)
