from django.urls import path
from . import views

urlpatterns = [
    path('api/recommend-recipes/', views.recommend_recipes, name='recommend_recipes'),
]