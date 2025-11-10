/**
 * Edit Workflow Row Action Handler
 */

Espo.define('Workflows:Handlers.Workflow.EditWorkflowRowAction', 'Handlers.Record.RowAction', function (Dep) {
    return Dep.extend({
        actionEditWorkflow: function (data) {
            var id = data.id;
            this.getRouter().navigate('#Workflow/edit/' + id, {trigger: true});
        }
    });
});

