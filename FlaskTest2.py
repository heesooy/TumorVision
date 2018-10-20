import base64
from flask import Flask
app = Flask(__name__)

#with open("Large image.png", "rb") as imageFile:
#	str = base64.b64encode(imageFile.read())
fh = open("pokemon2.jpg", "wb")
fh.write(str.decode('base64'))
fh.close()

@app.route("/")
def flasktest2():

    return "yolo"

if __name__ == '__main__':
	app.run(debug=True)
