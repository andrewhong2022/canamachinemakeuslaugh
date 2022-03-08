import React, {useState} from 'react';
import './App.css';

const UserInput = ({newTextState, oldTextState}) => {
    const [userPrompt, setUserPrompt] = useState("");

    const onSubmitUserInput = (event) => {
        event.preventDefault();

        // send the full text (old + new + user input) to backend

        // get sentence and send it to backend

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

        setUserPrompt("");
    }
  
    return (
        <div></div>
    );
  }

export default UserInput;
