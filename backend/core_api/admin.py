from django.contrib import admin
from core_api import models


admin.site.register(models.Bike)

@admin.register(models.APIKey)
class APIKeyAdmin(admin.ModelAdmin):
    list_display = ('key', 'created_at')
    readonly_fields = ('key', 'created_at')


