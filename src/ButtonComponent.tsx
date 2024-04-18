import React from 'react';
import styles from './ButtonComponent.module.css';

interface ButtonComponentProps {
  text: string;
  onClick: () => void; // Adjust the type signature if necessary for your onClick handler
}
 /* Do I need SVG for animation to play? */
 
 const ButtonComponent: React.FC<ButtonComponentProps> = ({ text, onClick }) => {
  return (
    <button className={styles.fancyButton} onClick={onClick}>
      {text}
      <svg className={styles.buttonSvg} viewBox="0 0 200 100" preserveAspectRatio="none">
        <rect width="200" height="100" fill="transparent" className={styles.buttonRect} />
      </svg>
    </button>
  );
};

export default ButtonComponent;