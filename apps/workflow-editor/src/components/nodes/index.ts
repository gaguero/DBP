/**
 * Node Types Registry
 * Export all node components for React Flow
 */

export { TriggerNode } from './TriggerNode';
export { ActionNode } from './ActionNode';
export { ConditionNode } from './ConditionNode';
export { DelayNode } from './DelayNode';
export { BranchNode } from './BranchNode';
export { CodeNode } from './CodeNode';

import { TriggerNode } from './TriggerNode';
import { ActionNode } from './ActionNode';
import { ConditionNode } from './ConditionNode';
import { DelayNode } from './DelayNode';
import { BranchNode } from './BranchNode';
import { CodeNode } from './CodeNode';
import type { NodeTypes } from 'reactflow';

export const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  delay: DelayNode,
  branch: BranchNode,
  code: CodeNode,
};

