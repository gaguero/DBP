/**
 * Workflow List View
 * Custom list view for workflows with status indicators and quick actions
 */

Espo.define('Workflows:Views.Workflow.Record.List', 'Views.Record.List', function (Dep) {
    return Dep.extend({
        setup: function () {
            Dep.prototype.setup.call(this);
            
            // Add custom row actions
            this.rowActionsView = 'Workflows:Views.Workflow.Record.RowActions';
        },
        
        getHeader: function () {
            return [
                {
                    name: 'name',
                    label: 'Name',
                    view: 'views/fields/varchar',
                    sortable: true
                },
                {
                    name: 'status',
                    label: 'Status',
                    view: 'Workflows:Views.Workflow.Fields.Status',
                    sortable: true,
                    width: '120px'
                },
                {
                    name: 'entityType',
                    label: 'Entity Type',
                    view: 'views/fields/varchar',
                    sortable: true,
                    width: '150px'
                },
                {
                    name: 'triggerType',
                    label: 'Trigger Type',
                    view: 'views/fields/varchar',
                    sortable: true,
                    width: '180px'
                },
                {
                    name: 'isActive',
                    label: 'Active',
                    view: 'views/fields/bool',
                    sortable: true,
                    width: '80px'
                },
                {
                    name: 'modifiedAt',
                    label: 'Modified',
                    view: 'views/fields/datetime',
                    sortable: true,
                    width: '150px'
                }
            ];
        },
        
        actionCreate: function () {
            this.createView('create', 'Workflows:Views.WorkflowEditor', {
                workflowId: null
            }, function (view) {
                view.render();
                this.listenToOnce(view, 'workflow-saved', function () {
                    this.collection.fetch();
                }, this);
            });
        }
    });
});

