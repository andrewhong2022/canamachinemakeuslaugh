import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css';

const App = () => {
  // example
  const sentence = ["Henry", "_verb", "the", "dog", "_adverb", "."];

  const [userPrompt, setUserPrompt] = useState("");
  const [generatedText, setGeneratedText] = useState([]);
  const [partsOfSpeechArray, setPartsOfSpeechArray] = useState([]);
  const [num, setNum] = useState(0);
  const [currentPOS, setCurrentPOS] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [userPromptsArray, setUserPromptsArray] = useState([]);
  const [fullText, setFullText] = useState("");
  const [didGenerate, setDidGenerate] = useState(false);
  
  const onSubmitUserPrompt = (event) => {
    event.preventDefault();
    if (num+1 == partsOfSpeechArray.length) {
      setIsDone(true);
    } else {
      setCurrentPOS(partsOfSpeechArray[num+1].substring(1))
    }
    setNum(num+1);
    var newArr = userPromptsArray;
    newArr.push(userPrompt);
    setUserPromptsArray(newArr);
    console.log(userPromptsArray);
  }

  const onStart = () => {
    console.log("started");
    // TODO: use api to get generated text
    setGeneratedText(sentence);
    setPartsOfSpeechArray(getPartsOfSpeechArray(sentence));
    //TODO: get and set first sentence 
  }

  const onGenerate = () => {
    setFullText(getFullTextWithUserPrompts());
    setDidGenerate(true);
  }

  const getPartsOfSpeechArray = (textArray) => {
    var posArray = [];
    for (let i  = 0; i < textArray.length; i++) {
      if (textArray[i].charAt(0) == "_") {
        posArray.push(textArray[i]);
      }
    }
    setCurrentPOS(posArray[0].substring(1));
    return posArray
  }

  const getFullTextWithUserPrompts = () => {
    var fullText = "";
    for (let i = 0; i < generatedText.length; i++) {
      if (generatedText[i].charAt(0) == "_") {
        fullText += userPromptsArray[0] + " ";
        userPromptsArray.shift()
      } else if (generatedText[i] == "." || generatedText[i] == ",") {
        fullText = fullText.substring(0,fullText.length-1);
        fullText += generatedText[i] + " ";
      } else {
        fullText += generatedText[i] + " ";
      }
    }
    return fullText;
  }

  if (generatedText.length == 0) {
    return (
      <div className="App">
          <header className="App-header">
            <h1>Can a Machine Make Us Laugh?</h1>
            <p>Press Start to get started!</p>
            <Button onClick={onStart}>Start</Button>
        </header>
      </div>
    );
  }
  else if (isDone) {
    return (
      <div className="App">
          <header className="App-header">
            <h1>Can a Machine Make Us Laugh?</h1>
            <p>Generate your final text!</p>
            <Button disabled={didGenerate} onClick={onGenerate}>Generate</Button>
            <p>{fullText}</p>
        </header>
      </div>
    );
  }
  else {
    return (
      <div className="App">
          <header className="App-header">
            <h1>Can a Machine Make Us Laugh?</h1>
            <h5>Based on this first sentence for context, enter answers for the prompts below.</h5>
            <h5>example first sentence</h5>
            <p>Enter a {currentPOS} below</p>
            <form onSubmit={onSubmitUserPrompt}>
                <input type="text" value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)}/>
              <input type="submit"/>
            </form>
        </header>
      </div>
    );
  }
}

  
// function App() {
//   const [getMessage, setGetMessage] = useState({})

//   useEffect(()=>{
//     axios.get('http://localhost:5000/flask/hello').then(response => {
//       console.log("SUCCESS", response)
//       setGetMessage(response)
//     }).catch(error => {
//       console.log(error)
//     })

//   }, [])
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>

//         <div>{getMessage.status === 200 ? 
//           <h3>{getMessage.data.message}</h3>
//           :
//           <h3>LOADING</h3>}</div>
//       </header>
//     </div>
//   );
// }

export default App;
