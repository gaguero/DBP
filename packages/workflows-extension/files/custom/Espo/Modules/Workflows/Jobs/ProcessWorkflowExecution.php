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
use Espo\Modules\Workflows\Services\WorkflowEngine;
use DateTime;

/**
 * Job to process scheduled workflow executions
 */
class ProcessWorkflowExecution implements Job
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
        $executionId = $data->get('executionId');
        
        if (!$executionId) {
            throw new Error("Execution ID not provided");
        }
        
        /** @var ?Entity $execution */
        $execution = $this->entityManager->getEntityById('WorkflowExecution', $executionId);
        
        if (!$execution) {
            throw new Error("WorkflowExecution '{$executionId}' not found");
        }
        
        // Verify status is scheduled
        if ($execution->get('status') !== 'scheduled') {
            throw new Error("WorkflowExecution '{$executionId}' is not in scheduled status");
        }
        
        // Update status to running
        $execution->set('status', 'running');
        $execution->set('startedAt', new DateTime());
        $this->entityManager->saveEntity($execution);
        
        try {
            // Execute workflow
            $this->workflowEngine->execute($execution);
            
            // If still running (not completed), update status
            if ($execution->get('status') === 'running') {
                // Workflow may have scheduled more executions, keep as running
                // or mark as completed if no more nodes
            }
            
        } catch (\Exception $e) {
            // Update execution status to failed
            $execution->set('status', 'failed');
            $execution->set('errorMessage', $e->getMessage());
            $execution->set('completedAt', new DateTime());
            $this->entityManager->saveEntity($execution);
            
            throw $e;
        }
    }
}

