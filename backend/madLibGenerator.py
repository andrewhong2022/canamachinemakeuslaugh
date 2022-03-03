from flask_restful import Api, Resource, reqparse
from backend.textGenerator import TextGenerator
from backend.templateCreator import TemplateCreator

class MadLibGenerator(Resource):
    def __init__(self, prompt = "Once upon a time"):
        self.prompt = prompt
        self.gen = TextGenerator(prompt)

    def get(self):
        sample = self.gen.get()
        tempCreator = TemplateCreator(sample, removalFrequency=6)
        tempCreator.parse()
        tempCreator.createTemplate()
        return tempCreator.returnTemplate()
