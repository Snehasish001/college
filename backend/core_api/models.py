from django.db import models

class Bike(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    brand = models.CharField(max_length=255, null=False, blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    max_power = models.CharField(max_length=100, null=False, blank=False)
    max_torque = models.CharField(max_length=100, null=False, blank=False)
    cooling_system = models.CharField(max_length=100, null=False, blank=False)
    transmission = models.CharField(max_length=100, null=False, blank=False)
    displacement = models.IntegerField(null=False, blank=False)
    cylinders = models.IntegerField(null=False, blank=False)
    gear_shifting_pattern = models.CharField(max_length=100, null=False, blank=False)
    fuel_tank_capacity = models.FloatField(null=False, blank=False)
    mileage_owner_reported = models.FloatField(null=False, blank=False)
    top_speed = models.IntegerField(null=False, blank=False)
    braking_system = models.CharField(max_length=100, null=False, blank=False)
    front_brake_type = models.CharField(max_length=100, null=False, blank=False)
    tyre_type = models.CharField(max_length=100, null=False, blank=False)
    rear_brake_type = models.CharField(max_length=100, null=False, blank=False)
    wheel_type = models.CharField(max_length=100, null=False, blank=False)
    weight = models.IntegerField(null=False, blank=False)
    display_system = models.CharField(max_length=255, null=False, blank=False)
    about = models.TextField(null=False, blank=False)
    year = models.IntegerField(null=False, blank=False)
    category = models.CharField(max_length=100, null=False, blank=False)
    suspension = models.CharField(max_length=255, null=False, blank=False)

    image1 = models.ImageField(upload_to='bike_images/', null=True, blank=True)
    image2 = models.ImageField(upload_to='bike_images/', null=True, blank=True)
    image3 = models.ImageField(upload_to='bike_images/', null=True, blank=True)
    image4 = models.ImageField(upload_to='bike_images/', null=True, blank=True)
    
    def __str__(self):
        return self.name
    

import secrets
class APIKey(models.Model):
    key = models.CharField(max_length=64, unique=True, default=secrets.token_hex(32))
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.key
