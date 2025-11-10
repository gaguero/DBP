/**
 * Utility functions for workflow editor
 */

import type { WorkflowNode, WorkflowDefinition } from '../types';

/**
 * Generate unique node ID
 */
export function generateNodeId(type: string): string {
  return `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate unique edge ID
 */
export function generateEdgeId(source: string, target: string): string {
  return `edge-${source}-${target}-${Date.now()}`;
}

/**
 * Validate workflow definition
 */
export function validateWorkflow(definition: WorkflowDefinition): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!definition.nodes || definition.nodes.length === 0) {
    errors.push('Workflow must have at least one node');
  }

  if (!definition.edges) {
    errors.push('Workflow must have edges array');
  }

  // Check for trigger nodes
  const hasTrigger = definition.nodes.some(node => node.type === 'trigger');
  if (!hasTrigger) {
    errors.push('Workflow must have at least one trigger node');
  }

  // Check for unique node IDs
  const nodeIds = definition.nodes.map(node => node.id);
  const uniqueNodeIds = new Set(nodeIds);
  if (nodeIds.length !== uniqueNodeIds.size) {
    errors.push('All nodes must have unique IDs');
  }

  // Check edges reference valid nodes
  if (definition.edges) {
    definition.edges.forEach(edge => {
      if (!nodeIds.includes(edge.source)) {
        errors.push(`Edge references invalid source node: ${edge.source}`);
      }
      if (!nodeIds.includes(edge.target)) {
        errors.push(`Edge references invalid target node: ${edge.target}`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Convert workflow definition to JSON format for EspoCRM
 */
export function workflowToJSON(definition: WorkflowDefinition): string {
  return JSON.stringify(definition, null, 2);
}

/**
 * Parse JSON workflow definition from EspoCRM
 */
export function parseWorkflowJSON(json: string): WorkflowDefinition {
  try {
    return JSON.parse(json);
  } catch (error) {
    throw new Error('Invalid workflow JSON: ' + (error as Error).message);
  }
}

/**
 * Get node position for new node
 */
export function getNewNodePosition(nodes: WorkflowNode[], type: string): { x: number; y: number } {
  if (nodes.length === 0) {
    return { x: 250, y: 100 };
  }

  // Position based on node type
  const positions: Record<string, { x: number; y: number }> = {
    trigger: { x: 250, y: 100 },
    action: { x: 500, y: 200 },
    condition: { x: 500, y: 300 },
    delay: { x: 500, y: 400 },
  };

  if (positions[type]) {
    return positions[type];
  }

  // Default: position after last node
  const lastNode = nodes[nodes.length - 1];
  return {
    x: lastNode.position.x + 300,
    y: lastNode.position.y
  };
}

