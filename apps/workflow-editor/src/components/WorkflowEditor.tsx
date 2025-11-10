/**
 * Main Workflow Editor Component
 */

import { useCallback, useMemo, useState, useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { useWorkflowEditor } from '../hooks/useWorkflowEditor';
import { NodePalette, PropertiesPanel } from './panels';
import { WorkflowCanvas } from './WorkflowCanvas';
import { TestMode } from './TestMode';
import { generateNodeId, getNewNodePosition, getNodeErrors, getNodeWarnings } from '../utils';
import { api } from '../services/EspoCRMAPI';
import type { WorkflowDefinition, WorkflowNode } from '../types';

interface WorkflowEditorProps {
  definition?: WorkflowDefinition;
  onSave?: (definition: WorkflowDefinition) => void;
  onLoad?: () => Promise<WorkflowDefinition | null>;
}

function WorkflowEditorInner({ definition, onSave, onLoad }: WorkflowEditorProps) {
  const [showTestMode, setShowTestMode] = useState(false);
  const [entityTypes, setEntityTypes] = useState<string[]>([]);
  const [entityFields, setEntityFields] = useState<Record<string, Record<string, any>>>({});
  
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

  // Load entity types on mount
  useEffect(() => {
    api.getEntityTypes().then(types => {
      setEntityTypes(types);
    }).catch(err => {
      console.error('Failed to load entity types:', err);
    });
  }, []);

  // Load entity fields when entityType changes in trigger/action nodes
  useEffect(() => {
    const loadEntityFields = async () => {
      const entityTypesToLoad = new Set<string>();
      
      // Collect entity types from trigger and action nodes
      nodes.forEach(node => {
        if (node.type === 'trigger' && node.data?.entityType) {
          entityTypesToLoad.add(node.data.entityType);
        }
        if (node.type === 'action' && node.data?.entityType) {
          entityTypesToLoad.add(node.data.entityType);
        }
      });
      
      // Load fields for each entity type
      for (const entityType of entityTypesToLoad) {
        if (!entityFields[entityType]) {
          try {
            const fields = await api.getEntityFields(entityType);
            setEntityFields(prev => ({
              ...prev,
              [entityType]: fields,
            }));
          } catch (err) {
            console.error(`Failed to load fields for ${entityType}:`, err);
          }
        }
      }
    };
    
    loadEntityFields();
  }, [nodes, entityFields]);

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
    <>
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
                entityTypes={entityTypes}
                entityFields={entityFields}
              />
      </div>
      {showTestMode && (
        <TestMode
          workflowDefinition={getDefinition()}
          onClose={() => setShowTestMode(false)}
        />
      )}
      {!showTestMode && (
        <button
          onClick={() => setShowTestMode(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '12px 20px',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
          }}
        >
          🧪 Test Mode
        </button>
      )}
    </>
  );
}

export function WorkflowEditor({ definition, onSave, onLoad }: WorkflowEditorProps) {
  return (
    <ReactFlowProvider>
      <WorkflowEditorInner definition={definition} onSave={onSave} onLoad={onLoad} />
    </ReactFlowProvider>
  );
}

