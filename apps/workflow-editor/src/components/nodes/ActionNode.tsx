/**
 * Action Node Component
 * Blue node for workflow actions
 */

import { Handle, Position, type NodeProps } from 'reactflow';
import './NodeStyles.css';

export function ActionNode({ data, selected }: NodeProps) {
  return (
    <div className={`action-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="node-header">
        <span className="node-icon">⚙️</span>
        <span className="node-title">Action</span>
      </div>
      <div className="node-content">
        <div className="node-label">{data.label || data.actionType || 'Action'}</div>
        {data.actionType && (
          <div className="node-subtitle">{data.actionType}</div>
        )}
      </div>
    </div>
  );
}

