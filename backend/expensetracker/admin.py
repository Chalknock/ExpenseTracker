from django.contrib import admin
from .models import Expense, Category, UserProfile
# Register your models here.

admin.site.register(Expense)
admin.site.register(Category)

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'preferred_currency',
        'timezone',
        'language',
        'theme',
        'notifications_enabled',
        'birthdate',
        'phone_number',
        'created_at',
    )
    list_filter = ('preferred_currency', 'language', 'theme', 'notifications_enabled')
    search_fields = ('user__username', 'phone_number', 'timezone')
    readonly_fields = ('created_at', 'updated_at')