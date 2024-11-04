from rest_framework import serializers
from .models import Operation


class OperationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operation
        fields = "__all__"  # Or list fields explicitly if needed
