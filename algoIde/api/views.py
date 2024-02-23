from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
import requests , json , base64
from .models import History
from django.http import JsonResponse
from .serializers import HistorySerializer
import execjs


@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})


@csrf_exempt
def execute_code(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        print('data is data', data)
        javascript_code = data.get('code', '')
    
        # Define predefined test cases
        test_cases = [
            {'input_data':  '1', 'expected_output': '1'},
            {'input_data': '2', 'expected_output': '2'},
            {'input_data': '3', 'expected_output': '5'},
            {'input_data': '4', 'expected_output': '5'},
            {'input_data': '5', 'expected_output': '2'},
        ]
        
        passed = 0
        failed = 0
        results = []

        try:
            # Execute JavaScript code
            ctx = execjs.compile(javascript_code)
            for test_case in test_cases:
                input_data = test_case['input_data']
                expected_output = test_case['expected_output']
                output = ctx.call('simple_return', input_data)

                # Compare output with expected output
                if output == expected_output:
                    passed += 1
                    results.append({'input_data': input_data, 'result': 'Passed'})
                else:
                    failed += 1
                    results.append({'input_data': input_data, 'result': 'Failed'})

            # Save results to History model
            history = History.objects.create(
                code=javascript_code,
                test_cases_passed=passed,
                test_cases_failed=failed
            )

            return JsonResponse({'result': 'success', 'message': 'Test cases executed and results saved to history', 'results': results})
        except Exception as e:
            return JsonResponse({'result': 'error', 'message': str(e)})
    else:
        return JsonResponse({'error': 'Invalid request method'})

def get_history(request):
    if request.method == 'GET':
        history = History.objects.all()
        serializer = HistorySerializer(history, many=True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({'error': 'Invalid request method'})


    url = "https://judge0-ce.p.rapidapi.com/submissions"
    querystring = {"base64_encoded":"true","fields":"*"}
    
    encoded_code = base64.b64encode(code.encode()).decode()
    encoded_stdin = base64.b64encode(predefined_input.encode()).decode()
    
    payload = {
        "language_id": 63,  # Language ID for JavaScript
        "source_code": encoded_code,
        "stdin":  encoded_stdin # Pass predefined input
    }
    headers = {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "8c4a82e9a1mshfb1b12cb6a79f1ep1766cajsn9b37a152484b",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
    }

    response = requests.post(url, json=payload, headers=headers ,params=querystring)

    # Extract the output from Judge0's response
    # output = response.json().get('stdout', '')

    print('output form the judge0' , type(response) ,  response.json())

    # Compare Judge0's output with predefined output
    if output.strip() == predefined_output.strip():
        return "Passed"
    else:
        return "Failed"
