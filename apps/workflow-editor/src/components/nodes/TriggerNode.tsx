/**
 * Trigger Node Component
 * Green node for workflow triggers
 */

import { Handle, Position, type NodeProps } from 'reactflow';
import './NodeStyles.css';

interface TriggerNodeProps extends NodeProps {
  data: {
    label?: string;
    triggerType?: string;
    hasError?: boolean;
    hasWarning?: boolean;
    errorCount?: number;
    warningCount?: number;
  };
}

export function TriggerNode({ data, selected }: TriggerNodeProps) {
  const nodeClass = `trigger-node ${selected ? 'selected' : ''} ${data.hasError ? 'node-error' : ''} ${data.hasWarning && !data.hasError ? 'node-warning' : ''}`;
  
  return (
    <div className={nodeClass}>
      {data.hasError && (
        <div className="node-error-indicator" title={`${data.errorCount} error(s)`}>
          !
        </div>
      )}
      {data.hasWarning && !data.hasError && (
        <div className="node-warning-indicator" title={`${data.warningCount} warning(s)`}>
          ⚠
        </div>
      )}
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

