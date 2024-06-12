import { useState } from 'react';

import { Fa1 } from "react-icons/fa6";

const AccordionItem = ({ label, content, labelStartIcon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex items-center justify-between p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {labelStartIcon && <span className="mr-20">{labelStartIcon}</span>}
          <span className="text-lg font-medium">{label}</span>
        </div>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && <div className="p-3">{content}</div>}
    </div>
  );
};

const Accordion = ({ items }) => {
  return (
    <div className="border border-gray-200 rounded-md">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          label={item.label}
          content={item.content}
          labelStartIcon={item.labelStartIcon}
        />
      ))}
    </div>
  );
};

export default Accordion;