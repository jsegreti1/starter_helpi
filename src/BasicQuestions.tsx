import React, { useState } from "react";
import { Button, Form, ProgressBar } from "react-bootstrap";
import OpenAI from 'openai'; // Make sure you have the openai package installed

const PROMPTS =[ 
  "What is your employment status?", 
  "Where would you prefer to work?", 
  "What type of problem solver are you?", 
  "What type of work environment do you prefer?", 
  "Which of these areas would you say interest you the most?", 
  "Do you prefer leadership positions?",  
  "How important is work-life balance to you?"
];
const CHOICES = [
  ["Not employed", "On USA's East Coast", "A creative and innovative approach", "Prefer working independently", "Technology and Engineering", "Comfortable without leadership responsibilities", "Not important"],
  ["Student, in high school or below", "On USA's West Coast", "A logical and systematic approach", "Prefer small teams or partnerships", "Arts and Design", "Want to lead small projects/teams", "Somewhat important"],
  ["Student, in undergraduate studies or above", "In USA's Midwest, Gulf, or South regions", "A hands-on and practical approach", "Prefer large, collaborative teams", "Science and Research", "Want to work in managerial role", "Mostly important"],
  ["Currently employed", "Outside the continental USA", "A mix of creativity and logic", "Very dynamic with frequent changes", "Business and Management", "Want to eventually be a top executive", "Top priority"]
];

interface BasicQuestionsProps {
  apiKey: string;
}

export function BasicQuestions({ apiKey }: BasicQuestionsProps): JSX.Element {
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAns, setCurrentAns] = useState<string>("");
  const [qNum, setQNum] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [gptResponse, setGptResponse] = useState<string>("");

  function updateCurrent(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentAns(event.target.value);
  }

  function handleSubmit() {
    if (currentAns === "") {
      alert("Please select an option.");
      return;
    }
    const newAnswers = [...answers, currentAns];
    if (qNum === PROMPTS.length - 1) {
      setFinished(true);
      submitAnswersToGPT(newAnswers);
    } else {
      setAnswers(newAnswers);
      setCurrentAns(""); // Reset current answer
      setQNum(qNum + 1);
    }
  }

  async function submitAnswersToGPT(allAnswers: string[]) {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });

    const promptText = allAnswers.join('\n');
    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [{role: "user", content: promptText}],
      });
      const responseText = chatCompletion.choices[0].message.content || "";
      setGptResponse(responseText);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      alert('Failed to fetch response from OpenAI.');
    }
  }

  if (!finished) {
    return (
      <Form>
        <Form.Group>
          <Form.Label>{PROMPTS[qNum]}</Form.Label>
          {CHOICES.map((choice, index) => (
            <Form.Check
              key={index}
              type="radio"
              name={`question-${qNum}`}
              id={`choice-${index}`}
              label={choice[qNum]}
              value={choice[qNum]}
              checked={currentAns === choice[qNum]}
              onChange={updateCurrent}
            />
          ))}
        </Form.Group>
        <ProgressBar
          striped
          animated
          now={((qNum) / PROMPTS.length) * 100}
          label={`${qNum}/${PROMPTS.length}`}
          style={{ marginTop: '20px', height: '30px', width: '100%' }}
        />
        <Button variant="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
          {qNum === PROMPTS.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </Form>
    );
  } else {
    return (
      <div>
        <p>Answers submitted. Here's the response from GPT:</p>
        <p>{gptResponse}</p>
      </div>
    );
  }
}
