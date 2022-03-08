import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InitialPrompt from './InitialPrompt';
import MadLib from './MadLib';
import Share from './Share';
import axios from 'axios';

const App = () => {
  const [initialPrompt, setInitialPrompt] = useState("");
  const [oldTextWithUserInputs, setOldTextWithUserInputs] = useState("");
  const [newTextWithBlanks, setNewTextWithBlanks] = useState("");
  const [didStart, setDidStart] = useState(false);
  const [isDone, setIsDone] = useState(false);
  

  const [userPrompt, setUserPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState([]);
  const [partsOfSpeechArray, setPartsOfSpeechArray] = useState([]);
  const [num, setNum] = useState(0);
  const [currentPOS, setCurrentPOS] = useState("");
  // const [isDone, setIsDone] = useState(false);
  const [userPromptsArray, setUserPromptsArray] = useState([]);
  const [fullText, setFullText] = useState("");
  const [didGenerate, setDidGenerate] = useState(false);
  const [firstSentence, setFirstSentence] = useState("");

  const onInitialPromptSubmit = () => {
    // send the initial prompt to backend
    // get the new sentence from the backend
    // set new sentence in state
  }
  
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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Can a Machine Make Us Laugh?</h1>
        {/* <Start/> DO I EVEN NEED THIS LOL*/}
        <InitialPrompt initialPromptState = {{initialPrompt, setInitialPrompt}} didStartState = {{didStart, setDidStart}} newTextState = {{newTextWithBlanks, setNewTextWithBlanks}} oldTextState = {{oldTextWithUserInputs, setOldTextWithUserInputs}}></InitialPrompt>
        <MadLib didStartState = {{didStart, setDidStart}} newTextState = {{newTextWithBlanks, setNewTextWithBlanks}} oldTextState = {{oldTextWithUserInputs, setOldTextWithUserInputs}} isDoneState = {{isDone, setIsDone}}/>
        <Share isDoneState = {{isDone, setIsDone}}/>
      </header>
    </div>
  );
}

export default App;