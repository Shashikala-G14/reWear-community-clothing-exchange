"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rewear.views import *

from django.contrib import admin  # Django admin module
from django.urls import path       # URL routing
from rewear.views import *  # Import views from the authentication app
from django.conf import settings   # Application settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns  # Static files serving


urlpatterns = [

    path('home/', home, name="recipes"),      # Home page
    path("admin/", admin.site.urls),          # Admin interface
    path('', login_page, name='login_page'),    # Login page
    path('register/', register_page, name='register'),  # Registration page
    path('admin/', admin.site.urls),
]
