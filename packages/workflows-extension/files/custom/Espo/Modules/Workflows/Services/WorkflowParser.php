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

use Espo\Core\Exceptions\Error;

/**
 * Service for parsing and validating workflow definitions
 */
class WorkflowParser
{
    /**
     * Parse workflow definition JSON
     *
     * @param string|array $definitionJson JSON string or already decoded array
     * @return array Parsed and validated workflow definition
     * @throws Error
     */
    public function parse($definitionJson): array
    {
        // If already array, use it; otherwise decode JSON
        if (is_array($definitionJson)) {
            $definition = $definitionJson;
        } else {
            $definition = json_decode($definitionJson, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Error("Invalid JSON: " . json_last_error_msg());
            }
        }
        
        // Validate structure
        $this->validateStructure($definition);
        
        // Build execution graph
        $graph = $this->buildGraph($definition);
        
        return [
            'definition' => $definition,
            'graph' => $graph
        ];
    }
    
    /**
     * Validate workflow definition structure
     *
     * @param array $definition
     * @throws Error
     */
    private function validateStructure(array $definition): void
    {
        if (!isset($definition['nodes']) || !is_array($definition['nodes'])) {
            throw new Error("Workflow must have 'nodes' array");
        }
        
        if (!isset($definition['edges']) || !is_array($definition['edges'])) {
            throw new Error("Workflow must have 'edges' array");
        }
        
        if (empty($definition['nodes'])) {
            throw new Error("Workflow must have at least one node");
        }
        
        // Validate that there's at least one trigger
        $hasTrigger = false;
        foreach ($definition['nodes'] as $node) {
            if (isset($node['type']) && $node['type'] === 'trigger') {
                $hasTrigger = true;
                break;
            }
        }
        
        if (!$hasTrigger) {
            throw new Error("Workflow must have at least one trigger node");
        }
        
        // Validate unique node IDs
        $nodeIds = [];
        foreach ($definition['nodes'] as $node) {
            if (!isset($node['id'])) {
                throw new Error("All nodes must have an 'id' field");
            }
            
            $nodeId = $node['id'];
            if (isset($nodeIds[$nodeId])) {
                throw new Error("Duplicate node ID: " . $nodeId);
            }
            $nodeIds[$nodeId] = true;
        }
        
        // Validate edges reference valid nodes
        foreach ($definition['edges'] as $edge) {
            if (!isset($edge['source']) || !isset($edge['target'])) {
                throw new Error("All edges must have 'source' and 'target' fields");
            }
            
            if (!isset($nodeIds[$edge['source']])) {
                throw new Error("Edge references invalid source node: " . $edge['source']);
            }
            
            if (!isset($nodeIds[$edge['target']])) {
                throw new Error("Edge references invalid target node: " . $edge['target']);
            }
        }
    }
    
    /**
     * Build execution graph from definition
     *
     * @param array $definition
     * @return array Graph structure with nodes and their connections
     */
    private function buildGraph(array $definition): array
    {
        $graph = [];
        
        // Initialize graph nodes
        foreach ($definition['nodes'] as $node) {
            $graph[$node['id']] = [
                'node' => $node,
                'outgoing' => [],
                'incoming' => []
            ];
        }
        
        // Build connections from edges
        foreach ($definition['edges'] as $edge) {
            $sourceId = $edge['source'];
            $targetId = $edge['target'];
            
            $graph[$sourceId]['outgoing'][] = [
                'target' => $targetId,
                'condition' => $edge['condition'] ?? null,
                'sourceHandle' => $edge['sourceHandle'] ?? null,
                'targetHandle' => $edge['targetHandle'] ?? null
            ];
            
            $graph[$targetId]['incoming'][] = $sourceId;
        }
        
        return $graph;
    }
    
    /**
     * Get trigger nodes from definition
     *
     * @param array $definition
     * @return array Array of trigger nodes
     */
    public function getTriggerNodes(array $definition): array
    {
        $triggers = [];
        
        foreach ($definition['nodes'] as $node) {
            if (isset($node['type']) && $node['type'] === 'trigger') {
                $triggers[] = $node;
            }
        }
        
        return $triggers;
    }
    
    /**
     * Get next nodes from current node
     *
     * @param array $graph Graph structure
     * @param string $nodeId Current node ID
     * @return array Array of next node IDs
     */
    public function getNextNodes(array $graph, string $nodeId): array
    {
        if (!isset($graph[$nodeId])) {
            return [];
        }
        
        $nextNodes = [];
        foreach ($graph[$nodeId]['outgoing'] as $edge) {
            $nextNodes[] = $edge['target'];
        }
        
        return $nextNodes;
    }
}

