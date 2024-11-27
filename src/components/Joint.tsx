import React, { useEffect } from 'react';
import { Point, Block } from '../types/workflow';
import { useJointDrag } from '../hooks/useJointDrag';

interface JointProps {
  id: string;
  type: 'input' | 'output';
  position: Point;
  block: Block;
  isSelected?: boolean;
  onPositionChange: (position: Point) => void;
  onSelect: () => void;
}

export const Joint: React.FC<JointProps> = ({
  type,
  position,
  block,
  isSelected,
  onPositionChange,
  onSelect,
}) => {
  const { isDragging, handleDragStart, handleDrag, handleDragEnd } = useJointDrag({
    onPositionChange,
    block,
    type,
  });

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDrag);
      window.addEventListener('mouseup', handleDragEnd);
      return () => {
        window.removeEventListener('mousemove', handleDrag);
        window.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [isDragging, handleDrag, handleDragEnd]);

  const mainColor = isSelected ? '#64B5F6' : '#4CAF50';
  const hoverColor = isSelected ? '#90CAF9' : '#66BB6A';
  const glowColor = isSelected ? '#1E88E5' : '#43A047';

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      onMouseDown={(e) => {
        onSelect();
        handleDragStart(e);
      }}
      style={{ cursor: 'move' }}
      className="group"
    >
      {/* Glow effect */}
      <circle
        r="16"
        fill={glowColor}
        className={`opacity-0 group-hover:opacity-10 transition-all duration-200
          ${isDragging || isSelected ? '!opacity-20' : ''}`}
      />
      
      {/* Hover ring */}
      <circle
        r="12"
        stroke={hoverColor}
        strokeWidth="2"
        fill="transparent"
        className={`opacity-0 group-hover:opacity-50 transition-all duration-200
          ${isDragging || isSelected ? '!opacity-75' : ''}`}
      />

      {/* Main joint shape */}
      {type === 'input' ? (
        <rect
          x="-5"
          y="-5"
          width="10"
          height="10"
          fill={mainColor}
          className={`transition-all duration-200 ${
            isDragging ? 'scale-125' : ''
          }`}
        />
      ) : (
        <circle
          r="5"
          fill={mainColor}
          className={`transition-all duration-200 ${
            isDragging ? 'scale-125' : ''
          }`}
        />
      )}
    </g>
  );
}