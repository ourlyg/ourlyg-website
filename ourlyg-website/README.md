# 我们的理易港 (OurLYG) - 网站部署说明

## 项目简介

我们的理易港（ourlyg.com）是一站式理财信息平台，提供专业的理财产品测评、实用的理财工具、易懂的理财知识。

## 技术栈

- **HTML5** - 页面结构
- **Bootstrap 5.3** - UI框架
- **Vanilla JavaScript** - 交互功能
- **GitHub Pages** - 免费托管

## 项目结构

```
ourlyg-website/
├── index.html              # 首页
├── css/
│   └── style.css          # 全局样式
├── js/
│   └── main.js            # 全局JavaScript
├── products/
│   ├── index.html         # 产品测评分类页
│   ├── template.html      # 产品详情页模板
│   ├── huatai-securities.html    # 华泰证券测评
│   ├── zhaoshang-zhaozhaobao.html # 招商银行朝朝宝测评
│   └── alipay-yuebao.html # 支付宝余额宝测评
├── tools/
│   ├── index.html         # 理财工具分类页
│   └── calculator.html    # 收益计算器
└── README.md              # 本文件
```

## 部署步骤

### 方案1：GitHub Pages部署（推荐）

#### 1. 创建GitHub账号并登录

访问：https://github.com/

#### 2. 创建新仓库

1. 点击右上角 "+" → "New repository"
2. 仓库名：ourlyg-website
3. 选择 "Public"
4. 点击 "Create repository"

#### 3. 上传文件

**方式A：使用Git命令行（如果已安装Git）**

```bash
cd ourlyg-website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/ourlyg-website.git
git push -u origin main
```

**方式B：手动上传（不需要Git）**

1. 在仓库页面点击 "uploading an existing file"
2. 拖拽所有文件到上传区域
3. 点击 "Commit changes"

#### 4. 启用GitHub Pages

1. 进入仓库设置：Settings → Pages
2. Source 选择：Deploy from a branch
3. Branch 选择：main (或master)
4. 点击 Save
5. 等待1-2分钟，访问：`https://你的用户名.github.io/ourlyg-website/`

#### 5. 配置自定义域名

**第一步：创建CNAME文件**

在项目根目录创建 `CNAME` 文件，内容：
```
ourlyg.com
```

**第二步：配置DNS解析**

在我们的域名管理后台（域名商）配置：

**添加A记录：**
- 主机记录：`@`
- 记录类型：`A`
- 记录值：`185.199.108.153`
- TTL：`600`

**添加AAAA记录：**
- 主机记录：`@`
- 记录类型：`AAAA`
- 记录值：`2606:50c:4200::1`
- TTL：`600`

**添加CNAME记录：**
- 主机记录：`www`
- 记录类型：`CNAME`
- 记录值：`你的用户名.github.io.`
- TTL：`600`

**第三步：等待DNS生效**

DNS生效通常需要10分钟到24小时，可以使用 `ping ourlyg.com` 测试。

**第四步：强制HTTPS**

在GitHub Pages设置中，勾选 "Enforce HTTPS"

---

### 方案2：Vercel部署（备用）

#### 1. 注册Vercel

访问：https://vercel.com/

#### 2. 导入项目

1. 点击 "New Project"
2. 选择 "Import Git Repository"
3. 选择GitHub仓库
4. 点击 "Deploy"

#### 3. 配置自定义域名

在项目设置中添加域名：ourlyg.com

---

### 方案3：Netlify部署（备用）

#### 1. 注册Netlify

访问：https://www.netlify.com/

#### 2. 拖拽部署

1. 注册后登录
2. 将项目文件夹拖拽到Netlify页面
3. 等待部署完成

#### 3. 配置自定义域名

在Site settings → Domain management 中添加域名

---

## 域名解析配置说明

### 需要配置的记录：

#### GitHub Pages配置（主方案）

| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|--------|-----|
| A | @ | 185.199.108.153 | 600 |
| A | @ | 185.199.109.153 | 600 |
| A | @ | 185.199.110.153 | 600 |
| A | @ | 185.199.111.153 | 600 |
| AAAA | @ | 2606:50c:4200::1 | 600 |
| AAAA | @ | 2606:50c:4200::2 | 600 |
| AAAA | @ | 2606:50c:4200::3 | 600 |
| AAAA | @ | 2606:50c:4200::4 | 600 |
| CNAME | www | 你的用户名.github.io. | 600 |

#### Vercel配置（备用方案）

| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|--------|-----|
| CNAME | @ | cname.vercel-dns.com | 600 |
| CNAME | www | cname.vercel-dns.com | 600 |

#### Netlify配置（备用方案）

| 记录类型 | 主机记录 | 记录值 | TTL |
|---------|---------|--------|-----|
| CNAME | @ | 你的站点名.netlify.app | 600 |
| CNAME | www | 你的站点名.netlify.app | 600 |

---

## 验证部署

### 1. 检查DNS解析

在命令行运行：
```bash
ping ourlyg.com
```

应该显示GitHub Pages的IP地址。

### 2. 访问网站

在浏览器访问：https://ourlyg.com

应该能正常显示网站。

### 3. 检查HTTPS

浏览器地址栏应显示🔒图标，表示HTTPS正常。

---

## 内容更新

### 更新网站内容

1. 修改对应的HTML文件
2. 提交到GitHub
3. GitHub Pages自动部署（约1-2分钟）

### 添加新产品测评

1. 复制 `products/template.html`
2. 重命名（如：new-product.html）
3. 填写产品信息
4. 在 `products/index.html` 中添加链接
5. 提交到GitHub

### 添加新理财工具

1. 在 `tools/` 目录创建新HTML文件
2. 在 `tools/index.html` 中添加链接
3. 提交到GitHub

---

## 下一步工作

1. ✅ 网站基础架构完成
2. ✅ 首页完成
3. ✅ 产品测评页面完成
4. ✅ 理财工具页面完成
5. ✅ 首批测评内容完成（3篇）
6. ⏳ 域名解析配置（需要二叔协助）
7. ⏳ 部署到GitHub Pages（需要二叔协助）
8. ⏳ 测试网站功能
9. ⏳ 生产更多测评内容
10. ⏳ 开始小红书和知乎运营

---

## 联系方式

- 网站：www.ourlyg.com
- 邮箱：contact@ourlyg.com

---

## 更新日志

### 2025-03-11
- 完成网站基础架构
- 完成首页、产品测评页面、理财工具页面
- 完成收益计算器
- 完成首批测评内容（华泰证券、招商银行朝朝宝、支付宝余额宝）
- 完成部署文档

---

## 备注

本网站完全免费运行：
- 域名：ourlyg.com（年费120元，二叔已付费）
- 主机：GitHub Pages（免费）
- CDN：Cloudflare（免费）
- SSL证书：Let's Encrypt（免费）

总成本：120元/年（仅域名费用）
