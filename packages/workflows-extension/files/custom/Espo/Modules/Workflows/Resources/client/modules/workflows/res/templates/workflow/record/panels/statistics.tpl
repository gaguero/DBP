<div class="panel panel-default panel-side">
    <div class="panel-heading">
        <h4 class="panel-title">{{translate 'Statistics' category='Workflow'}}</h4>
    </div>
    <div class="panel-body">
        <div class="statistics-grid">
            <div class="stat-item">
                <div class="stat-value">{{statistics.totalExecutions}}</div>
                <div class="stat-label">{{translate 'Total Executions' category='Workflow'}}</div>
            </div>
            <div class="stat-item stat-success">
                <div class="stat-value">{{statistics.successfulExecutions}}</div>
                <div class="stat-label">{{translate 'Successful' category='Workflow'}}</div>
            </div>
            <div class="stat-item stat-error">
                <div class="stat-value">{{statistics.failedExecutions}}</div>
                <div class="stat-label">{{translate 'Failed' category='Workflow'}}</div>
            </div>
            {{#if statistics.lastExecutionAt}}
            <div class="stat-item stat-info">
                <div class="stat-value">{{dateTime statistics.lastExecutionAt}}</div>
                <div class="stat-label">{{translate 'Last Execution' category='Workflow'}}</div>
            </div>
            {{/if}}
        </div>
    </div>
</div>

