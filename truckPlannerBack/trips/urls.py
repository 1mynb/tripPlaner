from django.urls import path
from .views import tripView

urlpatterns = [
    path('trips', tripView.as_view()),
    path('trips/<int:id>', tripView.as_view())
]
