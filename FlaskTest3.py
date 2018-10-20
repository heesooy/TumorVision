import base64
from flask import Flask, jsonify
from flask import make_response
app = Flask(__name__)

#with open("Large image.png", "rb") as imageFile:
#	str = base64.b64encode(imageFile.read())
#str = getrequest
fh = open("image.jpg", "wb")
fh.write(str.decode('base64'))
fh.close()

@app.route("/api/classify", methods = ['GET'])
def classify_image():

    return "classification: mel"

@app.route("/api/classify/<string:str>", methods = ['GET'])
def get_data(str):

   return str



if __name__ == '__main__':
	app.run(debug=True)
