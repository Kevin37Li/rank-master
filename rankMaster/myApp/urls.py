from django.urls import path

from . import views

urlpatterns = [
    path('user/profile/<username>', views.userProfile, name='userProfile'),
    path('user/ranking/<username>/', views.userRanking, name='userRanking'),
    path('search/', views.search, name='search'),
    path('categories/', views.categoriesList, name='categoriesList'),
    path('categories/<category_name>', views.categoriesSpecific, name='categoriesSpecific'),
    # path('register', views.register, name='register'),
    # path('login', views.login, name='login'),
    path('lists/rank/<list_id>', views.listRank, name='listRank'),
    path('lists/view/<list_id>', views.listView, name='listView'),
    path('lists/create/', views.listCreate, name='listCreate'),
    path('get/lists/', views.getLists, name='getLists'),
    path('get/user/<username>', views.getUser, name='getUser'),
    path('get/user/<username>/<list_id>', views.getRanking, name='getRanking'),
    path('', views.index, name='index'),
]