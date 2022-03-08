import React, {useState} from 'react';
import Button from '@mui/material/Button';
import './App.css';

const Start = () => {
  const [didStart, setDidStart] = useState(false);

  if (!didStart) {
    return (
        <div>
            <p>Press Begin to get started!</p>
            <Button onClick={() => {setDidStart(true);}}>Begin</Button>
        </div>
    );
  }
  else {
      return null;
  }
}

export default Start;