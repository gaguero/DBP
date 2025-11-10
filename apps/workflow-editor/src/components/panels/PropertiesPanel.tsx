/**
 * Properties Panel Component
 * Shows configuration form for selected node
 */

import { useState, useEffect } from 'react';
import type { Node } from 'reactflow';
import type { WorkflowNode } from '../../types';
import './PropertiesPanel.css';

interface PropertiesPanelProps {
  selectedNode: Node | null;
  onUpdateNode: (nodeId: string, data: Record<string, any>) => void;
  entityTypes?: string[];
  entityFields?: Record<string, Record<string, any>>;
}

export function PropertiesPanel({
  selectedNode,
  onUpdateNode,
  entityTypes = [],
  entityFields = {},
}: PropertiesPanelProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (selectedNode) {
      setFormData(selectedNode.data || {});
    }
  }, [selectedNode]);

  const handleFieldChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (selectedNode) {
      onUpdateNode(selectedNode.id, updated);
    }
  };

  if (!selectedNode) {
    return (
      <div className="properties-panel">
        <div className="panel-header">
          <h3>Properties</h3>
        </div>
        <div className="panel-empty">
          <p>Select a node to edit its properties</p>
        </div>
      </div>
    );
  }

  const nodeType = selectedNode.type as WorkflowNode['type'];

  return (
    <div className="properties-panel">
      <div className="panel-header">
        <h3>Node Properties</h3>
        <div className="node-type-badge">{nodeType}</div>
      </div>
      <div className="panel-content">
        {nodeType === 'trigger' && (
          <TriggerProperties
            formData={formData}
            onFieldChange={handleFieldChange}
            entityTypes={entityTypes}
          />
        )}
        {nodeType === 'action' && (
          <ActionProperties
            formData={formData}
            onFieldChange={handleFieldChange}
            entityTypes={entityTypes}
            entityFields={entityFields}
          />
        )}
        {nodeType === 'condition' && (
          <ConditionProperties
            formData={formData}
            onFieldChange={handleFieldChange}
            entityTypes={entityTypes}
            entityFields={entityFields}
          />
        )}
        {nodeType === 'delay' && (
          <DelayProperties
            formData={formData}
            onFieldChange={handleFieldChange}
          />
        )}
        {nodeType === 'branch' && (
          <BranchProperties
            formData={formData}
            onFieldChange={handleFieldChange}
          />
        )}
        {nodeType === 'code' && (
          <CodeProperties
            formData={formData}
            onFieldChange={handleFieldChange}
          />
        )}
      </div>
    </div>
  );
}

// Trigger Properties Form
function TriggerProperties({
  formData,
  onFieldChange,
  entityTypes,
}: {
  formData: Record<string, any>;
  onFieldChange: (field: string, value: any) => void;
  entityTypes: string[];
}) {
  const triggerTypes = [
    'Record Created',
    'Record Updated',
    'Record Deleted',
    'Property Changed',
    'Email Opened',
    'Email Clicked',
    'Email Bounced',
    'Email Replied',
    'Form Submission',
    'Specific Date/Time',
    'Recurring Schedule',
  ];

  return (
    <div className="properties-form">
      <div className="form-group">
        <label>Label</label>
        <input
          type="text"
          value={formData.label || ''}
          onChange={(e) => onFieldChange('label', e.target.value)}
          placeholder="Trigger name"
        />
      </div>
      <div className="form-group">
        <label>Trigger Type</label>
        <select
          value={formData.triggerType || ''}
          onChange={(e) => onFieldChange('triggerType', e.target.value)}
        >
          <option value="">Select trigger type</option>
          {triggerTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {formData.triggerType && (
        <>
          <div className="form-group">
            <label>Entity Type</label>
            <select
              value={formData.entityType || ''}
              onChange={(e) => onFieldChange('entityType', e.target.value)}
            >
              <option value="">Select entity</option>
              {entityTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {formData.triggerType === 'Property Changed' && (
            <div className="form-group">
              <label>Property Name</label>
              <input
                type="text"
                value={formData.propertyName || ''}
                onChange={(e) => onFieldChange('propertyName', e.target.value)}
                placeholder="e.g., status"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Action Properties Form
function ActionProperties({
  formData,
  onFieldChange,
  entityTypes,
  entityFields: _entityFields,
}: {
  formData: Record<string, any>;
  onFieldChange: (field: string, value: any) => void;
  entityTypes: string[];
  entityFields: Record<string, Record<string, any>>;
}) {
  const actionTypes = [
    'updateRecord',
    'createRecord',
    'sendEmail',
    'assignToOwner',
    'addToList',
    'createTask',
  ];

  return (
    <div className="properties-form">
      <div className="form-group">
        <label>Label</label>
        <input
          type="text"
          value={formData.label || ''}
          onChange={(e) => onFieldChange('label', e.target.value)}
          placeholder="Action name"
        />
      </div>
      <div className="form-group">
        <label>Action Type</label>
        <select
          value={formData.actionType || ''}
          onChange={(e) => onFieldChange('actionType', e.target.value)}
        >
          <option value="">Select action type</option>
          {actionTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {formData.actionType === 'updateRecord' && (
        <>
          <div className="form-group">
            <label>Entity Type</label>
            <select
              value={formData.entityType || ''}
              onChange={(e) => onFieldChange('entityType', e.target.value)}
            >
              <option value="">Select entity</option>
              {entityTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {formData.entityType && (
            <div className="form-group">
              <label>Properties (JSON)</label>
              <textarea
                value={JSON.stringify(formData.properties || {}, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    onFieldChange('properties', parsed);
                  } catch {
                    // Invalid JSON, ignore
                  }
                }}
                placeholder='{"field": "value"}'
                rows={4}
              />
            </div>
          )}
        </>
      )}
      {formData.actionType === 'createRecord' && (
        <>
          <div className="form-group">
            <label>Entity Type to Create</label>
            <select
              value={formData.entityType || ''}
              onChange={(e) => onFieldChange('entityType', e.target.value)}
            >
              <option value="">Select entity</option>
              {entityTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {formData.entityType && (
            <div className="form-group">
              <label>Properties (JSON)</label>
              <textarea
                value={JSON.stringify(formData.properties || {}, null, 2)}
                onChange={(e) => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    onFieldChange('properties', parsed);
                  } catch {
                    // Invalid JSON, ignore
                  }
                }}
                placeholder='{"field": "value"}'
                rows={4}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Condition Properties Form
function ConditionProperties({
  formData,
  onFieldChange,
  entityTypes,
  entityFields: _entityFields,
}: {
  formData: Record<string, any>;
  onFieldChange: (field: string, value: any) => void;
  entityTypes: string[];
  entityFields: Record<string, Record<string, any>>;
}) {
  const operators = [
    'equals',
    'not_equals',
    'contains',
    'not_contains',
    'is_empty',
    'is_not_empty',
    'greater_than',
    'less_than',
  ];

  return (
    <div className="properties-form">
      <div className="form-group">
        <label>Label</label>
        <input
          type="text"
          value={formData.label || ''}
          onChange={(e) => onFieldChange('label', e.target.value)}
          placeholder="Condition name"
        />
      </div>
      <div className="form-group">
        <label>Entity Type</label>
        <select
          value={formData.entityType || ''}
          onChange={(e) => onFieldChange('entityType', e.target.value)}
        >
          <option value="">Select entity</option>
          {entityTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {formData.entityType && (
        <>
          <div className="form-group">
            <label>Field</label>
            <select
              value={formData.field || ''}
              onChange={(e) => onFieldChange('field', e.target.value)}
            >
              <option value="">Select field</option>
              {Object.keys(_entityFields[formData.entityType] || {}).map((field) => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Operator</label>
            <select
              value={formData.operator || ''}
              onChange={(e) => onFieldChange('operator', e.target.value)}
            >
              <option value="">Select operator</option>
              {operators.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </div>
          {formData.operator && !['is_empty', 'is_not_empty'].includes(formData.operator) && (
            <div className="form-group">
              <label>Value</label>
              <input
                type="text"
                value={formData.value || ''}
                onChange={(e) => onFieldChange('value', e.target.value)}
                placeholder="Value to compare"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Delay Properties Form
function DelayProperties({
  formData,
  onFieldChange,
}: {
  formData: Record<string, any>;
  onFieldChange: (field: string, value: any) => void;
}) {
  const units = ['seconds', 'minutes', 'hours', 'days', 'weeks'];

  return (
    <div className="properties-form">
      <div className="form-group">
        <label>Label</label>
        <input
          type="text"
          value={formData.label || ''}
          onChange={(e) => onFieldChange('label', e.target.value)}
          placeholder="Delay name"
        />
      </div>
      <div className="form-group">
        <label>Delay Amount</label>
        <input
          type="number"
          value={formData.delayAmount || ''}
          onChange={(e) => onFieldChange('delayAmount', parseInt(e.target.value) || 0)}
          min="0"
          placeholder="0"
        />
      </div>
      <div className="form-group">
        <label>Delay Unit</label>
        <select
          value={formData.delayUnit || ''}
          onChange={(e) => onFieldChange('delayUnit', e.target.value)}
        >
          <option value="">Select unit</option>
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={formData.businessHoursOnly || false}
            onChange={(e) => onFieldChange('businessHoursOnly', e.target.checked)}
          />
          Business Hours Only
        </label>
      </div>
    </div>
  );
}

// Branch Properties Form
function BranchProperties({
  formData,
  onFieldChange,
}: {
  formData: Record<string, any>;
  onFieldChange: (field: string, value: any) => void;
}) {
  return (
    <div className="properties-form">
      <div className="form-group">
        <label>Label</label>
        <input
          type="text"
          value={formData.label || ''}
          onChange={(e) => onFieldChange('label', e.target.value)}
          placeholder="Branch name"
        />
      </div>
      <div className="form-group">
        <label>Number of Paths</label>
        <input
          type="number"
          value={formData.paths?.length || 2}
          onChange={(e) => {
            const count = parseInt(e.target.value) || 2;
            onFieldChange('paths', Array(count).fill(null).map((_, i) => ({
              id: `path-${i + 1}`,
              label: `Path ${i + 1}`,
            })));
          }}
          min="2"
          max="10"
        />
      </div>
    </div>
  );
}

// Code Properties Form
function CodeProperties({
  formData,
  onFieldChange,
}: {
  formData: Record<string, any>;
  onFieldChange: (field: string, value: any) => void;
}) {
  return (
    <div className="properties-form">
      <div className="form-group">
        <label>Label</label>
        <input
          type="text"
          value={formData.label || ''}
          onChange={(e) => onFieldChange('label', e.target.value)}
          placeholder="Code node name"
        />
      </div>
      <div className="form-group">
        <label>JavaScript Code</label>
        <textarea
          value={formData.code || ''}
          onChange={(e) => onFieldChange('code', e.target.value)}
          placeholder="// Your custom code here"
          rows={10}
          style={{ fontFamily: 'monospace' }}
        />
      </div>
    </div>
  );
}

