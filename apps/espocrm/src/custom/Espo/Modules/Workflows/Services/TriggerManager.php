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
use Espo\Core\Job\JobSchedulerFactory;
use Espo\ORM\Entity;
use Espo\Modules\Workflows\Services\WorkflowEngine;
use Espo\Modules\Workflows\Services\ConditionEvaluator;
use DateTime;

/**
 * Service for managing workflow triggers
 */
class TriggerManager
{
    private EntityManager $entityManager;
    private JobSchedulerFactory $jobSchedulerFactory;
    private WorkflowEngine $workflowEngine;
    private ConditionEvaluator $conditionEvaluator;
    
    public function __construct(
        EntityManager $entityManager,
        JobSchedulerFactory $jobSchedulerFactory,
        WorkflowEngine $workflowEngine,
        ConditionEvaluator $conditionEvaluator
    ) {
        $this->entityManager = $entityManager;
        $this->jobSchedulerFactory = $jobSchedulerFactory;
        $this->workflowEngine = $workflowEngine;
        $this->conditionEvaluator = $conditionEvaluator;
    }
    
    /**
     * Trigger workflows for Record Created event
     */
    public function triggerRecordCreated(Entity $entity): void
    {
        $this->triggerWorkflows($entity, 'Record Created');
    }
    
    /**
     * Trigger workflows for Record Updated event
     */
    public function triggerRecordUpdated(Entity $entity): void
    {
        $this->triggerWorkflows($entity, 'Record Updated');
    }
    
    /**
     * Trigger workflows for Record Deleted event
     */
    public function triggerRecordDeleted(Entity $entity): void
    {
        $this->triggerWorkflows($entity, 'Record Deleted');
    }
    
    /**
     * Trigger workflows for Property Changed event
     */
    public function triggerPropertyChanged(Entity $entity, string $propertyName, $oldValue, $newValue): void
    {
        // Find workflows with Property Changed trigger for this property
        $workflows = $this->entityManager
            ->getRDBRepository('Workflow')
            ->where([
                'isActive' => true,
                'status' => 'active',
                'entityType' => $entity->getEntityType(),
                'triggerType' => 'Property Changed'
            ])
            ->find();
        
        foreach ($workflows as $workflow) {
            $triggerData = $workflow->get('triggerData') ?? [];
            $targetProperty = $triggerData['property'] ?? null;
            
            // Check if this workflow is for this specific property
            if ($targetProperty && $targetProperty !== $propertyName) {
                continue;
            }
            
            if ($this->shouldTrigger($workflow, $entity, [
                'property' => $propertyName,
                'oldValue' => $oldValue,
                'newValue' => $newValue
            ])) {
                $this->createExecution($workflow, $entity, [
                    'property' => $propertyName,
                    'oldValue' => $oldValue,
                    'newValue' => $newValue
                ]);
            }
        }
    }
    
    /**
     * Trigger workflows for Email events
     */
    public function triggerEmailEvent(string $eventType, Entity $email, ?Entity $targetEntity = null): void
    {
        $triggerTypeMap = [
            'opened' => 'Email Opened',
            'clicked' => 'Email Clicked',
            'bounced' => 'Email Bounced',
            'replied' => 'Email Replied'
        ];
        
        $triggerType = $triggerTypeMap[$eventType] ?? null;
        
        if (!$triggerType) {
            return;
        }
        
        // If target entity not provided, try to find it from email
        if (!$targetEntity) {
            $targetEntity = $this->findTargetEntityFromEmail($email);
        }
        
        if (!$targetEntity) {
            return;
        }
        
        $workflows = $this->entityManager
            ->getRDBRepository('Workflow')
            ->where([
                'isActive' => true,
                'status' => 'active',
                'entityType' => $targetEntity->getEntityType(),
                'triggerType' => $triggerType
            ])
            ->find();
        
        foreach ($workflows as $workflow) {
            if ($this->shouldTrigger($workflow, $targetEntity, ['email' => $email])) {
                $this->createExecution($workflow, $targetEntity, ['email' => $email]);
            }
        }
    }
    
    /**
     * Trigger workflows for Form Submission
     */
    public function triggerFormSubmission(string $formId, array $formData, ?Entity $targetEntity = null): void
    {
        // Find or create target entity from form data
        if (!$targetEntity) {
            $targetEntity = $this->findOrCreateEntityFromFormData($formData);
        }
        
        if (!$targetEntity) {
            return;
        }
        
        $workflows = $this->entityManager
            ->getRDBRepository('Workflow')
            ->where([
                'isActive' => true,
                'status' => 'active',
                'entityType' => $targetEntity->getEntityType(),
                'triggerType' => 'Form Submission'
            ])
            ->find();
        
        foreach ($workflows as $workflow) {
            $triggerData = $workflow->get('triggerData') ?? [];
            $targetFormId = $triggerData['formId'] ?? null;
            
            // Check if workflow is for this specific form
            if ($targetFormId && $targetFormId !== $formId) {
                continue;
            }
            
            if ($this->shouldTrigger($workflow, $targetEntity, ['formData' => $formData])) {
                $this->createExecution($workflow, $targetEntity, ['formData' => $formData]);
            }
        }
    }
    
    /**
     * Schedule workflows with time-based triggers
     */
    public function scheduleTimeBasedTriggers(Entity $workflow): void
    {
        $triggerType = $workflow->get('triggerType');
        
        if ($triggerType === 'Specific Date/Time') {
            $this->scheduleSpecificDateTime($workflow);
        } elseif ($triggerType === 'Recurring Schedule') {
            $this->scheduleRecurring($workflow);
        }
    }
    
    /**
     * Core method to trigger workflows
     */
    private function triggerWorkflows(Entity $entity, string $triggerType): void
    {
        // Skip workflow entities to avoid recursion
        $entityType = $entity->getEntityType();
        if (in_array($entityType, ['Workflow', 'WorkflowExecution', 'WorkflowLog'])) {
            return;
        }
        
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
            if ($this->shouldTrigger($workflow, $entity)) {
                $this->createExecution($workflow, $entity);
            }
        }
    }
    
    /**
     * Check if workflow should trigger based on conditions
     */
    private function shouldTrigger(Entity $workflow, Entity $entity, array $context = []): bool
    {
        $triggerData = $workflow->get('triggerData') ?? [];
        $conditions = $triggerData['conditions'] ?? null;
        
        // If no conditions, always trigger
        if (!$conditions) {
            return true;
        }
        
        // Evaluate conditions using ConditionEvaluator
        try {
            return $this->conditionEvaluator->evaluate($entity, $conditions);
        } catch (\Exception $e) {
            error_log("Workflow condition evaluation failed: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Create workflow execution
     */
    private function createExecution(Entity $workflow, Entity $entity, array $context = []): void
    {
        try {
            $execution = $this->entityManager->getNewEntity('WorkflowExecution');
            $execution->set([
                'workflowId' => $workflow->getId(),
                'targetEntityType' => $entity->getEntityType(),
                'targetEntityId' => $entity->getId(),
                'status' => 'running',
                'inputData' => array_merge([
                    'entity' => $entity->toArray()
                ], $context)
            ]);
            $this->entityManager->saveEntity($execution);
            
            // Execute workflow immediately
            $this->workflowEngine->execute($execution);
            
        } catch (\Exception $e) {
            error_log("Workflow execution failed: " . $e->getMessage());
        }
    }
    
    /**
     * Schedule workflow for specific date/time
     */
    private function scheduleSpecificDateTime(Entity $workflow): void
    {
        $triggerData = $workflow->get('triggerData') ?? [];
        $scheduledAt = $triggerData['scheduledAt'] ?? null;
        
        if (!$scheduledAt) {
            return;
        }
        
        try {
            $scheduledDateTime = new DateTime($scheduledAt);
            
            $jobScheduler = $this->jobSchedulerFactory->create();
            $jobScheduler->setJobName('ProcessScheduledWorkflow');
            $jobScheduler->setData([
                'workflowId' => $workflow->getId()
            ]);
            $jobScheduler->setScheduledAt($scheduledDateTime);
            $jobScheduler->schedule();
            
        } catch (\Exception $e) {
            error_log("Failed to schedule workflow: " . $e->getMessage());
        }
    }
    
    /**
     * Schedule recurring workflow
     */
    private function scheduleRecurring(Entity $workflow): void
    {
        $triggerData = $workflow->get('triggerData') ?? [];
        $cronExpression = $triggerData['cronExpression'] ?? null;
        
        if (!$cronExpression) {
            return;
        }
        
        try {
            $jobScheduler = $this->jobSchedulerFactory->create();
            $jobScheduler->setJobName('ProcessRecurringWorkflow');
            $jobScheduler->setData([
                'workflowId' => $workflow->getId()
            ]);
            $jobScheduler->setScheduling($cronExpression);
            $jobScheduler->schedule();
            
        } catch (\Exception $e) {
            error_log("Failed to schedule recurring workflow: " . $e->getMessage());
        }
    }
    
    /**
     * Find target entity from email
     */
    private function findTargetEntityFromEmail(Entity $email): ?Entity
    {
        // Try to find parent entity
        $parentType = $email->get('parentType');
        $parentId = $email->get('parentId');
        
        if ($parentType && $parentId) {
            return $this->entityManager->getEntity($parentType, $parentId);
        }
        
        // Try to find by email address
        $emailAddress = $email->get('from') ?? $email->get('to');
        
        if ($emailAddress) {
            // Try to find Lead or Contact by email
            $lead = $this->entityManager
                ->getRDBRepository('Lead')
                ->where(['emailAddress' => $emailAddress])
                ->findOne();
            
            if ($lead) {
                return $lead;
            }
            
            $contact = $this->entityManager
                ->getRDBRepository('Contact')
                ->where(['emailAddress' => $emailAddress])
                ->findOne();
            
            if ($contact) {
                return $contact;
            }
        }
        
        return null;
    }
    
    /**
     * Find or create entity from form data
     */
    private function findOrCreateEntityFromFormData(array $formData): ?Entity
    {
        $email = $formData['email'] ?? null;
        
        if (!$email) {
            return null;
        }
        
        // Try to find existing Lead
        $lead = $this->entityManager
            ->getRDBRepository('Lead')
            ->where(['emailAddress' => $email])
            ->findOne();
        
        if ($lead) {
            // Update lead with form data
            foreach ($formData as $field => $value) {
                if ($lead->hasAttribute($field)) {
                    $lead->set($field, $value);
                }
            }
            $this->entityManager->saveEntity($lead);
            return $lead;
        }
        
        // Create new Lead
        $lead = $this->entityManager->getNewEntity('Lead');
        foreach ($formData as $field => $value) {
            if ($lead->hasAttribute($field)) {
                $lead->set($field, $value);
            }
        }
        $this->entityManager->saveEntity($lead);
        
        return $lead;
    }
}

