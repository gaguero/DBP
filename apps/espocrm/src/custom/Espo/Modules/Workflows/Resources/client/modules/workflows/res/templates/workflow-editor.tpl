<div class="workflow-editor-container">
    <div class="workflow-editor-header">
        <h3>{{#if id}}{{translate 'Workflow' category='scopeNames'}}{{else}}{{translate 'Create Workflow' category='Workflows'}}{{/if}}</h3>
    </div>
    <div class="workflow-editor-iframe-wrapper">
        <iframe 
            id="workflow-editor-iframe"
            frameborder="0"
            style="width: 100%; height: 100%; border: none;"
            allow="clipboard-read; clipboard-write"
        ></iframe>
    </div>
</div>

