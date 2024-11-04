# Generated by Django 5.1.2 on 2024-11-04 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Operation",
            fields=[
                ("operation_id", models.AutoField(primary_key=True, serialize=False)),
                ("category", models.CharField(max_length=255)),
                ("amount", models.DecimalField(decimal_places=2, max_digits=10)),
                ("description", models.TextField(blank=True, null=True)),
                (
                    "operation_type",
                    models.CharField(
                        choices=[("income", "Income"), ("spent", "Spent")], max_length=6
                    ),
                ),
                ("inserted_at", models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
