import { useCallback } from 'react';
import { Block, Joint, Point } from '../types/workflow';

export function useJointPositions() {
  const calculateRelativePositions = useCallback((block: Block): Joint[] => {
    return block.joints.map(joint => ({
      ...joint,
      relativePosition: {
        x: joint.position.x - block.position.x,
        y: joint.position.y - block.position.y
      }
    }));
  }, []);

  const updateJointPositions = useCallback((block: Block, newPosition: Point): Joint[] => {
    return block.joints.map(joint => {
      if (!joint.relativePosition) {
        // Calculate relative position if not exists
        joint.relativePosition = {
          x: joint.position.x - block.position.x,
          y: joint.position.y - block.position.y
        };
      }

      return {
        ...joint,
        position: {
          x: newPosition.x + joint.relativePosition.x,
          y: newPosition.y + joint.relativePosition.y
        },
        relativePosition: joint.relativePosition
      };
    });
  }, []);

  return {
    calculateRelativePositions,
    updateJointPositions
  };
}