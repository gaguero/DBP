/**
 * Condition Node Component
 * Yellow node with two output handles (true/false)
 */

import { Handle, Position, type NodeProps } from 'reactflow';
import './NodeStyles.css';

interface ConditionNodeProps extends NodeProps {
  data: {
    label?: string;
    condition?: any;
    hasError?: boolean;
    hasWarning?: boolean;
    errorCount?: number;
    warningCount?: number;
  };
}

export function ConditionNode({ data, selected }: ConditionNodeProps) {
  const nodeClass = `condition-node ${selected ? 'selected' : ''} ${data.hasError ? 'node-error' : ''} ${data.hasWarning && !data.hasError ? 'node-warning' : ''}`;
  
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
      <div className="node-header">
        <span className="node-icon">❓</span>
        <span className="node-title">Condition</span>
      </div>
      <div className="node-content">
        <div className="node-label">{data.label || 'Condition'}</div>
        {data.condition && (
          <div className="node-subtitle">
            {data.condition.attribute || 'Check condition'}
          </div>
        )}
      </div>
      <div className="node-handles">
        <Handle
          type="source"
          position={Position.Right}
          id="true"
          style={{ top: '30%', background: '#10b981' }}
        />
        <div className="handle-label handle-label-true">True</div>
        <Handle
          type="source"
          position={Position.Right}
          id="false"
          style={{ top: '70%', background: '#ef4444' }}
        />
        <div className="handle-label handle-label-false">False</div>
      </div>
    </div>
  );
}

