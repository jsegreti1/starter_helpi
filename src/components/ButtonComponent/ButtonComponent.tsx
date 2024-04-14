import React from 'react';
import styles from './ButtonComponent.module.css';

interface ButtonComponentProps {
  label: string;
  onClick: () => void;
  isDisabled?: boolean; // Optional prop to handle the disabled state
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ label, onClick, isDisabled }) => {
  // Use the `btn-101` class from your CSS module
  return (
    <button 
      className={styles.fancyButton}
      onClick={onClick} 
      disabled={isDisabled}
    >
      {label}
    </button>
  );
};

export default ButtonComponent;