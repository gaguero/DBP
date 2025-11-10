/**
 * Main Workflow Editor Component
 */

import { useCallback, useMemo } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { useWorkflowEditor } from '../hooks/useWorkflowEditor';
import { NodePalette, PropertiesPanel } from './panels';
import { WorkflowCanvas } from './WorkflowCanvas';
import { generateNodeId, getNewNodePosition, getNodeErrors, getNodeWarnings } from '../utils';
import type { WorkflowDefinition, WorkflowNode } from '../types';

interface WorkflowEditorProps {
  definition?: WorkflowDefinition;
  onSave?: (definition: WorkflowDefinition) => void;
  onLoad?: () => Promise<WorkflowDefinition | null>;
}

function WorkflowEditorInner({ definition, onSave, onLoad }: WorkflowEditorProps) {
  const {
    nodes,
    edges,
    selectedNode,
    errors,
    validation,
    onNodesChange,
    onEdgesChange,
    onConnect,
    getDefinition,
    setNodes,
    updateNode,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useWorkflowEditor(definition);

  // Enhance nodes with validation errors/warnings
  const enhancedNodes = useMemo(() => {
    return nodes.map(node => {
      const nodeErrors = getNodeErrors(node.id, validation);
      const nodeWarnings = getNodeWarnings(node.id, validation);
      
      return {
        ...node,
        data: {
          ...node.data,
          hasError: nodeErrors.length > 0,
          hasWarning: nodeWarnings.length > 0,
          errorCount: nodeErrors.length,
          warningCount: nodeWarnings.length,
        },
      };
    });
  }, [nodes, validation]);

  const handleSave = useCallback(() => {
    const workflowDefinition = getDefinition();
    if (onSave) {
      onSave(workflowDefinition);
    }
  }, [getDefinition, onSave]);

  const handleLoad = useCallback(async () => {
    if (onLoad) {
      const loaded = await onLoad();
      if (loaded) {
        // Reload workflow
        window.location.reload();
      }
    }
  }, [onLoad]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData('application/reactflow') as WorkflowNode['type'];

      if (!nodeType) {
        return;
      }

      // Get position from React Flow
      const reactFlowBounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode: WorkflowNode = {
        id: generateNodeId(nodeType),
        type: nodeType,
        position,
        data: {
          label: `${nodeType} node`,
        },
      };

      setNodes((nds) => [...nds, newNode as any]);
    },
    [setNodes]
  );

  const handleNodeSelect = useCallback((nodeType: WorkflowNode['type']) => {
    const position = getNewNodePosition(nodes as WorkflowNode[], nodeType);
    const newNode: WorkflowNode = {
      id: generateNodeId(nodeType),
      type: nodeType,
      position,
      data: {
        label: `${nodeType} node`,
      },
    };
    setNodes((nds) => [...nds, newNode as any]);
  }, [nodes, setNodes]);

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <NodePalette onNodeSelect={handleNodeSelect} />
      <WorkflowCanvas
        nodes={enhancedNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        errors={errors}
        onSave={handleSave}
        onLoad={handleLoad}
        onUndo={undo}
        onRedo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <PropertiesPanel
        selectedNode={selectedNode}
        onUpdateNode={updateNode}
      />
    </div>
  );
}

export function WorkflowEditor({ definition, onSave, onLoad }: WorkflowEditorProps) {
  return (
    <ReactFlowProvider>
      <WorkflowEditorInner definition={definition} onSave={onSave} onLoad={onLoad} />
    </ReactFlowProvider>
  );
}

