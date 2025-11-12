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

namespace Espo\Modules\Workflows\Jobs;

use Espo\Core\Job\Job;
use Espo\Core\Job\Job\Data;
use Espo\Core\ORM\EntityManager;
use Espo\Core\Exceptions\Error;
use Espo\ORM\Entity;
use Espo\Modules\Workflows\Services\TriggerManager;
use Espo\Modules\Workflows\Services\WorkflowEngine;

/**
 * Job to process scheduled workflows
 */
class ProcessScheduledWorkflow implements Job
{
    private EntityManager $entityManager;
    private WorkflowEngine $workflowEngine;
    
    public function __construct(
        EntityManager $entityManager,
        WorkflowEngine $workflowEngine
    ) {
        $this->entityManager = $entityManager;
        $this->workflowEngine = $workflowEngine;
    }
    
    /**
     * @throws Error
     */
    public function run(Data $data): void
    {
        $workflowId = $data->get('workflowId');
        
        if (!$workflowId) {
            throw new Error("Workflow ID not provided");
        }
        
        /** @var ?Entity $workflow */
        $workflow = $this->entityManager->getEntityById('Workflow', $workflowId);
        
        if (!$workflow) {
            throw new Error("Workflow '{$workflowId}' not found");
        }
        
        if (!$workflow->get('isActive') || $workflow->get('status') !== 'active') {
            return; // Workflow is not active, skip
        }
        
        // For scheduled workflows, we need to determine what entities to process
        // This depends on the workflow definition
        // For now, we'll create an execution without a specific entity
        // The workflow definition should specify how to get entities
        
        $execution = $this->entityManager->getNewEntity('WorkflowExecution');
        $execution->set([
            'workflowId' => $workflowId,
            'status' => 'running',
            'inputData' => [
                'scheduled' => true
            ]
        ]);
        $this->entityManager->saveEntity($execution);
        
        try {
            $this->workflowEngine->execute($execution);
        } catch (\Exception $e) {
            $execution->set('status', 'failed');
            $execution->set('errorMessage', $e->getMessage());
            $this->entityManager->saveEntity($execution);
            throw $e;
        }
    }
}

