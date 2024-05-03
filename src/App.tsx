import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import styles from './ButtonComponent.module.css';
import { BasicQuestions } from './BasicQuestions';
import { DetailedQuestions } from './DetailedQuestions';

function App() {
  const saveKeyData = "MYKEY";
  const prevKey = localStorage.getItem(saveKeyData) || "";
  const [key, setKey] = useState<string>(prevKey);
  const [activeSection, setActiveSection] = useState<'basic' | 'detailed' | 'home'>('home'); // For question page selection

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    localStorage.setItem(saveKeyData, key);
    // window.location.reload(); // Not needed?
  }
  
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
    <p>We offer two types of questionnaires, Basic Questions and Detailed Questions. </p>
    <p>Read below to find out which one is best for your needs. </p>
  </div>

  <div className="quizzes-container">

    <div className="quiz-section">
    <p>Multiple choice! With just seven questions, get a rough idea of what career fields may be the best for you. </p>
    <button className={styles.fancyButton} onClick={() => setActiveSection('basic')}>
        Basic Questions
        <svg viewBox="0 0 200 100" preserveAspectRatio="none">
          <rect width="200" height="100" fill="transparent" />
        </svg>
      </button>
      
    </div>

    <div className="quiz-section">
    <p>Open response! Type your responses to the questions, and receive AI-generated career recommendations.</p>
      <button className={styles.fancyButton} onClick={() => setActiveSection('detailed')}>
        Detailed Questions
        <svg viewBox="0 0 200 100" preserveAspectRatio="none">
          <rect width="200" height="100" fill="transparent" />
        </svg>
      </button>
      
    </div>
  </div>
</div>

        <footer>
          <p>Home | Donate | Contact Us | Terms of Service</p>
          <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br></br>
          <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
        </footer>

    </div>
    );

  }else if (activeSection === 'basic'){ // Add spacing between buttons "Home," "Basic Questions," "Detailed Questions"
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
          <BasicQuestions apiKey={key}/>
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
  else if (activeSection === 'detailed') { // Add spacing between buttons "Home," "Basic Questions," "Detailed Questions"
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
          <DetailedQuestions apiKey={key} />
        </div>
        <footer>
          <p>Home | Donate | Contact Us | Terms of Service</p>
        </footer>
      </div>
    );
  }
  else {
    return ( // Add spacing between buttons "Home," "Basic Questions," "Detailed Questions"
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
    </div>
    );
  }
}
export default App;