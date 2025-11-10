/**
 * WorkflowLog List View
 * List view for workflow execution logs
 */

Espo.define('views/workflow-logs/record/list', 'Views.Record.List', function (Dep) {
    return Dep.extend({
        getHeader: function () {
            return [
                {
                    name: 'workflowName',
                    label: 'Workflow',
                    view: 'views/fields/link',
                    link: 'workflow',
                    sortable: true,
                    width: '200px'
                },
                {
                    name: 'executionStatus',
                    label: 'Execution Status',
                    view: 'views/fields/enum',
                    sortable: true,
                    width: '150px'
                },
                {
                    name: 'nodeId',
                    label: 'Node ID',
                    view: 'views/fields/varchar',
                    sortable: true,
                    width: '150px'
                },
                {
                    name: 'action',
                    label: 'Action',
                    view: 'views/fields/varchar',
                    sortable: true,
                    width: '150px'
                },
                {
                    name: 'status',
                    label: 'Status',
                    view: 'views/fields/enum',
                    sortable: true,
                    width: '120px'
                },
                {
                    name: 'message',
                    label: 'Message',
                    view: 'views/fields/text',
                    sortable: false,
                    width: '300px'
                },
                {
                    name: 'executedAt',
                    label: 'Executed At',
                    view: 'views/fields/datetime',
                    sortable: true,
                    width: '150px'
                }
            ];
        }
    });
});

