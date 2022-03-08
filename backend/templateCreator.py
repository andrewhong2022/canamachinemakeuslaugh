import nltk
from nltk import pos_tag, word_tokenize
from nltk.tokenize import RegexpTokenizer
# nltk.download('averaged_perceptron_tagger')

# parse text -> create template -> return template

class TemplateCreator:
    # wordList = ["Henry", "eats", "the", "hotdog", "aggressively"]
    # partOfSpeechList = ["proper noun", "verb", "article", "noun", "adverb", "punct"]
    # removalFrequency -- percent of words to be removed in sample
    # templateList = ["Henry", "_verb", "the", "_noun", "aggressively"]
    
    def __init__(self, incomingText):
        self.wordList = []
        self.POSList = []
        self.incomingText = incomingText
        self.templateList = []
        self.dict = {"NN": "singular noun (e.g desk)",
                     "NNS": "plural noun (e.g. desks)",
                     "JJ": "adjective (e.g. big)",
                     "JJR": "comparative adjective (e.g. bigger)",
                     "JJS": "superlative adjective (e.g. biggest)",
                     "VB": "base verb (e.g. take)",
                     "VBD": "past tense verb (e.g. took)",
                     "VBG": "present participle verb (e.g. taking)",
                     "VBN": "past participle verb (e.g. taken)",
                     "VBP": "first person present tense verb (e.g. take)",
                     "VBZ": "third person present tense verb (e.g. takes)",
                     "RB": "adverb (e.g. silently)",
                     "RBR": "comparative adverb (e.g. better)",
                     "RBS": "superlative adverb (e.g. best)",
                    }
        
        self.stopWords = ["be", "was", "wasn't", "were", "weren't", "is", "isn't", "has",
                          "been", "am", "are", "aren't", "have", "haven't",
                          "feel", "felt", "feeling", "name", "named", "naming",
                          "can", "cannot", "can't", "could", "couldn't", "may",
                          "might", "will", "shall", "would", "wouldn't", "should",
                          "shouldn't", "must", "do", "did", "does", "doing", "done",
                          "think", "thinks", "thinking", "thought",
                          "happen", "happens", "happened", "happening",
                          "begin", "begins", "start", "starts", "started",
                          "seem", "seemed", "seems", "seeming", "tend", "tends"]
        


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
                

    def createTemplate(self, removalFrequency = None):
        # used to determine how often words are censored, default is only one word is censored
        if removalFrequency == None:
            removalFrequency = len(self.wordList)
        counter = removalFrequency
        
        for i in range(len(self.wordList)-1, -1, -1):
            word = self.wordList[i]
            if counter >= removalFrequency and self.POSList[i] in self.dict and self.wordList[i] not in self.stopWords:
                self.templateList = ["_" + self.dict[self.POSList[i]]] + self.templateList
                counter = 0
            else:
                counter += 1
                self.templateList = [self.wordList[i]] + self.templateList

    def returnTemplate(self):
        return self.templateList
