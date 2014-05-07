# coding: UTF-8
from django.db import models
# Create your models here.
# 用户类
class User(models.Model):
    icon = models.ForeignKey('wetalk.Image')# 图片名
    name = models.CharField(max_length=64)# 昵称
    intro = models.TextField()# 简介
    username = models.CharField(max_length=32,unique=True)# 账号
    password = models.CharField(max_length=32)# 密码
    interest = models.TextField()# 兴趣
    focus = models.ManyToManyField('wetalk.Topic')# 关注的话题

    def __unicode__(self):
        return u'name: %s, username: %s, password: %s, interest: %s' % \
                (self.name, self.username, self.password, self.interest)

    def toJsonFormat(self):
        ret = {}
        ret['id'] = self.id
        ret['icon'] = self.icon.toJsonFormat()
        ret['name'] = self.name
        ret['intro'] = self.intro
        ret['username'] = self.username
        ret['interest'] = self.interest
        return ret



# 私信
class Message(models.Model):
    to_user = models.ForeignKey('wetalk.User')# 接受方，外键约束
    from_user = models.ForeignKey('wetalk.User', related_name='from_user')# 发送方，外键约束
    is_read = models.BooleanField(default=False)# 是否已读
    content = models.TextField()# 内容

    def __unicode__(self):
        return u'content: %s' % self.content



# 图片
class Image(models.Model):
    url = models.CharField(max_length=128,unique=True)

    def __unicode__(self):
        return u'url: %s' % self.url

    def toJsonFormat(self):
        ret = {}
        ret['id'] = self.id
        ret['url'] = self.url
        return ret



# 话题类
class Topic(models.Model):
    creator = models.ForeignKey('wetalk.User')# 创建者，外键约束
    create_time = models.DateTimeField()# 创建时间
    category = models.CharField(max_length=32)# 类别
    title = models.CharField(max_length=128,unique=True)# 标题
    begin_time = models.DateTimeField()# 话题开始时间
    end_time = models.DateTimeField()# 话题结束时间
    spots = models.ManyToManyField('wetalk.Spot')# 该话题的所有槽点

    def __unicode__(self):
        return u'title: %s' % self.title

    def toJsonFormat(self, show_spot=False, show_comment=False):
        ret = {}
        ret['id'] = self.id
        ret['creator'] = self.creator.toJsonFormat()
        ret['create_time'] = str(self.create_time)
        ret['category'] = self.category
        ret['title'] = self.title
        ret['begin_time'] = str(self.begin_time)
        ret['end_time'] = str(self.end_time)
        ret['spots'] = []
        for sp in self.spots.all():
            if show_spot:
                ret['spots'].append(sp.toJsonFormat(show_comment))
            else:
                ret['spots'].append(sp.id)
        return ret



# 槽点类
class Spot(models.Model):
    creator = models.ForeignKey('wetalk.User')# 创建者，外键约束
    create_time = models.DateTimeField()# 创建时间
    title = models.CharField(max_length=128,unique=True)# 标题
    imgs = models.ManyToManyField('wetalk.Image')# 图片
    content = models.TextField()# 内容
    comments = models.ManyToManyField('wetalk.Comment')# 槽点的所有评论
    up = models.IntegerField()# 赞数量

    def __unicode__(self):
        return u'title: %s' % self.title

    def toJsonFormat(self, show_comment=False):
        ret = {}
        ret['id'] = self.id
        ret['creator'] = self.creator.toJsonFormat()
        ret['create_time'] = str(self.create_time)
        ret['title'] = self.title
        ret['imgs'] = []
        for img in self.imgs.all():
            ret['imgs'].append(img.toJsonFormat())
        ret['content'] = self.content
        ret['comments'] = []
        for cm in self.comments.all():
            if show_comment:
                ret['comments'].append(cm.toJsonFormat())
            else:
                ret['comments'].append(cm.id)
        ret['up'] = self.up
        return ret

# 评论类
class Comment(models.Model):
    creator = models.ForeignKey('wetalk.User')# 评论者，外键约束
    create_time = models.DateTimeField()# 发表时间
    content = models.TextField()# 内容

    def __unicode__(self):
        return u'content: %s' % self.content

    def toJsonFormat(self):
        ret = {}
        ret['id'] = self.id
        ret['creator'] = self.creator.toJsonFormat()
        ret['create_time'] = str(self.create_time)
        ret['content'] = self.content
        return ret




