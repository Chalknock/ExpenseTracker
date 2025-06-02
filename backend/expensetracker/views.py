from rest_framework import generics, permissions
from .models import Expense, Category
from .serializers import ExpenseSerializer, CategorySerializer
from django.contrib.auth.models import User


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models.functions import TruncMonth
from django.db.models import Sum



class ExpenseListCreateView(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)


    def perform_create(self, serializer):
        # TEMP: Use a test user since auth is not implemented
        test_user = User.objects.first()
        serializer.save(user=self.request.user)

class ExpenseMonthlyListCreateView(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = None
    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)


    def perform_create(self, serializer):
        # TEMP: Use a test user since auth is not implemented
        test_user = User.objects.first()
        serializer.save(user=self.request.user)

    
class ExpenseRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]  # Uncomment if using authentication

    def get_queryset(self):
        # For example, filter by logged-in user if auth is implemented
        # return Expense.objects.filter(user=self.request.user)
        return Expense.objects.filter(user=self.request.user)

# Category Views
class CategoryListCreateView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CategoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)


class ExpenseListView(generics.ListAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user).order_by("-date")
    