# 🚀 GitHub Pages 部署指南

## 前置条件检查
- ✅ 所有中文参数已修复为英文
- ✅ 中文文件名已删除
- ✅ `.nojekyll` 文件已创建
- ✅ 所有HTML文件编码正确

## 自动部署步骤

### 方式A: 使用GitHub网页界面（推荐 - 最简单）

1. 打开 https://github.com/your-repo-name/settings
2. 找到 "Pages" 设置
3. 选择 "Deploy from a branch"
4. 分支选择 `main` 或 `master`，文件夹选择 `/root`
5. 点击 Save

### 方式B: 使用GitHub Desktop

1. 打开 GitHub Desktop
2. 选择您的仓库
3. Current Branch 切换到 main
4. 选择所有修改的文件（包括HTML和.nojekyll）
5. Summary: "Fix Chinese URL parameters and deploy"
6. Commit 到 main
7. 点击 "Push origin" 上传

### 方式C: 使用命令行（需要Git）

```bash
cd c:/Users/刘炳君/WorkBuddy/Claw/ourlyg-website
git add -A
git commit -m "Fix Chinese URL parameters and deploy"
git push origin main
```

## 部署后验证（2-5分钟后）

1. 访问网站: https://ourlyg.com
2. 检查地址栏: 不应再有不安全标识
3. 测试所有链接: 确保所有导航正常
4. 查看源代码: F12开发者工具，确认没有404错误

## 常见问题

**Q: 如何检查部署状态?**
A: 去 https://github.com/your-repo/deployments 查看最新部署

**Q: 更新多久生效?**
A: 通常 1-3 分钟，最多 5 分钟

**Q: 地址栏仍有不安全标识?**
A: 清除浏览器缓存后重试
