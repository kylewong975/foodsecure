from django.urls import path, re_path
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    path('', views.index_view, name='index_view'),
    path('create_food_bank/<int:lat>/<int:long>/', views.create_food_bank, name='create_food_bank'),
    path('create_order/', views.create_order, name='create_order'),
    path('user_get_nearest_centers/', views.user_get_nearest_centers, name='user_get_nearest_centers'),
    path('get_ids/<str:collection>/', views.get_ids, name='get_ids'),
    path('get_bank_food/<str:food_bank_id>/', views.get_bank_food, name='get_bank_food'),
    path('get_bank_food/<str:food_bank_id>/<str:food_id>/', views.get_bank_food, name='get_bank_food'),
    path('get_orders/<str:user_id>/', views.get_orders, name='get_orders'),
]
