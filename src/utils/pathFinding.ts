import { Point, Block } from '../types/workflow';
import { 
  BLOCK_WIDTH, 
  BLOCK_HEIGHT, 
  PERPENDICULAR_OFFSET,
  MIN_CURVE_DISTANCE,
  CURVE_INTENSITY_FACTOR
} from './constants';
import { getNearestEdge, intersectsBlock } from './blockUtils';

function getPerpendicularPoint(point: Point, block: Block, isStart: boolean): Point {
  const edge = getNearestEdge(point, block);
  const offset = isStart ? PERPENDICULAR_OFFSET : -PERPENDICULAR_OFFSET;
  
  switch (edge) {
    case 'left':
      return {
        x: block.position.x - Math.abs(offset),
        y: point.y
      };
    case 'right':
      return {
        x: block.position.x + BLOCK_WIDTH + Math.abs(offset),
        y: point.y
      };
    case 'top':
      return {
        x: point.x,
        y: block.position.y - Math.abs(offset)
      };
    case 'bottom':
      return {
        x: point.x,
        y: block.position.y + BLOCK_HEIGHT + Math.abs(offset)
      };
  }
}

function calculateControlPoints(
  start: Point,
  end: Point,
  sourceEdge: string,
  targetEdge: string
): [Point, Point] {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const curveIntensity = Math.max(distance * CURVE_INTENSITY_FACTOR, MIN_CURVE_DISTANCE);

  let cp1: Point = { x: start.x, y: start.y };
  let cp2: Point = { x: end.x, y: end.y };

  // Adjust control points based on edge directions
  if (sourceEdge === 'left' || sourceEdge === 'right') {
    cp1.x = start.x + (sourceEdge === 'left' ? -curveIntensity : curveIntensity);
  } else {
    cp1.y = start.y + (sourceEdge === 'top' ? -curveIntensity : curveIntensity);
  }

  if (targetEdge === 'left' || targetEdge === 'right') {
    cp2.x = end.x + (targetEdge === 'left' ? -curveIntensity : curveIntensity);
  } else {
    cp2.y = end.y + (targetEdge === 'top' ? -curveIntensity : curveIntensity);
  }

  return [cp1, cp2];
}

export function calculatePath(
  start: Point,
  end: Point,
  sourceBlock: Block,
  targetBlock: Block,
  blocks: Block[]
): string {
  const sourceEdge = getNearestEdge(start, sourceBlock);
  const targetEdge = getNearestEdge(end, targetBlock);
  
  const startPerp = getPerpendicularPoint(start, sourceBlock, true);
  const endPerp = getPerpendicularPoint(end, targetBlock, false);
  
  const [cp1, cp2] = calculateControlPoints(startPerp, endPerp, sourceEdge, targetEdge);

  return `
    M ${start.x} ${start.y}
    L ${startPerp.x} ${startPerp.y}
    C ${cp1.x} ${cp1.y},
      ${cp2.x} ${cp2.y},
      ${endPerp.x} ${endPerp.y}
    L ${end.x} ${end.y}
  `;
}