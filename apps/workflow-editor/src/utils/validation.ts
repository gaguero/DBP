/**
 * Advanced Workflow Validation
 * Validates workflow structure and shows visual errors
 */

import type { WorkflowDefinition, WorkflowNode, WorkflowEdge } from '../types';

export interface ValidationError {
  nodeId?: string;
  edgeId?: string;
  type: 'error' | 'warning';
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

/**
 * Advanced workflow validation
 */
export function validateWorkflowAdvanced(definition: WorkflowDefinition): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // Basic structure validation
  if (!definition.nodes || definition.nodes.length === 0) {
    errors.push({
      type: 'error',
      message: 'Workflow must have at least one node',
    });
    return { valid: false, errors, warnings };
  }

  if (!definition.edges) {
    errors.push({
      type: 'error',
      message: 'Workflow must have edges array',
    });
  }

  const nodeIds = definition.nodes.map(node => node.id);
  const nodeMap = new Map(definition.nodes.map(node => [node.id, node]));

  // Check for trigger nodes
  const triggerNodes = definition.nodes.filter(node => node.type === 'trigger');
  if (triggerNodes.length === 0) {
    errors.push({
      type: 'error',
      message: 'Workflow must have at least one trigger node',
    });
  }

  // Check for unique node IDs
  const uniqueNodeIds = new Set(nodeIds);
  if (nodeIds.length !== uniqueNodeIds.size) {
    errors.push({
      type: 'error',
      message: 'All nodes must have unique IDs',
    });
  }

  // Validate each node
  definition.nodes.forEach(node => {
    validateNode(node, nodeMap, definition.edges || [], errors, warnings);
  });

  // Validate edges
  if (definition.edges) {
    definition.edges.forEach(edge => {
      validateEdge(edge, nodeMap, errors);
    });
  }

  // Check connectivity
  checkConnectivity(definition, errors, warnings);

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate a single node
 */
function validateNode(
  node: WorkflowNode,
  _nodeMap: Map<string, WorkflowNode>,
  edges: WorkflowEdge[],
  errors: ValidationError[],
  warnings: ValidationError[]
): void {
  // Validate condition nodes have two outputs (true/false)
  if (node.type === 'condition') {
    const outgoingEdges = edges.filter(e => e.source === node.id);
    const hasTrue = outgoingEdges.some(e => e.sourceHandle === 'true' || e.condition === 'true');
    const hasFalse = outgoingEdges.some(e => e.sourceHandle === 'false' || e.condition === 'false');

    if (!hasTrue && !hasFalse) {
      warnings.push({
        nodeId: node.id,
        type: 'warning',
        message: 'Condition node should have both true and false outputs',
      });
    } else if (!hasTrue) {
      warnings.push({
        nodeId: node.id,
        type: 'warning',
        message: 'Condition node missing true output',
      });
    } else if (!hasFalse) {
      warnings.push({
        nodeId: node.id,
        type: 'warning',
        message: 'Condition node missing false output',
      });
    }
  }

  // Validate delay nodes have configuration
  if (node.type === 'delay') {
    if (!node.data.delayAmount || !node.data.delayUnit) {
      errors.push({
        nodeId: node.id,
        type: 'error',
        message: 'Delay node must have delayAmount and delayUnit configured',
      });
    }
  }

  // Validate action nodes have actionType
  if (node.type === 'action') {
    if (!node.data.actionType) {
      errors.push({
        nodeId: node.id,
        type: 'error',
        message: 'Action node must have actionType configured',
      });
    }
  }

  // Validate trigger nodes have triggerType
  if (node.type === 'trigger') {
    if (!node.data.triggerType) {
      warnings.push({
        nodeId: node.id,
        type: 'warning',
        message: 'Trigger node should have triggerType configured',
      });
    }
  }

  // Validate code nodes have code
  if (node.type === 'code') {
    if (!node.data.code || node.data.code.trim().length === 0) {
      warnings.push({
        nodeId: node.id,
        type: 'warning',
        message: 'Code node should have code content',
      });
    }
  }
}

/**
 * Validate a single edge
 */
function validateEdge(
  edge: WorkflowEdge,
  nodeMap: Map<string, WorkflowNode>,
  errors: ValidationError[]
): void {
  if (!nodeMap.has(edge.source)) {
    errors.push({
      edgeId: edge.id,
      type: 'error',
      message: `Edge references invalid source node: ${edge.source}`,
    });
  }

  if (!nodeMap.has(edge.target)) {
    errors.push({
      edgeId: edge.id,
      type: 'error',
      message: `Edge references invalid target node: ${edge.target}`,
    });
  }

  // Check for self-loops (warnings)
  if (edge.source === edge.target) {
    errors.push({
      edgeId: edge.id,
      type: 'error',
      message: 'Edge cannot connect a node to itself',
    });
  }
}

/**
 * Check workflow connectivity
 */
function checkConnectivity(
  definition: WorkflowDefinition,
  _errors: ValidationError[],
  warnings: ValidationError[]
): void {
  const connectedNodes = new Set<string>();

  // Start from trigger nodes
  const triggerNodes = definition.nodes.filter(n => n.type === 'trigger');
  triggerNodes.forEach(trigger => {
    connectedNodes.add(trigger.id);
  });

  // Traverse graph
  const edges = definition.edges || [];
  let changed = true;
  while (changed) {
    changed = false;
    edges.forEach(edge => {
      if (connectedNodes.has(edge.source) && !connectedNodes.has(edge.target)) {
        connectedNodes.add(edge.target);
        changed = true;
      }
    });
  }

  // Check for disconnected nodes
  definition.nodes.forEach(node => {
    if (!connectedNodes.has(node.id) && node.type !== 'trigger') {
      warnings.push({
        nodeId: node.id,
        type: 'warning',
        message: 'Node is not connected to any trigger',
      });
    }
  });

  // Check for orphaned nodes (no incoming or outgoing edges, except triggers)
  definition.nodes.forEach(node => {
    if (node.type === 'trigger') return;

    const hasIncoming = edges.some(e => e.target === node.id);
    const hasOutgoing = edges.some(e => e.source === node.id);

    if (!hasIncoming && !hasOutgoing) {
      warnings.push({
        nodeId: node.id,
        type: 'warning',
        message: 'Node has no connections',
      });
    } else if (!hasIncoming) {
      warnings.push({
        nodeId: node.id,
        type: 'warning',
        message: 'Node has no incoming connections',
      });
    }
  });
}

/**
 * Get validation errors for a specific node
 */
export function getNodeErrors(nodeId: string, validation: ValidationResult): ValidationError[] {
  return validation.errors.filter(e => e.nodeId === nodeId);
}

/**
 * Get validation warnings for a specific node
 */
export function getNodeWarnings(nodeId: string, validation: ValidationResult): ValidationError[] {
  return validation.warnings.filter(w => w.nodeId === nodeId);
}

