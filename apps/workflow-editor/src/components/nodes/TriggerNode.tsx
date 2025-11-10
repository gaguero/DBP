/**
 * Trigger Node Component
 * Green node for workflow triggers
 */

import { Handle, Position, type NodeProps } from 'reactflow';
import './NodeStyles.css';

export function TriggerNode({ data, selected }: NodeProps) {
  return (
    <div className={`trigger-node ${selected ? 'selected' : ''}`}>
      <Handle type="source" position={Position.Right} />
      <div className="node-header">
        <span className="node-icon">⚡</span>
        <span className="node-title">Trigger</span>
      </div>
      <div className="node-content">
        <div className="node-label">{data.label || data.triggerType || 'Trigger'}</div>
        {data.triggerType && (
          <div className="node-subtitle">{data.triggerType}</div>
        )}
      </div>
    </div>
  );
}

