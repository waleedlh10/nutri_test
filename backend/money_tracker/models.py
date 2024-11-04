from datetime import datetime
from django.db import models


class Operation(models.Model):
    INCOME = "income"
    SPENT = "spent"

    OPERATION_TYPE_CHOICES = [
        (INCOME, "Income"),
        (SPENT, "Spent"),
    ]

    operation_id = models.AutoField(primary_key=True)
    category = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    operation_type = models.CharField(
        max_length=6,
        choices=OPERATION_TYPE_CHOICES,
    )
    inserted_at = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return f"{self.operation_type.capitalize()} - {self.amount} ({self.category})"
