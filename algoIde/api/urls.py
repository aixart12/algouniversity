from django.urls import path
from . import views 

urlpatterns = [
    path('api/', views.hello_world),
    path('execute', views.execute_code, name='execute_code'),
    path('history', views.get_history, name='get_history'),
]