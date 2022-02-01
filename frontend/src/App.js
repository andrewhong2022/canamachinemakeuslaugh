import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css';

const App = () => {
  const [userPrompt, setUserPrompt] = useState("");

  const onSubmitUserPrompt = () => {
    setUserPrompt( document.getElementById('userPrompt').value);
  }

  if (userPrompt == "" ){
    return (
      <div className="App">
        <div className="Chat-box">
          <div className="CAMMUL-text-bubble">
              <div className="Chat-message">
                <p>Welcome! My name is CAMMUL. Please type in a short prompt, and I will do my best to come up with something humorous very promptly.</p>
              </div>
          </div>
          <div class="User-prompt">
            <TextField id="userPrompt" type="text" placeholder="Enter your next prompt here"  fullWidth/>
            <Button id="Submit-button" variant="contained" onClick={onSubmitUserPrompt}>Submit</Button>
          </div>
          <div className="Robot-img"/>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <div className="Chat-box">
          <div className="User-text-bubble">
            <div className="Chat-message">
              <p>{userPrompt}</p>
            </div>
          </div>
          <div className="CAMMUL-text-bubble">
              <div className="Chat-message">
                <p>“I had such a bad day! I spilled coffee all over my favorite shirt.”</p>
              </div>
          </div>
          <div class="User-prompt">
            <TextField id="userPrompt" type="text" placeholder="Enter your next prompt here"  fullWidth/>
            <Button id="Submit-button" variant="contained" onClick={onSubmitUserPrompt}>Submit</Button>
          </div>
          <div className="Robot-img"/>
        </div>
      </div>
    );
  }

  
}

export default App;
