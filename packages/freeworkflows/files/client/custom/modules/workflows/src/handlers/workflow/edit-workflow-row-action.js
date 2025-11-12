/**
 * Edit Workflow Row Action Handler
 */

Espo.define('workflows:handlers/workflow/edit-workflow-row-action', 'handlers/record/row-action', function (Dep) {
    return Dep.extend({
        actionEditWorkflow: function (data) {
            var id = data.id;
            this.getRouter().navigate('#Workflow/edit/' + id, {trigger: true});
        }
    });
});

