/**
 * WorkflowLog Detail View
 * Detail view for workflow execution log entries
 */

Espo.define('workflows:views/workflow-log/record/detail', 'views/record/detail', function (Dep) {
    return Dep.extend({
        setup: function () {
            Dep.prototype.setup.call(this);
        },
        
        getDetailLayout: function () {
            return [
                {
                    rows: [
                        [
                            {
                                name: 'workflowName',
                                view: 'views/fields/link',
                                link: 'workflow'
                            },
                            {
                                name: 'executionStatus',
                                view: 'views/fields/enum'
                            }
                        ],
                        [
                            {
                                name: 'nodeId',
                                view: 'views/fields/varchar'
                            },
                            {
                                name: 'action',
                                view: 'views/fields/varchar'
                            }
                        ],
                        [
                            {
                                name: 'status',
                                view: 'views/fields/enum'
                            },
                            {
                                name: 'executedAt',
                                view: 'views/fields/datetime'
                            }
                        ],
                        [
                            {
                                name: 'message',
                                view: 'views/fields/text',
                                span: 2
                            }
                        ],
                        [
                            {
                                name: 'data',
                                view: 'views/fields/json',
                                span: 2
                            }
                        ]
                    ]
                }
            ];
        }
    });
});

