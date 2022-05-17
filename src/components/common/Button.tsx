import React from 'react';

interface IButtonProps {
  label?: string;
  onClick?: any;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  leftIcon?: any;
  rightIcon?: any;
  disabled?: boolean;
}

const Button = ({ label, type, onClick, className, leftIcon, rightIcon, disabled }: IButtonProps) => {
  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      className={`border rounded-md px-4 py-2.5 outline-none sm:w-auto ${disabled ? 'cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
    >
      {leftIcon}
      {label}
      {rightIcon}
    </button>
  );
};

export default Button;
