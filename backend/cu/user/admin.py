from .models import User
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

# Register your models here.


class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'gender', 'age', 'taste', 'question']
    search_fields = ['usrname']


admin.site.register(User, UserAdmin)

"""
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (" User Profile",
            {"fields": ("gender", "age", "taste", "question"), },),)
"""

# class userAdmin(admin.ModelAdmin):
# list_display('username', 'gender', 'age', 'taste', 'question')
# list_filter('username', 'gender', 'age', 'taste')

# python manage.py makemigrations
# python manage.py migrate
# python manage.py createsuperuser
# python3 manage.py runserver 0.0.0.0:8000

# superuser
# email: super@gmail.com
# username: super
# password: supersuper
