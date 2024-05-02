import React from "react"
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ProgressBar } from 'react-bootstrap';


const PROMPTS =[ 
  "What is your employment status?", 
  "Where would you prefer to work?", 
  "What type of problem solver are you?", 
  "What type of work environment do you prefer?", 
  "Which of these areas would you say interest you the most?", 
  "Do you prefer leadership positions?",  
  "How important is work-life balance to you?"
];
const Choice_A =[ 
  "Not employed", 
  "On USA's East Coast", 
  "A creative and innovative approach", 
  "Prefer working independently", 
  "Technology and Engineering", 
  "Comfortable without leadership responsibilities",  
  "Not important"
];
const Choice_B =[ 
  "Student, in high school or below", 
  "On USA's West Coast", 
  "A logical and systematic approach", 
  "Prefer small teams or partnerships", 
  "Arts and Design", 
  "Want to lead small projects/teams",  
  "Somewhat important"
];
const Choice_C =[ 
  "Student, in undergraduate studies or above", 
  "In USA's Midwest, Gulf, or South regions", 
  "A hands-on and practical approach", 
  "Prefer large, collaborative teams", 
  "Science and Research", 
  "Want to work in managerial role",  
  "Mostly important"
];
const Choice_D =[ 
  "Currently employed", 
  "Outside the continental USA", 
  "A mix of creativity and logic", 
  "Very dynamic with frequent changes", 
  "Business and Management", 
  "Want to eventually be a top executive",  
  "Top priority"
];


export function BasicQuestions(): JSX.Element { 
  const [answers, setAnswers] = useState<string>("");
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
    setAnswers(answers + " ; " + currentAns);
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