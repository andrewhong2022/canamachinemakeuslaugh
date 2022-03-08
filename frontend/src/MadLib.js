import React, {useState} from 'react';
import './App.css';
import TypeWriter from 'react-typewriter';

const MadLib = ({didStartState, newTextState, oldTextState, isDoneState}) => {
  const [userPrompt, setUserPrompt] = useState("");

  const onSubmitUserInput = (event) => {
    event.preventDefault();
    const fullText = getFullText();

    // TODO: send the full text (old + new + user input) to backend

    // TODO: send full text to backend

    // TODO: get and set new sentence
    oldTextState.setOldTextWithUserInputs(fullText);
    newTextState.setNewTextWithBlanks("i am a ");

    // TODO: if get error message, finish
    
    isDoneState.setIsDone(true);

    setUserPrompt("");

    // if (num+1 == partsOfSpeechArray.length) {
    //   setIsDone(true);
    // } else {
    //   setCurrentPOS(partsOfSpeechArray[num+1].substring(1))
    // }
    // setNum(num+1);
    // var newArr = userPromptsArray;
    // newArr.push(userPrompt);
    // setUserPromptsArray(newArr);
    // console.log(userPromptsArray);
  }

  const getFullText = () => {
    return oldTextState.oldTextWithUserInputs + newTextState.newTextWithBlanks + userPrompt;
  }

  if (didStartState.didStart && !isDoneState.isDone) {
    return (
      <div>
        <div>
          <p>{oldTextState.oldTextWithUserInputs}</p>
        </div>
        <TypeWriter typing={1}>{newTextState.newTextWithBlanks}</TypeWriter>
          <div>
              <p>Please complete the sentence.</p>
              <form onSubmit={onSubmitUserInput}>
                  <input type="text" value={userPrompt} onChange={(e) => {setUserPrompt(e.target.value);}}></input>
                  <input type="submit"/>
              </form>
          </div>
      </div>
    );
  }
  else if (isDoneState.isDone) {
    return (
      <div>
        <p>{getFullText()}</p>
      </div>
    );  
  }
  else {
    return null;
  }

}

export default MadLib;
