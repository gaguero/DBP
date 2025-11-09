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

use Espo\Core\Job\JobSchedulerFactory;
use Espo\Core\ORM\EntityManager;
use Espo\Core\Exceptions\Error;
use Espo\ORM\Entity;
use DateTime;

/**
 * Service for scheduling workflow executions
 */
class WorkflowScheduler
{
    private JobSchedulerFactory $jobSchedulerFactory;
    private EntityManager $entityManager;
    
    public function __construct(
        JobSchedulerFactory $jobSchedulerFactory,
        EntityManager $entityManager
    ) {
        $this->jobSchedulerFactory = $jobSchedulerFactory;
        $this->entityManager = $entityManager;
    }
    
    /**
     * Schedule a workflow execution for a specific time
     *
     * @param Entity $execution WorkflowExecution entity
     * @param DateTime $scheduledAt
     * @throws Error
     */
    public function schedule(Entity $execution, DateTime $scheduledAt): void
    {
        $jobScheduler = $this->jobSchedulerFactory->create();
        
        $jobScheduler->setJobName('ProcessWorkflowExecution');
        $jobScheduler->setData([
            'executionId' => $execution->getId()
        ]);
        $jobScheduler->setScheduledAt($scheduledAt);
        $jobScheduler->schedule();
        
        // Update execution
        $execution->set('scheduledAt', $scheduledAt);
        $execution->set('status', 'scheduled');
        $this->entityManager->saveEntity($execution);
    }
    
    /**
     * Schedule a workflow execution relative to now
     *
     * @param Entity $execution
     * @param int $amount
     * @param string $unit minutes, hours, days, weeks
     * @throws Error
     */
    public function scheduleRelative(Entity $execution, int $amount, string $unit): void
    {
        $scheduledAt = $this->calculateScheduledTime($amount, $unit);
        $this->schedule($execution, $scheduledAt);
    }
    
    /**
     * Schedule a recurring workflow
     *
     * @param Entity $workflow Workflow entity
     * @param string $cronExpression
     * @throws Error
     */
    public function scheduleRecurring(Entity $workflow, string $cronExpression): void
    {
        $jobScheduler = $this->jobSchedulerFactory->create();
        
        $jobScheduler->setJobName('ProcessRecurringWorkflow');
        $jobScheduler->setData([
            'workflowId' => $workflow->getId()
        ]);
        $jobScheduler->setScheduling($cronExpression);
        $jobScheduler->schedule();
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

