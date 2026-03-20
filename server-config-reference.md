# 服务器优化配置参考
# 注意：GitHub Pages不支持.htaccess，此配置供迁移到其他服务器时使用

# 1. 启用Gzip压缩
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
    AddOutputFilterByType DEFLATE application/xml application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# 2. 启用Brotli压缩（如果支持）
<IfModule mod_brotli.c>
    AddOutputFilterByType BROTLI_COMPRESS text/html text/plain text/xml text/css
    AddOutputFilterByType BROTLI_COMPRESS application/xml application/javascript
</IfModule>

# 3. 浏览器缓存策略
<IfModule mod_expires.c>
    ExpiresActive On

    # 图片缓存1年
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"

    # CSS和JS缓存1个月
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"

    # 字体缓存1年
    ExpiresByType font/woff2 "access plus 1 year"

    # HTML不缓存
    ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# 4. 安全头部
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options "nosniff"
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "no-referrer-when-downgrade"
    Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
</IfModule>

# 5. CORS配置（如果需要）
<IfModule mod_headers.c>
    <FilesMatch "\.(ttf|ttc|otf|eot|woff|woff2|font.css|css|js)$">
        Header set Access-Control-Allow-Origin "*"
    </FilesMatch>
</IfModule>

# 6. 禁用目录浏览
Options -Indexes

# 7. 自定义404页面
ErrorDocument 404 /404.html

# 8. 强制HTTPS
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>
