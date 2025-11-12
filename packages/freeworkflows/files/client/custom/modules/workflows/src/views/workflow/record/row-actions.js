/**
 * Workflow Row Actions
 * Custom row actions for workflow list (activate/pause, edit, delete)
 */

Espo.define('workflows:views/workflow/record/row-actions', 'views/record/row-actions', function (Dep) {
    return Dep.extend({
        getActionList: function () {
            var list = Dep.prototype.getActionList.call(this);
            
            var model = this.model;
            var isActive = model.get('isActive');
            
            // Add activate/pause action
            list.push({
                label: isActive ? this.translate('Pause', 'labels', 'Workflow') : this.translate('Activate', 'labels', 'Workflow'),
                action: 'toggleActive',
                data: {
                    id: model.id
                }
            });
            
            // Add edit action (opens workflow editor)
            list.push({
                label: this.translate('Edit', 'labels', 'Workflow'),
                action: 'editWorkflow',
                data: {
                    id: model.id
                }
            });
            
            return list;
        },
        
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
        },
        
        actionEditWorkflow: function (data) {
            var id = data.id;
            this.getRouter().navigate('#Workflow/edit/' + id, {trigger: true});
        }
    });
});

