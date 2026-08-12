Add-Type -AssemblyName System.IO.Compression.FileSystem

$sourceDir = "C:\Users\dani\Documents\sg\skills"
$globalTarget = "C:\Users\dani\.gemini\config\skills"
$localTarget = "C:\Users\dani\Documents\sg\seogrowthers\.agents\skills"

if (-not (Test-Path $globalTarget)) {
    New-Item -ItemType Directory -Path $globalTarget -Force | Out-Null
}
if (-not (Test-Path $localTarget)) {
    New-Item -ItemType Directory -Path $localTarget -Force | Out-Null
}

$skillFiles = Get-ChildItem -Path $sourceDir -Filter "*.skill"

foreach ($file in $skillFiles) {
    Write-Host "Extracting $($file.Name)..."
    
    $tempDir = Join-Path $env:TEMP "skill_temp_$([guid]::NewGuid().ToString('N'))"
    [System.IO.Compression.ZipFile]::ExtractToDirectory($file.FullName, $tempDir)
    
    $items = Get-ChildItem -Path $tempDir
    
    foreach ($item in $items) {
        Write-Host "  Found entry: $($item.Name) (IsFolder: $($item.PSIsContainer))"
        
        $destGlobal = Join-Path $globalTarget $item.Name
        if (Test-Path $destGlobal) { Remove-Item -Path $destGlobal -Recurse -Force }
        Copy-Item -Path $item.FullName -Destination $destGlobal -Recurse -Force
        Write-Host "  Installed Global: $destGlobal"
        
        $destLocal = Join-Path $localTarget $item.Name
        if (Test-Path $destLocal) { Remove-Item -Path $destLocal -Recurse -Force }
        Copy-Item -Path $item.FullName -Destination $destLocal -Recurse -Force
        Write-Host "  Installed Local: $destLocal"
    }
    
    Remove-Item -Path $tempDir -Recurse -Force
}

Write-Host "All skills installed successfully!"
