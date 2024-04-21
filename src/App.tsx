import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';

import styles from './ButtonComponent.module.css';


import { BasicQuestions } from './BasicQuestions';
import { DetailedQuestions } from './DetailedQuestions';


//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}
function App() {
  const [key, setKey] = useState<string>(keyData); // For API key input
  const [answers, setAnswers] = useState<string[]>(new Array(7).fill(""));
  const [activeSection, setActiveSection] = useState<'basic' | 'detailed' | 'home'>('home'); // For question page selection


  // Sets the local storage item to the API key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    console.log('Submitting:', answers); /* Debug */    
    window.location.reload(); // When making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }
  
  // Whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  if (activeSection === 'home'){
    return (
      <div className="App">
        <div className="button-container">
      </div>


<div className="App-body">
  <div className="intro-container">
    <h1>Cool Career Corner</h1>
    <p>Welcome to the Cool Career Corner - the destination of choice for all cool kids who care about their future! Here, you'll find tools to help you understand your strengths and how they can be applied to specific careers. Are you ready to discover your destiny?</p>
  </div>
  
  <div className="quiz-header-container">
    <h2 className="quiz-header">Career Challenges</h2>
    <p>Below we have our famous questionnaires.</p>
  </div>

  <div className="quizzes-container">

    <div className="quiz-section">
    <button className={styles.fancyButton} onClick={() => setActiveSection('basic')}>
        Basic Questions
        <svg viewBox="0 0 200 100" preserveAspectRatio="none">
          <rect width="200" height="100" fill="transparent" />
        </svg>
      </button>
      <p>Multiple choice! For the time-efficient. </p>
    </div>

    <div className="quiz-section">
      <button className={styles.fancyButton} onClick={() => setActiveSection('detailed')}>
        Detailed Questions
        <svg viewBox="0 0 200 100" preserveAspectRatio="none">
          <rect width="200" height="100" fill="transparent" />
        </svg>
      </button>
      <p>Open-response: respond openly, and Sir GPT will take care of the rest.</p>
    </div>
  </div>
</div>

        <footer>
          <p>Home | Donate | Contact Us | Terms of Service</p>
        </footer>
        <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br></br>
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
    </div>
    );




  }else if (activeSection === 'basic'){
    return (
      <div className="App">
        <div className="App-header">
          <div className="header-button-container">
            <Button variant="outline-dark" onClick={() => setActiveSection('home')}>Home</Button>
            <Button variant="outline-dark" onClick={() => setActiveSection('basic')}>Basic Questions</Button>
            <Button variant="outline-dark" onClick={() => setActiveSection('detailed')}>Detailed Questions</Button>
          </div>
        </div>
        <div className="App-body">
          <BasicQuestions />
        </div>
        <footer>
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </footer>
        <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br></br>
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
    </div>
    );




  }else if (activeSection === 'detailed'){
    return (
      <div className="App">
        <div className="App-header">
        <div className="header-button-container">
            <Button variant="outline-dark" onClick={() => setActiveSection('home')}>Home</Button>
            <Button variant="outline-dark" onClick={() => setActiveSection('basic')}>Basic Questions</Button>
            <Button variant="outline-dark" onClick={() => setActiveSection('detailed')}>Detailed Questions</Button>
          </div>
        </div>
        <div className="App-body">
        <DetailedQuestions />
        </div>

        <footer>
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </footer>
        <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br></br>
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
    </div>
    );
  } else {
    return (
      <div className="App">
        
        <div className="App-header">
        <div className="button-container">
            <Button variant="outline-dark" onClick={() => setActiveSection('home')}>Home</Button>
            <Button variant="outline-dark" onClick={() => setActiveSection('basic')}>Basic Questions</Button>
            <Button variant="outline-dark" onClick={() => setActiveSection('detailed')}>Detailed Questions</Button>
          </div>
        </div>

        <div className="App-body">
        <h3>ERROR: Page not found</h3>
            <Button onClick={() => setActiveSection('home')}>Home</Button>
        </div>
        <footer>
          <p>Home | Donate | Contact Us | Terms of Service</p>
        </footer>
        <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br></br>
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
    </div>
    );
  }
}

export default App;