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
 * Service for evaluating workflow conditions
 */
class ConditionEvaluator
{
    private EntityManager $entityManager;
    
    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    
    /**
     * Evaluate a condition node
     *
     * @param Entity $targetEntity The entity being evaluated
     * @param array $condition Condition definition from node data
     * @return bool True if condition is met
     * @throws Error
     */
    public function evaluate(Entity $targetEntity, array $condition): bool
    {
        $type = $condition['type'] ?? null;
        
        if (!$type) {
            throw new Error("Condition missing 'type'");
        }
        
        // Handle logical operators
        if ($type === 'and') {
            return $this->evaluateAnd($targetEntity, $condition);
        }
        
        if ($type === 'or') {
            return $this->evaluateOr($targetEntity, $condition);
        }
        
        if ($type === 'not') {
            return $this->evaluateNot($targetEntity, $condition);
        }
        
        // Handle field conditions
        $attribute = $condition['attribute'] ?? null;
        $value = $condition['value'] ?? null;
        
        if (!$attribute) {
            throw new Error("Condition missing 'attribute'");
        }
        
        $fieldValue = $this->getFieldValue($targetEntity, $attribute);
        
        return $this->evaluateOperator($fieldValue, $type, $value);
    }
    
    /**
     * Evaluate AND condition
     */
    private function evaluateAnd(Entity $targetEntity, array $condition): bool
    {
        $conditions = $condition['conditions'] ?? [];
        
        if (!is_array($conditions) || empty($conditions)) {
            return true;
        }
        
        foreach ($conditions as $subCondition) {
            if (!$this->evaluate($targetEntity, $subCondition)) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Evaluate OR condition
     */
    private function evaluateOr(Entity $targetEntity, array $condition): bool
    {
        $conditions = $condition['conditions'] ?? [];
        
        if (!is_array($conditions) || empty($conditions)) {
            return false;
        }
        
        foreach ($conditions as $subCondition) {
            if ($this->evaluate($targetEntity, $subCondition)) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Evaluate NOT condition
     */
    private function evaluateNot(Entity $targetEntity, array $condition): bool
    {
        $subCondition = $condition['condition'] ?? null;
        
        if (!$subCondition) {
            throw new Error("NOT condition missing 'condition'");
        }
        
        return !$this->evaluate($targetEntity, $subCondition);
    }
    
    /**
     * Evaluate operator condition
     */
    private function evaluateOperator($fieldValue, string $operator, $value): bool
    {
        switch ($operator) {
            // String operators
            case 'equals':
                return $fieldValue === $value;
                
            case 'notEquals':
                return $fieldValue !== $value;
                
            case 'contains':
                if (is_string($fieldValue) && is_string($value)) {
                    return str_contains($fieldValue, $value);
                }
                if (is_array($fieldValue)) {
                    return in_array($value, $fieldValue);
                }
                return false;
                
            case 'notContains':
                if (is_string($fieldValue) && is_string($value)) {
                    return !str_contains($fieldValue, $value);
                }
                if (is_array($fieldValue)) {
                    return !in_array($value, $fieldValue);
                }
                return true;
                
            case 'startsWith':
                return is_string($fieldValue) && is_string($value) && str_starts_with($fieldValue, $value);
                
            case 'endsWith':
                return is_string($fieldValue) && is_string($value) && str_ends_with($fieldValue, $value);
                
            case 'isEmpty':
                return $fieldValue === null || $fieldValue === '' || $fieldValue === [] || $fieldValue === false;
                
            case 'isNotEmpty':
                return !($fieldValue === null || $fieldValue === '' || $fieldValue === [] || $fieldValue === false);
                
            // Number operators
            case 'greaterThan':
                return is_numeric($fieldValue) && is_numeric($value) && (float)$fieldValue > (float)$value;
                
            case 'lessThan':
                return is_numeric($fieldValue) && is_numeric($value) && (float)$fieldValue < (float)$value;
                
            case 'greaterThanOrEquals':
                return is_numeric($fieldValue) && is_numeric($value) && (float)$fieldValue >= (float)$value;
                
            case 'lessThanOrEquals':
                return is_numeric($fieldValue) && is_numeric($value) && (float)$fieldValue <= (float)$value;
                
            case 'between':
                if (!is_array($value) || count($value) !== 2) {
                    return false;
                }
                $min = (float)($value[0] ?? 0);
                $max = (float)($value[1] ?? 0);
                $val = (float)$fieldValue;
                return $val >= $min && $val <= $max;
                
            // Boolean operators
            case 'isTrue':
                return (bool)$fieldValue === true;
                
            case 'isFalse':
                return (bool)$fieldValue === false;
                
            // Date operators
            case 'equalsDate':
                return $this->compareDates($fieldValue, $value, 'equals');
                
            case 'beforeDate':
                return $this->compareDates($fieldValue, $value, 'before');
                
            case 'afterDate':
                return $this->compareDates($fieldValue, $value, 'after');
                
            case 'daysAgo':
                return $this->compareDaysAgo($fieldValue, (int)$value);
                
            case 'daysFromNow':
                return $this->compareDaysFromNow($fieldValue, (int)$value);
                
            // Array operators
            case 'in':
                return is_array($value) && in_array($fieldValue, $value);
                
            case 'notIn':
                return is_array($value) && !in_array($fieldValue, $value);
                
            default:
                throw new Error("Unknown operator: " . $operator);
        }
    }
    
    /**
     * Get field value from entity, supporting placeholders
     */
    private function getFieldValue(Entity $entity, string $attribute): mixed
    {
        // Support placeholders like {{lead.name}}
        if (preg_match('/^\{\{([^}]+)\}\}$/', $attribute, $matches)) {
            $path = $matches[1];
            return $this->resolvePlaceholder($entity, $path);
        }
        
        return $entity->get($attribute);
    }
    
    /**
     * Resolve placeholder path (e.g., "lead.name")
     */
    private function resolvePlaceholder(Entity $entity, string $path): mixed
    {
        $parts = explode('.', $path);
        
        if (count($parts) === 1) {
            return $entity->get($parts[0]);
        }
        
        // Handle related entity fields (e.g., "lead.name")
        $relation = $parts[0];
        $field = $parts[1];
        
        $relatedEntity = $entity->get($relation);
        
        if ($relatedEntity instanceof Entity) {
            return $relatedEntity->get($field);
        }
        
        return null;
    }
    
    /**
     * Compare dates
     */
    private function compareDates($fieldValue, $value, string $operator): bool
    {
        if (!$fieldValue) {
            return false;
        }
        
        $fieldDate = $this->parseDate($fieldValue);
        $compareDate = $this->parseDate($value);
        
        if (!$fieldDate || !$compareDate) {
            return false;
        }
        
        switch ($operator) {
            case 'equals':
                return $fieldDate->format('Y-m-d') === $compareDate->format('Y-m-d');
            case 'before':
                return $fieldDate < $compareDate;
            case 'after':
                return $fieldDate > $compareDate;
            default:
                return false;
        }
    }
    
    /**
     * Compare days ago
     */
    private function compareDaysAgo($fieldValue, int $days): bool
    {
        if (!$fieldValue) {
            return false;
        }
        
        $fieldDate = $this->parseDate($fieldValue);
        if (!$fieldDate) {
            return false;
        }
        
        $targetDate = new DateTime();
        $targetDate->modify("-{$days} days");
        
        return $fieldDate->format('Y-m-d') === $targetDate->format('Y-m-d');
    }
    
    /**
     * Compare days from now
     */
    private function compareDaysFromNow($fieldValue, int $days): bool
    {
        if (!$fieldValue) {
            return false;
        }
        
        $fieldDate = $this->parseDate($fieldValue);
        if (!$fieldDate) {
            return false;
        }
        
        $targetDate = new DateTime();
        $targetDate->modify("+{$days} days");
        
        return $fieldDate->format('Y-m-d') === $targetDate->format('Y-m-d');
    }
    
    /**
     * Parse date value
     */
    private function parseDate($value): ?DateTime
    {
        if ($value instanceof DateTime) {
            return $value;
        }
        
        if (is_string($value)) {
            try {
                return new DateTime($value);
            } catch (\Exception $e) {
                return null;
            }
        }
        
        return null;
    }
}

