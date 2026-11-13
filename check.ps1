$ErrorActionPreference = 'Stop'
$html = [IO.File]::ReadAllText((Join-Path $PSScriptRoot 'index.html'))
$script:count = 0
function Check($condition, $message) {
    if (-not $condition) { throw "FAIL: $message" }
    $script:count++
    Write-Output "PASS: $message"
}

Check ($html.Contains('<title>Thant Zin Tun | Junior DevOps Engineer</title>')) 'DevOps page title'
Check ($html.Contains('TARGET ROLE: JUNIOR DEVOPS ENGINEER')) 'Target role is explicit'
Check ($html -notmatch '(?i)junior data analyst|open to data analyst') 'Old analyst role positioning removed'
foreach ($id in @('home', 'about', 'skills', 'projects', 'experience', 'education', 'contact')) {
    Check ([regex]::Matches($html, ('id="' + $id + '"')).Count -eq 1) "Section $id exists once"
}
foreach ($link in [regex]::Matches($html, 'href="#([^"]+)"')) {
    Check ($html.Contains(('id="' + $link.Groups[1].Value + '"'))) "Anchor $($link.Value) resolves"
}
foreach ($asset in [regex]::Matches($html, '(?:src|href)="([^"#:]+\.(?:css|js|png|pdf))"')) {
    Check (Test-Path -LiteralPath (Join-Path $PSScriptRoot $asset.Groups[1].Value) -PathType Leaf) "Local asset $($asset.Groups[1].Value) exists"
}
foreach ($text in @('SQL', 'Python', 'Pandas', 'NumPy', 'Excel', 'Power BI', 'Tableau', 'Matplotlib', 'UK Train Rides Analysis', 'Indoor Air Quality Forecasting', 'UAT Analyst', 'KBZ Bank', 'IT Intern', 'Manulife Myanmar Life Insurance', 'MSc Data Science', 'Distinction', 'mailto:thantzintun523@gmail.com', 'https://linkedin.com/in/thant-zin-tun303', 'https://github.com/thantzintun232')) {
    Check ($html.Contains($text)) "Retained: $text"
}
$markers = [regex]::Matches($html, '<span style="color: #(b91c1c|fca5a5);">TO BE CONFIRMED</span>')
Check ($markers.Count -eq 16) 'All 16 confirmation markers use explicit red text'
Check ([regex]::Matches($html, 'TO BE CONFIRMED').Count -eq $markers.Count) 'No unstyled confirmation markers'
foreach ($link in [regex]::Matches($html, '<a href="#"[^>]*>[\s\S]*?</a>')) {
    Check ($link.Value.Contains('TO BE CONFIRMED')) 'Placeholder project link flagged'
}
foreach ($entry in @(
    @('style.css', 'AC6DB2B29301A99CEB38B8925B4063AC26F384F9C2C6124C894EB5FD3EDA15C8'),
    @('script.js', 'F97AF993C28F3AD727F013037A0F2CC5BC04079D9B6212D90729B9AB4F62AE13'),
    @('FACTS.md', '45A01B042A0BFF85B08885F5982F478E7B30EB35AEF96DF603CC94F2A2A2E41B'),
    @('AGENTS.md', 'F0DB661257B382728F5E02D36032786EB7215700B34139811E2C505096777230')
)) {
    Check ((Get-FileHash -LiteralPath (Join-Path $PSScriptRoot $entry[0])).Hash -eq $entry[1]) "Unchanged: $($entry[0])"
}
Write-Output "Passed $script:count checks. Browser layout, interactions, external URLs and CV content require manual review."
