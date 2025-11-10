/**
 * Toggle Active Row Action Handler
 */

Espo.define('Workflows:Handlers.Workflow.ToggleActiveRowAction', 'Handlers.Record.RowAction', function (Dep) {
    return Dep.extend({
        actionToggleActive: function (data) {
            var model = this.collection.get(data.id);
            if (!model) return;
            
            var isActive = model.get('isActive');
            var newStatus = !isActive;
            
            model.save({
                isActive: newStatus
            }, {
                patch: true,
                success: function () {
                    Espo.Ui.success(
                        newStatus 
                            ? this.translate('Workflow activated', 'messages', 'Workflow')
                            : this.translate('Workflow paused', 'messages', 'Workflow')
                    );
                    this.collection.fetch();
                }.bind(this),
                error: function () {
                    Espo.Ui.error(this.translate('Error saving workflow', 'messages', 'Workflow'));
                }.bind(this)
            });
        }
    });
});

