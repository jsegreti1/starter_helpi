import React, { useState } from "react";
import { Button, Card, Form, ProgressBar, Spinner } from "react-bootstrap";
import OpenAI from 'openai'; // Make sure you have the openai package installed
import './styles.css';

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
  const [loading, setLoading] = useState<boolean>(true);

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

  function restartQuiz(){
      setAnswers([]);
      setFinished(false);
      setQNum(0);
      setGptResponse("");
      setCurrentAns("");
  }
  function refreshGPT(){
    setGptResponse("");
    setLoading(true);
    submitAnswersToGPT(answers);
  }

  function formatGPTResponse(response: string): string {
    const sections = response.split("**").map((part, index) => {
      if (index % 2 !== 0) {  
        return `<b>${part.trim().replace(/:$/, '')}</b><br>`;
      } else {
        return part.replace(/^:\s*/, "");
      }
    });
    return sections.join("");
  }

  async function submitAnswersToGPT(allAnswers: string[]) {
    setLoading(true); // Start loading

    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });

    const promptText = allAnswers.join('\n');

    try {
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
          {role: "system", content: "Tell me details about your life and I will return only a list of 5 careers that seems like a good fit for you, along with a short description of how it fits you.."},
          {role: "user", content: promptText}
        ],
      });

      const responseText = formatGPTResponse(chatCompletion.choices[0].message.content || "");
      setGptResponse(responseText);

    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      alert('Failed to fetch response from OpenAI.');
      setLoading(false);
    }
    setLoading(false);  // End loading
  }

  if (!finished) {
    return (
      <Card className="frosted-glass2 basicq-container" text="black" style={{ borderRadius: '15px' ,fontSize: '24px' }}>
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
          now={((qNum+1) / PROMPTS.length) * 100}
          label={`${qNum+1}/${PROMPTS.length}`}
          style={{ marginTop: '20px', height: '30px', width: '100%' }}
        />
        <div className="header-button-container">
        <Button variant="outline-dark" onClick={handleSubmit} style={{margin: "10px", width: "120px"}}>
          {qNum === PROMPTS.length - 1 ? 'Submit' : 'Next'}
        </Button>
        </div>
      </Form>
      </Card>
    );
  } else {
    if(loading){
      return(
        <Card className="mt-3 shadow-lg frosted-glass basicq-container" text="dark" style={{ width: '100%', margin: '0 auto' }}>
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

    );
    }else{
    return (
      <div>
        <Card className="mt-3 shadow-lg frosted-glass2 intro-container" text="dark" style={{ width: '70%', margin: '0 auto' }}>
          <Card.Header as="h5" className="text-center">
            Quiz Results
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
        </Card>
      </div>
    );
  }
  }
}
