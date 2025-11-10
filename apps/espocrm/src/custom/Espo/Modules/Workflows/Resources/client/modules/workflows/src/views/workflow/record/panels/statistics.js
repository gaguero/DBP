/**
 * Workflow Statistics Panel
 * Shows execution statistics for the workflow
 */

Espo.define('Workflows:Views.Workflow.Record.Panels.Statistics', 'Views.Record.Panels.Side', function (Dep) {
    return Dep.extend({
        template: 'workflows:workflow/record/panels/statistics',
        
        setup: function () {
            Dep.prototype.setup.call(this);
            this.listenTo(this.model, 'sync', this.fetchStatistics, this);
            this.fetchStatistics();
        },
        
        fetchStatistics: function () {
            // Fetch execution statistics
            this.ajaxGetRequest('Workflow/' + this.model.id + '/statistics').then(function (data) {
                this.statistics = data || {
                    totalExecutions: 0,
                    successfulExecutions: 0,
                    failedExecutions: 0,
                    lastExecutionAt: null
                };
                this.reRender();
            }.bind(this)).catch(function () {
                this.statistics = {
                    totalExecutions: 0,
                    successfulExecutions: 0,
                    failedExecutions: 0,
                    lastExecutionAt: null
                };
                this.reRender();
            }.bind(this));
        },
        
        data: function () {
            return {
                statistics: this.statistics || {
                    totalExecutions: 0,
                    successfulExecutions: 0,
                    failedExecutions: 0,
                    lastExecutionAt: null
                }
            };
        }
    });
});

