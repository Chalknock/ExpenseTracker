from django.urls import path, include
from .views import (
    ExpenseListCreateView, ExpenseRetrieveUpdateDestroyView,
    CategoryListCreateView, CategoryRetrieveUpdateDestroyView
)

urlpatterns = [
    path('expenses/list/', ExpenseListCreateView.as_view(), name='expense-list-create'),
    path('expenses/<int:pk>/', ExpenseRetrieveUpdateDestroyView.as_view(), name='expense-rud'),

    path('categories/list/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryRetrieveUpdateDestroyView.as_view(), name='category-rud'),


    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
]
