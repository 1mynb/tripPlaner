from django.db import models

# Create your models here.
class Trips(models.Model):
    # database fields 
    current_location = models.CharField(max_length=255)
    pickup_location = models.CharField(max_length=255)
    dropoff_location = models.CharField(max_length=255)
    current_cycle_used = models.FloatField()

    current_location_latitude = models.FloatField(blank=True, null=True)
    current_location_longitude = models.FloatField(blank=True, null=True)
    pickup_location_latitude = models.FloatField(blank=True, null=True)
    pickup_location_longitude = models.FloatField(blank=True, null=True)
    dropoff_location_latitude = models.FloatField(blank=True, null=True)
    dropoff_location_longitude = models.FloatField(blank=True, null=True)

    total_distance = models.FloatField(null=True, blank=True)
    total_duration = models.FloatField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "trips"  

    def __str__(self):
        return f"Trip from {self.pickup_location} to {self.dropOff_location}"

