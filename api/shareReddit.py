from flask_restful import Api, Resource, reqparse
import praw
import json

reddit = praw.Reddit(
    client_id="aWM8e-2BDnN5DGFO-GSg3w",
    client_secret="1CWbYkZZT9HjfH93Ebr0qmBeDGV_gA",
    user_agent="cammul bot by u/CAMMUL338",
    username="CAMMUL338",
    password="makeuslaugh100",
)

subreddit = reddit.subreddit('cammul')
a = {'desc': subreddit.description, 'title': subreddit.title, 'display': subreddit.display_name}
selftext = "This is our comedy sketch. Today was such a bad day, I spilled my coffe. Adding extra text to see how long it goes before a line break. I hope we get a 100 in this class. Comedy is hard."

class ShareReddit(Resource):
  def post(self):
    parser = reqparse.RequestParser()
    parser.add_argument('story', type=str)
    args = parser.parse_args()
    request_json = args['story']
    reddit.subreddit("cammul").submit("New Cammul Story", selftext=request_json)
    return json.dumps({'post': request_json})