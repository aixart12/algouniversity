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
        javascript_code = data.get('code', '')
    
        # Define predefined test cases
        test_cases = [
            {'input_data': '1', 'expected_output': '1'},
            {'input_data': '2', 'expected_output': '2'},
            {'input_data': '3', 'expected_output': '3'},
            {'input_data': '4', 'expected_output': '4'},
            {'input_data': '5', 'expected_output': '5'},
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

def get_history_by_id(request, id):
    if request.method == 'GET':
        try:
            history = History.objects.get(id=id)
            serializer = HistorySerializer(history)
            return JsonResponse(serializer.data)
        except History.DoesNotExist:
            return JsonResponse({'error': 'History record not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request method'})
