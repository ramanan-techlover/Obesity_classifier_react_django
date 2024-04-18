from django.shortcuts import render
from adrf.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import numpy as np
import joblib
import os
from .serializers import obs

# get the path of the pickled file
model_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Model', 'Obesity_Classification.pkl')

# load the pickled model
model = joblib.load(model_path)


@api_view(['POST'])
def predict(request):
    if request.method == 'POST':
        # deserialize the input data from the request
        serializer = obs(data=request.data)
        if serializer.is_valid():
            # convert the input data to input format for model
            input_data = tuple(serializer.validated_data.values())
            input_data_as_numpy_array = np.asarray(input_data)
            input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)
            print(input_data_reshaped)

        # make a prediction using the model
            y = model.predict(input_data_reshaped)
            if y == 0:
                y = "Normal Weight"
            elif y == 1:
                y = "Obese"
            elif y == 2:
                y = "Overweight"
            else:
                y = "Underweight"
           
            # return the predicted result as a JSON response
            return Response({'predict': y})
        else:
            # Return a bad request response if input data is invalid
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        