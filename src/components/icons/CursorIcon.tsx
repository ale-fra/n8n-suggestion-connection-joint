import React from 'react';

export const CursorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 16 16" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M3 2L13 8L7 9L5 14L3 2Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinejoin="round"
    />
  </svg>
);