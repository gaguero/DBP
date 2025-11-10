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

namespace Espo\Modules\Workflows\Hooks\Common;

use Espo\Core\ORM\EntityManager;
use Espo\Core\Job\JobSchedulerFactory;
use Espo\ORM\Entity;
use Espo\Modules\Workflows\Services\WorkflowEngine;
use Espo\Modules\Workflows\Services\WorkflowParser;

/**
 * Hook to trigger workflows on entity events
 */
class WorkflowTrigger
{
    private EntityManager $entityManager;
    private JobSchedulerFactory $jobSchedulerFactory;
    private WorkflowEngine $workflowEngine;
    private WorkflowParser $workflowParser;
    
    public function __construct(
        EntityManager $entityManager,
        JobSchedulerFactory $jobSchedulerFactory,
        WorkflowEngine $workflowEngine,
        WorkflowParser $workflowParser
    ) {
        $this->entityManager = $entityManager;
        $this->jobSchedulerFactory = $jobSchedulerFactory;
        $this->workflowEngine = $workflowEngine;
        $this->workflowParser = $workflowParser;
    }
    
    /**
     * Trigger workflows after entity is saved
     */
    public function afterSave(Entity $entity, array $options): void
    {
        // Skip if entity is Workflow, WorkflowExecution, or WorkflowLog to avoid recursion
        $entityType = $entity->getEntityType();
        if (in_array($entityType, ['Workflow', 'WorkflowExecution', 'WorkflowLog'])) {
            return;
        }
        
        // Skip if workflow is disabled
        if (isset($options['skipWorkflow']) && $options['skipWorkflow']) {
            return;
        }
        
        $isNew = $entity->isNew();
        $triggerType = $isNew ? 'Record Created' : 'Record Updated';
        
        // Find active workflows for this entity type and trigger
        $workflows = $this->entityManager
            ->getRDBRepository('Workflow')
            ->where([
                'isActive' => true,
                'status' => 'active',
                'entityType' => $entityType,
                'triggerType' => $triggerType
            ])
            ->find();
        
        foreach ($workflows as $workflow) {
            // Check if workflow should trigger (basic validation)
            if ($this->shouldTrigger($workflow, $entity)) {
                $this->createExecution($workflow, $entity);
            }
        }
    }
    
    /**
     * Check if workflow should trigger
     */
    private function shouldTrigger(Entity $workflow, Entity $entity): bool
    {
        // Basic validation - can be extended with trigger conditions
        // For now, just check if workflow is active and matches entity type
        return true;
    }
    
    /**
     * Create workflow execution
     */
    private function createExecution(Entity $workflow, Entity $entity): void
    {
        try {
            // Create execution
            $execution = $this->entityManager->getNewEntity('WorkflowExecution');
            $execution->set([
                'workflowId' => $workflow->getId(),
                'targetEntityType' => $entity->getEntityType(),
                'targetEntityId' => $entity->getId(),
                'status' => 'running',
                'inputData' => [
                    'entity' => $entity->toArray()
                ]
            ]);
            $this->entityManager->saveEntity($execution);
            
            // Execute workflow immediately (or schedule if needed)
            $this->workflowEngine->execute($execution);
            
        } catch (\Exception $e) {
            // Log error but don't break entity save
            error_log("Workflow execution failed: " . $e->getMessage());
        }
    }
}

