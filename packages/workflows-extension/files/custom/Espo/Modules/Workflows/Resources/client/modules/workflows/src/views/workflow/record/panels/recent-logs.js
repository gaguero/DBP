/**
 * Recent Logs Panel
 * Shows recent execution logs for the workflow
 */

Espo.define('Workflows:Views.Workflow.Record.Panels.RecentLogs', 'Views.Record.Panels.Relationship', function (Dep) {
    return Dep.extend({
        setup: function () {
            this.scope = 'WorkflowLog';
            this.link = 'logs';
            this.title = this.translate('Recent Logs', 'labels', 'Workflow');
            
            Dep.prototype.setup.call(this);
            
            // Limit to 20 most recent logs
            this.collection.maxSize = 20;
        },
        
        actionRefresh: function () {
            this.collection.fetch();
        }
    });
});

