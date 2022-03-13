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
    axios.post('http://127.0.0.1:5000/cammul/generate',formData).then(res => {
            var dataJSON = JSON.parse(res.data)
            newTextState.setNewTextWithBlanks(dataJSON.newSentence.slice(0,-1).join(" ").replaceAll(/ ([^\$A-Za-z0-9])/ig, '$1'));
        }).catch(error => {
            console.log(error)
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
                <Dropdown.Item eventKey="Once upon a time"> Once upon a time... </Dropdown.Item>
                <Dropdown.Item eventKey="Today was such a bad day">Today was such a bad day...</Dropdown.Item>
                <Dropdown.Item eventKey="Sorry I'm late">Sorry I'm late...</Dropdown.Item>
            </DropdownButton>
        </div>
        );
  }
  else {
      return null;
  }
}

export default InitialPrompt;