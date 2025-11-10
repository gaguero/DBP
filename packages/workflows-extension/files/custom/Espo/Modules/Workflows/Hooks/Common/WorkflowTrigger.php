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

use Espo\Modules\Workflows\Services\TriggerManager;
use Espo\ORM\Entity;

/**
 * Hook to trigger workflows on entity events
 */
class WorkflowTrigger
{
    private TriggerManager $triggerManager;
    
    public function __construct(TriggerManager $triggerManager)
    {
        $this->triggerManager = $triggerManager;
    }
    
    /**
     * Trigger workflows after entity is saved
     */
    public function afterSave(Entity $entity, array $options): void
    {
        // Skip if workflow is disabled
        if (isset($options['skipWorkflow']) && $options['skipWorkflow']) {
            return;
        }
        
        $isNew = $entity->isNew();
        
        if ($isNew) {
            $this->triggerManager->triggerRecordCreated($entity);
        } else {
            $this->triggerManager->triggerRecordUpdated($entity);
            
            // Check for property changes
            $changedAttributes = $entity->getAttributeList();
            foreach ($changedAttributes as $attribute) {
                if ($entity->isAttributeChanged($attribute)) {
                    $oldValue = $entity->getFetched($attribute);
                    $newValue = $entity->get($attribute);
                    $this->triggerManager->triggerPropertyChanged($entity, $attribute, $oldValue, $newValue);
                }
            }
        }
    }
    
    /**
     * Trigger workflows after entity is deleted
     */
    public function afterRemove(Entity $entity, array $options): void
    {
        if (isset($options['skipWorkflow']) && $options['skipWorkflow']) {
            return;
        }
        
        $this->triggerManager->triggerRecordDeleted($entity);
    }
}

