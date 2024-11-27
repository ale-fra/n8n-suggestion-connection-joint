export interface Point {
  x: number;
  y: number;
}

export interface Joint {
  id: string;
  position: Point;
  type: 'input' | 'output';
  blockId: string;
  label?: string;
  // Store relative position to maintain joint placement during block drag
  relativePosition?: Point;
}

export interface Connection {
  id: string;
  sourceJointId: string;
  targetJointId: string;
}

export type BlockType = 'trigger' | 'command' | 'if';

export interface Block {
  id: string;
  type: BlockType;
  title: string;
  position: Point;
  joints: Joint[];
}