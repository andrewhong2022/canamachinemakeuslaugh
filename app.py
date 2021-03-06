from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
# from flask_cors import CORS #comment this on deployment
from api.apiHandler import ApiHandler
from backend.madLibGenerator import MadLibGenerator
from api.shareReddit import ShareReddit
from api.shareTwitter import ShareTwitter

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
#CORS(app) #comment this on deployment
api = Api(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

api.add_resource(ApiHandler, '/flask/hello')
api.add_resource(MadLibGenerator, '/cammul/generate')
api.add_resource(ShareReddit, '/cammul/reddit')
api.add_resource(ShareTwitter, '/cammul/twitter')
