/**
 * Code Node Component
 * Gray node for custom code execution
 */

import { Handle, Position, type NodeProps } from 'reactflow';
import './NodeStyles.css';

export function CodeNode({ data, selected }: NodeProps) {
  return (
    <div className={`code-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="node-header">
        <span className="node-icon">💻</span>
        <span className="node-title">Code</span>
      </div>
      <div className="node-content">
        <div className="node-label">{data.label || 'Custom Code'}</div>
        {data.code && (
          <div className="node-subtitle">
            {data.code.substring(0, 30)}...
          </div>
        )}
      </div>
    </div>
  );
}

