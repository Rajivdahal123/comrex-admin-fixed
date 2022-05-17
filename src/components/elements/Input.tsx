import React, { ChangeEventHandler } from 'react';

type IMainProps = {
  className?: string;
  placeholder: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: string;
};

const Input = ({
  className, placeholder, onChange, type,
}: IMainProps) => (
  <input
    type={`${type || 'input'}`}
    className={`w-full rounded-full border border-gray-spec-2 h-10 py-1 px-5 text-sm sm:text-sm lg:text-lg
    focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-transparent ${className}`}
    placeholder={placeholder}
    onChange={onChange}
  />
);

export { Input };
