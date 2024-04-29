import React, { useState } from "react";
import { Button, Form, ProgressBar } from "react-bootstrap";
import axios from 'axios'; // Ensure you have axios installed: npm install axios



const PROMPTS = [
  "Please describe your current occupation or status. If you're currently or have previously been a student, please also mention your area of study.",
  "Where do you see yourself living? (urban/rural, rainy/sunny, specific country if applicable, etc.)",
  "Currently, what are your top passions? Subjects which you feel like you’d be interested in can also be included. ",
  "What’s a project or accomplishment you’re really proud of? ",
  "Imagine your perfect workplace. Describe it in detail, including the environment, the culture, the people, and any features that would make it perfect for you.",
  "What do you not want in a job?",
  "If you had multiple and similar job offers currently, what factors would you prioritize? (e.g., job stability, work-life balance, compensation, benefits, etc.)"
];

interface DetailedQuestionsProps {
  apiKey: string;
}

export function DetailedQuestions(props: DetailedQuestionsProps): JSX.Element {
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [currentAns, setCurrentAns] = useState<string>("");
  const [qNum, setQNum] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [gptResponse, setGptResponse] = useState<string>("");

  function handleSubmit() {
    if (currentAns === "") {
      alert("Please enter an answer.");
      return;
    }
    const newAnswers = [...answers, currentAns];
    setCurrentAns("");
    if (qNum === PROMPTS.length - 1) {
      setFinished(true);
      // submitAnswersToGPT(newAnswers);
    } else {
      setAnswers(newAnswers);
      setQNum(qNum + 1);
    }
  }
/*
  async function submitAnswersToGPT(allAnswers: string[]) {
    const promptText = allAnswers.join('\n');
    try {
       const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      
      model: "gpt-4",
        messages: [{role: "user", content: promptText}],
      }, {
        headers: {
          'Authorization': `Bearer ${props.apiKey}`,
          'Content-Type': 'application/json'
        }y
      });
      setGptResponse(response.data.choices[0].message.content);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      alert('Failed to fetch response from OpenAI.');
    }
  }
*/
  return (
    <Form>
      {!finished ? (
        <>
          <Form.Group>
            <Form.Label>{PROMPTS[qNum]}</Form.Label>
            <Form.Control
              as="textarea"
              value={currentAns}
              onChange={(event) => setCurrentAns(event.target.value)}
            />
          </Form.Group>

          <ProgressBar
            striped
            animated
            now={(qNum / PROMPTS.length) * 100}
            label={`${qNum + 1}/${PROMPTS.length}`}
            style={{ marginTop: '20px', height: '30px', width: '100%' }}
          />

          <Button variant="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
            Submit
          </Button>
        </>
      ) : (
        <div>
          <p>Answers submitted. Here's the response from GPT:</p>
          <p>{gptResponse}</p>
        </div>
      )}
    </Form>
  );
}
