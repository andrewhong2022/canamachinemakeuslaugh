import React, {useState} from 'react';
import './App.css';

const Start = () => {
  const [didStart, setDidStart] = useState(false);

  if (!didStart) {
    return (
        <div>
            <p>Press Begin to get started!</p>
            <button onClick={() => {setDidStart(true);}}>Begin</button>
        </div>
    );
  }
  else {
      return null;
  }
}

export default Start;