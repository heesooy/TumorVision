#import base64
import sys
import os

#Add classifier directory so we can import it
sys.path.insert(0, os.getcwd() + '/Classifier')

import cv2
import classifier
import classifier_const
from flask import Flask, request
import unicodedata
import numpy as np

#The main server
app = Flask(__name__)

#A model trained off our data
current_model = classifier.load_model("model_final")

#GET request handler for an image | The request encodes the image
@app.route("/api/classify/", methods = ['GET'])
def classify():

    #Parse the raw string into raw data
    image_raw = request.args.get('raw')
    input_string = image_raw.rsplit('/', 3)
    input_string[0] = input_string[0].replace(' ', '+') #'+' gets encoded as ' '

    for i in range(len(input_string)):
        input_string[i] = unicodedata.normalize('NFKD', input_string[i]).encode('ASCII', 'ignore')

    #Format image rgb
    image_raw = input_string[0].decode('base64')
    image_raw_array = np.fromstring(image_raw, dtype='uint8')
    image_rgb = cv2.imdecode(image_raw_array, cv2.IMREAD_UNCHANGED)

    #Format other data points
    sex = classifier_const.K_SEX_DICT[input_string[1]]
    age = float(input_string[2])//5*5
    location = classifier_const.K_LOC_DICT[input_string[3]]

    #Create the full classification matrix
    image_array = classifier.create_img_array(image_rgb, sex, age, location)
    
    result = classifier.classify_image(current_model, image_array)

    return classifier_const.K_DIS_LOOKUP[result] 

if __name__ == '__main__':
    app.run(debug = False)