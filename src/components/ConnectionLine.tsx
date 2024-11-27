import React from 'react';
import { Point, Block } from '../types/workflow';
import { calculatePath } from '../utils/pathFinding';

interface ConnectionLineProps {
  start: Point;
  end: Point;
  sourceBlock: Block;
  targetBlock: Block;
  blocks: Block[];
  isSelected?: boolean;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  start,
  end,
  sourceBlock,
  targetBlock,
  blocks,
  isSelected,
}) => {
  const path = calculatePath(start, end, sourceBlock, targetBlock, blocks);
  const mainColor = isSelected ? '#64B5F6' : '#4CAF50';
  
  return (
    <g className="pointer-events-none">
      {/* Connection Path with glow effect */}
      <path
        d={path}
        stroke={mainColor}
        strokeWidth="8"
        strokeOpacity="0.2"
        fill="none"
        className="transition-all duration-200"
      />
      <path
        d={path}
        stroke={mainColor}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all duration-200"
      />
      
      {/* Flow Label */}
      <text
        x={(start.x + end.x) / 2}
        y={(start.y + end.y) / 2 - 10}
        textAnchor="middle"
        fill={mainColor}
        fontSize="12"
        fontFamily="Inter, sans-serif"
        className="select-none"
      >
        1 item
      </text>

      {/* Arrow marker */}
      <defs>
        <marker
          id={`arrow-${isSelected ? 'selected' : 'normal'}`}
          viewBox="0 0 12 12"
          refX="10"
          refY="6"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path
            d="M 0 0 L 12 6 L 0 12 z"
            fill={mainColor}
          />
        </marker>
      </defs>
      
      {/* Arrow line */}
      <path
        d={path}
        stroke={mainColor}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd={`url(#arrow-${isSelected ? 'selected' : 'normal'})`}
        className="transition-all duration-200"
      />
    </g>
  );
}