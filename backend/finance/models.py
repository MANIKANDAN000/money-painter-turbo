from django.db import models

class Transaction(models.Model):
    TRANSACTION_CHOICES = (
        ('income', 'Income'),
        ('expense', 'Expense'),
    )
    description = models.CharField(max_length=255)
    amount = models.FloatField()
    transaction_type = models.CharField(max_length=7, choices=TRANSACTION_CHOICES)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type}: {self.amount} - {self.description}"
