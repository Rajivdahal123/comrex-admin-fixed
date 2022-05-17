import { PencilAltIcon } from '@heroicons/react/solid';
import React from 'react';

interface IInputProps {
  type?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  name?: string;
  value?: string;
  onChange?: any;
  onBlur?: any;
}

const CustomInput = ({
  label,
  type,
  className,
  placeholder,
  error,
  helperText,
  name,
  value,
  onChange,
  onBlur,
}: IInputProps) => {
  return (
    <div className="relative mt-10 sm:mt-4 font-regularHN">
      <label htmlFor={name} className="absolute mt-3 block text-md font-medium text-gray-700 -top-6 sm:top-0">
        {label}
      </label>
      <input
        name={name}
        type={type || 'text'}
        placeholder={placeholder}
        className={`${className} ${
          error ? 'border-b border-red-500' : 'border-inputBorder'
        } pt-3 pb-2 sm:pt-3 sm:pb-3 pr-8 mt-1 focus:border-blue-500 focus:outline-none block w-full shadow-sm text-md font-semibold sm:text-normal border-b placeholder-textHolder`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <PencilAltIcon  className="absolute right-1 text-borderColor top-3 h-5 w-5" />
      {error && <div className="text-red-500 text-sm">* {helperText}</div>}
    </div>
  );
};

export default CustomInput;
