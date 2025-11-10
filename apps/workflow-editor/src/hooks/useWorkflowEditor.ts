/**
 * Custom hooks for workflow editor
 */

import { useState, useCallback, useEffect } from 'react';
import type { Node, Edge, OnNodesChange, OnEdgesChange, OnConnect } from 'reactflow';
import type { WorkflowDefinition, WorkflowNode, WorkflowEdge } from '../types';
import { generateNodeId, generateEdgeId, validateWorkflowAdvanced } from '../utils';
import type { ValidationResult } from '../utils';

export function useWorkflowEditor(initialDefinition?: WorkflowDefinition) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [validation, setValidation] = useState<ValidationResult>({ valid: true, errors: [], warnings: [] });

  // Initialize from definition
  useEffect(() => {
    if (initialDefinition) {
      setNodes(initialDefinition.nodes as Node[]);
      setEdges(initialDefinition.edges as Edge[]);
    }
  }, [initialDefinition]);

  // Validate workflow with advanced validation
  useEffect(() => {
    const definition: WorkflowDefinition = {
      nodes: nodes as WorkflowNode[],
      edges: edges as WorkflowEdge[]
    };
    const validationResult = validateWorkflowAdvanced(definition);
    setValidation(validationResult);
    
    // Convert validation errors to simple string array for backward compatibility
    const errorMessages = validationResult.errors.map((e: { message: string }) => e.message);
    setErrors(errorMessages);
  }, [nodes, edges]);

  const onNodesChange: OnNodesChange = useCallback((changes) => {
    setNodes((nds) => {
      // Apply changes using React Flow's applyNodeChanges helper would be better
      // For now, we'll handle basic changes manually
      let updated = [...nds];
      
      changes.forEach((change) => {
        if (change.type === 'select') {
          if (change.selected) {
            const node = updated.find(n => n.id === change.id);
            setSelectedNode(node || null);
          } else if (change.id === selectedNode?.id) {
            setSelectedNode(null);
          }
        } else if (change.type === 'remove') {
          updated = updated.filter(n => n.id !== change.id);
          if (change.id === selectedNode?.id) {
            setSelectedNode(null);
          }
        } else if (change.type === 'position' && change.position) {
          updated = updated.map(n => 
            n.id === change.id ? { ...n, position: change.position! } : n
          );
        } else if (change.type === 'dimensions' && change.dimensions) {
          updated = updated.map(n => 
            n.id === change.id ? { ...n, ...change } : n
          );
        }
      });
      
      return updated;
    });
  }, [selectedNode]);

  const onEdgesChange: OnEdgesChange = useCallback((changes) => {
    setEdges((eds) => {
      let updated = [...eds];
      
      changes.forEach((change) => {
        if (change.type === 'remove') {
          updated = updated.filter(e => e.id !== change.id);
        } else if (change.type === 'select') {
          // Handle edge selection if needed
        }
      });
      
      return updated;
    });
  }, []);

  const onConnect: OnConnect = useCallback((connection) => {
    if (!connection.source || !connection.target) return;

    const newEdge: Edge = {
      id: generateEdgeId(connection.source, connection.target),
      source: connection.source,
      target: connection.target,
      sourceHandle: connection.sourceHandle || undefined,
      targetHandle: connection.targetHandle || undefined,
      type: 'smoothstep',
    };

    setEdges((eds) => [...eds, newEdge]);
  }, []);

  const addNode = useCallback((type: WorkflowNode['type'], data?: Record<string, any>) => {
    const newNode: Node = {
      id: generateNodeId(type),
      type,
      position: { x: 250, y: 100 },
      data: {
        label: `${type} node`,
        ...data
      }
    };

    setNodes((nds) => [...nds, newNode]);
    return newNode;
  }, []);

  const updateNode = useCallback((nodeId: string, data: Record<string, any>) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...data } }
          : node
      )
    );
  }, []);

  const deleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  }, []);

  const getDefinition = useCallback((): WorkflowDefinition => {
    return {
      nodes: nodes as WorkflowNode[],
      edges: edges as WorkflowEdge[]
    };
  }, [nodes, edges]);

  return {
    nodes,
    edges,
    selectedNode,
    errors,
    validation,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNode,
    deleteNode,
    getDefinition,
    setNodes,
    setEdges,
  };
}

