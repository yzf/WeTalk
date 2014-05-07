from django.conf.urls import patterns, include, url
from mysite.wetalk.views import *
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'mysite.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    #url(r'^admin/', include(admin.site.urls)),
    (r'^test/$', test),
    (r'^register/$', register),
    (r'^login/$', login),
    (r'^user/$', user),
    (r'^topic_list/$', topic_list),
    (r'^topic_add/$', topic_add),
    (r'^spot_list/$', spot_list),
    (r'^comment_list/$', comment_list),
)
