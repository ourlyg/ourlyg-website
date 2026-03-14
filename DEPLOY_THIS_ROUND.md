# 本轮更新 - 部署文件清单

> 更新时间：2026-03-14

## 本轮新增/修改的文件

### 🆕 新增文件（需要上传到GitHub）

| 文件路径 | 内容说明 |
|---|---|
| `tools/retirement.html` | 退休规划计算器（全新工具） |
| `knowledge/article-beginner.html` | 理财入门7步指南（新文章） |
| `knowledge/article-fund.html` | 基金投资完全指南（新文章） |
| `knowledge/article-risk.html` | 投资风险控制手册（新文章） |

### ✏️ 修改文件（需要覆盖GitHub上的旧文件）

| 文件路径 | 修改内容 |
|---|---|
| `index.html` | 首页：增加统计数据横幅、产品卡片扩展到6篇、新增知识科普预览区、改进页脚 |
| `css/style.css` | 新增 `.footer` `.footer-brand` `.footer-desc` `.card-link` 样式 |
| `tools/index.html` | 退休规划从"开发中"改为正式可用链接 |
| `knowledge/index.html` | 完全重写：展示3篇文章、分类筛选、精选文章横幅 |
| `products/huatai-securities.html` | 修复导航链接、SEO |
| `products/zhaoshang-zhaozhaobao.html` | 修复导航链接、添加meta description |
| `products/alipay-yuebao.html` | 修复导航链接、添加meta description |

---

## 上传方式

### 方法一：GitHub网页（逐个上传）

1. 访问 https://github.com/你的用户名/你的仓库名
2. **上传新文件**：
   - 进入对应目录（如 `tools/`）
   - 点击 "Add file" → "Upload files"
   - 拖入文件，填写提交信息，点击 "Commit changes"
3. **更新已有文件**：
   - 点击文件 → 右上角铅笔图标
   - 清空内容，粘贴新内容
   - 填写提交信息，点击 "Commit changes"

### 方法二：GitHub Desktop（批量推送）

1. 打开 GitHub Desktop，选择仓库
2. 本地文件已修改，GitHub Desktop 会自动显示变更列表
3. 填写 commit 信息（如：`新增退休规划工具和3篇知识科普文章，优化首页`）
4. 点击 "Commit to main" → "Push origin"

---

## 本轮更新内容总结

### 新功能
- 🎯 **退休规划计算器**：支持年龄/寿命/收支参数滑块，显示积累进度条和三种收益率下的月储蓄建议
- 📚 **3篇知识科普文章**：理财入门、基金投资、风险控制
- 📰 **知识科普列表页**：分类筛选、精选文章横幅

### 首页升级
- 📊 统计数据横幅（6测评 · 5工具 · 3文章 · 0广告）
- 产品测评卡片从4篇扩展到6篇
- 新增知识科普预览区块
- 改进页脚（三栏布局 + 快速导航）

### Bug修复
- 修复3个产品页面的导航链接 target="_blank" 问题
- 补充余额宝、朝朝宝页面的 meta description

---

## 完成后验证

访问以下页面确认正常：
- [ ] https://ourlyg.com （首页，应有紫色统计横幅）
- [ ] https://ourlyg.com/tools/retirement.html （退休规划工具）
- [ ] https://ourlyg.com/knowledge/index.html （知识科普列表）
- [ ] https://ourlyg.com/knowledge/article-beginner.html （理财入门文章）
