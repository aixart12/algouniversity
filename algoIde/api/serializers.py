from rest_framework import serializers
from .models import History

class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = ['id', 'code', 'test_cases_passed', 'test_cases_failed', 'created_at']

