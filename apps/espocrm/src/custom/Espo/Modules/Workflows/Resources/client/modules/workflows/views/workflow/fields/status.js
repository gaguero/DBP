/**
 * Status Field View
 * Custom field view for workflow status with color coding
 */

Espo.define('Workflows:Views.Workflow.Fields.Status', 'Views.Fields.Base', function (Dep) {
    return Dep.extend({
        listTemplate: 'workflows:workflow/fields/status',
        
        data: function () {
            var status = this.model.get(this.name) || 'draft';
            var statusLabel = this.getLanguage().translateOption(status, 'status', 'Workflow');
            
            return {
                status: status,
                statusLabel: statusLabel,
                statusClass: 'status-' + status
            };
        }
    });
});

