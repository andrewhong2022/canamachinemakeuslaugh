from flask_restful import Api, Resource, reqparse
from backend.textGenerator import TextGenerator
from backend.templateCreator import TemplateCreator
import json

class MadLibGenerator(Resource):
    def __init__(self, prompt = "Once upon a time"):
        self.prompt = prompt
        self.gen = TextGenerator(prompt)

    def get(self):
        sample = self.gen.generate()
        tempCreator = TemplateCreator(sample, removalFrequency=6)
        tempCreator.parse()
        tempCreator.createTemplate()
        prompt = " ".join(tempCreator.returnPrompt()) # TODO: FIX THIS SHIT so it's a clean sentence.
        return json.dumps({
            "prompt" : prompt,
            "body" : tempCreator.returnTemplate()
        })
