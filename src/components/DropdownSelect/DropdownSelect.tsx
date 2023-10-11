import React from 'react';

interface DropdownSelectProps {
  value: string;
  options: string[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DropdownSelect: React.FC<DropdownSelectProps> = ({ value, options, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropdownSelect;