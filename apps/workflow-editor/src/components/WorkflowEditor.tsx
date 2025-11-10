/**
 * Main Workflow Editor Component
 */

import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useWorkflowEditor } from '../hooks/useWorkflowEditor';
import type { WorkflowDefinition } from '../types';

interface WorkflowEditorProps {
  definition?: WorkflowDefinition;
  onSave?: (definition: WorkflowDefinition) => void;
  onLoad?: () => Promise<WorkflowDefinition | null>;
}

export function WorkflowEditor({ definition, onSave, onLoad }: WorkflowEditorProps) {
  const {
    nodes,
    edges,
    selectedNode,
    errors,
    onNodesChange,
    onEdgesChange,
    onConnect,
    deleteNode,
    getDefinition,
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

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-left">
          <div style={{ background: 'white', padding: '10px', borderRadius: '5px' }}>
            <h3>Workflow Editor</h3>
            <button onClick={handleSave}>Save</button>
            {onLoad && <button onClick={handleLoad}>Load</button>}
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
        {selectedNode && (
          <Panel position="top-right">
            <div style={{ background: 'white', padding: '10px', borderRadius: '5px', minWidth: '300px' }}>
              <h4>Node Properties</h4>
              <p><strong>ID:</strong> {selectedNode.id}</p>
              <p><strong>Type:</strong> {selectedNode.type}</p>
              <button onClick={() => deleteNode(selectedNode.id)}>Delete Node</button>
            </div>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
}

