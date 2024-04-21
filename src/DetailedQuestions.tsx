import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";

export function DetailedQuestions(props: { onChange: (answers: string[], index: number) => void }): JSX.Element {
  const [answers, setAnswers] = useState<string[]>(new Array(7).fill(""));

  const handleChange = (value: string, index: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
    props.onChange(updatedAnswers, index);
  };

  return (
    <div>
      <Form.Group>
        <Form.Label>Detailed Career Quiz</Form.Label>
        <p>For users that have an idea of what they want to do or are looking for new opportunities in an established career field: A more personalized career quiz!</p>
        {["Please describe your current occupation or status. If you're currently or have previously been a student, please also mention your area of study.",
          "Where do you see yourself living? (urban/rural, rainy/sunny, specific country if applicable, etc.)",
          "Currently, what are your top passions? Subjects which you feel like you’d be interested in can also be included.",
          "What’s a project or accomplishment you’re really proud of?",
          "Imagine your perfect workplace. Describe it in detail, including the environment, the culture, the people, and any features that would make it perfect for you.",
          "What do you not want in a job?",
          "If you had multiple and similar job offers currently, what factors would you prioritize? (e.g., job stability, work-life balance, compensation, benefits, etc.)"].map((label, index) => (
          <React.Fragment key={index}>
            <Form.Label>{label}</Form.Label>
            <Form.Control value={answers[index]} onChange={(e) => handleChange(e.target.value, index)} />
          </React.Fragment>
        ))}
      </Form.Group>
    </div>
  );
}
