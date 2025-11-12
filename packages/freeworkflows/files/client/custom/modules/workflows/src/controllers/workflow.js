/**
 * Workflow Controller
 * Extends the standard Record controller
 */
Espo.define('workflows:controllers/workflow', 'controllers/record', function (Dep) {
    return Dep.extend({
        // Use standard Record controller functionality
        // No custom logic needed as we use standard CRUD operations
    });
});

