/**
 * Type definitions for Workflow Editor
 */

export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay' | 'branch' | 'code';
  position: { x: number; y: number };
  data: {
    label?: string;
    [key: string]: any;
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  condition?: 'true' | 'false' | null;
  label?: string;
}

export interface WorkflowDefinition {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface Workflow {
  id?: string;
  name: string;
  description?: string;
  entityType: string;
  triggerType: string;
  triggerData?: Record<string, any>;
  definition: WorkflowDefinition;
  status: 'draft' | 'active' | 'paused' | 'archived';
  isActive: boolean;
}

export interface TriggerConfig {
  type: string;
  entityType: string;
  conditions?: ConditionGroup;
  [key: string]: any;
}

export interface ConditionGroup {
  type: 'and' | 'or' | 'not';
  conditions?: ConditionGroup[];
  condition?: Condition;
}

export interface Condition {
  type: string;
  attribute: string;
  value: any;
}

export interface ActionConfig {
  actionType: string;
  [key: string]: any;
}

