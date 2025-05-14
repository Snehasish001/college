
from django.http import JsonResponse
from core_api.serializers import BikeSerializer
from .models import Bike, APIKey
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from ratelimit.decorators import ratelimit

def api_key_required(view_func):
    def wrapper(request, *args, **kwargs):
        auth_header = request.META.get("HTTP_AUTHORIZATION", "")
        if not auth_header.startswith("ApiKey "):
            return JsonResponse({"error": "Missing or Invalid Authorization Header"}, status=403)

        api_key = auth_header.split(" ")[1]
        if not APIKey.objects.filter(key=api_key).exists():
            return JsonResponse({"error": "Invalid API Key"}, status=403)

        return view_func(request, *args, **kwargs)
    return wrapper

@ratelimit(key='ip', rate='10/s', block=True)
@api_view(['GET'])
def get_bikes(request, id = None):
    if request.method != 'GET':
        return JsonResponse({"message": "Method not allowed"}, status=405)
    if id:
            try:
                bike = Bike.objects.get(id=id)
                serializer = BikeSerializer(bike)
                return JsonResponse(serializer.data, safe=False)
            except Bike.DoesNotExist:
                return JsonResponse({"message": "Bike not found"}, status=404)
    queryset = Bike.objects.all()
    serializer = BikeSerializer(queryset, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
@api_key_required
@csrf_exempt
def post_bikes(request):
    serializer = BikeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    print("Not Done")
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

