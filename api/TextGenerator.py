import os
import openai

openai.api_key = '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'

class TextGenerator:
    def __init__(self, prompt = "Once upon a time"):
        self.prompt = prompt

    def get(self):
        prmpt = "Write a funny story without using dialogue.\n" + self.prompt
        response = openai.Completion.create(
            engine="text-babbage-001",
            prompt=prmpt,
            temperature=0.7,
            max_tokens=1000,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
            )
        return self.prompt + response["choices"][0]["text"]