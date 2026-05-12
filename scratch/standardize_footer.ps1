$dir = "c:\Users\sriva\OneDrive\Desktop\may websites\Wooden_Puzzle_Brain_Teaser_Store"
$fullFooter = @"
    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <a href="index.html" class="logo mb-4" style="text-decoration: none;"><i class="fas fa-puzzle-piece"></i> Artisan<span>Puzzles</span></a>
                    <p>Creating intelligent entertainment through handcrafted wooden masterpieces since 2015.</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-pinterest"></i></a>
                        <a href="#"><i class="fab fa-youtube"></i></a>
                    </div>
                </div>
                <div class="footer-links">
                    <h4>Categories</h4>
                    <ul>
                        <li><a href="3d-puzzles.html">3D Puzzles</a></li>
                        <li><a href="shop.html">Brain Teasers</a></li>
                        <li><a href="laser-cut-gallery.html">Laser-Cut Models</a></li>
                        <li><a href="wholesale.html">Wholesale</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="difficulty-guide.html">Difficulty Guide</a></li>
                        <li><a href="blog.html">Maker Blog</a></li>
                        <li><a href="contact.html">Contact Us</a></li>
                        <li><a href="signup.html">Join Club</a></li>
                    </ul>
                </div>
                <div class="footer-newsletter">
                    <h4>Stay Sharp</h4>
                    <p>Get new puzzle releases and solving tips.</p>
                    <form class="newsletter-form">
                        <input type="email" placeholder="Email address">
                        <button type="submit" class="btn-primary"><i class="fas fa-paper-plane"></i></button>
                    </form>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Artisan Wooden Puzzle Store. All Rights Reserved. Designed with intelligence.</p>
            </div>
        </div>
    </footer>
"@

# Regex to find footer tag and its content
$footerRegex = '(?s)<footer>.*?</footer>'

Get-ChildItem -Path $dir -Filter "product-details-*.html" | ForEach-Object {
    $content = Get-Content -Path $_.FullName -Raw
    $newContent = $content -replace $footerRegex, $fullFooter
    Set-Content -Path $_.FullName -Value $newContent
    Write-Host "Updated Footer in $($_.Name)"
}

Get-ChildItem -Path $dir -Filter "blog-details-*.html" | ForEach-Object {
    $content = Get-Content -Path $_.FullName -Raw
    $newContent = $content -replace $footerRegex, $fullFooter
    Set-Content -Path $_.FullName -Value $newContent
    Write-Host "Updated Footer in $($_.Name)"
}
