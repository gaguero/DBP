/**
 * Branch Node Component
 * Purple node for branching/split paths
 */

import { Handle, Position, type NodeProps } from 'reactflow';
import './NodeStyles.css';

export function BranchNode({ data, selected }: NodeProps) {
  return (
    <div className={`branch-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <span className="node-icon">🔀</span>
        <span className="node-title">Branch</span>
      </div>
      <div className="node-content">
        <div className="node-label">{data.label || 'Split Path'}</div>
        {data.paths && (
          <div className="node-subtitle">{data.paths.length} paths</div>
        )}
      </div>
      {/* Multiple output handles for different paths */}
      <Handle
        type="source"
        position={Position.Right}
        id="path-1"
        style={{ top: '25%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="path-2"
        style={{ top: '50%' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="path-3"
        style={{ top: '75%' }}
      />
    </div>
  );
}

