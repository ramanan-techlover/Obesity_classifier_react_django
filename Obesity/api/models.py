from django.db import models

# Create your models here.
class Obesity(models.Model):
    MALE = 1
    FEMALE = 0
    GENDER_CHOICE = (
        (MALE, 'Male'),
        (FEMALE, 'Female')
    )

    Age = models.FloatField()
    Gender = models.IntegerField(choices=GENDER_CHOICE)
    Height = models.FloatField()
    Weight = models.FloatField()
    BMI = models.FloatField()