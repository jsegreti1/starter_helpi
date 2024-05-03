import React, { useState } from "react";
import { Button, Form, ProgressBar, Card, Spinner } from "react-bootstrap";
import OpenAI from 'openai';


const PROMPTS = [
  "Please describe your current occupation or status. If you're currently or have previously been a student, please also mention your area of study.",
  "Where do you see yourself living? (urban/rural, rainy/sunny, specific country if applicable, etc.)",
  "Currently, what are your top passions? Subjects which you feel like you’d be interested in can also be included.",
  "What’s a project or accomplishment you’re really proud of?",
  "Imagine your perfect workplace. Describe it in detail, including the environment, the culture, the people, and any features that would make it perfect for you.",
  "What do you not want in a job?",
  "If you had multiple and similar job offers currently, what factors would you prioritize? (e.g., job stability, work-life balance, compensation, benefits, etc.)"
];

interface DetailedQuestionsProps {
  apiKey: string;
}

export function DetailedQuestions({ apiKey }: DetailedQuestionsProps): JSX.Element {
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [currentAns, setCurrentAns] = useState<string>("");
  const [qNum, setQNum] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
      submitAnswersToGPT(newAnswers);
    } else {
      setAnswers(newAnswers);
      setQNum(qNum + 1);
    }
  }

  async function submitAnswersToGPT(allAnswers: string[]) {
    setLoading(true);  // Start loading
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });

    const promptText = allAnswers.join('\n');

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
          {role: "system", content: "Tell me details about your life and I will return a list of 5 careers that seems like a good fit for you."},
          {role: "user", content: promptText}
        ],
      });

      const responseText = chatCompletion.choices[0].message.content || "";
      setGptResponse(responseText);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      alert('Failed to fetch response from OpenAI.');
    }
    setLoading(false);  // End loading
  }

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
            Next
          </Button>
        </>
      ) : loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      ) : (
        <Card className="mt-3 shadow-lg" bg="primary" text="white" style={{ borderRadius: '15px' }}>
          <Card.Header as="h5" className="text-center">
            Personalized Response
          </Card.Header>
          <Card.Body>
            <Card.Text as="div">
              {gptResponse.split('\n').map((item, key) => (
                <React.Fragment key={key}>
                  <p style={{ marginBottom: '0.5rem' }}>{item}</p>
                </React.Fragment>
              ))}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </Form>
  );
}
