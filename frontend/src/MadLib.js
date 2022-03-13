import React, {useState} from 'react';
import './App.css';
import Typewriter from 'typewriter-effect';
import axios from 'axios';

const MadLib = ({didStartState, newTextState, oldTextState, isDoneState}) => {
  const [userPrompt, setUserPrompt] = useState("");

  const onSubmitUserInput = (event) => {
    event.preventDefault();
    const fullText = getFullText();

    let formData = new FormData();
    formData.append('data', fullText);
    axios.post('https://cammul.herokuapp.com/cammul/generate',formData).then(res => {
            var dataJSON = JSON.parse(res.data)
            if (dataJSON.code === 204) {
              oldTextState.setOldTextWithUserInputs(oldTextState.oldTextWithUserInputs 
                + " " + newTextState.newTextWithBlanks + " " + userPrompt);
              oldTextState.setOldTextWithUserInputs(oldTextState.replaceAll(/ ([^"\$A-Za-z0-9])/ig, '$1'))
              isDoneState.setIsDone(true);
            }
            else {
              oldTextState.setOldTextWithUserInputs(fullText.replaceAll(/ ([^"\$A-Za-z0-9])/ig, '$1'));
              newTextState.setNewTextWithBlanks(dataJSON.newSentence.slice(0,-1).join(" ").replaceAll(/ ([^"\$A-Za-z0-9])/ig, '$1'));
            }
        }).catch(error => {
            console.log(error)
            isDoneState.setIsDone(true);
        })

    // TODO: if get error message, finish
    // isDoneState.setIsDone(true);

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
    return oldTextState.oldTextWithUserInputs + " " + newTextState.newTextWithBlanks + " " + userPrompt;
  }


  if (didStartState.didStart && !isDoneState.isDone) {
    return (
      <div className="typewriter-container">
        <div>
          <p>{oldTextState.oldTextWithUserInputs}</p>
        </div>
        
        <Typewriter
          options={{
            strings: newTextState.newTextWithBlanks,
            autoStart: true,
            delay: 30,
          }}
        />
        
          <div>
              <br />
              <form onSubmit={onSubmitUserInput}>
                  <div>
                    <textarea rows="3" cols="50" placeholder="Finish the sentence" value={userPrompt} onChange={(e) => {setUserPrompt(e.target.value);}}>test</textarea>
                  </div>
                  <input type="submit"/>
              </form>
          </div>
      </div>
    );
  }
  else if (isDoneState.isDone) {
    return (
      <div>
        <p>{oldTextState.oldTextWithUserInputs}</p>
      </div>
    );  
  }
  else {
    return null;
  }

}

export default MadLib;