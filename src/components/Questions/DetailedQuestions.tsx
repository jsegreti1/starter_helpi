import React from 'react';
import { Button } from 'react-bootstrap';

interface DetailedQuestionsProps {
  goBack: () => void;
}

const DetailedQuestions: React.FC<DetailedQuestionsProps> = ({ goBack }) => {
  return (
    <div>
      <p>Detailed questions. No such thing as overthinking your future.</p>
      <Button onClick={goBack}>Back to Home</Button>
    </div>
  );
};

export default DetailedQuestions;
