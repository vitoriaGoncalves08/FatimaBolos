import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#574747] text-white px-4 py-2 rounded-md hover:opacity-90 transition ${className}`}
    >
      {children}
    </button>
  );
};
