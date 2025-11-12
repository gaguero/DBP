# PowerShell script to package FreeWorkflows extension
# Usage: .\package-extension.ps1

$ErrorActionPreference = "Stop"

$ExtensionName = "FreeWorkflows"
$Version = "1.0.0"
$PackageName = "$ExtensionName-$Version"
$SourceDir = if ($PSScriptRoot) { $PSScriptRoot } else { Get-Location }
$BuildDir = Join-Path (Split-Path $SourceDir -Parent) "build"
$ZipFile = Join-Path $BuildDir "$PackageName.zip"

Write-Host "Packaging FreeWorkflows extension..." -ForegroundColor Green

# Create build directory
if (Test-Path $BuildDir) {
    Remove-Item -Recurse -Force $BuildDir
}
New-Item -ItemType Directory -Path $BuildDir | Out-Null

# Create temporary package directory
$TempPackageDir = Join-Path $BuildDir $PackageName
New-Item -ItemType Directory -Path $TempPackageDir | Out-Null

# Copy manifest.json
Copy-Item -Path (Join-Path $SourceDir "manifest.json") -Destination $TempPackageDir

# Copy scripts directory
Copy-Item -Recurse -Path (Join-Path $SourceDir "scripts") -Destination $TempPackageDir

# Copy files directory
Copy-Item -Recurse -Path (Join-Path $SourceDir "files") -Destination $TempPackageDir

# Copy documentation files (optional, but recommended)
Copy-Item -Path (Join-Path $SourceDir "README.md") -Destination $TempPackageDir -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $SourceDir "CHANGELOG.md") -Destination $TempPackageDir -ErrorAction SilentlyContinue
Copy-Item -Path (Join-Path $SourceDir "QA_CHECKLIST.md") -Destination $TempPackageDir -ErrorAction SilentlyContinue

Write-Host "Creating ZIP archive..." -ForegroundColor Green

# Create ZIP file
if (Test-Path $ZipFile) {
    Remove-Item -Force $ZipFile
}

# Use .NET compression for better compatibility
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($TempPackageDir, $ZipFile)

# Clean up temporary directory
Remove-Item -Recurse -Force $TempPackageDir

Write-Host "Extension packaged successfully!" -ForegroundColor Green
Write-Host "Package location: $ZipFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Test the extension in a development EspoCRM instance" -ForegroundColor White
Write-Host "2. Upload to EspoCRM via Administration > Extensions > Upload Extension" -ForegroundColor White
Write-Host "3. Or install via CLI: php bin/command extension/install $ZipFile --force" -ForegroundColor White

