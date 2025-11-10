/**
 * Custom hooks for workflow editor
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import type { Node, Edge, OnNodesChange, OnEdgesChange, OnConnect } from 'reactflow';
import type { WorkflowDefinition, WorkflowNode, WorkflowEdge } from '../types';
import { generateNodeId, generateEdgeId, validateWorkflowAdvanced } from '../utils';
import type { ValidationResult } from '../utils';
import { useUndoRedo } from './useUndoRedo';

export function useWorkflowEditor(initialDefinition?: WorkflowDefinition) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [validation, setValidation] = useState<ValidationResult>({ valid: true, errors: [], warnings: [] });
  const lastChangeRef = useRef<{ nodes: Node[]; edges: Edge[] } | null>(null);
  const changeTimeoutRef = useRef<number | null>(null);

  // Initialize undo/redo
  const {
    pushToHistory,
    undo: undoHistory,
    redo: redoHistory,
    canUndo,
    canRedo,
    resetHistory,
  } = useUndoRedo(initialDefinition);

  // Initialize from definition
  useEffect(() => {
    if (initialDefinition) {
      setNodes(initialDefinition.nodes as Node[]);
      setEdges(initialDefinition.edges as Edge[]);
      resetHistory(initialDefinition);
    }
  }, [initialDefinition, resetHistory]);

  // Track changes and add to history (debounced)
  useEffect(() => {
    // Clear previous timeout
    if (changeTimeoutRef.current) {
      window.clearTimeout(changeTimeoutRef.current);
    }

    // Don't track if this is the initial load
    if (nodes.length === 0 && edges.length === 0) {
      return;
    }

    // Debounce history updates (wait 500ms after last change)
    changeTimeoutRef.current = window.setTimeout(() => {
      const definition: WorkflowDefinition = {
        nodes: nodes as WorkflowNode[],
        edges: edges as WorkflowEdge[],
      };
      
      // Only add to history if something actually changed
      const currentState = JSON.stringify({ nodes, edges });
      const lastState = lastChangeRef.current
        ? JSON.stringify({ nodes: lastChangeRef.current.nodes, edges: lastChangeRef.current.edges })
        : null;

      if (currentState !== lastState) {
        pushToHistory(definition);
        lastChangeRef.current = { nodes: [...nodes], edges: [...edges] };
      }
    }, 500);

    return () => {
      if (changeTimeoutRef.current) {
        window.clearTimeout(changeTimeoutRef.current);
      }
    };
  }, [nodes, edges, pushToHistory]);

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

  /**
   * Undo last change
   */
  const undo = useCallback(() => {
    const previousState = undoHistory();
    if (previousState) {
      setNodes(previousState.nodes as Node[]);
      setEdges(previousState.edges as Edge[]);
      lastChangeRef.current = { nodes: [...previousState.nodes as Node[]], edges: [...previousState.edges as Edge[]] };
    }
  }, [undoHistory]);

  /**
   * Redo last undone change
   */
  const redo = useCallback(() => {
    const nextState = redoHistory();
    if (nextState) {
      setNodes(nextState.nodes as Node[]);
      setEdges(nextState.edges as Edge[]);
      lastChangeRef.current = { nodes: [...nextState.nodes as Node[]], edges: [...nextState.edges as Edge[]] };
    }
  }, [redoHistory]);

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
    undo,
    redo,
    canUndo,
    canRedo,
  };
}