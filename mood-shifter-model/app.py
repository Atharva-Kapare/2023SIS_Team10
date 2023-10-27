from flask import Flask
from flask import request
from network import *

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/new_user", methods=["POST"])
def createNewModel():
    data = request.get_json()
    # print(data)
    # print(data["likedSongs"])

    return createNewNetwork(data["likedSongs"])