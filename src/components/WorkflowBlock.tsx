import React from 'react';
import { Zap, GitBranch } from 'lucide-react';
import { CursorIcon } from './icons/CursorIcon';
import { TerminalIcon } from './icons/TerminalIcon';
import { WarningIcon } from './icons/WarningIcon';
import { Block } from '../types/workflow';

interface WorkflowBlockProps {
  block: Block;
  onDragStart: (e: React.MouseEvent) => void;
  onDrag: (e: React.MouseEvent) => void;
  onDragEnd: () => void;
}

export const WorkflowBlock: React.FC<WorkflowBlockProps> = ({
  block,
  onDragStart,
  onDrag,
  onDragEnd,
}) => {
  const { type, title, position, joints } = block;
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        onDrag(e as unknown as React.MouseEvent);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        onDragEnd();
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, onDrag, onDragEnd]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    onDragStart(e);
  };

  const getBlockStyles = () => {
    switch (type) {
      case 'trigger':
        return 'bg-[#F5F5F5] border border-[#E0E0E0] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-2 before:bg-[#E0E0E0] before:rounded-l-lg';
      case 'if':
        return 'bg-[#424242] border-2 border-[#64B5F6]';
      default:
        return 'bg-[#212121] border-2 border-[#DC3545]';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'trigger':
        return <CursorIcon className="w-8 h-8 text-[#424242]" />;
      case 'if':
        return <GitBranch className="w-8 h-8 text-[#64B5F6]" />;
      default:
        return <TerminalIcon className="w-8 h-8 text-[#DC3545]" />;
    }
  };

  const getTitleColor = () => {
    switch (type) {
      case 'trigger':
        return 'text-[#F5F5F5]';
      case 'if':
        return 'text-[#64B5F6]';
      default:
        return 'text-[#DC3545]';
    }
  };

  const renderJointLabels = () => {
    if (type !== 'if') return null;

    return joints.map(joint => {
      if (!joint.label) return null;

      const labelX = joint.position.x - position.x;
      const labelY = joint.position.y - position.y;

      return (
        <div
          key={joint.id}
          className="absolute text-xs text-[#64B5F6] whitespace-nowrap"
          style={{
            left: `${labelX + 16}px`, // 16px offset from joint
            top: `${labelY - 6}px`, // Center vertically with joint
            transform: 'translateY(-50%)',
          }}
        >
          {joint.label}
        </div>
      );
    });
  };

  return (
    <div 
      className="absolute" 
      style={{ 
        left: position.x, 
        top: position.y,
        touchAction: 'none',
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: isDragging ? 1000 : 1
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Label */}
      <div 
        className="absolute -top-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <span className={`text-sm font-medium ${getTitleColor()}`}>
          {title}
        </span>
      </div>

      {/* Block */}
      <div
        className={`
          rounded-lg p-4 w-[100px] h-[100px] shadow-lg
          flex items-center justify-center relative
          ${getBlockStyles()}
        `}
      >
        {type === 'trigger' && (
          <Zap 
            size={16}
            className="absolute left-2 top-2 text-[#FF5722]"
          />
        )}
        
        {getIcon()}
        
        {type === 'command' && (
          <WarningIcon 
            className="absolute bottom-2 right-2 text-[#DC3545]" 
          />
        )}

        {/* Dynamic Joint Labels */}
        {renderJointLabels()}
      </div>
    </div>
  );
};