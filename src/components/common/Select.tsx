import React, { useRef } from 'react';

import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import usePopup from '../../hooks/usePopup';

interface Option {
  label?: string;
  value: string;
}

interface ISelectProps {
  options: Option[];
  value: string;
  onChange: any;
  placeholder?: string;
}

const Select = ({ options, value, onChange, placeholder }: ISelectProps) => {
  const popupRef = useRef(null);
  const { isOpen, toggleMenu } = usePopup(popupRef);

  return (
    <div className="relative">
      <button className="outline-none p-2" onClick={toggleMenu}>
        {value || placeholder}
        <FontAwesomeIcon className="ml-3" icon={faCaretDown} size="lg" />
      </button>
      {isOpen && (
        <div className="absolute top-full flex flex-col py-1 shadow bg-white w-full right-0 min-w-[120px]">
          {options.map((option, index) => (
            <button
              className={`${
                index < options.length - 1 ? 'border-b' : ''
              } hover:bg-gray-50 outline-none`}
              key={option.value}
              onClick={() => onChange(option.value)}
            >
              <div className="px-5 py-1">{option.label}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
