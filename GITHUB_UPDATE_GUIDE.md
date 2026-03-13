# GitHub仓库更新指南

## 更新时间
2026-03-11

## 本次更新的主要内容

### 1. 修复的页面
- ✅ index.html (首页) - 添加Bootstrap 5.3.2,修复导航栏布局
- ✅ products/index.html (产品测评列表) - 统一导航栏结构
- ✅ products/huatai-securities.html (华泰证券详情) - 更新Bootstrap版本
- ✅ products/zhaoshang-zhaozhaobao.html (招商银行朝朝宝详情) - 更新Bootstrap版本
- ✅ products/alipay-yuebao.html (支付宝余额宝详情) - 更新Bootstrap版本
- ✅ tools/index.html (理财工具) - 添加Bootstrap和导航栏折叠功能
- ✅ knowledge/index.html (知识科普) - 统一导航栏结构
- ✅ css/style.css - 保持CSS变量系统完整

### 2. 主要技术更新
- ✅ 所有页面统一使用Bootstrap 5.3.2
- ✅ 所有导航栏添加响应式折叠功能
- ✅ 导航栏统一使用 `navbar-expand-lg` 类
- ✅ 添加Bootstrap JavaScript文件 (`bootstrap.bundle.min.js`)
- ✅ 修复导航栏竖排问题,确保桌面端横向显示
- ✅ 统一链接行为:首页和当前分类用`target="_self"`,其他用`target="_blank"`
- ✅ 保持完整的CSS变量系统,维持原有配色方案

### 3. 新增文件
- ✅ test.html - 用于验证Bootstrap是否正常工作的测试页面

## 手动部署步骤（不使用Git）

### 方法一：通过GitHub网页上传（推荐）

#### 1. 登录GitHub仓库
访问: https://github.com/你的用户名/ourlyg-website

#### 2. 更新文件（逐个文件）

**步骤:**
1. 点击要更新的文件
2. 点击右上角的铅笔图标（Edit）
3. 复制本地文件的内容
4. 粘贴到GitHub编辑器中
5. 在底部填写提交信息:
   - Commit message: `Fix navigation layout and upgrade to Bootstrap 5.3.2`
   - 选择 "Commit directly to the main branch"
6. 点击 "Commit changes"

**需要更新的文件列表:**

1. **index.html**
2. **css/style.css**
3. **products/index.html**
4. **products/huatai-securities.html**
5. **products/zhaoshang-zhaozhaobao.html**
6. **products/alipay-yuebao.html**
7. **tools/index.html**
8. **knowledge/index.html**

#### 3. 添加新文件

**test.html:**
1. 点击 "Add file" → "Create new file"
2. 文件名: `test.html`
3. 粘贴本地的test.html内容
4. 填写提交信息: `Add test page for Bootstrap verification`
5. 点击 "Commit changes"

### 方法二：批量上传（使用GitHub Desktop）

如果安装了GitHub Desktop:
1. 打开GitHub Desktop
2. 选择你的仓库
3. 点击 "Repository" → "Open in Finder/File Explorer"
4. 将本地文件复制到仓库目录
5. 在GitHub Desktop中查看更改
6. 填写提交信息并推送

### 方法三：使用GitHub CLI（如果已安装）

```bash
# 安装GitHub CLI（如果还没安装）
# 从 https://cli.github.com/ 下载安装

# 登录GitHub
gh auth login

# 进入项目目录
cd c:/Users/刘炳君/WorkBuddy/Claw/ourlyg-website

# 初始化仓库（如果是第一次）
git init
gh repo create ourlyg-website --public --source=. --remote=origin --push

# 如果仓库已存在,推送更新
git add .
git commit -m "Fix navigation layout and upgrade to Bootstrap 5.3.2"
git push origin main
```

## 验证部署

### 1. 检查文件是否更新成功
访问: https://github.com/你的用户名/ourlyg-website
确认所有文件的更新时间是否为今天

### 2. 检查GitHub Pages部署状态
访问: https://github.com/你的用户名/ourlyg-website/settings/pages
查看部署状态是否显示为 "Deployed"

### 3. 测试网站
访问: https://ourlyg.com

**检查清单:**
- [ ] 导航栏是否横向显示（桌面端）
- [ ] 页面是否有颜色和样式
- [ ] CSS变量系统是否生效（检查配色是否正常）
- [ ] 导航栏折叠功能是否正常（移动端）
- [ ] 链接行为是否正确（首页和当前分类在同标签页打开）
- [ ] 页面内容不与导航栏重叠

### 4. 测试页面验证
访问: https://ourlyg.com/test.html
应该看到:
- 蓝色渐变背景
- 横向排列的三个卡片
- 正常的Bootstrap样式

## 如果遇到问题

### 问题1: 页面显示不正常
**解决方案:**
- 清除浏览器缓存（Ctrl+Shift+Delete）
- 强制刷新（Ctrl+F5）
- 检查GitHub Pages部署状态
- 等待2-3分钟后重试

### 问题2: 导航栏还是竖排
**可能原因:**
- 文件没有成功上传
- Bootstrap CSS没有加载
- 浏览器缓存问题

**解决方案:**
- 检查GitHub仓库中的文件内容
- 确认包含Bootstrap CSS引用
- 清除浏览器缓存

### 问题3: 页面没有颜色
**可能原因:**
- CSS文件没有更新
- CSS变量系统丢失
- 样式文件路径错误

**解决方案:**
- 检查css/style.css是否包含CSS变量
- 确认HTML文件中CSS引用路径正确

## 本地文件验证

在部署前,建议先在本地测试:

1. 使用VS Code Live Server插件预览
2. 或双击test.html打开
3. 确认所有功能正常后再部署

## 更新后的网站功能

### 改进点:
1. ✅ 导航栏响应式设计（桌面端横向,移动端折叠）
2. ✅ 统一的Bootstrap 5.3.2版本
3. ✅ 完整的CSS变量系统保持原有配色
4. ✅ 正确的链接打开方式
5. ✅ 修复导航栏与内容重叠问题

### 保持不变的:
1. ✅ 原有的配色方案（蓝色主题）
2. ✅ 原有的排版风格
3. ✅ 所有内容和功能
4. ✅ 产品测评内容

## 联系支持

如果部署过程中遇到问题,可以:
1. 检查GitHub仓库的Settings页面
2. 查看GitHub Pages的部署日志
3. 访问GitHub Pages帮助文档

## 备注说明

- 所有文件都已更新并测试通过
- CSS变量系统完整保留,配色方案未改变
- 测试页面test.html可用于快速验证Bootstrap是否正常工作
- 建议先部署test.html验证,成功后再部署其他文件

---

更新完成日期: 2026-03-11
负责人: WorkBuddy (狗子)
