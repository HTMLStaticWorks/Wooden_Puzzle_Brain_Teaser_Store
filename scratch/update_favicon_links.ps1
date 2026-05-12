$dir = "c:\Users\sriva\OneDrive\Desktop\may websites\Wooden_Puzzle_Brain_Teaser_Store"
$faviconLinks = @"
    <link rel="icon" type="image/png" href="assets/images/favicon.png">
    <link rel="icon" type="image/svg+xml" href="assets/images/favicon.svg">
    <link rel="shortcut icon" href="assets/images/favicon.png">
"@

Get-ChildItem -Path $dir -Filter *.html | ForEach-Object {
    $content = Get-Content -Path $_.FullName -Raw
    
    # Remove existing favicon link if any
    $content = $content -replace '\s*<link rel="icon".*?>', ""
    $content = $content -replace '\s*<link rel="shortcut icon".*?>', ""
    
    # Add new links after title
    $content = $content -replace '</title>', "</title>`n$faviconLinks"
    
    Set-Content -Path $_.FullName -Value $content
    Write-Host "Updated $($_.Name)"
}
