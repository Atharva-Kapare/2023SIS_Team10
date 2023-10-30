from flask import Flask
from flask_cors import CORS, cross_origin
from flask import request
from network import *

app = Flask(__name__)
CORS(app)

# if __name__ == '__main__':
#     app.run(host='127.0.0.1')

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/new_user", methods=["POST"])
def createNewModel():
    data = request.get_json()
    # print(data)
    # print(data["likedSongs"])

    return createNewNetwork(data["likedSongs"])

@app.route("/tagSongs", methods=["POST"])
def tag_songs():
    data = request.get_json()
    # print(data)
    # print(data["likedSongs"])

    return tagSongs(data["model"], data["songs"], data["tag"])

@app.route("/mood2mood", methods=["POST"])
def mood_2_mood():
    data = request.get_json()
    # print(data)
    # print(data["likedSongs"])

    return mood2mood(data["model"], data["fromMood"], data["toMood"], data["duration"])