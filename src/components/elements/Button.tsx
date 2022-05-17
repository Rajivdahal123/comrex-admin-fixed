import React, { ReactNode } from 'react';

type IMainProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button = ({ children, className, onClick }: IMainProps) => (
  <button
    type="button"
    className={`rounded-full py-2 px-6 xs:px-8 bg-primary text-white text-center text-sm xs:text-base font-base-bold
    hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-75 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export { Button };
