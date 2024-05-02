import React from "react"
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ProgressBar } from 'react-bootstrap';
import OpenAI from 'openai'; // USE npm install openai


const PROMPTS =[ 
  "Which of these fields are most aligned with your interests?", 
  "Do you like to work in a team or independently?", 
  "Would you consider yourself to have the qualities of a leader?", 
  "Do you prefer to do more critical thinking or working with your hands", 
  "Would you like to travel?", 
  "How creative would you like to be in your career?",  
  "What is your most recent completed form of education?"
];
const Choice_A =[ 
  "Science, Technology, Engineering, and Mathematics", 
  "Strictly independent", 
  "Yes, I have experience as a leader", 
  "I prefer to be a critical thinker", 
  "I prefer to not travel a lot", 
  "I really want to be creative and express myself",  
  "Master's Degree or PHD"
];
const Choice_B =[ 
  "Visual Art, Writing, and Music", 
  "Working in a group always", 
  "Yes, I am not an experienced leader but I believe I have the qualities of one", 
  "I prefer to work with my hands", 
  "I prefer to travel accross the country", 
  "I would not consider myself as someone who enjoys being professional and creative",  
  "Bachelor's Degree"
];
const Choice_C =[ 
  "Buisness, Finance, and Marketing", 
  "Prefer a bit of both", 
  "I do not like to take the lead on work", 
  "I prefer to do both", 
  "I am willing to travel around the world", 
  "A bit of creativity would not hurt",  
  "High School Diploma or GED"
];
const Choice_D =[ 
  "Education", 
  "Does not matter to me", 
  "I am indifferent to being a leader or not", 
  "I am indifferent", 
  "I am indifferent to travel", 
  "I am cool with whether or not I am creative",  
  "Did not Graduate High School"
];


export function BasicQuestions(): JSX.Element { 
  const [answers, setAnswers] = useState<string>("You are responding with career advice to a user that has answered an online career quiz. The response you make should accord to the following question/response pairs:");
  const [currentAns, setCurrentAns] = useState<string>("");
  const [prompt, setPrompt] = useState<string>(PROMPTS[0]);
  const [choiceA, setChoiceA] = useState<string>(Choice_A[0]);
  const [choiceB, setChoiceB] = useState<string>(Choice_B[0]);
  const [choiceC, setChoiceC] = useState<string>(Choice_C[0]);
  const [choiceD, setChoiceD] = useState<string>(Choice_D[0]);
  const [qNum, setQNum] = useState<number>(1);
  const [finished, setFinished] = useState<boolean>(false);

  function updateCurrent(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentAns(event.target.value);  
  }

  function moveOn() {
    if(currentAns === ""){
      return;
    }
    setAnswers(answers + " /n " + PROMPTS[qNum]+ " : " + currentAns);
    setCurrentAns("");
    setPrompt(PROMPTS[qNum]);
    setChoiceA(Choice_A[qNum]);
    setChoiceB(Choice_B[qNum]);
    setChoiceC(Choice_C[qNum]);
    setChoiceD(Choice_D[qNum]);
    setQNum(qNum+1);
    if(qNum === 7){
      setFinished(true);
    }
    
  }
  if(!finished){
    return(
      <Form.Group>
        <Form.Label>{prompt}</Form.Label>
        <Form.Check
        type="radio"
        name={choiceA}
        onChange={updateCurrent}
        id="A"
        label={choiceA}
        value={choiceA}
        checked={currentAns === choiceA}
        />
        <Form.Check
        type="radio"
        name={choiceB}
        onChange={updateCurrent}
        id="B"
        label={choiceB}
        value={choiceB}
        checked={currentAns === choiceB}
        />
        <Form.Check
        type="radio"
        name={choiceC}
        onChange={updateCurrent}
        id="C"
        label={choiceC}
        value={choiceC}
        checked={currentAns === choiceC}
        />
        <Form.Check
        type="radio"
        name={choiceD}
        onChange={updateCurrent}
        id="D"
        label={choiceD}
        value={choiceD}
        checked={currentAns === choiceD}
        />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ProgressBar
                striped
                animated
                style={{ marginTop: '20px', height: '30px', width: '2000%' }}
                now={((qNum - 1) / PROMPTS.length) * 100}
                label={`${qNum - 1}/${PROMPTS.length}`}
            />
        </div>
        
        <Button style={{ marginTop: '20px' }} onClick={moveOn}>Submit</Button>


      </Form.Group>
    )
  } else {
    return(
      <p>GPT RESPONSE</p>
    );
  }
}