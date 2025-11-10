/**
 * Workflow Detail View
 * Detail view with statistics, logs, and editor access
 */

Espo.define('Workflows:Views.Workflow.Record.Detail', 'Views.Record.Detail', function (Dep) {
    return Dep.extend({
        setup: function () {
            Dep.prototype.setup.call(this);
            
            // Add custom bottom panel for statistics
            this.bottomPanels = [
                {
                    name: 'statistics',
                    label: 'Statistics',
                    view: 'Workflows:Views.Workflow.Record.Panels.Statistics',
                    options: {
                        model: this.model
                    }
                },
                {
                    name: 'recentLogs',
                    label: 'Recent Logs',
                    view: 'Workflows:Views.Workflow.Record.Panels.RecentLogs',
                    options: {
                        model: this.model
                    }
                }
            ];
        },
        
        actionEdit: function () {
            // Open workflow editor instead of standard edit
            this.getRouter().navigate('#Workflow/edit/' + this.model.id, {trigger: true});
        },
        
        actionActivate: function () {
            this.model.save({
                isActive: true
            }, {
                patch: true,
                success: function () {
                    Espo.Ui.success(this.translate('Workflow activated', 'messages', 'Workflow'));
                    this.model.fetch();
                }.bind(this)
            });
        },
        
        actionPause: function () {
            this.model.save({
                isActive: false
            }, {
                patch: true,
                success: function () {
                    Espo.Ui.success(this.translate('Workflow paused', 'messages', 'Workflow'));
                    this.model.fetch();
                }.bind(this)
            });
        },
        
        actionDuplicate: function () {
            var model = this.model;
            var attributes = model.toJSON();
            
            // Remove ID and timestamps
            delete attributes.id;
            delete attributes.createdAt;
            delete attributes.modifiedAt;
            delete attributes.createdById;
            delete attributes.modifiedById;
            
            // Add "Copy" to name
            attributes.name = (attributes.name || 'Workflow') + ' (Copy)';
            attributes.isActive = false;
            
            // Create new workflow
            var newModel = this.model.clone();
            newModel.set(attributes);
            
            newModel.save({}, {
                success: function () {
                    Espo.Ui.success(this.translate('Workflow duplicated', 'messages', 'Workflow'));
                    this.getRouter().navigate('#Workflow/view/' + newModel.id, {trigger: true});
                }.bind(this),
                error: function () {
                    Espo.Ui.error(this.translate('Error duplicating workflow', 'messages', 'Workflow'));
                }.bind(this)
            });
        }
    });
});

