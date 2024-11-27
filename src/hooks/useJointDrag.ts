import { useState, useCallback } from 'react';
import { Point, Block } from '../types/workflow';
import { snapToPerimeter } from '../utils/blockUtils';

interface UseJointDragProps {
  onPositionChange: (position: Point) => void;
  block: Block;
  type: 'input' | 'output';
}

export function useJointDrag({ onPositionChange, block, type }: UseJointDragProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState<Point | null>(null);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    
    setStartPosition({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const handleDrag = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    e.preventDefault();
    
    const mousePosition = {
      x: e.clientX,
      y: e.clientY,
    };

    // Calculate position relative to the block
    const relativePosition = {
      x: mousePosition.x - block.position.x,
      y: mousePosition.y - block.position.y,
    };

    // Snap the position to the block's perimeter
    const snappedPosition = snapToPerimeter(mousePosition, block);
    onPositionChange(snappedPosition);
  }, [isDragging, block, onPositionChange]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    setStartPosition(null);
  }, []);

  return {
    isDragging,
    handleDragStart,
    handleDrag,
    handleDragEnd,
  };
}