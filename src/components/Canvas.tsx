import React, { useState, useCallback, useRef, useEffect } from 'react';
import { WorkflowBlock } from './WorkflowBlock';
import { Connector } from './Connector';
import { Block, Point, Connection } from '../types/workflow';
import { useJointPositions } from '../hooks/useJointPositions';

export const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState<Point>({ x: 0, y: 0 });
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [selectedJointId, setSelectedJointId] = useState<string | null>(null);
  const { calculateRelativePositions, updateJointPositions } = useJointPositions();

  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: 'trigger-1',
      type: 'trigger',
      title: "When clicking 'Test workflow'",
      position: { x: 100, y: 100 },
      joints: [
        { 
          id: 'trigger-1-output', 
          type: 'output', 
          position: { x: 200, y: 150 }, 
          blockId: 'trigger-1' 
        }
      ]
    },
    {
      id: 'if-1',
      type: 'if',
      title: 'If Condition',
      position: { x: 300, y: 100 },
      joints: [
        { 
          id: 'if-1-input', 
          type: 'input', 
          position: { x: 300, y: 150 }, 
          blockId: 'if-1' 
        },
        { 
          id: 'if-1-output-true', 
          type: 'output', 
          position: { x: 400, y: 125 }, 
          blockId: 'if-1',
          label: 'true'
        },
        { 
          id: 'if-1-output-false', 
          type: 'output', 
          position: { x: 400, y: 175 }, 
          blockId: 'if-1',
          label: 'false'
        }
      ]
    },
    {
      id: 'command-1',
      type: 'command',
      title: 'Execute Command',
      position: { x: 500, y: 50 },
      joints: [
        { 
          id: 'command-1-input', 
          type: 'input', 
          position: { x: 500, y: 100 }, 
          blockId: 'command-1' 
        }
      ]
    },
    {
      id: 'command-2',
      type: 'command',
      title: 'Execute Command',
      position: { x: 500, y: 150 },
      joints: [
        { 
          id: 'command-2-input', 
          type: 'input', 
          position: { x: 500, y: 200 }, 
          blockId: 'command-2' 
        }
      ]
    }
  ]);

  // Initialize relative positions for all blocks
  useEffect(() => {
    setBlocks(prevBlocks => 
      prevBlocks.map(block => ({
        ...block,
        joints: calculateRelativePositions(block)
      }))
    );
  }, []);

  const [connections, setConnections] = useState<Connection[]>([
    {
      id: 'conn-1',
      sourceJointId: 'trigger-1-output',
      targetJointId: 'if-1-input'
    },
    {
      id: 'conn-2',
      sourceJointId: 'if-1-output-true',
      targetJointId: 'command-1-input'
    },
    {
      id: 'conn-3',
      sourceJointId: 'if-1-output-false',
      targetJointId: 'command-2-input'
    }
  ]);

  const handleDragStart = useCallback((e: React.MouseEvent, blockId: string) => {
    const block = blocks.find(b => b.id === blockId);
    if (!block) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDragOffset({
      x: e.clientX - block.position.x,
      y: e.clientY - block.position.y
    });
    setActiveBlockId(blockId);
  }, [blocks]);

  const handleDrag = useCallback((e: React.MouseEvent) => {
    if (!activeBlockId) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setBlocks(prevBlocks => 
      prevBlocks.map(block => {
        if (block.id !== activeBlockId) return block;

        const newPosition = {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        };

        return {
          ...block,
          position: newPosition,
          joints: updateJointPositions(block, newPosition)
        };
      })
    );
  }, [activeBlockId, dragOffset, updateJointPositions]);

  const handleDragEnd = useCallback(() => {
    setActiveBlockId(null);
  }, []);

  const handleJointPositionChange = useCallback((jointId: string, newPosition: Point) => {
    setBlocks(prevBlocks =>
      prevBlocks.map(block => {
        const jointIndex = block.joints.findIndex(j => j.id === jointId);
        if (jointIndex === -1) return block;

        const updatedJoints = [...block.joints];
        updatedJoints[jointIndex] = {
          ...updatedJoints[jointIndex],
          position: newPosition,
          relativePosition: {
            x: newPosition.x - block.position.x,
            y: newPosition.y - block.position.y
          }
        };

        return {
          ...block,
          joints: updatedJoints
        };
      })
    );
  }, []);

  const getConnectedBlocks = useCallback((connection: Connection) => {
    const sourceBlock = blocks.find(block =>
      block.joints.some(joint => joint.id === connection.sourceJointId)
    );
    const targetBlock = blocks.find(block =>
      block.joints.some(joint => joint.id === connection.targetJointId)
    );
    return { sourceBlock, targetBlock };
  }, [blocks]);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setSelectedJointId(null);
    }
  }, []);

  return (
    <div 
      ref={canvasRef} 
      className="relative w-full h-full bg-gray-900 overflow-hidden"
      onClick={handleCanvasClick}
    >
      {/* Grid Background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, row) => (
          Array.from({ length: 50 }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              className="absolute w-1 h-1 bg-gray-800 rounded-full"
              style={{
                left: `${col * 24}px`,
                top: `${row * 24}px`,
              }}
            />
          ))
        ))}
      </div>

      {/* Connectors Layer */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        {connections.map(connection => {
          const { sourceBlock, targetBlock } = getConnectedBlocks(connection);
          if (!sourceBlock || !targetBlock) return null;

          const sourceJoint = sourceBlock.joints.find(j => j.id === connection.sourceJointId);
          const targetJoint = targetBlock.joints.find(j => j.id === connection.targetJointId);
          if (!sourceJoint || !targetJoint) return null;

          return (
            <Connector
              key={connection.id}
              start={sourceJoint.position}
              end={targetJoint.position}
              sourceBlock={sourceBlock}
              targetBlock={targetBlock}
              blocks={blocks}
              onStartChange={(pos) => handleJointPositionChange(connection.sourceJointId, pos)}
              onEndChange={(pos) => handleJointPositionChange(connection.targetJointId, pos)}
              selectedJointId={selectedJointId}
              onJointSelect={setSelectedJointId}
            />
          );
        })}
      </div>

      {/* Blocks Layer */}
      <div className="relative" style={{ zIndex: 2 }}>
        {blocks.map((block) => (
          <WorkflowBlock
            key={block.id}
            block={block}
            onDragStart={(e) => handleDragStart(e, block.id)}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          />
        ))}
      </div>
    </div>
  );
};