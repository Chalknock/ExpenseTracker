from expensetracker.models import Category, Expense
from django.contrib.auth.models import User
from datetime import date, timedelta
import random

import os
import django


# Step 1: Setup Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
user = User.objects.get(id=2)  # Change to your actual user ID

# Step 3: Categories setup
categories_data = [
    {"name": "Food", "description": "Groceries and dining out"},
    {"name": "Rent", "description": "Monthly rent"},
    {"name": "Utilities", "description": "Electricity, water, etc."},
    {"name": "Transportation", "description": "Fuel and commuting"},
    {"name": "Entertainment", "description": "Leisure and fun"},
]

category_objs = []
for cat in categories_data:
    obj, _ = Category.objects.get_or_create(name=cat["name"], user=user, defaults={"description": cat["description"]})
    category_objs.append(obj)

# Step 4: Titles for categories
titles = {
    "Food": ["Groceries", "Dining", "Coffee", "Snacks", "Takeout"],
    "Rent": ["Monthly Rent"],
    "Utilities": ["Electricity Bill", "Water Bill", "Internet Bill"],
    "Transportation": ["Bus", "Fuel", "Taxi", "Uber"],
    "Entertainment": ["Movies", "Games", "Streaming", "Events"],
}

# Step 5: Generate daily data
start_date = date.today() - timedelta(days=5 * 365)
expenses = []

print("Generating data...")

for day in range(5 * 365):
    current_date = start_date + timedelta(days=day)
    for _ in range(random.randint(1, 3)):
        category = random.choice(category_objs)
        title = random.choice(titles[category.name])
        amount = round(random.uniform(5.0, 200.0), 2)

        expenses.append(Expense(user=user,category=category,title=title,amount=amount,date=current_date,notes=""))

# Step 6: Save to DB
Expense.objects.bulk_create(expenses)