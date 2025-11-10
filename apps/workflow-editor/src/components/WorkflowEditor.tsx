/**
 * Main Workflow Editor Component
 */

import { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflowEditor } from '../hooks/useWorkflowEditor';
import { nodeTypes } from './nodes';
import { NodePalette, PropertiesPanel } from './panels';
import { generateNodeId, getNewNodePosition } from '../utils';
import type { WorkflowDefinition, WorkflowNode } from '../types';

interface WorkflowEditorProps {
  definition?: WorkflowDefinition;
  onSave?: (definition: WorkflowDefinition) => void;
  onLoad?: () => Promise<WorkflowDefinition | null>;
}

function WorkflowEditorInner({ definition, onSave, onLoad }: WorkflowEditorProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();
  const {
    nodes,
    edges,
    selectedNode,
    errors,
    onNodesChange,
    onEdgesChange,
    onConnect,
    getDefinition,
    setNodes,
    updateNode,
  } = useWorkflowEditor(definition);

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

      if (!nodeType || !reactFlowWrapper.current) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

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
    [project, setNodes]
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
      <div ref={reactFlowWrapper} style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
          <Panel position="top-left">
            <div style={{ background: 'white', padding: '10px', borderRadius: '5px' }}>
              <h3>Workflow Editor</h3>
              <button onClick={handleSave}>Save</button>
              {onLoad && <button onClick={handleLoad} style={{ marginLeft: '8px' }}>Load</button>}
              {errors.length > 0 && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                  <strong>Errors:</strong>
                  <ul>
                    {errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Panel>
        </ReactFlow>
      </div>
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

