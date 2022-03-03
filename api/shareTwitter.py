from flask_restful import Api, Resource, reqparse
import tweepy
import json



class ShareTwitter(Resource):
  def get(self):
      return None