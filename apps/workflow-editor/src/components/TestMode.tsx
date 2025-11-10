/**
 * Test Mode Component
 * Allows testing workflows with sample data
 */

import { useState, useCallback } from 'react';
import type { WorkflowDefinition, WorkflowNode } from '../types';
import './TestMode.css';

interface TestModeProps {
  workflowDefinition: WorkflowDefinition;
  onClose: () => void;
}

interface ExecutionLog {
  timestamp: number;
  nodeId: string;
  nodeType: string;
  action: 'started' | 'completed' | 'skipped' | 'error';
  message: string;
  data?: any;
}

export function TestMode({ workflowDefinition, onClose }: TestModeProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [testData, setTestData] = useState<Record<string, any>>({
    entityType: 'Lead',
    name: 'Test Lead',
    emailAddress: 'test@example.com',
    status: 'New',
  });
  const [currentStep, setCurrentStep] = useState<number | null>(null);
  const [stepByStep, setStepByStep] = useState(false);

  const addLog = useCallback((log: ExecutionLog) => {
    setLogs((prev) => [...prev, log]);
  }, []);

  const simulateNodeExecution = useCallback(
    async (node: WorkflowNode, context: Record<string, any>): Promise<Record<string, any>> => {
      addLog({
        timestamp: Date.now(),
        nodeId: node.id,
        nodeType: node.type,
        action: 'started',
        message: `Executing ${node.data.label || node.type} node`,
        data: node.data,
      });

      // Simulate execution delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      let result: Record<string, any> = { ...context };

      switch (node.type) {
        case 'trigger':
          addLog({
            timestamp: Date.now(),
            nodeId: node.id,
            nodeType: node.type,
            action: 'completed',
            message: `Trigger fired: ${node.data.triggerType || 'Unknown trigger'}`,
            data: { triggerType: node.data.triggerType },
          });
          break;

        case 'action':
          if (node.data.actionType === 'updateRecord') {
            result = {
              ...result,
              ...node.data.properties,
            };
            addLog({
              timestamp: Date.now(),
              nodeId: node.id,
              nodeType: node.type,
              action: 'completed',
              message: `Updated record with properties: ${JSON.stringify(node.data.properties)}`,
              data: node.data.properties,
            });
          } else if (node.data.actionType === 'createRecord') {
            addLog({
              timestamp: Date.now(),
              nodeId: node.id,
              nodeType: node.type,
              action: 'completed',
              message: `Created ${node.data.entityTypeToCreate || 'record'}`,
              data: { entityType: node.data.entityTypeToCreate },
            });
          } else {
            addLog({
              timestamp: Date.now(),
              nodeId: node.id,
              nodeType: node.type,
              action: 'completed',
              message: `Action executed: ${node.data.actionType}`,
            });
          }
          break;

        case 'condition':
          // Simple condition evaluation (simplified)
          const conditionMet = Math.random() > 0.5; // Random for demo
          addLog({
            timestamp: Date.now(),
            nodeId: node.id,
            nodeType: node.type,
            action: 'completed',
            message: `Condition evaluated: ${conditionMet ? 'TRUE' : 'FALSE'}`,
            data: { result: conditionMet },
          });
          result.conditionResult = conditionMet;
          break;

        case 'delay':
          const delayMs =
            (node.data.delayAmount || 0) *
            (node.data.delayUnit === 'seconds'
              ? 1000
              : node.data.delayUnit === 'minutes'
              ? 60000
              : node.data.delayUnit === 'hours'
              ? 3600000
              : node.data.delayUnit === 'days'
              ? 86400000
              : 1000);
          addLog({
            timestamp: Date.now(),
            nodeId: node.id,
            nodeType: node.type,
            action: 'started',
            message: `Waiting ${node.data.delayAmount} ${node.data.delayUnit}`,
          });
          await new Promise((resolve) => setTimeout(resolve, Math.min(delayMs, 2000))); // Cap at 2s for demo
          addLog({
            timestamp: Date.now(),
            nodeId: node.id,
            nodeType: node.type,
            action: 'completed',
            message: 'Delay completed',
          });
          break;

        case 'code':
          addLog({
            timestamp: Date.now(),
            nodeId: node.id,
            nodeType: node.type,
            action: 'completed',
            message: `Custom code executed (simulated)`,
            data: { codeLength: node.data.code?.length || 0 },
          });
          break;

        default:
          addLog({
            timestamp: Date.now(),
            nodeId: node.id,
            nodeType: node.type,
            action: 'completed',
            message: 'Node executed',
          });
      }

      return result;
    },
    [addLog]
  );

  const executeWorkflow = useCallback(async () => {
    setIsRunning(true);
    setLogs([]);
    setCurrentStep(null);

    try {
      // Find trigger nodes
      const triggerNodes = workflowDefinition.nodes.filter((n) => n.type === 'trigger');
      if (triggerNodes.length === 0) {
        addLog({
          timestamp: Date.now(),
          nodeId: '',
          nodeType: 'error',
          action: 'error',
          message: 'No trigger nodes found',
        });
        setIsRunning(false);
        return;
      }

      // Start from first trigger
      const startNode = triggerNodes[0];
      let context = { ...testData };
      const visited = new Set<string>();
      const executionQueue: WorkflowNode[] = [startNode];

      while (executionQueue.length > 0) {
        const currentNode = executionQueue.shift()!;

        if (visited.has(currentNode.id)) {
          continue; // Avoid cycles
        }
        visited.add(currentNode.id);

        if (stepByStep && currentStep !== null) {
          // Wait for user to click "Next Step"
          await new Promise((resolve) => {
            const checkStep = () => {
              if (currentStep !== null) {
                resolve(undefined);
              } else {
                setTimeout(checkStep, 100);
              }
            };
            checkStep();
          });
        }

        setCurrentStep(workflowDefinition.nodes.indexOf(currentNode));

        // Execute node
        context = await simulateNodeExecution(currentNode, context);

        // Find next nodes via edges
        const outgoingEdges = workflowDefinition.edges.filter((e) => e.source === currentNode.id);

        if (currentNode.type === 'condition') {
          // For conditions, follow the appropriate branch
          const conditionResult = context.conditionResult;
          outgoingEdges.forEach((edge) => {
            const targetNode = workflowDefinition.nodes.find((n) => n.id === edge.target);
            if (targetNode) {
              const edgeCondition = edge.sourceHandle || edge.condition;
              if (
                (conditionResult && (edgeCondition === 'true' || !edgeCondition)) ||
                (!conditionResult && edgeCondition === 'false')
              ) {
                executionQueue.push(targetNode);
              }
            }
          });
        } else {
          // For other nodes, follow all outgoing edges
          outgoingEdges.forEach((edge) => {
            const targetNode = workflowDefinition.nodes.find((n) => n.id === edge.target);
            if (targetNode && !visited.has(targetNode.id)) {
              executionQueue.push(targetNode);
            }
          });
        }

        if (stepByStep) {
          // Wait for next step button
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }

      addLog({
        timestamp: Date.now(),
        nodeId: '',
        nodeType: 'system',
        action: 'completed',
        message: 'Workflow execution completed',
      });
    } catch (error) {
      addLog({
        timestamp: Date.now(),
        nodeId: '',
        nodeType: 'error',
        action: 'error',
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
    } finally {
      setIsRunning(false);
      setCurrentStep(null);
    }
  }, [workflowDefinition, testData, stepByStep, currentStep, simulateNodeExecution, addLog]);

  const handleNextStep = useCallback(() => {
    if (currentStep !== null) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  return (
    <div className="test-mode-overlay">
      <div className="test-mode-panel">
        <div className="test-mode-header">
          <h3>Test Mode</h3>
          <button onClick={onClose} className="close-button">
            ×
          </button>
        </div>

        <div className="test-mode-content">
          <div className="test-mode-controls">
            <div className="test-data-section">
              <h4>Test Data</h4>
              <textarea
                value={JSON.stringify(testData, null, 2)}
                onChange={(e) => {
                  try {
                    setTestData(JSON.parse(e.target.value));
                  } catch (error) {
                    // Invalid JSON, ignore
                  }
                }}
                rows={8}
                className="test-data-input"
                disabled={isRunning}
              />
            </div>

            <div className="test-actions">
              <label>
                <input
                  type="checkbox"
                  checked={stepByStep}
                  onChange={(e) => setStepByStep(e.target.checked)}
                  disabled={isRunning}
                />
                Step-by-step debugging
              </label>
              <div className="button-group">
                {!isRunning ? (
                  <button onClick={executeWorkflow} className="btn-primary">
                    Run Workflow
                  </button>
                ) : stepByStep ? (
                  <button onClick={handleNextStep} className="btn-primary">
                    Next Step
                  </button>
                ) : (
                  <button disabled className="btn-primary">
                    Running...
                  </button>
                )}
                <button onClick={() => setLogs([])} className="btn-secondary" disabled={isRunning}>
                  Clear Logs
                </button>
              </div>
            </div>
          </div>

          <div className="test-logs-section">
            <h4>Execution Logs</h4>
            <div className="logs-container">
              {logs.length === 0 ? (
                <div className="no-logs">No logs yet. Click "Run Workflow" to start.</div>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className={`log-entry log-${log.action}`}>
                    <span className="log-time">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    <span className={`log-badge log-badge-${log.nodeType}`}>{log.nodeType}</span>
                    <span className="log-message">{log.message}</span>
                    {log.data && (
                      <details className="log-details">
                        <summary>Details</summary>
                        <pre>{JSON.stringify(log.data, null, 2)}</pre>
                      </details>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

