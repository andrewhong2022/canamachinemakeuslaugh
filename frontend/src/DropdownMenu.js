import React, {useState} from 'react';
import './App.css';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import axios from 'axios';

const DropdownMenu = ({initialPromptState, didStartState}) => {

  const pickPrompt = (e) => {
      //TODO: send initial prompt to backend
    let formData = new FormData();
    formData.append('data',formData);
    axios.post('http://127.0.0.1:5000/cammul/generate',formData).then(() => {
            console.log("SUCCESS")
        }).catch(error => {
            console.log(error)
        })

    //TODO: get the new sentence
    initialPromptState.setInitialPrompt(e);
  }

  if (!didStartState.didStart) {
    return (
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
        );
  }
  else {
      return null;
  }
}

export default DropdownMenu;
