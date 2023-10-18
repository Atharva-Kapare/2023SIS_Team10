from flask import Flask
from network import *

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/new_user")
def createNewModel():
    return createNewNetwork()