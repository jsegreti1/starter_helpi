import { useState } from "react";
import { Form } from "react-bootstrap";

export function DetailedQuestions(): JSX.Element {
  const [answer1, setAnswer1] = useState<string>(""); 
  const [answer2, setAnswer2] = useState<string>("");
  const [answer3, setAnswer3] = useState<string>("");
  const [answer4, setAnswer4] = useState<string>("");
  const [answer5, setAnswer5] = useState<string>("");
  const [answer6, setAnswer6] = useState<string>("");
  const [answer7, setAnswer7] = useState<string>("");

  return (
      <div>
          <Form.Group>
              <Form.Label>Detailed Career Cuiz</Form.Label>
              <p>For users that have an idea of what they want to do or are looking for new opportunities in an established career field: A more personalized career cuiz!</p>
                  <Form.Label>Question 1:</Form.Label>
                    <Form.Control value={answer1} onChange={() => setAnswer1(answer1)} />
                  <Form.Label>Question 2:</Form.Label>
                    <Form.Control value={answer2} onChange={() => setAnswer2(answer2)} />
                  <Form.Label>Question 3:</Form.Label>
                    <Form.Control value={answer3} onChange={() => setAnswer3(answer3)} />
                  <Form.Label>Question 4:</Form.Label>
                    <Form.Control value={answer4} onChange={() => setAnswer4(answer4)} />
                  <Form.Label>Question 5:</Form.Label>
                    <Form.Control value={answer5} onChange={() => setAnswer5(answer5)} />
                  <Form.Label>Question 6:</Form.Label>
                    <Form.Control value={answer6} onChange={() => setAnswer6(answer6)} />
                  <Form.Label>Question 7:</Form.Label>
                    <Form.Control value={answer7} onChange={() => setAnswer7(answer7)} />
          </Form.Group>
      </div>
  );
}