import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

// Placeholder for your CareerAssessment component
const CareerAssessment = () => {
  return <div>This is the Basic Career Assessment Page.</div>;
};

const HomePage = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState<string>('');

  function handleSubmit() {
    // Logic for handling the submit action
    console.log("API Key Submitted: ", key);
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div><p>John Segreti, Aaron Xue, Max Siczek</p></div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.tsx</code> and save to reload.</p>
        {/* Button for Basic Career Assessment */}
        <Button onClick={() => navigate('/career-assessment')}>Start Basic Career Assessment</Button>
        {/* New Button for Advanced Career Assessment */}
        <Button onClick={() => navigate('/career-assessment')} variant="info" style={{ marginLeft: '10px' }}>Start Advanced Career Assessment</Button>
      </header>
      <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
        <br />
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
      </Form>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/career-assessment" element={<CareerAssessment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
