import React, {useState} from 'react';
import Button from '@mui/material/Button';
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
      <Button onClick={onShare}>Share this with friends!</Button>
    );
  }
  else {
    return null;
  }
}

export default Share;