from django.urls import path
from core_api import views

urlpatterns = [
    path('get-bike/', views.get_bikes, name='get-bikes'),
    path('get-bike/<int:id>', views.get_bikes, name='get-details'),
    path('post-bike/', views.post_bikes),
]
