import React from "react"
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const PROMPTS =[ 
  "Question 1", 
  "Question 2", 
  "Question 3", 
  "Question 4", 
  "Question 5", 
  "Question 6",  
  "Question 7"
];
const Choice_A =[ 
  "Question 1A", 
  "Question 2A", 
  "Question 3A", 
  "Question 4A", 
  "Question 5A", 
  "Question 6A",  
  "Question 7A"
];
const Choice_B =[ 
  "Question 1B", 
  "Question 2B", 
  "Question 3B", 
  "Question 4B", 
  "Question 5B", 
  "Question 6B",  
  "Question 7B"
];
const Choice_C =[ 
  "Question 1C", 
  "Question 2C", 
  "Question 3C", 
  "Question 4C", 
  "Question 5C", 
  "Question 6C",  
  "Question 7C"
];
const Choice_D =[ 
  "Question 1D", 
  "Question 2D", 
  "Question 3D", 
  "Question 4D", 
  "Question 5D", 
  "Question 6D",  
  "Question 7D"
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
    setAnswers(currentAns);
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
        <Button onClick={moveOn}>Submit</Button>


      </Form.Group>
    )
  } else {
    return(
      <p>GPT RESPONSE</p>
    );
  }
}