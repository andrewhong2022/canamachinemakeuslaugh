import nltk
from nltk import pos_tag, word_tokenize
from nltk.tokenize import RegexpTokenizer

# Examples for each form on frontend

# adjective -> 'big'
# comparativeAdjective -> 'bigger'
# superlativeAdjective -> 'biggest'
# singularNoun -> 'desk'
# pluralNoun -> ‘desks'
# adverb -> ‘silently’
# comparativeAdverb -> ‘better’
# superlativeAdverb -> ‘best’
# baseVerb -> ‘take’
# pastTenseVerb -> ‘took’
# presentParticipleVerb -> ‘taking’
# pastParticipleVerb -> ‘taken’
# 1stPersonPresentTenseVerb -> ‘take’
# 3rdPersonPresentTenseVerb -> ‘takes’


# parse text -> create template -> return template

class TemplateCreator:
    # wordList = ["Henry", "eats", "the", "hotdog", "aggressively"]
    # partOfSpeechList = ["proper noun", "verb", "article", "noun", "adverb", "punct"]
    # removalFrequency -- percent of words to be removed in sample
    # templateList = ["Henry", "_verb", "the", "_noun", "aggressively"]
    
    def __init__(self, incomingText, removalFrequency=6):
        self.wordList = []
        self.POSList = []
        self.incomingText = incomingText
        self.templateList = []
        self.dict = {"NN": "singularNoun",
                     "NNS": "pluralNoun",
                     "JJ": "adjective",
                     "JJR": "comparativeAdjective",
                     "JJS": "superlativeAdjective",
                     "VB": "baseVerb",
                     "VBD": "pastTenseVerb",
                     "VBG": "presentParticipleVerb",
                     "VBN": "pastParticipleVerb",
                     "VBP": "1stPersonPresentTenseVerb",
                     "VBZ": "3rdPersonPresentTenseVerb",
                     "RB": "adverb",
                     "RBR": "comparativeAdverb",
                     "RBS": "superlativeAdverb",
                    }
        
        self.stopWords = ["was", "were", "is", "has", "been", "am", "are", "have"]
        
        # used to determine how often words are censored, TODO: improve
        self.removalFrequency = removalFrequency
        self.counter = removalFrequency

    def parse(self):
        # TODO: account for how the text will be generated
        punctuation = r'[]!"$%&\'()*+,./:;=#@?[\\^_`’{|}~-]?'
        tokenizer = RegexpTokenizer(r'\w+' + punctuation + r'\w+?|[^\s]+?')
        combinedPOS = pos_tag(tokenizer.tokenize(self.incomingText))
    
        for i in combinedPOS:
            self.wordList.append(i[0])
            if i[0] in [".", "?", "!", ",", ":", ";", "-", "–", "(", ")", "[", "]", "{", "}", "'", '"', "’"]:
                self.POSList.append(".")
            else:
                self.POSList.append(i[1])

    def createTemplate(self):
        for i in range(len(self.wordList)):
            if self.counter >= self.removalFrequency and self.POSList[i] in self.dict and self.wordList[i] not in self.stopWords:
                self.templateList.append("_" + self.dict[self.POSList[i]])
                self.counter = 0
            else:
                self.counter += 1
                self.templateList.append(self.wordList[i])

    def returnTemplate(self):
        return self.templateList