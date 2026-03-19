# 🚀 Ourlyg 生产环境部署指南

## 📋 部署前检查清单

### 系统要求
- [ ] Python 3.8+
- [ ] SQLite 3 或 PostgreSQL 12+
- [ ] Nginx 1.18+
- [ ] Git
- [ ] 域名已配置DNS
- [ ] 服务器公网IP

### 必要账号
- [ ] 支付宝开放平台账号
- [ ] 邮件服务账号 (SMTP)
- [ ] GitHub账号 (代码部署)

---

## 🔑 第一步：支付宝生产环境配置

### 1.1 创建支付宝应用

1. 登录 [支付宝开放平台](https://open.alipay.com/)
2. 进入"控制台" → "网页/移动应用" → "创建应用"
3. 选择"网页应用"类型
4. 填写应用信息：
   ```
   应用名称: Ourlyg财经新闻
   应用图标: [上传logo]
   应用简介: 财经新闻聚合与投资分析平台
   ```

### 1.2 获取支付宝密钥

在应用详情页获取：
- **APPID**: 2024xxxxxxxxxx
- **应用私钥**: [生成RSA2密钥]
- **支付宝公钥**: [从开放平台获取]

**生成RSA2密钥**:
```bash
# 使用支付宝提供的工具
# 下载地址: https://opendocs.alipay.com/common/02kipl

openssl genrsa -out app_private_key.pem 2048
openssl rsa -in app_private_key.pem -pubout -out app_public_key.pem
```

### 1.3 配置回调地址

在支付宝开放平台配置回调URL：
```
异步通知: https://your-domain.com/payment-system/notify
同步返回: https://your-domain.com/payment-confirm.html
```

### 1.4 更新配置文件

编辑 `payment-system/alipay_config.json`:
```json
{
  "app_id": "你的APPID",
  "app_private_key": "你的应用私钥",
  "alipay_public_key": "支付宝公钥",
  "return_url": "https://your-domain.com/payment-confirm.html",
  "notify_url": "https://your-domain.com/payment-system/notify",
  "sandbox": false
}
```

---

## 📧 第二步：邮件SMTP服务配置

### 2.1 选择邮件服务提供商

推荐选择（按稳定性排序）:
1. **阿里云邮件推送** (推荐国内使用)
   - 免费额度: 200封/天
   - SMTP服务器: smtpdm.aliyun.com
   - 端口: 465 (SSL)

2. **QQ企业邮箱** (免费)
   - SMTP服务器: smtp.exmail.qq.com
   - 端口: 465 (SSL)

3. **SendGrid** (国际服务)
   - 免费额度: 100封/天
   - SMTP服务器: smtp.sendgrid.net
   - 端口: 587 (TLS)

### 2.2 获取SMTP凭证

以阿里云为例：

1. 登录 [阿里云控制台](https://mail.aliyun.com/)
2. 进入"邮件推送"服务
3. 创建发信域名:
   ```
   发信域名: mail.your-domain.com
   DNS验证: 按提示添加DNS记录
   ```
4. 创建发信地址:
   ```
   发信地址: noreply@mail.your-domain.com
   SMTP密码: [生成的授权码]
   ```

### 2.3 更新配置文件

编辑 `payment-system/email_config.json`:
```json
{
  "smtp_server": "smtpdm.aliyun.com",
  "smtp_port": 465,
  "smtp_username": "noreply@mail.your-domain.com",
  "smtp_password": "你的SMTP密码",
  "sender_email": "noreply@mail.your-domain.com",
  "sender_name": "Ourlyg系统",
  "use_ssl": true
}
```

### 2.4 测试邮件连接

```bash
cd c:/Users/刘炳君/WorkBuddy/Claw
py -c "
from payment_system.email_sender import test_smtp_connection
result = test_smtp_connection()
print('邮件连接测试:', '成功' if result else '失败')
"
```

---

## 🌐 第三步：HTTPS证书配置

### 3.1 使用Let's Encrypt免费证书

**安装Certbot**:
```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# CentOS/RHEL
sudo yum install certbot python3-certbot-nginx
```

**申请证书**:
```bash
sudo certbot --nginx -d your-domain.com
```

**自动续期**:
```bash
sudo certbot renew --dry-run
```

### 3.2 配置Nginx

编辑 `/etc/nginx/sites-available/ourlyg`:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # 前端静态文件
    root /var/www/ourlyg-website;
    index index.html;

    # API反向代理
    location /api/ {
        proxy_pass http://127.0.0.1:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 支付回调
    location /payment-system/notify {
        proxy_pass http://127.0.0.1:8000/payment-system/notify;
    }
}
```

启用配置:
```bash
sudo ln -s /etc/nginx/sites-available/ourlyg /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🐍 第四步：部署Python服务

### 4.1 安装依赖

```bash
# 创建虚拟环境
cd /var/www/ourlyg-website
python3 -m venv venv
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt
```

### 4.2 创建requirements.txt

创建 `requirements.txt` 文件:
```txt
flask==2.3.2
gunicorn==21.2.0
requests==2.31.0
alipay-sdk-python==3.7.3
beautifulsoup4==4.12.2
lxml==4.9.3
pandas==2.0.3
numpy==1.24.3
matplotlib==3.7.2
Pillow==10.0.0
cryptography==41.0.3
```

### 4.3 创建systemd服务

创建 `/etc/systemd/system/ourlyg.service`:
```ini
[Unit]
Description=Ourlyg API Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/ourlyg-website
Environment="PATH=/var/www/ourlyg-website/venv/bin"
ExecStart=/var/www/ourlyg-website/venv/bin/gunicorn \
    -w 4 \
    -b 127.0.0.1:8000 \
    --timeout 120 \
    api.api_server:app

Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

启动服务:
```bash
sudo systemctl daemon-reload
sudo systemctl enable ourlyg
sudo systemctl start ourlyg
sudo systemctl status ourlyg
```

---

## 🔄 第五步：配置定时任务

### 5.1 设置新闻爬虫定时任务

编辑crontab:
```bash
crontab -e
```

添加任务:
```bash
# 每天早上8点、下午2点、晚上8点爬取新闻
0 8,14,20 * * * cd /var/www/ourlyg-website && /var/www/ourlyg-website/venv/bin/python news-system/crawler_main.py >> /var/log/ourlyg/crawler.log 2>&1

# 每天早上7点检查续费
0 7 * * * cd /var/www/ourlyg-website && /var/www/ourlyg-website/venv/bin/python payment-system/auto_renewal.py >> /var/log/ourlyg/renewal.log 2>&1
```

### 5.2 创建日志目录

```bash
sudo mkdir -p /var/log/ourlyg
sudo chown www-data:www-data /var/log/ourlyg
```

---

## 🧪 第六步：UAT测试验证

### 6.1 运行UAT测试

```bash
cd /var/www/ourlyg-website
python uat_system.py
```

### 6.2 检查所有端点

使用浏览器或curl测试：

```bash
# 健康检查
curl https://your-domain.com/api/health

# 新闻API
curl https://your-domain.com/api/news/latest?limit=5

# VIP页面
curl https://your-domain.com/vip-subscription.html

# 分析仪表板
curl https://your-domain.com/analytics-dashboard.html
```

### 6.3 模拟支付流程

1. 访问 VIP订阅页面
2. 选择订阅计划
3. 完成支付
4. 验证权限是否生效
5. 检查邮件是否发送

---

## 📊 第七步：监控和日志

### 7.1 设置日志轮转

创建 `/etc/logrotate.d/ourlyg`:
```
/var/log/ourlyg/*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
}
```

### 7.2 监控服务状态

创建监控脚本 `monitor.sh`:
```bash
#!/bin/bash
# 检查服务状态
systemctl is-active --quiet ourlyg || echo "Ourlyg服务异常" | mail -s "服务告警" admin@your-domain.com

# 检查磁盘空间
df -h /var/www | awk 'NR==2{if ($5+0 > 80) print "磁盘空间不足"}'

# 检查Nginx
systemctl is-active --quiet nginx || echo "Nginx服务异常" | mail -s "服务告警" admin@your-domain.com
```

添加到crontab:
```bash
*/5 * * * * /var/www/ourlyg-website/monitor.sh
```

---

## 🚀 第八步：正式上线

### 8.1 最终检查清单

运行部署检查脚本:
```bash
cd /var/www/ourlyg-website
python launch_checklist.py
```

检查项目:
- [ ] 所有30项检查通过
- [ ] 支付宝配置正确
- [ ] 邮件服务正常
- [ ] HTTPS证书有效
- [ ] 数据库连接正常
- [ ] API端点响应正常
- [ ] 定时任务已设置
- [ ] 日志记录正常
- [ ] 监控脚本已配置

### 8.2 邀请首批用户

创建邀请码系统:
```python
# 生成邀请码
import secrets

def generate_invite_codes(count=100):
    codes = []
    for i in range(count):
        code = secrets.token_urlsafe(16)
        codes.append(code)
    
    # 保存到数据库
    with open('invite_codes.txt', 'w') as f:
        for code in codes:
            f.write(f"{code}\n")
    
    return codes

# 生成100个邀请码
codes = generate_invite_codes(100)
print(f"生成了 {len(codes)} 个邀请码")
```

### 8.3 上线公告

准备上线公告邮件模板:
```html
<h1>🎉 Ourlyg正式上线啦！</h1>
<p>感谢您的耐心等待，Ourlyg财经新闻平台今天正式上线！</p>
<p>作为首批内测用户，您将获得：</p>
<ul>
    <li>免费VIP体验30天</li>
    <li>终身享受9折优惠</li>
    <li>优先体验新功能</li>
</ul>
<p><a href="https://your-domain.com/register?code={邀请码}">立即注册</a></p>
```

---

## 📝 第九步：上线后维护

### 日常检查（每天）
- 检查服务运行状态
- 查看错误日志
- 验证新闻更新
- 监控API调用量

### 周度检查（每周）
- 备份数据库
- 分析用户数据
- 优化性能瓶颈
- 收集用户反馈

### 月度检查（每月）
- 更新SSL证书
- 审查安全日志
- 规划新功能
- 财务报表分析

---

## 🔧 故障排查指南

### 支付失败
1. 检查支付宝配置是否正确
2. 验证回调URL是否可访问
3. 查看支付宝日志
4. 联系支付宝客服

### 邮件发送失败
1. 验证SMTP配置
2. 检查发信域名DNS
3. 查看发送日志
4. 联系邮件服务商

### 网站无法访问
1. 检查Nginx服务状态
2. 验证DNS解析
3. 检查防火墙规则
4. 查看错误日志

### API响应慢
1. 检查数据库索引
2. 优化缓存策略
3. 增加服务器资源
4. 检查网络连接

---

## 📞 技术支持

- **GitHub仓库**: https://github.com/yourusername/ourlyg-website
- **技术文档**: [查看API文档](API商业化完整文档.md)
- **问题反馈**: [提交Issue](https://github.com/yourusername/ourlyg-website/issues)

---

## ✅ 部署成功标准

当您看到以下情况时，部署成功：

1. ✅ 网站可以通过HTTPS正常访问
2. ✅ 新闻自动更新（每天3次）
3. ✅ VIP支付流程完整
4. ✅ API端点正常响应
5. ✅ 邮件通知发送成功
6. ✅ 自动续费正常运行
7. ✅ 用户可以注册登录
8. ✅ 数据分析仪表板显示正常

**恭喜！Ourlyg已经成功上线！** 🎉
