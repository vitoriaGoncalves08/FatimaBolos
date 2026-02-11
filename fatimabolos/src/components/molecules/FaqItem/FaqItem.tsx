import React from 'react';
import './faqItem.css';

interface FaqItemProps {
  id: number;
  question: string;
  answer: string;
  isActive: boolean;
  onClick: () => void;
}

export const FaqItem: React.FC<FaqItemProps> = ({
  id,
  question,
  answer,
  isActive,
  onClick
}) => {
  return (
    <div className={`faq-item ${isActive ? 'active' : ''}`}>
      <button 
        className="faq-question"
        onClick={onClick}
        aria-expanded={isActive}
        aria-controls={`faq-answer-${id}`}
      >
        <span className="faq-icon">
          {isActive ? '−' : '+'}
        </span>
        <span className="faq-question-text">{question}</span>
      </button>
      
      <div 
        id={`faq-answer-${id}`}
        className={`faq-answer ${isActive ? 'show' : ''}`}
        aria-hidden={!isActive}
      >
        <p className="faq-answer-text">{answer}</p>
      </div>
    </div>
  );
};
