import React from 'react';
import { Joint } from './Joint';
import { ConnectionLine } from './ConnectionLine';
import { Point, Block } from '../types/workflow';

interface ConnectorProps {
  start: Point;
  end: Point;
  sourceBlock: Block;
  targetBlock: Block;
  blocks: Block[];
  onStartChange: (position: Point) => void;
  onEndChange: (position: Point) => void;
  selectedJointId: string | null;
  onJointSelect: (jointId: string | null) => void;
}

export const Connector: React.FC<ConnectorProps> = ({
  start,
  end,
  sourceBlock,
  targetBlock,
  blocks,
  onStartChange,
  onEndChange,
  selectedJointId,
  onJointSelect,
}) => {
  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <ConnectionLine
        start={start}
        end={end}
        sourceBlock={sourceBlock}
        targetBlock={targetBlock}
        blocks={blocks}
        isSelected={selectedJointId !== null}
      />
      
      <g className="pointer-events-auto">
        <Joint
          id={`${sourceBlock.id}-output`}
          type="output"
          position={start}
          block={sourceBlock}
          isSelected={selectedJointId === `${sourceBlock.id}-output`}
          onPositionChange={onStartChange}
          onSelect={() => onJointSelect(`${sourceBlock.id}-output`)}
        />
        
        <Joint
          id={`${targetBlock.id}-input`}
          type="input"
          position={end}
          block={targetBlock}
          isSelected={selectedJointId === `${targetBlock.id}-input`}
          onPositionChange={onEndChange}
          onSelect={() => onJointSelect(`${targetBlock.id}-input`)}
        />
      </g>
    </svg>
  );
}