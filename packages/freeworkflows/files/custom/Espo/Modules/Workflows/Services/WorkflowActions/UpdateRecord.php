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

namespace Espo\Modules\Workflows\Services\WorkflowActions;

use Espo\Modules\Workflows\Services\WorkflowAction;
use Espo\Core\ORM\EntityManager;
use Espo\Core\Exceptions\Error;
use Espo\ORM\Entity;

/**
 * Action to update record properties
 */
class UpdateRecord extends WorkflowAction
{
    public function execute(Entity $targetEntity, array $actionData, Entity $execution): array
    {
        $entityType = $actionData['entityType'] ?? $targetEntity->getEntityType();
        $entityId = $actionData['entityId'] ?? $targetEntity->getId();
        $properties = $actionData['properties'] ?? [];
        
        if (!$entityId) {
            throw new Error("UpdateRecord: entityId is required");
        }
        
        if (empty($properties)) {
            throw new Error("UpdateRecord: properties are required");
        }
        
        $entity = $this->entityManager->getEntity($entityType, $entityId);
        
        if (!$entity) {
            throw new Error("UpdateRecord: Entity '{$entityType}' with ID '{$entityId}' not found");
        }
        
        // Resolve placeholders and update properties
        foreach ($properties as $field => $value) {
            $resolvedValue = $this->resolvePlaceholders($value, $targetEntity);
            $entity->set($field, $resolvedValue);
        }
        
        $this->entityManager->saveEntity($entity);
        
        return [
            'updatedEntityType' => $entityType,
            'updatedEntityId' => $entityId,
            'updatedFields' => array_keys($properties)
        ];
    }
}

