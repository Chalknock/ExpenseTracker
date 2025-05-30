from rest_framework import generics, permissions
from .models import Expense, Category
from .serializers import ExpenseSerializer, CategorySerializer
from django.contrib.auth.models import User  # if testing with a hardcoded user

# class ExpenseCreateView(generics.CreateAPIView):
#     queryset = Expense.objects.all()
#     serializer_class = ExpenseSerializer

#     def perform_create(self, serializer):
#         # TEMP: Use a test user since auth is not implemented
#         test_user = User.objects.first()
#         print(test_user)
#         serializer.save(user=test_user)

# class ExpenseListView(generics.ListAPIView):
#     queryset = Expense.objects.all()
#     serializer_class = ExpenseSerializer


# Expense Views
class ExpenseListCreateView(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # return Expense.objects.filter(user=User.objects.first()).order_by('-date')
        return Expense.objects.all()


    def perform_create(self, serializer):
        # TEMP: Use a test user since auth is not implemented
        test_user = User.objects.first()
        print(test_user)
        serializer.save(user=test_user)


# class ExpenseRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = ExpenseSerializer
#     # permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return Expense.objects.filter(user=User.objects.first())
    
class ExpenseRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    # permission_classes = [permissions.IsAuthenticated]  # Uncomment if using authentication

    def get_queryset(self):
        # For example, filter by logged-in user if auth is implemented
        # return Expense.objects.filter(user=self.request.user)
        return Expense.objects.all()

# Category Views
class CategoryListCreateView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=User.objects.first())

    def perform_create(self, serializer):
        serializer.save(user=User.objects.first())


class CategoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=User.objects.first())
