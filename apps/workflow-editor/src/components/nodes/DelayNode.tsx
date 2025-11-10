/**
 * Delay Node Component
 * Orange node for delays/wait actions
 */

import { Handle, Position, type NodeProps } from 'reactflow';
import './NodeStyles.css';

interface DelayNodeProps extends NodeProps {
  data: {
    label?: string;
    delayAmount?: number;
    delayUnit?: string;
    businessHoursOnly?: boolean;
    hasError?: boolean;
    hasWarning?: boolean;
    errorCount?: number;
    warningCount?: number;
  };
}

export function DelayNode({ data, selected }: DelayNodeProps) {
  const delayText = data.delayAmount && data.delayUnit
    ? `${data.delayAmount} ${data.delayUnit}`
    : 'Delay';
  
  const nodeClass = `delay-node ${selected ? 'selected' : ''} ${data.hasError ? 'node-error' : ''} ${data.hasWarning && !data.hasError ? 'node-warning' : ''}`;

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

