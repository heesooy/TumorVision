import base64
import sys
import os
import cv2
path = os.getcwd()
sys.path.insert(0, path + '/Classifier')
import classifier
import classifier_const
from flask import Flask, jsonify
from flask import make_response, request
app = Flask(__name__)
import unicodedata
import numpy as np

current_model = classifier.load_model("model_final")

@app.route("/api/classify/", methods = ['GET'])
def classify():

    image_raw = request.args.get('raw')
    input_string = image_raw.rsplit('/', 3)
    input_string[0] = input_string[0].replace(' ', '+')
    for i in range(len(input_string)):
        input_string[i] = unicodedata.normalize('NFKD', input_string[i]).encode('ASCII', 'ignore')

    image_raw = input_string[0].decode('base64')

    #Format image rgb
    #image_rgb = np.asarray(bytearray(image_raw), dtype=np.uint8)#cv2.imread("image.jpg")
    image_raw_array = np.fromstring(image_raw, dtype='uint8')
    image_rgb = cv2.imdecode(image_raw_array, cv2.IMREAD_UNCHANGED)

    #Format other data points
    sex = classifier_const.K_SEX_DICT[input_string[1]]
    age = float(input_string[2])//5*5
    location = classifier_const.K_LOC_DICT[input_string[3]]

    print "Sex:",sex
    print "Age:",age
    print "Location:",location
    #print "Image rgb:",image_rgb

    image_array = classifier.create_img_array(image_rgb, sex, age, location)

    result=classifier.classify_image(current_model, image_array)

    return classifier_const.K_DIS_LOOKUP[result] 

if __name__ == '__main__':
    app.run(debug = True)
