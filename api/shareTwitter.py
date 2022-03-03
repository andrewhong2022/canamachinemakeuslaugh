from flask_restful import Api, Resource, reqparse
import tweepy
import json

auth = tweepy.OAuthHandler("HpQfmbqzl8YPk2zP9py608vNO", "KCXELUrzbjzhOrXefC05Gmj2ODyY1lzHTKLmnLCwbXXFpcmmxB")
auth.set_access_token("1499237513684299777-TQIareoPBvjIdhzBDD0IcGzXrIOlcT", "DgHDxKjzo92e51YG80a316JbaNMmMVPD4efc3GHvcDuRw")

# Create API object
api = tweepy.API(auth)

# Create a tweet

class ShareTwitter(Resource):
  def get(self):
      api.update_status("Hello Cammul")
      return {
      'resultStatus': 'SUCCESS',
      'message': "test"
      }