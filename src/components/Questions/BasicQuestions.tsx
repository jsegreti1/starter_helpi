import React from 'react';
import { Button } from 'react-bootstrap';

interface BasicQuestionsProps {
  goBack: () => void;
}

const BasicQuestions: React.FC<BasicQuestionsProps> = ({ goBack }) => {
  return (
    <div>
      <p>Basic questions: understanding your future in no time flat.</p>
      <Button onClick={goBack}>Back to Home</Button>
    </div>
  );
};

export default BasicQuestions;
