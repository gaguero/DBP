# Script de prueba para endpoints de workflows (PowerShell)
# Uso: .\test-endpoints.ps1 [API_URL]

param(
    [string]$ApiUrl = "http://localhost:3000"
)

$Email = "test@example.com"
$Password = "password123"

Write-Host "🧪 Testing Workflows API Endpoints" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "API URL: $ApiUrl" -ForegroundColor Cyan
Write-Host ""

# Función para hacer requests
function Make-Request {
    param(
        [string]$Method,
        [string]$Endpoint,
        [string]$Data = $null,
        [string]$Token = $null
    )
    
    $headers = @{
        "Content-Type" = "application/json"
    }
    
    if ($Token) {
        $headers["Authorization"] = "Bearer $Token"
    }
    
    $uri = "$ApiUrl$Endpoint"
    
    try {
        if ($Data) {
            $response = Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -Body $Data -ErrorAction Stop
        } else {
            $response = Invoke-RestMethod -Uri $uri -Method $Method -Headers $headers -ErrorAction Stop
        }
        return @{ Success = $true; Data = $response }
    } catch {
        $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue
        return @{ Success = $false; Error = $errorResponse; RawError = $_.Exception.Message }
    }
}

# Test 1: Health check
Write-Host "1️⃣  Testing health check..." -ForegroundColor Yellow
$health = Make-Request -Method "GET" -Endpoint "/health"
if ($health.Success) {
    Write-Host "✅ Health check passed" -ForegroundColor Green
    $health.Data | ConvertTo-Json -Depth 3
} else {
    Write-Host "❌ Health check failed" -ForegroundColor Red
    Write-Host $health.RawError
}
Write-Host ""

# Test 2: Register/Login user
Write-Host "2️⃣  Registering user..." -ForegroundColor Yellow
$registerData = @{
    email = $Email
    password = $Password
} | ConvertTo-Json

$register = Make-Request -Method "POST" -Endpoint "/api/v1/auth/register" -Data $registerData

if ($register.Success -and $register.Data.token) {
    Write-Host "✅ User registered" -ForegroundColor Green
    $Token = $register.Data.token
} else {
    Write-Host "⚠️  User might already exist, trying login..." -ForegroundColor Yellow
    $login = Make-Request -Method "POST" -Endpoint "/api/v1/auth/login" -Data $registerData
    if ($login.Success -and $login.Data.token) {
        Write-Host "✅ Login successful" -ForegroundColor Green
        $Token = $login.Data.token
    } else {
        Write-Host "❌ Login failed" -ForegroundColor Red
        $login.Error | ConvertTo-Json -Depth 3
        exit 1
    }
}

if (-not $Token) {
    Write-Host "❌ Could not obtain authentication token" -ForegroundColor Red
    exit 1
}

Write-Host "Token: $($Token.Substring(0, [Math]::Min(30, $Token.Length)))..." -ForegroundColor Gray
Write-Host ""

# Test 3: Create workflow
Write-Host "3️⃣  Creating workflow..." -ForegroundColor Yellow
$workflowData = @{
    name = "Test Workflow"
    description = "Workflow creado por script de prueba"
    entityType = "Lead"
    triggerType = "created"
    definition = @{
        nodes = @(
            @{
                id = "trigger-1"
                type = "trigger"
                data = @{
                    entityType = "Lead"
                    event = "created"
                }
                position = @{ x = 100; y = 100 }
            },
            @{
                id = "action-1"
                type = "action"
                data = @{
                    actionType = "updateField"
                    field = "status"
                    value = "qualified"
                }
                position = @{ x = 300; y = 100 }
            }
        )
        edges = @(
            @{
                id = "edge-1"
                source = "trigger-1"
                target = "action-1"
            }
        )
    }
} | ConvertTo-Json -Depth 10

$create = Make-Request -Method "POST" -Endpoint "/api/v1/workflows" -Data $workflowData -Token $Token

if ($create.Success -and $create.Data.id) {
    Write-Host "✅ Workflow created" -ForegroundColor Green
    $WorkflowId = $create.Data.id
    $create.Data | ConvertTo-Json -Depth 3
} else {
    Write-Host "❌ Failed to create workflow" -ForegroundColor Red
    $create.Error | ConvertTo-Json -Depth 3
    Write-Host ""
    Write-Host "💡 Tip: Verifica que tu usuario tenga rol 'editor' o 'admin'" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Test 4: List workflows
Write-Host "4️⃣  Listing all workflows..." -ForegroundColor Yellow
$list = Make-Request -Method "GET" -Endpoint "/api/v1/workflows" -Token $Token
if ($list.Success) {
    Write-Host "✅ Workflows listed" -ForegroundColor Green
    Write-Host "Total workflows: $($list.Data.Count)"
    if ($list.Data.Count -gt 0) {
        $list.Data[0] | Select-Object id, name, status | ConvertTo-Json
    }
} else {
    Write-Host "❌ Failed to list workflows" -ForegroundColor Red
    $list.Error | ConvertTo-Json -Depth 3
}
Write-Host ""

# Test 5: Get specific workflow
if ($WorkflowId) {
    Write-Host "5️⃣  Getting workflow by ID..." -ForegroundColor Yellow
    $get = Make-Request -Method "GET" -Endpoint "/api/v1/workflows/$WorkflowId" -Token $Token
    if ($get.Success -and $get.Data.id -eq $WorkflowId) {
        Write-Host "✅ Workflow retrieved" -ForegroundColor Green
        $get.Data | Select-Object id, name, status, entityType | ConvertTo-Json
    } else {
        Write-Host "❌ Failed to get workflow" -ForegroundColor Red
        $get.Error | ConvertTo-Json -Depth 3
    }
    Write-Host ""
}

# Test 6: Update workflow
if ($WorkflowId) {
    Write-Host "6️⃣  Updating workflow..." -ForegroundColor Yellow
    $updateData = @{
        name = "Test Workflow Updated"
        status = "active"
        description = "Descripción actualizada"
    } | ConvertTo-Json

    $update = Make-Request -Method "PUT" -Endpoint "/api/v1/workflows/$WorkflowId" -Data $updateData -Token $Token
    if ($update.Success) {
        Write-Host "✅ Workflow updated" -ForegroundColor Green
        $update.Data | Select-Object id, name, status | ConvertTo-Json
    } else {
        Write-Host "❌ Failed to update workflow" -ForegroundColor Red
        $update.Error | ConvertTo-Json -Depth 3
    }
    Write-Host ""
}

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "✅ Tests completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Workflow ID: $WorkflowId" -ForegroundColor Gray
Write-Host "To delete the workflow (requires admin role):" -ForegroundColor Gray
Write-Host "  Invoke-RestMethod -Uri `"$ApiUrl/api/v1/workflows/$WorkflowId`" -Method DELETE -Headers @{Authorization=`"Bearer $Token`"}" -ForegroundColor Gray


