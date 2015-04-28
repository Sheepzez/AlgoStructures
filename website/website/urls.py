from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^$', 'website.views.index', name='index'),
    url(r'^admin/', include(admin.site.urls)),
]
