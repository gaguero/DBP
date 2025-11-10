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

/**
 * Factory service for workflow actions
 */
class WorkflowActionFactory
{
    private EntityManager $entityManager;
    
    /** @var array<string, class-string> */
    private array $actionClasses = [
        'updateRecord' => \Espo\Modules\Workflows\Services\WorkflowActions\UpdateRecord::class,
        'createRecord' => \Espo\Modules\Workflows\Services\WorkflowActions\CreateRecord::class,
    ];
    
    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    
    /**
     * Create an action instance by type
     *
     * @param string $actionType
     * @return WorkflowAction
     * @throws Error
     */
    public function create(string $actionType): WorkflowAction
    {
        $className = $this->actionClasses[$actionType] ?? null;
        
        if (!$className) {
            throw new Error("Unknown action type: " . $actionType);
        }
        
        if (!class_exists($className)) {
            throw new Error("Action class not found: " . $className);
        }
        
        return new $className($this->entityManager);
    }
    
    /**
     * Register a custom action class
     *
     * @param string $actionType
     * @param string $className
     */
    public function register(string $actionType, string $className): void
    {
        $this->actionClasses[$actionType] = $className;
    }
}

