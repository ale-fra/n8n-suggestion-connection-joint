import { Point, Block } from '../types/workflow';
import { BLOCK_WIDTH, BLOCK_HEIGHT, PADDING } from './constants';

export function getBlockBounds(block: Block) {
  return {
    left: block.position.x - PADDING,
    right: block.position.x + BLOCK_WIDTH + PADDING,
    top: block.position.y - PADDING,
    bottom: block.position.y + BLOCK_HEIGHT + PADDING
  };
}

export function intersectsBlock(point: Point, block: Block): boolean {
  const bounds = getBlockBounds(block);
  return point.x >= bounds.left && point.x <= bounds.right &&
         point.y >= bounds.top && point.y <= bounds.bottom;
}

export function getNearestEdge(point: Point, block: Block) {
  const relativeX = point.x - block.position.x;
  const relativeY = point.y - block.position.y;
  
  const distances = {
    left: Math.abs(relativeX),
    right: Math.abs(relativeX - BLOCK_WIDTH),
    top: Math.abs(relativeY),
    bottom: Math.abs(relativeY - BLOCK_HEIGHT)
  };
  
  return Object.entries(distances).reduce((a, b) => 
    a[1] < b[1] ? a : b
  )[0] as 'left' | 'right' | 'top' | 'bottom';
}

export function snapToPerimeter(point: Point, block: Block): Point {
  const relativePoint = {
    x: point.x - block.position.x,
    y: point.y - block.position.y
  };

  // Calculate distances to each edge
  const distToLeft = Math.abs(relativePoint.x);
  const distToRight = Math.abs(relativePoint.x - BLOCK_WIDTH);
  const distToTop = Math.abs(relativePoint.y);
  const distToBottom = Math.abs(relativePoint.y - BLOCK_HEIGHT);

  // Find the minimum distance
  const minDist = Math.min(distToLeft, distToRight, distToTop, distToBottom);

  // Snap to the nearest edge while maintaining the other coordinate
  if (minDist === distToLeft) {
    return {
      x: block.position.x,
      y: block.position.y + Math.max(0, Math.min(BLOCK_HEIGHT, relativePoint.y))
    };
  } else if (minDist === distToRight) {
    return {
      x: block.position.x + BLOCK_WIDTH,
      y: block.position.y + Math.max(0, Math.min(BLOCK_HEIGHT, relativePoint.y))
    };
  } else if (minDist === distToTop) {
    return {
      x: block.position.x + Math.max(0, Math.min(BLOCK_WIDTH, relativePoint.x)),
      y: block.position.y
    };
  } else {
    return {
      x: block.position.x + Math.max(0, Math.min(BLOCK_WIDTH, relativePoint.x)),
      y: block.position.y + BLOCK_HEIGHT
    };
  }
}