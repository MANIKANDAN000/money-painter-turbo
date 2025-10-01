from django.http import JsonResponse

def transaction_list(request):
    # Example response
    return JsonResponse({"transactions": []})
