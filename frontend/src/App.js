import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css';
import axios from 'axios';

const App = () => {
  // example
  // const sentence = ["Henry", "_verb", "the", "dog", "_adverb", "."];
  const [userPrompt, setUserPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState([]);
  const [partsOfSpeechArray, setPartsOfSpeechArray] = useState([]);
  const [num, setNum] = useState(0);
  const [currentPOS, setCurrentPOS] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [userPromptsArray, setUserPromptsArray] = useState([]);
  const [fullText, setFullText] = useState("");
  const [didGenerate, setDidGenerate] = useState(false);
  const [firstSentence, setFirstSentence] = useState("");
  
  const onSubmitUserPrompt = (event) => {
    event.preventDefault();
    if (num+1 == partsOfSpeechArray.length) {
      setIsDone(true);
    } else {
      setCurrentPOS(partsOfSpeechArray[num+1].substring(1))
    }
    setNum(num+1);
    var newArr = userPromptsArray;
    newArr.push(userPrompt);
    setUserPromptsArray(newArr);
    console.log(userPromptsArray);
  }

  const onStart = () => {
    console.log("started");
    axios.get('http://127.0.0.1:5000/cammul/generate').then(response => {
      console.log("SUCCESS", response)

      const obj = JSON.parse(response["data"])
      console.log(response["data"][1])
      console.log(typeof response["data"])
      setGeneratedText(obj["body"])
      setFirstSentence(obj["prompt"])
      setPartsOfSpeechArray(getPartsOfSpeechArray(obj["body"]))
    }).catch(error => {
      console.log(error)
    })
    // TODO: use api to get generated text
    
    //TODO: get and set first sentence 
  }

  const onGenerate = () => {
    setFullText(getFullTextWithUserPrompts());
    setDidGenerate(true);
  }

  const getPartsOfSpeechArray = (textArray) => {
    var posArray = [];
    for (let i  = 0; i < textArray.length; i++) {
      if (textArray[i].charAt(0) == "_") {
        posArray.push(textArray[i]);
      }
    }
    setCurrentPOS(posArray[0].substring(1));
    return posArray
  }

  const getFullTextWithUserPrompts = () => {
    var fullText = firstSentence + " ";
    for (let i = 0; i < generatedText.length; i++) {
      if (generatedText[i].charAt(0) == "_") {
        fullText += userPromptsArray[0] + " ";
        userPromptsArray.shift()
      } else if (generatedText[i] == "." || generatedText[i] == ",") {
        fullText = fullText.substring(0,fullText.length-1);
        fullText += generatedText[i] + " ";
      } else {
        fullText += generatedText[i] + " ";
      }
    }
    return fullText;
  }

  const onShare = () => {
    axios.post('http://127.0.0.1:5000/cammul/reddit',{
      'story': fullText
    }).then(() => {
      console.log("SUCCESS")
    }).catch(error => {
      console.log(error)
    })
  }

  if (generatedText.length == 0) {
    return (
      <div className="App">
          <header className="App-header">
            <h1>Can a Machine Make Us Laugh?</h1>
            <p>Press Begin to get started!</p>
            <Button onClick={onStart}>Begin</Button>
        </header>
      </div>
    );
  }
  else if (isDone) {
    return (
      <div className="App">
          <header className="App-header">
            <h1>Can a Machine Make Us Laugh?</h1>
            <p>Generate your final text!</p>
            <Button disabled={didGenerate} onClick={onGenerate}>Generate</Button>
            <p>{fullText}</p>
            <Button onClick={onShare}>Share this with friends!</Button>
        </header>
      </div>
    );
  }
  else {
    return (
      <div className="App">
          <header className="App-header">
            <h1>Can a Machine Make Us Laugh?</h1>
            <h5>Based on this first sentence for context, enter answers for the prompts below.</h5>
            <h5>{firstSentence}</h5>
            <p>Enter a {currentPOS} below</p>
            <form onSubmit={onSubmitUserPrompt}>
                <input type="text" value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)}/>
              <input type="submit"/>
            </form>
        </header>
      </div>
    );
  }
}

export default App;
