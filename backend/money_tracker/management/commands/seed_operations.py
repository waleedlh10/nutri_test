from django.core.management.base import BaseCommand
from money_tracker.models import Operation
from decimal import Decimal
import random
from datetime import datetime, timedelta


class Command(BaseCommand):
    help = "Seed the database with initial operation data"

    def handle(self, *args, **kwargs):
        income_categories = [
            "Salary",
            "Freelance",
            "Deposit",
            "Other",
        ]
        spent_categories = [
            "Food",
            "Entertainment",
            "Transport",
            "Health",
            "Utilities",
            "Other",
        ]
        operation_types = ["income", "spent"]
        current_year = datetime.now().year

        for i in range(100):
            amount = Decimal(round(random.uniform(10.00, 1000.00), 2))
            description = f"Example {i + 1}"
            operation_type = random.choice(operation_types)
            if operation_type == "income":
                category = random.choice(income_categories)
            else:
                category = random.choice(spent_categories)
            start_date = datetime(current_year, 1, 1)
            end_date = datetime(current_year, 12, 31)
            random_days = random.randint(0, (end_date - start_date).days)
            inserted_at = start_date + timedelta(days=random_days)

            Operation.objects.create(
                category=category,
                amount=amount,
                description=description,
                operation_type=operation_type,
                inserted_at=inserted_at,
            )

        self.stdout.write(
            self.style.SUCCESS(
                "Successfully seeded the database with 100 operation entries."
            )
        )
