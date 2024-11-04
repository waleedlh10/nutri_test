# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AmountIncomeByCategoryView,
    AmountSpentByCategoryView,
    MoneySpentByDateView,
    OperationViewSet,
    OperationcurrentbalanceView,
    AmountLast7DaysView,
)


router = DefaultRouter()
router.register(r"operations", OperationViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "currentbalance/",
        OperationcurrentbalanceView.as_view(),
        name="operation-currentbalance",
    ),
    path(
        "total_operations/",
        MoneySpentByDateView.as_view(),
        name="money_spent_by_date",
    ),
    path(
        "amount_spent_by_category/",
        AmountSpentByCategoryView.as_view(),
        name="amount_spent_by_category",
    ),
    path(
        "amount_income_by_category/",
        AmountIncomeByCategoryView.as_view(),
        name="amount_income_by_category",
    ),
    path(
        "weekly_income_and_spending/",
        AmountLast7DaysView.as_view(),
        name="weekly_income_and_spending",
    ),
]
