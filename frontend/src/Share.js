import React, {useState} from 'react';
import './App.css';
import axios from 'axios';

const Share = ({disabledState, isDoneState, oldTextState}) => {

  const onShare = () => {
    axios.post('https://cammul.herokuapp.com/cammul/reddit',{
      'story': oldTextState.oldTextWithUserInputs
    }).then(() => {
      console.log("SUCCESS")
    }).catch(error => {
      console.log(error)
    })
  }
  
  if (isDoneState.isDone) {
    return (
      <button onClick={() => {
        onShare()
        disabledState.setDisabled(true)}} disabled={disabledState.disabled}>Share this with friends!</button>
    );
  }
  else {
    return null;
  }
}

export default Share;