import React, {useState} from 'react';
import './App.css';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import axios from 'axios';


const InitialPrompt = ({initialPromptState, didStartState, newTextState, oldTextState}) => {

const pickPrompt = (e) => {
    let formData = new FormData();
    formData.append('data',e);
    axios.post('https://cammul.herokuapp.com/cammul/generate',formData).then(res => {
            var dataJSON = JSON.parse(res.data)
            newTextState.setNewTextWithBlanks(dataJSON.newSentence.slice(0,-1).join(" ").replaceAll(/ ([^\$A-Za-z0-9])/ig, '$1'));
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);
        })
  
    oldTextState.setOldTextWithUserInputs(e);
    didStartState.setDidStart(true);
}


  if (!didStartState.didStart) {
    return (
        <div>
            <p>Select a prompt to get started!</p>
            <DropdownButton
                id="dropdown-button-dark-example2"
                variant="secondary"
                menuVariant="dark"
                title="Pick a prompt"
                className="mt-2"
                onSelect={pickPrompt}
            >
                <Dropdown.Item eventKey="Once upon a time,"> Once upon a time... </Dropdown.Item>
                <Dropdown.Item eventKey="Today was such a bad day,">Today was such a bad day...</Dropdown.Item>
                <Dropdown.Item eventKey="Sorry I'm late,">Sorry I'm late...</Dropdown.Item>
                <Dropdown.Item eventKey="You wouldn't believe what happened: ">You wouldn't believe what happened...</Dropdown.Item>
            </DropdownButton>
        </div>
        );
  }
  else {
      return null;
  }
}

export default InitialPrompt;