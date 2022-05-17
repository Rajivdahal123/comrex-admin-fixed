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

const Input = ({
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
    <div className="font-regularHN">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        name={name}
        type={type || 'text'}
        placeholder={placeholder}
        className={`${className} ${
          error ? 'border border-red-500' : 'border-inputBorder'
        } py-2.5 px-3 focus:border-blue-500 focus:outline-none block w-full shadow-sm sm:text-base border rounded-md placeholder-textHolder`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className="text-red-500 text-sm">* {helperText}</div>}
    </div>
  );
};

export default Input;
