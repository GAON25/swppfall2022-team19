from django.urls import path

from . import views

urlpatterns = [
    # start login
    # path('login/', views.user_info, name='login'),
    # path('signup/', views.user_list, name='signup')
    path('signin/', views.signin, name='login'),
    path('signout/', views.signout, name='signout'),
    path('signup/', views.signup, name='signup'),
    path('token/', views.token, name='token'),
    path('newSurvey/', views.changeSurvey, name="changeSurvey"),
    path('requestUser/', views.requestUser, name="requestUser"),
    path('userlist/', views.userlist, name="userlist"),
]
