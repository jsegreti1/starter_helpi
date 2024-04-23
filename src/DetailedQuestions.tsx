import React from "react";
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

export function DetailedQuestions(): JSX.Element { 
  const [answers, setAnswers] = useState<string>("");
  const [currentAns, setCurrentAns] = useState<string>("");
  const [prompt, setPrompt] = useState<string>(PROMPTS[0]);
  const [qNum, setQNum] = useState<number>(1);
  const [finished, setFinished] = useState<boolean>(false);

  function moveOn() {
    if(currentAns === ""){
      return;
    }
    setAnswers(answers + " ; " + currentAns);
    setCurrentAns("");
    setPrompt(PROMPTS[qNum]);
    setQNum(qNum+1);
    if(qNum === 7){
      setFinished(true);
    }

  }
  if(!finished){
    return(
      <Form.Group>
        <Form.Label>{prompt}</Form.Label>
        <Form.Control
          value={currentAns}
          onChange={(
          event: React.ChangeEvent<HTMLInputElement>
          ) => setCurrentAns(event.target.value)}
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