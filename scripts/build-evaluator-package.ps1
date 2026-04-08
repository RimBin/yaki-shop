param(
  [string]$OutputRoot = "tmp/evaluator-package",
  [string]$PackageName = "yakiwood-evaluator",
  [string[]]$IncludePaths = @(
    "app",
    "components",
    "i18n",
    "lib",
    "supabase/migrations",
    "types",
    "package.json",
    "next.config.ts",
    "tsconfig.json",
    "eslint.config.mjs",
    "README.md"
  )
)

$ErrorActionPreference = "Stop"

function Get-WorkspaceRoot {
  if ($PSScriptRoot) {
    return (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
  }
  return (Get-Location).Path
}

function New-CleanDirectory {
  param([string]$Path)
  if (Test-Path $Path) {
    Remove-Item -Path $Path -Recurse -Force
  }
  New-Item -Path $Path -ItemType Directory | Out-Null
}

function Test-IncludedPath {
  param(
    [string]$RelativePath,
    [string[]]$AllowedPrefixes
  )

  $normalized = $RelativePath.Replace('\\', '/')
  foreach ($prefix in $AllowedPrefixes) {
    $p = $prefix.Replace('\\', '/').Trim('/')
    if ($normalized -eq $p -or $normalized.StartsWith("$p/")) {
      return $true
    }
  }
  return $false
}

function Get-TrackedFiles {
  param([string]$Root)

  $gitCheck = Get-Command git -ErrorAction SilentlyContinue
  if (-not $gitCheck) {
    throw "git command not found. Install git or run from a repository with git available."
  }

  Push-Location $Root
  try {
    $files = git ls-files
    if (-not $files) {
      throw "No tracked files found (git ls-files returned empty output)."
    }
    return $files
  }
  finally {
    Pop-Location
  }
}

function Get-LineCount {
  param([string]$FilePath)
  return (Get-Content -LiteralPath $FilePath | Measure-Object -Line).Lines
}

$workspaceRoot = Get-WorkspaceRoot
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$packageRoot = Join-Path $workspaceRoot $OutputRoot
$stagingRoot = Join-Path $packageRoot "staging-$timestamp"
$codeRoot = Join-Path $stagingRoot "code"
$reportRoot = Join-Path $stagingRoot "report"

New-Item -Path $packageRoot -ItemType Directory -Force | Out-Null
New-CleanDirectory -Path $stagingRoot
New-Item -Path $codeRoot -ItemType Directory | Out-Null
New-Item -Path $reportRoot -ItemType Directory | Out-Null

$tracked = Get-TrackedFiles -Root $workspaceRoot

$allowed = @()
foreach ($p in $IncludePaths) {
  if ($p -and $p.Trim()) {
    $allowed += $p.Trim()
  }
}

$excludedPrefixes = @(".git/", "node_modules/", ".next/")
$eligible = @()
$codeExtensions = @(
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".sql", ".css", ".scss", ".json", ".yml", ".yaml", ".md", ".txt"
)

foreach ($rel in $tracked) {
  $normalized = $rel.Replace('\\', '/')
  $isExcluded = $false
  foreach ($ex in $excludedPrefixes) {
    if ($normalized.StartsWith($ex)) {
      $isExcluded = $true
      break
    }
  }
  if ($isExcluded) { continue }

  if (Test-IncludedPath -RelativePath $normalized -AllowedPrefixes $allowed) {
    $eligible += $normalized
  }
}

if (-not $eligible -or $eligible.Count -eq 0) {
  throw "No files matched IncludePaths. Adjust -IncludePaths and run again."
}

$eligible = $eligible | Sort-Object -Unique

foreach ($rel in $eligible) {
  $src = Join-Path $workspaceRoot $rel
  if (-not (Test-Path -LiteralPath $src -PathType Leaf)) {
    continue
  }

  $dest = Join-Path $codeRoot $rel
  $destDir = Split-Path -Parent $dest
  if (-not (Test-Path -LiteralPath $destDir)) {
    New-Item -Path $destDir -ItemType Directory -Force | Out-Null
  }
  Copy-Item -LiteralPath $src -Destination $dest -Force
}

$fileListPath = Join-Path $reportRoot "file-list.txt"
$eligible | Set-Content -LiteralPath $fileListPath -Encoding utf8

$locByExt = @{}
$locByArea = @{}
$skippedByExt = @{}
$totalCodeLines = 0
$totalFiles = 0

foreach ($rel in $eligible) {
  $abs = Join-Path $workspaceRoot $rel
  if (-not (Test-Path -LiteralPath $abs -PathType Leaf)) {
    continue
  }

  $ext = [System.IO.Path]::GetExtension($rel).ToLowerInvariant()
  if ([string]::IsNullOrWhiteSpace($ext)) {
    $ext = "[no-ext]"
  }

  $area = ($rel -split '/')[0]
  if ([string]::IsNullOrWhiteSpace($area)) {
    $area = "[root]"
  }

  $lineCount = Get-LineCount -FilePath $abs
  $totalFiles += 1

  if ($codeExtensions -notcontains $ext) {
    if (-not $skippedByExt.ContainsKey($ext)) { $skippedByExt[$ext] = 0 }
    $skippedByExt[$ext] += 1
    continue
  }

  $totalCodeLines += $lineCount

  if (-not $locByExt.ContainsKey($ext)) { $locByExt[$ext] = 0 }
  $locByExt[$ext] += $lineCount

  if (-not $locByArea.ContainsKey($area)) { $locByArea[$area] = 0 }
  $locByArea[$area] += $lineCount
}

$statsPath = Join-Path $reportRoot "code-stats.txt"
$statsLines = @(
  "Package generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')",
  "Workspace root: $workspaceRoot",
  "Included file count: $totalFiles",
  "Included code lines: $totalCodeLines",
  "",
  "LOC methodology:",
  "- Source of files: git ls-files (tracked files only)",
  "- Counted as code: $($codeExtensions -join ', ')",
  "- Excluded paths: $($excludedPrefixes -join ', ')",
  "- Selection scope: IncludePaths parameter",
  "",
  "Lines by extension:"
)

foreach ($k in ($locByExt.Keys | Sort-Object)) {
  $statsLines += "  $k : $($locByExt[$k])"
}

$statsLines += ""
$statsLines += "Lines by top-level area:"
foreach ($k in ($locByArea.Keys | Sort-Object)) {
  $statsLines += "  $k : $($locByArea[$k])"
}

if ($skippedByExt.Count -gt 0) {
  $statsLines += ""
  $statsLines += "Excluded from LOC (non-code file count by extension):"
  foreach ($k in ($skippedByExt.Keys | Sort-Object)) {
    $statsLines += "  $k : $($skippedByExt[$k])"
  }
}

$statsLines | Set-Content -LiteralPath $statsPath -Encoding utf8

$statsJsonPath = Join-Path $reportRoot "code-stats.json"
$statsObject = [ordered]@{
  generatedAt = (Get-Date -Format "yyyy-MM-ddTHH:mm:ssK")
  workspaceRoot = $workspaceRoot
  includedFileCount = $totalFiles
  includedCodeLines = $totalCodeLines
  methodology = [ordered]@{
    trackedFilesSource = "git ls-files"
    countedExtensions = $codeExtensions
    excludedPrefixes = $excludedPrefixes
    includePaths = $allowed
  }
  linesByExtension = [ordered]@{}
  linesByTopLevelArea = [ordered]@{}
  excludedFromLocByExtension = [ordered]@{}
}

foreach ($k in ($locByExt.Keys | Sort-Object)) {
  $statsObject.linesByExtension[$k] = $locByExt[$k]
}
foreach ($k in ($locByArea.Keys | Sort-Object)) {
  $statsObject.linesByTopLevelArea[$k] = $locByArea[$k]
}
foreach ($k in ($skippedByExt.Keys | Sort-Object)) {
  $statsObject.excludedFromLocByExtension[$k] = $skippedByExt[$k]
}

$statsObject | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $statsJsonPath -Encoding utf8

$checksumsPath = Join-Path $reportRoot "checksums-sha256.txt"
$hashLines = @()
foreach ($rel in $eligible) {
  $copied = Join-Path $codeRoot $rel
  if (-not (Test-Path -LiteralPath $copied -PathType Leaf)) {
    continue
  }
  $hash = Get-FileHash -LiteralPath $copied -Algorithm SHA256
  $hashLines += "$($hash.Hash)  $rel"
}
$hashLines | Set-Content -LiteralPath $checksumsPath -Encoding utf8

$summaryPath = Join-Path $reportRoot "summary.txt"
$summary = @(
  "Evaluator package: $PackageName",
  "Created at: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')",
  "",
  "Contents:",
  "- code/: selected source files only",
  "- report/file-list.txt: included files list",
  "- report/code-stats.txt: file/line statistics",
  "- report/code-stats.json: machine-readable statistics",
  "- report/checksums-sha256.txt: integrity checks",
  "- report/evaluator-answers-template.txt: ready-to-fill response draft",
  "",
  "Excluded by design:",
  "- .git history",
  "- node_modules",
  "- .next build output",
  "- any files outside IncludePaths"
)
$summary | Set-Content -LiteralPath $summaryPath -Encoding utf8

$answersTemplatePath = Join-Path $reportRoot "evaluator-answers-template.txt"
$answersTemplate = @(
  "ATSKYMAS VERTINTOJAMS (DRAFT)",
  "",
  "Instrukcija:",
  "- Pakeiskite [UZPILDYTI] vietas.",
  "- Jei neteikiate FTP/GIT prieigos, remkites pateikto paketo report/ failais.",
  "",
  "1) Prieiga prie Figma dizainu",
  "Figma nuoroda: https://www.figma.com/design/ttxSg4wMtXPqfcQEh6B405/",
  "Prieigos tipas: [UZPILDYTI: view-only / kita]",
  "",
  "2) Kuri svetaine yra projekto rezultatas ir domenu rysys",
  "Projekto rezultato svetaine: [UZPILDYTI]",
  "Kitu domenu (.lt/.pl/.se/.uk) rysys: [UZPILDYTI trumpai ir tiksliai]",
  "",
  "3) Karkasas, TVS ir 'is dezės' funkcionalumai",
  "Karkasas: Next.js + React + TypeScript.",
  "TVS modelis: custom headless (Supabase DB + custom admin).",
  "Is dezes: routing karkasas, Image komponentas, metadata API, build pipeline.",
  "Custom darbai: URL lokalizavimas, admin teises, RLS, filtrai, mokejimai, 3D, integracijos.",
  "",
  "4) Darbu apimciu pagrindimas",
  "- Dizaino adaptacija: [UZPILDYTI]",
  "- Mobilumas: [UZPILDYTI]",
  "- Puslapiu struktura: [UZPILDYTI]",
  "- E-komercijos modulis ir atsargos: [UZPILDYTI]",
  "- Filtrai: [UZPILDYTI]",
  "- Mokejimo budai: [UZPILDYTI]",
  "- Isorines integracijos: [UZPILDYTI]",
  "- Daugiakalbiskumas: [UZPILDYTI]",
  "- TVS paruosiimas: [UZPILDYTI]",
  "- Vidinis SEO: [UZPILDYTI]",
  "- Saugumo priemones: [UZPILDYTI]",
  "",
  "Originalaus kodo statistika:",
  "- Included file count: $totalFiles",
  "- Included code lines: $totalCodeLines",
  "- Detali statistika: report/code-stats.txt ir report/code-stats.json",
  "- Failu integralumas: report/checksums-sha256.txt",
  "",
  "5) 3D konfigūracijos apimciu pagrindimas",
  "- GLB modeliu kiekis pateikimo metu: [UZPILDYTI pagal package file-list / public/models/products]",
  "- Three.js integracija apima ne tik atvaizdavima, bet ir konfigūravima, kainodara, krepseli, eksporta.",
  "- Kodo statistika ir failu irodymas pateikta siame pakete.",
  "",
  "Priedai:",
  "- report/file-list.txt",
  "- report/code-stats.txt",
  "- report/code-stats.json",
  "- report/checksums-sha256.txt"
)
$answersTemplate | Set-Content -LiteralPath $answersTemplatePath -Encoding utf8

$zipPath = Join-Path $packageRoot "$PackageName-$timestamp.zip"
if (Test-Path -LiteralPath $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

$zipCreated = $false
try {
  Compress-Archive -Path (Join-Path $stagingRoot "*") -DestinationPath $zipPath -Force
  $zipCreated = Test-Path -LiteralPath $zipPath
}
catch {
  Write-Warning "ZIP creation failed: $($_.Exception.Message)"
}

if ($zipCreated) {
  Write-Output "Package created: $zipPath"
}
else {
  Write-Output "Package folder ready: $stagingRoot"
}
Write-Output "Included files: $totalFiles"
Write-Output "Included code lines: $totalCodeLines"