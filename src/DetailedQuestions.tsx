import React, { useState } from "react";
import { Button, Form, ProgressBar, Card, Spinner } from "react-bootstrap";
import OpenAI from 'openai';

/* Most of the code below was generated by ChatGPT 4 */

// Array of prompt questions
const PROMPTS = [ 
  "Please describe your current occupation or status. If you're currently or have previously been a student, please also mention your area of study.",
  "Where do you see yourself living? (urban/rural, rainy/sunny, specific country if applicable, etc.)",
  "Currently, what are your top passions? Subjects which you feel like you’d be interested in can also be included.",
  "What’s a project or accomplishment you’re really proud of?",
  "Imagine your perfect workplace. Describe it in detail, including the environment, the culture, the people, and any features that would make it perfect for you.",
  "What do you not want in a job?",
  "If you had multiple and similar job offers currently, what factors would you prioritize? (e.g., job stability, work-life balance, compensation, benefits, etc.)"
];

// Define props for DetailedQuestions component
interface DetailedQuestionsProps {
  apiKey: string;
}

// DetailedQuestions functional component
export function DetailedQuestions({ apiKey }: DetailedQuestionsProps): JSX.Element {
  const [answers, setAnswers] = useState<Array<string>>([]);
  const [currentAns, setCurrentAns] = useState<string>("");
  const [qNum, setQNum] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [gptResponse, setGptResponse] = useState<string>("");

  // Handle submission of current answer and proceed to next question
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

  // Bold GPT headers in the response
  function boldGPTHeaders(response: string): string{
    return response.split("**").map((part, index) => index % 2 === 0 ? part : `<b>${part}</b>`).join("");
  }

  // Restart the quiz
  function restartQuiz(){
    setAnswers([]);
    setFinished(false);
    setQNum(0);
    setGptResponse("");
    setCurrentAns("");
}

// Refresh GPT response
function refreshGPT(){
  setGptResponse("");
  setLoading(true);
  submitAnswersToGPT(answers);
}

  // Submit answers to GPT and get response
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

      const responseText = boldGPTHeaders(chatCompletion.choices[0].message.content || "");
      setGptResponse(responseText);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      alert('Failed to fetch response from OpenAI.');
    }
    setLoading(false);  // End loading
  }

  // Render the quiz form if not finished
  return (
    <Form>
      {!finished ? (
        <>
        <Card className="frosted-glass2 detailedq-container" text="black" style={{ borderRadius: '15px',fontSize: '24px' }}>
          {/* <Form.Group> */}
            <Card.Header>{PROMPTS[qNum]}</Card.Header>
            <Form.Control
              as="textarea"
              value={currentAns}
              onChange={(event) => setCurrentAns(event.target.value)}
            />
          {/* </Form.Group> */}
          <ProgressBar
            striped
            animated
            now={((qNum+1) / PROMPTS.length) * 100}
            label={`${qNum + 1}/${PROMPTS.length}`}
            style={{ marginTop: '20px', height: '30px', width: '100%' }}
          />
          <div className="header-button-container">
          <Button variant="outline-dark" onClick={handleSubmit} style={{margin: "10px", width: "120px"}}>
            {qNum === PROMPTS.length - 1 ? 'Submit' : 'Next'}
          </Button>
          </div>
          </Card>
        </>
      ) : loading ? (
          <Card className="mt-3 shadow-lg frosted-glass detailedq-container" text="dark" style={{ width: '100%', margin: '0 auto' }}>
            <Card.Header as="h5" className="text-center" style={{ fontSize: '48px'}}>
              Getting results...
            </Card.Header>
            <Card.Body>
              <Card.Text as="div">
                <div className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="sr-only"></span>
                  </Spinner>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>

      ) : (
        // Render the GPT response after loading
        <><Card className="mt-3 shadow-lg frosted-glass intro-container" text="black" style={{ borderRadius: '15px' }}>
              <Card.Header as="h5" className="text-center">
                Personalized Response
              </Card.Header>
              <Card.Body>
                <Card.Text as="div">
                  {gptResponse.split('\n').map((item, key) => (
                    <React.Fragment key={key}>
                      <p style={{ marginBottom: '0.5rem' }} dangerouslySetInnerHTML={{ __html: item }} />
                    </React.Fragment>
                  ))}
                </Card.Text>
              </Card.Body>
              <div className="header-button-container">
              <div>
              <Button variant="outline-dark" style={{width: "150px"}} onClick={()=>restartQuiz()}>Take Quiz Again</Button>
              </div>
              <div>
              <Button variant="outline-dark" style={{margin: "5px", width: "230px"}} onClick={()=>refreshGPT()}>Generate a New Response</Button>
              </div>
              </div>
              </Card></>
      )}
    </Form>
  );
}
