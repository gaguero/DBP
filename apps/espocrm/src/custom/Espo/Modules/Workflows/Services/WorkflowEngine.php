<?php
/************************************************************************
 * This file is part of EspoCRM.
 *
 * EspoCRM – Open Source CRM application.
 * Copyright (C) 2014-2025 EspoCRM, Inc.
 * Website: https://www.espocrm.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "EspoCRM" word.
 ************************************************************************/

namespace Espo\Modules\Workflows\Services;

use Espo\Core\ORM\EntityManager;
use Espo\Core\Exceptions\Error;
use Espo\ORM\Entity;
use DateTime;

/**
 * Core workflow execution engine
 */
class WorkflowEngine
{
    private EntityManager $entityManager;
    private WorkflowParser $parser;
    private WorkflowScheduler $scheduler;
    
    public function __construct(
        EntityManager $entityManager,
        WorkflowParser $parser,
        WorkflowScheduler $scheduler
    ) {
        $this->entityManager = $entityManager;
        $this->parser = $parser;
        $this->scheduler = $scheduler;
    }
    
    /**
     * Execute a workflow execution
     *
     * @param Entity $execution WorkflowExecution entity
     * @throws Error
     */
    public function execute(Entity $execution): void
    {
        // Load workflow
        $workflow = $this->entityManager->getEntity('Workflow', $execution->get('workflowId'));
        
        if (!$workflow) {
            throw new Error("Workflow not found: " . $execution->get('workflowId'));
        }
        
        if (!$workflow->get('isActive')) {
            throw new Error("Workflow is not active");
        }
        
        // Parse workflow definition
        $definition = $workflow->get('definition');
        if (!$definition) {
            throw new Error("Workflow definition is empty");
        }
        
        $parsed = $this->parser->parse($definition);
        $graph = $parsed['graph'];
        
        // Get current node ID
        $currentNodeId = $execution->get('currentNodeId');
        
        // If no current node, start from trigger
        if (!$currentNodeId) {
            $triggerNodes = $this->parser->getTriggerNodes($parsed['definition']);
            if (empty($triggerNodes)) {
                throw new Error("No trigger nodes found in workflow");
            }
            // Start from first trigger
            $currentNodeId = $triggerNodes[0]['id'];
            $execution->set('currentNodeId', $currentNodeId);
        }
        
        // Execute current node
        $this->executeNode($execution, $graph, $currentNodeId);
        
        // Get next nodes
        $nextNodes = $this->parser->getNextNodes($graph, $currentNodeId);
        
        if (empty($nextNodes)) {
            // No more nodes, workflow completed
            $execution->set('status', 'completed');
            $execution->set('completedAt', new DateTime());
            $this->entityManager->saveEntity($execution);
            return;
        }
        
        // Process next nodes
        foreach ($nextNodes as $nextNodeId) {
            $nextNode = $graph[$nextNodeId]['node'];
            
            // Check if node has delay
            if (isset($nextNode['data']['delayAmount']) && isset($nextNode['data']['delayUnit'])) {
                // Schedule for later
                $delayAmount = (int)$nextNode['data']['delayAmount'];
                $delayUnit = $nextNode['data']['delayUnit'];
                
                $scheduledAt = $this->calculateScheduledTime($delayAmount, $delayUnit);
                
                // Create new execution for scheduled node
                $newExecution = $this->entityManager->getNewEntity('WorkflowExecution');
                $newExecution->set([
                    'workflowId' => $execution->get('workflowId'),
                    'targetEntityType' => $execution->get('targetEntityType'),
                    'targetEntityId' => $execution->get('targetEntityId'),
                    'status' => 'scheduled',
                    'currentNodeId' => $nextNodeId,
                    'inputData' => $execution->get('outputData'),
                    'scheduledAt' => $scheduledAt
                ]);
                $this->entityManager->saveEntity($newExecution);
                
                $this->scheduler->schedule($newExecution, $scheduledAt);
            } else {
                // Execute immediately
                $this->executeNode($execution, $graph, $nextNodeId);
            }
        }
        
        // Update execution
        $execution->set('currentNodeId', $nextNodes[0] ?? null);
        $this->entityManager->saveEntity($execution);
    }
    
    /**
     * Execute a single node
     *
     * @param Entity $execution
     * @param array $graph
     * @param string $nodeId
     * @throws Error
     */
    private function executeNode(Entity $execution, array $graph, string $nodeId): void
    {
        if (!isset($graph[$nodeId])) {
            throw new Error("Node not found: " . $nodeId);
        }
        
        $node = $graph[$nodeId]['node'];
        $nodeType = $node['type'] ?? 'unknown';
        
        try {
            // Log execution start
            $this->createLog($execution, $nodeId, 'execute', 'success', "Executing node: {$nodeType}");
            
            // Execute based on node type
            switch ($nodeType) {
                case 'trigger':
                    // Triggers are handled separately, just log
                    break;
                    
                case 'action':
                    $this->executeAction($execution, $node);
                    break;
                    
                case 'condition':
                    $this->executeCondition($execution, $node);
                    break;
                    
                case 'delay':
                    // Delay is handled in execute() method
                    break;
                    
                default:
                    throw new Error("Unknown node type: " . $nodeType);
            }
            
            // Log success
            $this->createLog($execution, $nodeId, 'execute', 'success', "Node executed successfully");
            
        } catch (\Exception $e) {
            // Log error
            $this->createLog($execution, $nodeId, 'execute', 'error', $e->getMessage());
            
            // Update execution status
            $execution->set('status', 'failed');
            $execution->set('errorMessage', $e->getMessage());
            $this->entityManager->saveEntity($execution);
            
            throw $e;
        }
    }
    
    /**
     * Execute an action node
     *
     * @param Entity $execution
     * @param array $node
     */
    private function executeAction(Entity $execution, array $node): void
    {
        $actionType = $node['data']['actionType'] ?? null;
        
        if (!$actionType) {
            throw new Error("Action node missing actionType");
        }
        
        // Action execution will be implemented in Phase 3
        // For now, just log
        $this->createLog($execution, $node['id'], 'action', 'success', "Action {$actionType} executed");
    }
    
    /**
     * Execute a condition node
     *
     * @param Entity $execution
     * @param array $node
     */
    private function executeCondition(Entity $execution, array $node): void
    {
        // Condition evaluation will be implemented in Phase 3
        // For now, just log
        $this->createLog($execution, $node['id'], 'condition', 'success', "Condition evaluated");
    }
    
    /**
     * Create workflow log entry
     *
     * @param Entity $execution
     * @param string $nodeId
     * @param string $action
     * @param string $status
     * @param string $message
     */
    private function createLog(
        Entity $execution,
        string $nodeId,
        string $action,
        string $status,
        string $message
    ): void {
        $log = $this->entityManager->getNewEntity('WorkflowLog');
        $log->set([
            'executionId' => $execution->getId(),
            'workflowId' => $execution->get('workflowId'),
            'nodeId' => $nodeId,
            'action' => $action,
            'status' => $status,
            'message' => $message,
            'executedAt' => new DateTime()
        ]);
        $this->entityManager->saveEntity($log);
    }
    
    /**
     * Calculate scheduled time based on delay
     *
     * @param int $amount
     * @param string $unit
     * @return DateTime
     */
    private function calculateScheduledTime(int $amount, string $unit): DateTime
    {
        $now = new DateTime();
        
        switch ($unit) {
            case 'minutes':
                $now->modify("+{$amount} minutes");
                break;
            case 'hours':
                $now->modify("+{$amount} hours");
                break;
            case 'days':
                $now->modify("+{$amount} days");
                break;
            case 'weeks':
                $now->modify("+{$amount} weeks");
                break;
            default:
                throw new Error("Unknown delay unit: " . $unit);
        }
        
        return $now;
    }
}

