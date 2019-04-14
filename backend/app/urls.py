from django.urls import path, re_path
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path('', views.index_view, name='index_view'),
    path('create_food_bank/<int:lat>/<int:long>/', views.create_food_bank, name='create_food_bank'),
    path('user_get_nearest_centers/', views.user_get_nearest_centers, name='user_get_nearest_centers')
]