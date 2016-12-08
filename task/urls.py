from django.conf.urls import url
from .api import TaskDetail, TaskList

urlpatterns = [
    url(r'^$', TaskList.as_view()),
    url(r'^detail/(?P<pk>[0-9]+)/$', TaskDetail.as_view()),
]