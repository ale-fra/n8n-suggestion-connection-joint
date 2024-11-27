import React from 'react';

export const TerminalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 16 16" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M2 4L5 7L2 10M6 10H10" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);