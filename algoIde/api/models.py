from django.db import models

# Create your models here.
class History(models.Model):
    code = models.TextField()
    test_cases_passed = models.IntegerField()
    test_cases_failed = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)