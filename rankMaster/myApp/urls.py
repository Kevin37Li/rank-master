from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('search', views.search, name='search'),
    path('categories/<category_name>', views.categories, name='categories'),
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('user/<user_id>/<list_id>', views.userRanking, name='userRanking'),
    path('user/<user_id>', views.userProfile, name='userProfile'),
    path('lists/rank/<list_id>', views.listRank, name='listRank'),
    path('lists/view/<list_id>', views.listView, name='listView'),
    path('lists/create', views.listCreate, name='listCreate')
]