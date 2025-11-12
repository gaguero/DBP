/**
 * Workflow Editor View
 * Backbone view that embeds the React Flow editor in an iframe
 */

Espo.define('workflows:views/workflow-editor/workflow-editor', 'view', function (Dep) {
    return Dep.extend({
        template: 'workflows:workflow-editor',
        
        setup: function () {
            this.workflowId = this.options.id || null;
            this.model = this.options.model || null;
            
            if (this.model) {
                this.workflowId = this.model.id;
            }
        },
        
        afterRender: function () {
            var iframe = this.$el.find('iframe')[0];
            if (!iframe) {
                return;
            }
            
            // Set iframe source
            var workflowIdParam = this.workflowId ? '?workflowId=' + this.workflowId : '';
            iframe.src = '/workflow-editor/index.html' + workflowIdParam;
            
            // Get API token for authentication
            var apiToken = this.getUser().get('apiToken') || null;
            
            // Listen for messages from iframe
            var self = this;
            this.messageHandler = function(event) {
                // Security: Only accept messages from same origin
                if (event.origin !== window.location.origin) {
                    return;
                }
                
                switch (event.data.type) {
                    case 'REQUEST_TOKEN':
                        // Send API token to iframe
                        iframe.contentWindow.postMessage({
                            type: 'TOKEN_RESPONSE',
                            token: apiToken
                        }, window.location.origin);
                        break;
                        
                    case 'WORKFLOW_SAVED':
                        // Workflow was saved in iframe
                        self.trigger('workflow-saved', event.data.workflowId);
                        
                        // Reload model if we have one
                        if (self.model && event.data.workflowId) {
                            self.model.fetch();
                        }
                        
                        // Show success message
                        Espo.Ui.success('Workflow saved successfully');
                        break;
                        
                    case 'WORKFLOW_ERROR':
                        // Show error message
                        Espo.Ui.error(event.data.message || 'Error saving workflow');
                        break;
                        
                    case 'REQUEST_ENTITY_TYPES':
                        // Send entity types to iframe
                        self.getEntityTypes(function(entityTypes) {
                            iframe.contentWindow.postMessage({
                                type: 'ENTITY_TYPES_RESPONSE',
                                entityTypes: entityTypes
                            }, window.location.origin);
                        });
                        break;
                        
                    case 'REQUEST_ENTITY_FIELDS':
                        // Send entity fields to iframe
                        self.getEntityFields(event.data.entityType, function(fields) {
                            iframe.contentWindow.postMessage({
                                type: 'ENTITY_FIELDS_RESPONSE',
                                entityType: event.data.entityType,
                                fields: fields
                            }, window.location.origin);
                        });
                        break;
                }
            };
            
            window.addEventListener('message', this.messageHandler);
            
            // Send workflow ID to iframe after it loads
            iframe.onload = function() {
                if (self.workflowId) {
                    iframe.contentWindow.postMessage({
                        type: 'WORKFLOW_ID',
                        workflowId: self.workflowId
                    }, window.location.origin);
                }
                
                // Send API token
                if (apiToken) {
                    iframe.contentWindow.postMessage({
                        type: 'TOKEN_RESPONSE',
                        token: apiToken
                    }, window.location.origin);
                }
            };
        },
        
        getEntityTypes: function(callback) {
            this.getMetadata().load('entityDefs', function(entityDefs) {
                var entityTypes = Object.keys(entityDefs || {});
                callback(entityTypes);
            });
        },
        
        getEntityFields: function(entityType, callback) {
            this.getMetadata().load('entityDefs.' + entityType + '.fields', function(fields) {
                callback(fields || {});
            });
        },
        
        onRemove: function() {
            // Clean up message listener
            if (this.messageHandler) {
                window.removeEventListener('message', this.messageHandler);
            }
        }
    });
});

