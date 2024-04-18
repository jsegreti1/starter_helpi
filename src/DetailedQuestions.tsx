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
                  <Form.Label>Please describe your current occupation or status. If you're currently or have previously been a student, please also mention your area of study.</Form.Label>
                    <Form.Control value={answer1} onChange={(e) => setAnswer1(e.target.value)} />
                  <Form.Label>Where do you see yourself living? (urban/rural, rainy/sunny, specific country if applicable, etc.)</Form.Label>
                    <Form.Control value={answer2} onChange={(e) => setAnswer2(e.target.value)} />
                  <Form.Label>Currently, what are your top passions? Subjects which you feel like you’d be interested in can also be included. </Form.Label>
                    <Form.Control value={answer3} onChange={(e) => setAnswer3(e.target.value)} />
                  <Form.Label>What’s a project or accomplishment you’re really proud of? </Form.Label>
                    <Form.Control value={answer4} onChange={(e) => setAnswer4(e.target.value)} />
                  <Form.Label>Question 5: Imagine your perfect workplace. Describe it in detail, including the environment, the culture, the people, and any features that would make it perfect for you.</Form.Label>
                    <Form.Control value={answer5} onChange={(e) => setAnswer5(e.target.value)} />
                  <Form.Label>Question 6: What do you not want in a job?</Form.Label>
                    <Form.Control value={answer6} onChange={(e) => setAnswer6(e.target.value)} />
                  <Form.Label>Question 7: If you had multiple and similar job offers currently, what factors would you prioritize? (e.g., job stability, work-life balance, compensation, benefits, etc.)</Form.Label>
                    <Form.Control value={answer7} onChange={(e) => setAnswer7(e.target.value)} />
          </Form.Group>
      </div>
  );
}