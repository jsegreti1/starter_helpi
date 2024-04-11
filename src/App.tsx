import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState('');

  function handleSubmit() {
    console.log("API Key Submitted: ", key);
  }

  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <div>
      <header className="App-header">
        <div><p>John Segreti, Aaron Xue, Max Siczek!!</p></div>
        <img src={logo} className="App-logo" alt="logo" />
        <Button onClick={() => navigate('/career-assessment', { state: { assessmentType: 'Basic' } })}>Start Basic Career Assessment</Button>
        <Button onClick={() => navigate('/career-assessment', { state: { assessmentType: 'Advanced' } })} style={{ marginLeft: '10px' }}>Start Advanced Career Assessment</Button>
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

const AssessmentPage = () => {
  const location = useLocation();
  const assessmentType = location.state?.assessmentType || 'Basic'; // Default to 'Basic' if no state is passed

  return (
    <div>
      <h1>{assessmentType} Career Assessment</h1>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/career-assessment" element={<AssessmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
