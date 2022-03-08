import React, {useState} from 'react';
import './App.css';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import axios from 'axios';
import Button from '@mui/material/Button';


const InitialPrompt = ({initialPromptState, didStartState, newTextState, oldTextState}) => {

  const pickPrompt = (e) => {
      // TODO: send initial prompt to backend
    // axios.post('http://127.0.0.1:5000/cammul/generate',{
    //       'data': e
    //     }).then(() => {
    //         console.log("SUCCESS")
    //     }).catch(error => {
    //         console.log(error)
    //     })

    // TODO: get the new sentence
    initialPromptState.setInitialPrompt(e);
  }

  const onStart = () => {
    oldTextState.setOldTextWithUserInputs(initialPromptState.initialPrompt);
    newTextState.setNewTextWithBlanks("hello my name is ");
    didStartState.setDidStart(true);
  }

  if (!didStartState.didStart) {
    return (
        <div>
            <DropdownButton
                id="dropdown-button-dark-example2"
                variant="secondary"
                menuVariant="dark"
                title="Pick a prompt"
                className="mt-2"
                onSelect={pickPrompt}
            >
                <Dropdown.Item eventKey="once upon a time"> Once upon a time... </Dropdown.Item>
                <Dropdown.Item eventKey="today was such a bad day">Today was such a bad day...</Dropdown.Item>
                <Dropdown.Item eventKey="sorry i'm late">Sorry I'm late...</Dropdown.Item>
            </DropdownButton>
            <Button onClick={onStart}>Begin</Button>
        </div>
        );
  }
  else {
      return null;
  }
}

export default InitialPrompt;
