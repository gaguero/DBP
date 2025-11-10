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
 * Base service for workflow actions
 */
abstract class WorkflowAction
{
    protected EntityManager $entityManager;
    
    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    
    /**
     * Execute the action
     *
     * @param Entity $targetEntity The entity the workflow is running on
     * @param array $actionData Action configuration from node data
     * @param Entity $execution The WorkflowExecution entity
     * @return array Result data (can be used by subsequent nodes)
     * @throws Error
     */
    abstract public function execute(Entity $targetEntity, array $actionData, Entity $execution): array;
    
    /**
     * Resolve placeholder values in a string or array
     *
     * @param mixed $value Value that may contain placeholders
     * @param Entity $targetEntity The entity to resolve placeholders from
     * @return mixed Resolved value
     */
    protected function resolvePlaceholders($value, Entity $targetEntity): mixed
    {
        if (is_string($value)) {
            return $this->resolveStringPlaceholders($value, $targetEntity);
        }
        
        if (is_array($value)) {
            $resolved = [];
            foreach ($value as $key => $val) {
                $resolved[$key] = $this->resolvePlaceholders($val, $targetEntity);
            }
            return $resolved;
        }
        
        return $value;
    }
    
    /**
     * Resolve placeholders in a string (e.g., "Hello {{lead.name}}")
     */
    private function resolveStringPlaceholders(string $value, Entity $targetEntity): string
    {
        return preg_replace_callback('/\{\{([^}]+)\}\}/', function ($matches) use ($targetEntity) {
            $path = $matches[1];
            return $this->getPlaceholderValue($targetEntity, $path);
        }, $value);
    }
    
    /**
     * Get value from placeholder path (e.g., "lead.name")
     */
    private function getPlaceholderValue(Entity $entity, string $path): string
    {
        $parts = explode('.', $path);
        
        if (count($parts) === 1) {
            $value = $entity->get($parts[0]);
            return $value !== null ? (string)$value : '';
        }
        
        // Handle related entity fields (e.g., "lead.name")
        $relation = $parts[0];
        $field = $parts[1];
        
        $relatedEntity = $entity->get($relation);
        
        if ($relatedEntity instanceof Entity) {
            $value = $relatedEntity->get($field);
            return $value !== null ? (string)$value : '';
        }
        
        return '';
    }
}

