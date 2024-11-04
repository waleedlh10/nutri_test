import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework import viewsets
from .models import Operation
from .serializers import OperationSerializer
from django.db.models import Sum
from rest_framework.decorators import action
from django.utils.dateparse import parse_datetime
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.utils import timezone


class OperationViewSet(viewsets.ModelViewSet):
    queryset = Operation.objects.all()
    serializer_class = OperationSerializer

    @action(detail=False, methods=["get"], url_path="all-operations")
    def get_all_operations(self, request):
        # Retrieve all operations
        operations = self.queryset
        serializer = self.get_serializer(operations, many=True)
        return Response(serializer.data)


# return current balance
class OperationcurrentbalanceView(APIView):
    def get(self, request):
        # Calculate total income
        total_income = (
            Operation.objects.filter(operation_type="income").aggregate(Sum("amount"))[
                "amount__sum"
            ]
            or 0
        )
        # Calculate total spent
        total_spent = (
            Operation.objects.filter(operation_type="spent").aggregate(Sum("amount"))[
                "amount__sum"
            ]
            or 0
        )

        return Response(
            {
                "total_income": total_income,
                "total_spent": total_spent,
                "current_balence": total_income - total_spent,
            }
        )


# return total spent (filter by date)
class MoneySpentByDateView(APIView):

    @swagger_auto_schema(
        operation_description="Get the count and total amount of money spent and earned within a date range.",
        manual_parameters=[
            openapi.Parameter(
                "start_date",
                openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description="Start date in ISO 8601 format (e.g., 2024-01-01T00:00:00Z)",
            ),
            openapi.Parameter(
                "end_date",
                openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description="End date in ISO 8601 format (e.g., 2024-12-31T23:59:59Z)",
            ),
        ],
        responses={200: openapi.Response("Successful Response"), 400: "Bad Request"},
    )
    def get(self, request):
        # Get the start and end dates from query parameters
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")

        if not start_date or not end_date:
            return Response(
                {
                    "error": "Please provide both start_date and end_date query parameters."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Parse the dates
        start_date = parse_datetime(start_date)
        end_date = parse_datetime(end_date)

        if not start_date or not end_date:
            return Response(
                {"error": "Invalid date format. Please use ISO 8601 format."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Filter operations by date range and type 'spent'
        spent_operations = Operation.objects.filter(
            operation_type="spent", inserted_at__range=(start_date, end_date)
        )

        # Filter operations by date range and type 'income'
        income_operations = Operation.objects.filter(
            operation_type="income", inserted_at__range=(start_date, end_date)
        )

        spent_count = spent_operations.count()
        total_spent_amount = (
            spent_operations.aggregate(Sum("amount"))["amount__sum"] or 0.0
        )

        income_count = income_operations.count()
        total_income_amount = (
            income_operations.aggregate(Sum("amount"))["amount__sum"] or 0.0
        )

        return Response(
            {
                "spent_count": spent_count,
                "total_spent_amount": total_spent_amount,
                "income_count": income_count,
                "total_income_amount": total_income_amount,
            }
        )


class AmountSpentByCategoryView(APIView):

    @swagger_auto_schema(
        operation_description="Get the total amount spent and the total amount spent grouped by category within a date range.",
        manual_parameters=[
            openapi.Parameter(
                "start_date",
                openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description="Start date in ISO 8601 format (e.g., 2024-01-01T00:00:00Z)",
            ),
            openapi.Parameter(
                "end_date",
                openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description="End date in ISO 8601 format (e.g., 2024-12-31T23:59:59Z)",
            ),
        ],
        responses={200: openapi.Response("Successful Response"), 400: "Bad Request"},
    )
    def get(self, request):
        # Get the start and end dates from query parameters
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")

        if not start_date or not end_date:
            return Response(
                {
                    "error": "Please provide both start_date and end_date query parameters."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Parse the dates
        start_date = parse_datetime(start_date)
        end_date = parse_datetime(end_date)

        if not start_date or not end_date:
            return Response(
                {"error": "Invalid date format. Please use ISO 8601 format."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Filter operations by date range and type 'spent'
        spent_operations = Operation.objects.filter(
            operation_type="spent", inserted_at__range=(start_date, end_date)
        )

        # Calculate the total amount spent in the date range
        total_spent_amount = (
            spent_operations.aggregate(Sum("amount"))["amount__sum"] or 0.0
        )

        # Group spent operations by category and calculate total for each category
        grouped_spent_operations = (
            spent_operations.values("category")
            .annotate(total_amount=Sum("amount"))
            .order_by("category")
        )

        # Prepare the response data
        response_data = {
            "total_spent_amount": total_spent_amount,
            "spent_by_category": [],
        }
        for entry in grouped_spent_operations:
            response_data["spent_by_category"].append(
                {
                    "category": entry["category"],
                    "total_spent_amount": entry["total_amount"],
                }
            )

        return Response(response_data, status=status.HTTP_200_OK)


class AmountIncomeByCategoryView(APIView):

    @swagger_auto_schema(
        operation_description="Get the total amount of income and the total income grouped by category within a date range.",
        manual_parameters=[
            openapi.Parameter(
                "start_date",
                openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description="Start date in ISO 8601 format (e.g., 2024-01-01T00:00:00Z)",
            ),
            openapi.Parameter(
                "end_date",
                openapi.IN_QUERY,
                type=openapi.TYPE_STRING,
                description="End date in ISO 8601 format (e.g., 2024-12-31T23:59:59Z)",
            ),
        ],
        responses={200: openapi.Response("Successful Response"), 400: "Bad Request"},
    )
    def get(self, request):
        # Get the start and end dates from query parameters
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")

        if not start_date or not end_date:
            return Response(
                {
                    "error": "Please provide both start_date and end_date query parameters."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Parse the dates
        start_date = parse_datetime(start_date)
        end_date = parse_datetime(end_date)

        if not start_date or not end_date:
            return Response(
                {"error": "Invalid date format. Please use ISO 8601 format."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Filter operations by date range and type 'income'
        income_operations = Operation.objects.filter(
            operation_type="income", inserted_at__range=(start_date, end_date)
        )

        # Calculate the total amount of income in the date range
        total_income_amount = (
            income_operations.aggregate(Sum("amount"))["amount__sum"] or 0.0
        )

        # Group income operations by category and calculate total for each category
        grouped_income_operations = (
            income_operations.values("category")
            .annotate(total_amount=Sum("amount"))
            .order_by("category")
        )

        # Prepare the response data
        response_data = {
            "total_income_amount": total_income_amount,
            "income_by_category": [],
        }
        for entry in grouped_income_operations:
            response_data["income_by_category"].append(
                {
                    "category": entry["category"],
                    "total_income_amount": entry["total_amount"],
                }
            )

        return Response(response_data, status=status.HTTP_200_OK)


class AmountLast7DaysView(APIView):

    def get(self, request):
        # Calculate the start and end dates for the last 7 days
        end_date = timezone.now()
        start_date = end_date - timezone.timedelta(days=7)

        # Get the total spent and income for each day in the last 7 days
        daily_spent = (
            Operation.objects.filter(
                operation_type="spent", inserted_at__range=(start_date, end_date)
            )
            .values("inserted_at__date")
            .annotate(total_spent=Sum("amount"))
            .order_by("inserted_at__date")
        )

        daily_income = (
            Operation.objects.filter(
                operation_type="income", inserted_at__range=(start_date, end_date)
            )
            .values("inserted_at__date")
            .annotate(total_income=Sum("amount"))
            .order_by("inserted_at__date")
        )

        # Initialize a dictionary to hold the results
        results = {"last_7_days": []}

        # Create a date range for the last 7 days
        for i in range(7):
            date = (end_date - timezone.timedelta(days=i)).date()
            spent_amount = next(
                (
                    item["total_spent"]
                    for item in daily_spent
                    if item["inserted_at__date"] == date
                ),
                0,
            )
            income_amount = next(
                (
                    item["total_income"]
                    for item in daily_income
                    if item["inserted_at__date"] == date
                ),
                0,
            )

            results["last_7_days"].append(
                {
                    "date": str(date),
                    "total_spent": spent_amount,
                    "total_income": income_amount,
                }
            )

        return Response(results, status=status.HTTP_200_OK)
