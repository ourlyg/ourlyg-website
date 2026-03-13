# 网站部署验证清单

## 部署前检查

### 文件完整性检查
- [ ] index.html 已更新
- [ ] css/style.css 已更新（包含完整CSS变量）
- [ ] products/index.html 已更新
- [ ] products/huatai-securities.html 已更新
- [ ] products/zhaoshang-zhaozhaobao.html 已更新
- [ ] products/alipay-yuebao.html 已更新
- [ ] tools/index.html 已更新
- [ ] knowledge/index.html 已更新
- [ ] test.html 已创建

### 本地测试
- [ ] test.html 在本地浏览器打开正常显示
- [ ] test.html 显示蓝色背景
- [ ] test.html 导航栏横向排列
- [ ] index.html 在本地浏览器打开正常显示
- [ ] 所有页面配色正常（蓝色主题）
- [ ] 导航栏在桌面端横向显示
- [ ] 导航栏在移动端有折叠按钮

## 部署步骤

### 方案A：GitHub网页上传（无Git）
- [ ] 登录GitHub仓库
- [ ] 更新 index.html
- [ ] 更新 css/style.css
- [ ] 更新 products/index.html
- [ ] 更新 products/huatai-securities.html
- [ ] 更新 products/zhaoshang-zhaozhaobao.html
- [ ] 更新 products/alipay-yuebao.html
- [ ] 更新 tools/index.html
- [ ] 更新 knowledge/index.html
- [ ] 添加 test.html
- [ ] 等待GitHub Pages自动部署（1-2分钟）

### 方案B：使用Git命令行
- [ ] 安装Git（如未安装）
- [ ] `git init` 初始化仓库
- [ ] `git add .` 添加所有文件
- [ ] `git commit -m "Fix navigation layout and upgrade to Bootstrap 5.3.2"` 提交
- [ ] `git remote add origin <仓库URL>` 添加远程仓库
- [ ] `git push -u origin main` 推送到GitHub

### 方案C：使用GitHub Desktop
- [ ] 安装GitHub Desktop
- [ ] 克隆或打开现有仓库
- [ ] 复制更新后的文件到仓库目录
- [ ] 在GitHub Desktop中查看更改
- [ ] 填写提交信息
- [ ] 推送到GitHub

## 部署后验证

### GitHub仓库验证
- [ ] 访问GitHub仓库页面,确认文件已更新
- [ ] 检查文件的更新时间戳
- [ ] 查看提交历史,确认提交信息正确

### GitHub Pages部署状态
- [ ] 访问仓库的Settings → Pages
- [ ] 查看部署状态（应为"Deployed"）
- [ ] 如果显示"Deploying",等待1-2分钟
- [ ] 如果显示"Error",查看错误信息

### 网站功能验证

#### 测试页面 (test.html)
- [ ] 访问 https://ourlyg.com/test.html
- [ ] 看到蓝色渐变背景
- [ ] 看到标题"✅ Bootstrap 5.3.2 加载成功!"
- [ ] 三个卡片横向排列
- [ ] 所有样式正常显示

#### 首页 (index.html)
- [ ] 访问 https://ourlyg.com
- [ ] 页面加载速度正常
- [ ] 导航栏横向显示（桌面端）
- [ ] 导航栏固定在顶部
- [ ] 页面内容不与导航栏重叠
- [ ] 配色正常（蓝色主题）
- [ ] 英雄区域显示正常
- [ ] 热门测评卡片显示正常
- [ ] 理财工具卡片显示正常
- [ ] 核心优势显示正常
- [ ] 关于我们显示正常
- [ ] 页脚显示正常

#### 导航栏功能
- [ ] 首页链接点击后在本标签页打开（target="_self"）
- [ ] 产品测评链接在新标签页打开（target="_blank"）
- [ ] 理财工具链接在新标签页打开（target="_blank"）
- [ ] 知识科普链接在新标签页打开（target="_blank"）
- [ ] 当前页面的导航链接高亮显示（active状态）
- [ ] 移动端有折叠按钮（屏幕宽度<992px）
- [ ] 移动端点击折叠按钮可以展开/收起菜单

#### 产品测评页面
- [ ] 访问 https://ourlyg.com/products/index.html
- [ ] 导航栏正常显示
- [ ] 页面标题正常显示
- [ ] 测评分类卡片正常显示
- [ ] 银行理财、基金、券商、互联网理财分类正常

#### 产品详情页面
- [ ] 华泰证券详情页正常显示
- [ ] 招商银行朝朝宝详情页正常显示
- [ ] 支付宝余额宝详情页正常显示
- [ ] 所有详情页导航栏正常
- [ ] 评分、优缺点等信息正常显示

#### 理财工具页面
- [ ] 访问 https://ourlyg.com/tools/index.html
- [ ] 工具列表正常显示
- [ ] 工具卡片样式正常

#### 知识科普页面
- [ ] 访问 https://ourlyg.com/knowledge/index.html
- [ ] 知识分类卡片正常显示
- [ ] 热门文章区域正常显示

### 响应式验证
- [ ] 桌面端（1920x1080）显示正常
- [ ] 平板端（768x1024）显示正常
- [ ] 移动端（375x667）显示正常
- [ ] 导航栏在小屏幕自动折叠
- [ ] 卡片在小屏幕自动堆叠

### 浏览器兼容性测试
- [ ] Chrome浏览器正常显示
- [ ] Edge浏览器正常显示
- [ ] Firefox浏览器正常显示
- [ ] Safari浏览器正常显示（如有）

### 性能验证
- [ ] 首屏加载时间<3秒
- [ ] 页面流畅无卡顿
- [ ] 图片加载正常
- [ ] JavaScript无错误（打开开发者工具Console检查）

### SEO验证
- [ ] 页面标题正确显示
- [ ] Meta描述正确显示
- [ ] 关键词正确设置
- [ ] 链接结构正确

## 常见问题排查

### 如果页面显示异常

**问题：导航栏还是竖排**
- 检查：文件是否成功上传到GitHub
- 检查：Bootstrap CSS是否正确引用
- 解决：清除浏览器缓存,强制刷新（Ctrl+F5）

**问题：页面没有颜色**
- 检查：css/style.css是否包含CSS变量
- 检查：CSS文件路径是否正确
- 解决：检查文件内容,重新上传

**问题：导航栏与内容重叠**
- 检查：hero-section是否有margin-top
- 检查：导航栏是否设置为fixed
- 解决：确保.navbar有fixed-top类

**问题：链接打开方式不对**
- 检查：HTML中的target属性
- 解决：首页和当前分类用target="_self",其他用target="_blank"

### 如果GitHub Pages部署失败

**问题：部署状态显示Error**
- 查看：GitHub Pages部署日志
- 检查：文件路径是否正确
- 解决：修复错误后重新提交

**问题：部署一直显示Deploying**
- 等待：1-2分钟后再检查
- 检查：仓库设置是否正确
- 解决：如长时间未完成,可能需要联系GitHub支持

## 部署成功后的后续工作

- [ ] 清理本地临时文件（如不需要）
- [ ] 更新项目文档（README.md）
- [ ] 通知相关人员网站已更新
- [ ] 开始生产更多内容（产品测评、工具等）
- [ ] 进行网站优化（性能、SEO等）
- [ ] 开始社交媒体推广

## 备注说明

- 本地测试是必要的,确保所有功能正常
- 建议先部署test.html验证,成功后再部署其他文件
- 部署后需要清除浏览器缓存才能看到最新效果
- GitHub Pages部署通常需要1-2分钟
- 如果遇到问题,先检查GitHub Pages的部署日志

---

清单创建日期: 2026-03-11
最后更新日期: 2026-03-11
