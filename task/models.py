from __future__ import unicode_literals
from django.core.urlresolvers import reverse
from django.db import models
from task_management import settings


class Task(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="task_user")
    name = models.CharField(max_length="30")
    created_on = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(auto_now=True)
    address = models.CharField(max_length="150")
    latitude = models.CharField(max_length="70")
    longitude = models.CharField(max_length="70")
    description = models.TextField(blank=True)

    def get_absolute_url(self):
        return reverse('update_task', kwargs={'pk': self.pk})

    def __str__(self):
        return self.name
