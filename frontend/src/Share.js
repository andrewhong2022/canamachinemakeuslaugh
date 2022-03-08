import React, {useState} from 'react';
import './App.css';

const Share = ({isDoneState}) => {

  const onShare = () => {
    // axios.post('http://127.0.0.1:5000/cammul/reddit',{
    //   'story': fullText
    // }).then(() => {
    //   console.log("SUCCESS")
    // }).catch(error => {
    //   console.log(error)
    // })
  }
  
  if (isDoneState.isDone) {
    return (
      <button onClick={onShare}>Share this with friends!</button>
    );
  }
  else {
    return null;
  }
}

export default Share;