import { useState, useEffect, useCallback } from 'react';
import { WorkflowEditor } from './components/WorkflowEditor';
import { api } from './services/EspoCRMAPI';
import { parseWorkflowJSON } from './utils';
import type { WorkflowDefinition, Workflow } from './types';
import './App.css';

function App() {
  const [workflowId, setWorkflowId] = useState<string | null>(null);
  const [workflowDefinition, setWorkflowDefinition] = useState<WorkflowDefinition | undefined>();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [saveError, setSaveError] = useState<string | null>(null);

  // Get workflow ID from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('workflowId');
    if (id) {
      setWorkflowId(id);
      loadWorkflow(id);
    }
  }, []);

  // Listen for token from parent window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'TOKEN_RESPONSE' && event.data.token) {
        api.setAccessToken(event.data.token);
      }
      if (event.data.type === 'WORKFLOW_ID' && event.data.workflowId) {
        setWorkflowId(event.data.workflowId);
        loadWorkflow(event.data.workflowId);
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Request token from parent
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'REQUEST_TOKEN' }, '*');
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const loadWorkflow = async (id: string) => {
    try {
      const workflow = await api.getWorkflow(id);
      if (workflow.definition) {
        const definition = typeof workflow.definition === 'string'
          ? parseWorkflowJSON(workflow.definition)
          : workflow.definition;
        
        // Sync workflow-level triggerType/entityType to trigger node if missing
        const triggerNode = definition.nodes.find(node => node.type === 'trigger');
        if (triggerNode && workflow.triggerType && !triggerNode.data?.triggerType) {
          triggerNode.data = {
            ...triggerNode.data,
            triggerType: workflow.triggerType,
          };
        }
        if (triggerNode && workflow.entityType && !triggerNode.data?.entityType) {
          triggerNode.data = {
            ...triggerNode.data,
            entityType: workflow.entityType,
          };
        }
        
        setWorkflowDefinition(definition);
      }
    } catch (error) {
      console.error('Failed to load workflow:', error);
    }
  };

  const handleSave = useCallback(async (definition: WorkflowDefinition) => {
    // Extract triggerType and entityType from trigger node
    const triggerNode = definition.nodes.find(node => node.type === 'trigger');
    const triggerType = triggerNode?.data?.triggerType || 'Record Created';
    const entityType = triggerNode?.data?.entityType || 'Lead';
    
    if (!workflowId) {
      // Create new workflow
      try {
        setSaveStatus('saving');
        setSaveError(null);
        
        const workflowData: Partial<Workflow> = {
          name: 'New Workflow',
          definition: definition,
          status: 'draft',
          isActive: false,
          entityType: entityType,
          triggerType: triggerType,
        };

        const created = await api.createWorkflow(workflowData);
        setWorkflowId(created.id || null);
        setSaveStatus('saved');
        
        // Notify parent window
        if (window.parent !== window) {
          window.parent.postMessage({
            type: 'WORKFLOW_SAVED',
            workflowId: created.id,
          }, '*');
        }
      } catch (error) {
        setSaveStatus('error');
        setSaveError(error instanceof Error ? error.message : 'Failed to save workflow');
        console.error('Failed to save workflow:', error);
      }
    } else {
      // Update existing workflow
      try {
        setSaveStatus('saving');
        setSaveError(null);
        
        const workflowData: Partial<Workflow> = {
          definition: definition,
          entityType: entityType,
          triggerType: triggerType,
        };

        await api.updateWorkflow(workflowId, workflowData);
        setSaveStatus('saved');
        
        // Notify parent window
        if (window.parent !== window) {
          window.parent.postMessage({
            type: 'WORKFLOW_SAVED',
            workflowId: workflowId,
          }, '*');
        }
      } catch (error) {
        setSaveStatus('error');
        setSaveError(error instanceof Error ? error.message : 'Failed to save workflow');
        console.error('Failed to save workflow:', error);
      }
    }
  }, [workflowId]);

  const handleLoad = useCallback(async (): Promise<WorkflowDefinition | null> => {
    if (!workflowId) {
      return null;
    }
    
    try {
      const workflow = await api.getWorkflow(workflowId);
      if (workflow.definition) {
        const definition = typeof workflow.definition === 'string'
          ? parseWorkflowJSON(workflow.definition)
          : workflow.definition;
        setWorkflowDefinition(definition);
        return definition;
      }
    } catch (error) {
      console.error('Failed to load workflow:', error);
    }
    
    return null;
  }, [workflowId]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {saveStatus === 'saving' && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#3b82f6',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
        }}>
          Saving...
        </div>
      )}
      {saveStatus === 'saved' && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#10b981',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
        }}>
          Saved!
        </div>
      )}
      {saveStatus === 'error' && saveError && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#ef4444',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
        }}>
          Error: {saveError}
        </div>
      )}
      <WorkflowEditor definition={workflowDefinition} onSave={handleSave} onLoad={handleLoad} />
    </div>
  );
}

export default App;
