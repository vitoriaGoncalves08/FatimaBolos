import React from 'react';
import './button.css';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'iconLeft' | 'iconRight';
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  icon,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      className={`btn ${variant} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {variant === 'iconLeft' && icon && <span className="btn-icon left">{icon}</span>}
      <span>{children}</span>
      {variant === 'iconRight' && icon && <span className="btn-icon right">{icon}</span>}
    </button>
  );
};
