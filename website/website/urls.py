from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^$', 'website.views.index', name='index'),
    url(r'^bubblesort/$', 'website.views.bubblesort', name='bubblesort'),
    url(r'^admin/', include(admin.site.urls)),
]
