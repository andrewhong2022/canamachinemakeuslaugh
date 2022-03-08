from hashlib import new
from flask_restful import Api, Resource, reqparse
from flask import request
from backend.templateCreator import TemplateCreator
import json
import sys
import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

class MadLibGenerator(Resource):
    def __init__(self):
        self.prompt = ""

    def generate(self, p):
        p = "Write a funny story without using dialogue.\n" + p

        response = openai.Completion.create(
            engine="text-babbage-001",
            prompt=p,
            temperature=0.7,
            max_tokens=40,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
            )
        
        return response["choices"][0]["text"]

    def process(self, text):
        creator = TemplateCreator(text)
        creator.parse()
        creator.createTemplate()
        return creator.returnTemplate()

    def post(self):
        print("POST", file=sys.stderr)
        
        oldSentence_prime = request.form.get('data')
        if len(oldSentence_prime) == 0:
            return json.dumps({
                "prompt" : self.prompt,
                "newSentence" : [],
                "code" : 400, # bad request
                "errorMessage" : "Error 400: Prompt missing."
            })
        
        self.prompt += oldSentence_prime
        print(self.prompt, file=sys.stderr)
        newSentence = self.generate(self.prompt)

        if len(newSentence) == 0:
            return json.dumps({
                "prompt" : self.prompt,
                "newSentence" : [],
                "code" : 204 # successful, no content (likely stop sequence reached)
            })
        
        return json.dumps({
            "prompt" : self.prompt,
            "newSentence" : self.process(newSentence),
            "code" : 200 # successful, content was generated
        })
