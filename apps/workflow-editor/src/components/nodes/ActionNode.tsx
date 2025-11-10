/**
 * Action Node Component
 * Blue node for workflow actions
 */

import { Handle, Position, type NodeProps } from 'reactflow';
import './NodeStyles.css';

interface ActionNodeProps extends NodeProps {
  data: {
    label?: string;
    actionType?: string;
    hasError?: boolean;
    hasWarning?: boolean;
    errorCount?: number;
    warningCount?: number;
  };
}

export function ActionNode({ data, selected }: ActionNodeProps) {
  const nodeClass = `action-node ${selected ? 'selected' : ''} ${data.hasError ? 'node-error' : ''} ${data.hasWarning && !data.hasError ? 'node-warning' : ''}`;
  
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

