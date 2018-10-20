import base64
import sys
import os
path = os.getcwd()
sys.path.insert(0, path + '/../classifier')
import classifier
import classifier_const
from flask import Flask, jsonify
from flask import make_response
app = Flask(__name__)

current_model = classifier.load_model("model_final")
#def load_testing_image(image):
#	loaded_image = Image.open(image)
#	return loaded_image

@app.route("/api/classify", methods = ['GET'])
def classify_default():
    return "classification: mel"

@app.route("/api/classify/<string:str>", methods = ['GET'])
def classify(str):

	input_string = str.rsplit('/', 4)
	fh = open("image.jpg", "wb")
	fh.write(input_string[0].decode('base64'))
	fh.close()

	image_arry = cv2.imread("image.jpg")

	image_array = classifier.create_img_array(image_arry, input_string[1], input_string[2], input_string[3])

	result=classifier.classify_image(current_model, image_array)

   	return result

@app.route("/api/classify/<string:encoded_img>/<int:age>/<string:sex>/<string:region>", methods = ['GET'])
def classify_image_complete(encoded_img, age, sex, region):

	age_fix = (age//5) * 5

	fh = open("image.jpg", "wb")
	fh.write(encoded_img.decode('base64'))
	fh.close()

	image_arry = cv2.imread("image.jpg")

	image_array = create_img_array(image_arry, classifier_const.K_SEX_DICT[sex], age_fix, classifier_const.K_LOC_DICT[region])

	result=classifier.classify_image(current_model, image_file)

   	return result

@app.route("/api/storeinfo/<string:features>", methods = ['PUT'])
def store_info(features):

	return "Features placed into function"

if __name__ == '__main__':
	app.run(debug = True)
