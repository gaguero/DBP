/**
 * Node Palette Component
 * Sidebar panel with draggable nodes grouped by category
 */

import { useState, useMemo } from 'react';
import type { WorkflowNode } from '../../types';
import './NodePalette.css';

interface NodePaletteProps {
  onNodeSelect?: (nodeType: WorkflowNode['type']) => void;
}

interface NodeDefinition {
  type: WorkflowNode['type'];
  label: string;
  icon: string;
  description: string;
  category: 'triggers' | 'actions' | 'conditions' | 'flow';
}

const NODE_DEFINITIONS: NodeDefinition[] = [
  // Triggers
  {
    type: 'trigger',
    label: 'Trigger',
    icon: '⚡',
    description: 'Start workflow when event occurs',
    category: 'triggers',
  },
  // Actions
  {
    type: 'action',
    label: 'Action',
    icon: '⚙️',
    description: 'Execute an action (update record, send email, etc.)',
    category: 'actions',
  },
  // Conditions
  {
    type: 'condition',
    label: 'Condition',
    icon: '❓',
    description: 'Check condition and route workflow',
    category: 'conditions',
  },
  // Flow Control
  {
    type: 'delay',
    label: 'Delay',
    icon: '⏱️',
    description: 'Wait for specified time before continuing',
    category: 'flow',
  },
  {
    type: 'branch',
    label: 'Branch',
    icon: '🔀',
    description: 'Split workflow into multiple paths',
    category: 'flow',
  },
  {
    type: 'code',
    label: 'Code',
    icon: '💻',
    description: 'Execute custom JavaScript code',
    category: 'flow',
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  triggers: 'Triggers',
  actions: 'Actions',
  conditions: 'Conditions',
  flow: 'Flow Control',
};

export function NodePalette({ onNodeSelect }: NodePaletteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredNodes = useMemo(() => {
    let filtered = NODE_DEFINITIONS;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(node => node.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        node =>
          node.label.toLowerCase().includes(query) ||
          node.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const groupedNodes = useMemo(() => {
    const groups: Record<string, NodeDefinition[]> = {};
    filteredNodes.forEach(node => {
      if (!groups[node.category]) {
        groups[node.category] = [];
      }
      groups[node.category].push(node);
    });
    return groups;
  }, [filteredNodes]);

  const handleDragStart = (event: React.DragEvent, nodeType: WorkflowNode['type']) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleNodeClick = (nodeType: WorkflowNode['type']) => {
    if (onNodeSelect) {
      onNodeSelect(nodeType);
    }
  };

  return (
    <div className="node-palette">
      <div className="palette-header">
        <h3>Node Palette</h3>
        <input
          type="text"
          placeholder="Search nodes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="palette-search"
        />
      </div>

      <div className="palette-categories">
        <button
          className={`category-button ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {Object.keys(CATEGORY_LABELS).map(category => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>

      <div className="palette-content">
        {Object.keys(groupedNodes).length === 0 ? (
          <div className="palette-empty">No nodes found</div>
        ) : (
          Object.entries(groupedNodes).map(([category, nodes]) => (
            <div key={category} className="palette-group">
              <div className="group-header">{CATEGORY_LABELS[category]}</div>
              <div className="group-nodes">
                {nodes.map(node => (
                  <div
                    key={node.type}
                    className="palette-node"
                    draggable
                    onDragStart={(e) => handleDragStart(e, node.type)}
                    onClick={() => handleNodeClick(node.type)}
                    title={node.description}
                  >
                    <span className="node-icon">{node.icon}</span>
                    <div className="node-info">
                      <div className="node-name">{node.label}</div>
                      <div className="node-description">{node.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

