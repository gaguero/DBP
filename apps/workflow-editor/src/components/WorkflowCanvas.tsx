/**
 * Workflow Canvas Component
 * Separated canvas component for better organization
 */

import { useRef, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Panel,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from './nodes';

interface WorkflowCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onDrop: (event: React.DragEvent) => void;
  onDragOver: (event: React.DragEvent) => void;
  errors?: string[];
  onSave?: () => void;
  onLoad?: () => Promise<void>;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export function WorkflowCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onDrop,
  onDragOver,
  errors = [],
  onSave,
  onLoad,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
}: WorkflowCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Z or Cmd+Z for undo
      if ((event.ctrlKey || event.metaKey) && event.key === 'z' && !event.shiftKey) {
        event.preventDefault();
        if (onUndo && canUndo) {
          onUndo();
        }
      }
      // Ctrl+Y or Cmd+Shift+Z for redo
      if ((event.ctrlKey || event.metaKey) && (event.key === 'y' || (event.key === 'z' && event.shiftKey))) {
        event.preventDefault();
        if (onRedo && canRedo) {
          onRedo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onUndo, onRedo, canUndo, canRedo]);

  return (
    <div ref={reactFlowWrapper} style={{ flex: 1, position: 'relative' }}>
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
        deleteKeyCode={['Backspace', 'Delete']}
        multiSelectionKeyCode={['Meta', 'Control']}
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-left">
          <div style={{ background: 'white', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Workflow Editor</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {onSave && (
                <button
                  onClick={onSave}
                  style={{
                    padding: '6px 12px',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Save
                </button>
              )}
              {onLoad && (
                <button
                  onClick={onLoad}
                  style={{
                    padding: '6px 12px',
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  Load
                </button>
              )}
              {onUndo && (
                <button
                  onClick={onUndo}
                  disabled={!canUndo}
                  title="Undo (Ctrl+Z)"
                  style={{
                    padding: '6px 12px',
                    background: canUndo ? '#10b981' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: canUndo ? 'pointer' : 'not-allowed',
                    fontSize: '14px',
                    opacity: canUndo ? 1 : 0.5,
                  }}
                >
                  ↶ Undo
                </button>
              )}
              {onRedo && (
                <button
                  onClick={onRedo}
                  disabled={!canRedo}
                  title="Redo (Ctrl+Y)"
                  style={{
                    padding: '6px 12px',
                    background: canRedo ? '#10b981' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: canRedo ? 'pointer' : 'not-allowed',
                    fontSize: '14px',
                    opacity: canRedo ? 1 : 0.5,
                  }}
                >
                  ↷ Redo
                </button>
              )}
            </div>
            {errors.length > 0 && (
              <div style={{ color: 'red', marginTop: '10px', fontSize: '12px' }}>
                <strong>Errors:</strong>
                <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
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
  );
}

