import React from 'react';
import './titlehome.css';

export const TitleHome = () => {
  const words = ["Bolos", "Tortas", "Salgados", "Pudins", "Doces"];

  return (
    <h1 className="title-home">
      <div className="rotating-words">
        {words.map((word, index) => (
          <span key={index} className="word">{word}</span>
        ))}
      </div>
      {" "}feitos com carinho, lembrados pelo sabor!
    </h1>
  );
};