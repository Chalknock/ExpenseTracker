from django.urls import path, include
from .views import (
    ExpenseListCreateView, ExpenseMonthlyListCreateView, ExpenseRetrieveUpdateDestroyView,
    CategoryListCreateView, CategoryRetrieveUpdateDestroyView
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView
)

urlpatterns = [
    path('expenses/list/', ExpenseListCreateView.as_view(), name='expense-list-create'),
    path('expenses/<int:pk>/', ExpenseRetrieveUpdateDestroyView.as_view(), name='expense-crud'),
    path("expenses/report/monthly/", ExpenseMonthlyListCreateView.as_view()),

    path('categories/list/', CategoryListCreateView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', CategoryRetrieveUpdateDestroyView.as_view(), name='category-crud'),


    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.authtoken")),
    path('auth/logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
