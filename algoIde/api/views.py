from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import requests , json
from django.http import JsonResponse



@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})


@csrf_exempt
def execute_code(request):
    if request.method == 'POST':
        try:
            # Assuming the request body contains JSON data
            data = json.loads(request.body.decode('utf-8'))
            print('data is data', data)
            code = data.get('code', '')
            print('the code is reading here')

            response = call_judge(code)
            return response
            print('response' , response)
            # Now you have the 'code' from the request body
            # Proceed with your logic to execute the code and save the results
            # ...

            return JsonResponse({'success': True})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format in request body'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
   
    if request.method == 'POST':
        code = request.POST.get('code', '')

        print('code reached the block', code)

        # Assuming judge0 API endpoint is available
        # Make a request to judge0 API to execute the code
        response = requests.post(JUDGE0_API_URL, data={'code': code})
        output = response.json().get('output', '')

        # Count test cases passed and failed (This is just a placeholder, actual implementation depends on the judge0 response)
        test_cases_passed = 5  # Placeholder value
        test_cases_failed = 1  # Placeholder value

        # Save to history table
        history = History.objects.create(
            code=code,
            output=output,
            test_cases_passed=test_cases_passed,
            test_cases_failed=test_cases_failed
        )
        return JsonResponse({'success': True})
    else:
        return JsonResponse({'error': 'Invalid request method'})

def get_history(request):
    # Retrieve all history records
    histories = History.objects.all().values()
    return JsonResponse({'history': list(histories)})

def call_judge(code):
    url = "https://judge0-ce.p.rapidapi.com/submissions"
    querystring = {"base64_encoded":"true","fields":"*"}
    payload = {
        "language_id": 52,
        "source_code": code,
        "stdin": "SnVkZ2Uw"
    }
    headers = {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "8c4a82e9a1mshfb1b12cb6a79f1ep1766cajsn9b37a152484b",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
    }

    response = requests.post(url, json=payload, headers=headers, params=querystring)

    print(response.json())

    return response