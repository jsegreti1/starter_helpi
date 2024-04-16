import { useState } from "react";
import { Form } from "react-bootstrap";

export function BasicQuestions(): JSX.Element {
  const [answer1, setAnswer1] = useState<string>(""); 
  const [answer2, setAnswer2] = useState<string>("");
  const [answer3, setAnswer3] = useState<string>("");
  const [answer4, setAnswer4] = useState<string>("");
  const [answer5, setAnswer5] = useState<string>("");
  const [answer6, setAnswer6] = useState<string>("");
  const [answer7, setAnswer7] = useState<string>("");
  
  function updateAnswer1(event:  React.ChangeEvent<HTMLInputElement>){
    setAnswer1(event.target.value);
  }
  function updateAnswer2(event:  React.ChangeEvent<HTMLInputElement>){
    setAnswer2(event.target.value);
  }
  function updateAnswer3(event:  React.ChangeEvent<HTMLInputElement>){
    setAnswer3(event.target.value);
  }
  function updateAnswer4(event:  React.ChangeEvent<HTMLInputElement>){
    setAnswer4(event.target.value);
  }
  function updateAnswer5(event:  React.ChangeEvent<HTMLInputElement>){
    setAnswer5(event.target.value);
  }
  function updateAnswer6(event:  React.ChangeEvent<HTMLInputElement>){
    setAnswer6(event.target.value);
  }
  function updateAnswer7(event:  React.ChangeEvent<HTMLInputElement>){
    setAnswer7(event.target.value);
  }

  return (
      <div>
          <Form.Group>
            <Form.Label>Basic Career Cuiz</Form.Label>
            <p>For users that are starting their career exploration journey and those that are unsure: A simple and easy cuiz to get your journey started!</p>
            <Form.Group>
            <Form.Label>Question 1:</Form.Label>
                  <Form.Check
                      type="radio"
                      name="A"
                      id="A"
                      label="A"
                      value="A"
                      onChange={updateAnswer1}
                      checked={answer1 === "A"}
                  />
                  <Form.Check
                      type="radio"
                      name="B"
                      id="B"
                      label="B"
                      value="B"
                      onChange={updateAnswer1}
                      checked={answer1 === "B"}
                  />
                  <Form.Check
                      type="radio"
                      name="C"
                      id="C"
                      label="C"
                      value="C"
                      onChange={updateAnswer1}
                      checked={answer1 === "C"}
                  />
                  <Form.Check
                      type="radio"
                      name="D"
                      id="D"
                      label="D"
                      value="D"
                      onChange={updateAnswer1}
                      checked={answer1 === "D"}
                  />
            </Form.Group>
            <Form.Group>
            <Form.Label>Question 2:</Form.Label>
                  <Form.Check
                      type="radio"
                      name="A"
                      id="A"
                      label="A"
                      value="A"
                      onChange={updateAnswer2}
                      checked={answer2 === "A"}
                  />
                  <Form.Check
                      type="radio"
                      name="B"
                      id="B"
                      label="B"
                      value="B"
                      onChange={updateAnswer2}
                      checked={answer2 === "B"}
                  />
                  <Form.Check
                      type="radio"
                      name="C"
                      id="C"
                      label="C"
                      value="C"
                      onChange={updateAnswer2}
                      checked={answer2 === "C"}
                  />
                  <Form.Check
                      type="radio"
                      name="D"
                      id="D"
                      label="D"
                      value="D"
                      onChange={updateAnswer2}
                      checked={answer2 === "D"}
                  />
            </Form.Group>
            <Form.Group>
            <Form.Label>Question 3:</Form.Label>
                  <Form.Check
                      type="radio"
                      name="A"
                      id="A"
                      label="A"
                      value="A"
                      onChange={updateAnswer3}
                      checked={answer3 === "A"}
                  />
                  <Form.Check
                      type="radio"
                      name="B"
                      id="B"
                      label="B"
                      value="B"
                      onChange={updateAnswer3}
                      checked={answer3 === "B"}
                  />
                  <Form.Check
                      type="radio"
                      name="C"
                      id="C"
                      label="C"
                      value="C"
                      onChange={updateAnswer3}
                      checked={answer3 === "C"}
                  />
                  <Form.Check
                      type="radio"
                      name="D"
                      id="D"
                      label="D"
                      value="D"
                      onChange={updateAnswer3}
                      checked={answer3 === "D"}
                  />
            </Form.Group>
            <Form.Group>
            <Form.Label>Question 4:</Form.Label>
                  <Form.Check
                      type="radio"
                      name="A"
                      id="A"
                      label="A"
                      value="A"
                      onChange={updateAnswer4}
                      checked={answer4 === "A"}
                  />
                  <Form.Check
                      type="radio"
                      name="B"
                      id="B"
                      label="B"
                      value="B"
                      onChange={updateAnswer4}
                      checked={answer4 === "B"}
                  />
                  <Form.Check
                      type="radio"
                      name="C"
                      id="C"
                      label="C"
                      value="C"
                      onChange={updateAnswer4}
                      checked={answer4 === "C"}
                  />
                  <Form.Check
                      type="radio"
                      name="D"
                      id="D"
                      label="D"
                      value="D"
                      onChange={updateAnswer4}
                      checked={answer4 === "D"}
                  />
            </Form.Group>
            <Form.Group>
            <Form.Label>Question 5:</Form.Label>
                  <Form.Check
                      type="radio"
                      name="A"
                      id="A"
                      label="A"
                      value="A"
                      onChange={updateAnswer5}
                      checked={answer5 === "A"}
                  />
                  <Form.Check
                      type="radio"
                      name="B"
                      id="B"
                      label="B"
                      value="B"
                      onChange={updateAnswer5}
                      checked={answer5 === "B"}
                  />
                  <Form.Check
                      type="radio"
                      name="C"
                      id="C"
                      label="C"
                      value="C"
                      onChange={updateAnswer5}
                      checked={answer5 === "C"}
                  />
                  <Form.Check
                      type="radio"
                      name="D"
                      id="D"
                      label="D"
                      value="D"
                      onChange={updateAnswer5}
                      checked={answer5 === "D"}
                  />
            </Form.Group>
            <Form.Group>
            <Form.Label>Question 6:</Form.Label>
                  <Form.Check
                      type="radio"
                      name="A"
                      id="A"
                      label="A"
                      value="A"
                      onChange={updateAnswer6}
                      checked={answer6 === "A"}
                  />
                  <Form.Check
                      type="radio"
                      name="B"
                      id="B"
                      label="B"
                      value="B"
                      onChange={updateAnswer6}
                      checked={answer6 === "B"}
                  />
                  <Form.Check
                      type="radio"
                      name="C"
                      id="C"
                      label="C"
                      value="C"
                      onChange={updateAnswer6}
                      checked={answer6 === "C"}
                  />
                  <Form.Check
                      type="radio"
                      name="D"
                      id="D"
                      label="D"
                      value="D"
                      onChange={updateAnswer6}
                      checked={answer6 === "D"}
                  />
            </Form.Group>
            <Form.Group>
            <Form.Label>Question 7:</Form.Label>
                  <Form.Check
                      type="radio"
                      name="A"
                      id="A"
                      label="A"
                      value="A"
                      onChange={updateAnswer7}
                      checked={answer7 === "A"}
                  />
                  <Form.Check
                      type="radio"
                      name="B"
                      id="B"
                      label="B"
                      value="B"
                      onChange={updateAnswer7}
                      checked={answer7 === "B"}
                  />
                  <Form.Check
                      type="radio"
                      name="C"
                      id="C"
                      label="C"
                      value="C"
                      onChange={updateAnswer7}
                      checked={answer7 === "C"}
                  />
                  <Form.Check
                      type="radio"
                      name="D"
                      id="D"
                      label="D"
                      value="D"
                      onChange={updateAnswer7}
                      checked={answer7 === "D"}
                  />
            </Form.Group> 
          </Form.Group>
      </div>
  );
}