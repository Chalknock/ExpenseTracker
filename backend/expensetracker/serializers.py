from rest_framework import serializers
from .models import Expense, Category, UserProfile

# class ExpenseSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Expense
#         fields = '__all__'
#         read_only_fields = ['user']



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'user']
        read_only_fields = ['user']


class ExpenseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Expense
        fields = [
            'id',
            'user',
            'category',
            'category_name',
            'title',
            'amount',
            'date',
            'notes',
            'created_at',
        ]
        read_only_fields = ['user', 'created_at']


class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # or use PrimaryKeyRelatedField if needed

    class Meta:
        model = UserProfile
        fields = [
            'id',
            'user',
            'preferred_currency',
            'timezone',
            'language',
            'theme',
            'notifications_enabled',
            'profile_picture',
            'birthdate',
            'phone_number',
            'last_login_ip',
            'signup_source',
            'created_at',
            'updated_at',
        ]
