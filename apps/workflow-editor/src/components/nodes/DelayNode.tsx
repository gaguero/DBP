/**
 * Delay Node Component
 * Orange node for delays/wait actions
 */

import { Handle, Position, type NodeProps } from 'reactflow';
import './NodeStyles.css';

export function DelayNode({ data, selected }: NodeProps) {
  const delayText = data.delayAmount && data.delayUnit
    ? `${data.delayAmount} ${data.delayUnit}`
    : 'Delay';

  return (
    <div className={`delay-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div className="node-header">
        <span className="node-icon">⏱️</span>
        <span className="node-title">Delay</span>
      </div>
      <div className="node-content">
        <div className="node-label">{delayText}</div>
        {data.businessHoursOnly && (
          <div className="node-subtitle">Business hours only</div>
        )}
      </div>
    </div>
  );
}

