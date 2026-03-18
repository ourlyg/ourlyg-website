# 首页合规性修复

## 立即执行的修改

### 1. 添加顶部风险提示（第371行之后插入）

```html
<!-- ===== 顶部风险提示 ===== -->
<div style="background:#fff3cd; border-bottom:3px solid #ffc107; padding:12px 0; text-align:center; position:relative; z-index:9999;">
    <div class="container">
        <p style="margin:0; font-size:13px; font-weight:600; color:#856404;">
            ⚠️ <strong>重要免责声明：</strong>本平台仅提供财经信息整理服务，<strong>不提供投资建议或金融咨询服务</strong>。所有内容仅供信息参考，不构成任何投资建议或买卖操作指导。市场有风险，投资需谨慎。
        </p>
    </div>
</div>
<!-- ===== /顶部风险提示 ===== -->
```

### 2. 修改Hero区域模拟报告（第430-462行）

**原内容（违规）**:
```html
<div style="font-size:12px; color:rgba(255,255,255,0.4); margin-bottom:12px;">📋 样本：股票诊断报告 · 2026-03-16</div>
<div class="demo-card-header">
    <div>
        <div style="font-size:18px; font-weight:700; color:white;">贵州茅台 600519</div>
        <div style="font-size:13px; color:rgba(255,255,255,0.5);">白酒行业 · 沪市主板</div>
    </div>
    <span class="signal-buy">建议关注</span>
</div>
<!-- ... 后续所有买卖建议和价格目标 ... -->
```

**修改为（合规）**:
```html
<div style="font-size:12px; color:rgba(255,255,255,0.4); margin-bottom:12px;">📋 样本：信息整理报告 · 2026-03-16（示例，仅供参考）</div>
<div class="demo-card-header">
    <div>
        <div style="font-size:18px; font-weight:700; color:white;">股票代码示例</div>
        <div style="font-size:13px; color:rgba(255,255,255,0.5);">行业信息 · 市场分类</div>
    </div>
    <span class="signal-watch">仅供参考</span>
</div>
<div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:14px;">
    <div style="background:rgba(255,255,255,0.07); border-radius:8px; padding:10px; text-align:center;">
        <div style="font-size:11px; color:rgba(255,255,255,0.4); margin-bottom:4px;">MACD</div>
        <div style="color:#fbbf24; font-size:13px; font-weight:600;">数据展示</div>
    </div>
    <div style="background:rgba(255,255,255,0.07); border-radius:8px; padding:10px; text-align:center;">
        <div style="font-size:11px; color:rgba(255,255,255,0.4); margin-bottom:4px;">RSI(14)</div>
        <div style="color:#fbbf24; font-size:13px; font-weight:600;">中性区间</div>
    </div>
    <div style="background:rgba(255,255,255,0.07); border-radius:8px; padding:10px; text-align:center;">
        <div style="font-size:11px; color:rgba(255,255,255,0.4); margin-bottom:4px;">均线</div>
        <div style="color:#fbbf24; font-size:13px; font-weight:600;">历史走势</div>
    </div>
</div>
<div style="background:rgba(255,255,255,0.05); border-radius:8px; padding:12px; margin-bottom:12px;">
    <div style="font-size:12px; color:rgba(255,255,255,0.4); margin-bottom:6px;">📌 信息整理</div>
    <div style="font-size:13px; color:rgba(255,255,255,0.8); line-height:1.6;">
        基于公开数据整理技术指标、历史走势、市场信息。市场存在不确定性，任何分析仅供参考，不构成投资建议或买卖指导。
    </div>
</div>
<!-- 删除所有买卖建议和价格目标 -->
```

### 3. 修改Hero区域标题和描述（第407-408行）

**原内容（违规）**:
```html
<p>不是普通的信息推送，而是真正能帮你分析一只股票、梳理一段行情、输出结构化投资建议的AI分析服务。</p>
```

**修改为（合规）**:
```html
<p>基于公开数据的财经信息整理服务，帮你获取技术指标、历史走势、市场信息，输出结构化信息报告供参考。</p>
```

### 4. 修改产品卡片1 - 股票诊断报告（第480-481行）

**原内容（违规）**:
```html
<h3>股票诊断报告</h3>
<p>给我一个股票代码，我给你一份完整报告：技术指标解读、趋势研判、关键支撑压力位分析，提供数据参考。</p>
```

**修改为（合规）**:
```html
<h3>股票信息整理报告</h3>
<p>基于公开数据整理技术指标、历史走势、关键信息，提供结构化信息报告。不提供投资建议或买卖方向性指导。</p>
```

### 5. 修改产品卡片3 - 持仓诊断（第506-507行）

**原内容（违规）**:
```html
<h3>持仓诊断分析</h3>
<p>告诉我你现在的持仓，我帮你分析组合风险、行业集中度、相关性，给出再平衡建议。</p>
```

**修改为（合规）**:
```html
<h3>持仓信息整理</h3>
<p>基于公开数据整理持仓风险、行业分布、相关性信息，提供结构化信息报告。不提供投资建议或买卖方向性指导。</p>
```

### 6. 修改服务类型标题（第542行）

**原内容（违规）**:
```html
<h2 class="section-title">我的能力边界</h2>
```

**修改为（合规）**:
```html
<h2 class="section-title">我的服务范围</h2>
```

### 7. 修改能力描述（第550行）

**原内容（违规）**:
```html
<div style="font-weight:700; font-size:15px; margin-bottom:4px;">技术指标分析</div>
<div style="font-size:13px; color:#666;">MACD、KDJ、RSI、布林带、均线系统，结合量价关系判断趋势</div>
```

**修改为（合规）**:
```html
<div style="font-weight:700; font-size:15px; margin-bottom:4px;">技术指标整理</div>
<div style="font-size:13px; color:#666;">MACD、KDJ、RSI、布林带、均线系统，结合量价关系展示历史数据</div>
```

### 8. 修改风险量化评估（第577行）

**原内容（违规）**:
```html
<div style="font-weight:700; font-size:15px; margin-bottom:4px;">风险量化评估</div>
<div style="font-size:13px; color:#666;">波动率、最大回撤、夏普比率，让风险看得见摸得着</div>
```

**修改为（合规）**:
```html
<div style="font-weight:700; font-size:15px; margin-bottom:4px;">风险信息展示</div>
<div style="font-size:13px; color:#666;">波动率、最大回撤、夏普比率，基于历史数据展示风险信息</div>
```

### 9. 修改SEO内容标题（第731行）

**原内容（违规）**:
```html
<h2 style="font-size:28px; font-weight:800; margin-bottom:16px; line-height:1.4;">散户为什么需要AI股票分析？</h2>
```

**修改为（合规）**:
```html
<h2 style="font-size:28px; font-weight:800; margin-bottom:16px; line-height:1.4;">散户为什么需要财经信息整理服务？</h2>
```

### 10. 修改SEO内容描述（第736行）

**原内容（违规）**:
```html
<p style="color:#555; font-size:15px; line-height:1.9; margin-bottom:16px;">
    <strong>AI股票分析</strong>能在几分钟内完成原本需要几小时的工作：抓取实时行情数据、计算MACD/KDJ/RSI等技术指标、比对PE/PB历史估值、梳理近期公告和机构持仓变化，最终输出一份结构化的分析报告。
</p>
```

**修改为（合规）**:
```html
<p style="color:#555; font-size:15px; line-height:1.9; margin-bottom:16px;">
    <strong>财经信息整理</strong>能在几分钟内完成原本需要几小时的工作：抓取实时行情数据、展示MACD/KDJ/RSI等技术指标、比对PE/PB历史估值、梳理近期公告和机构持仓变化，最终输出一份结构化的信息报告。
</p>
```

### 11. 修改Meta描述和Schema标记

**原Meta描述（第6行，违规）**:
```html
<meta name="description" content="ourlyg.com - AI驱动的金融分析服务。股票诊断、投资组合分析、财经简报定制，专业AI为您的投资决策提供数据支撑。">
```

**修改为（合规）**:
```html
<meta name="description" content="ourlyg.com - AI驱动的财经信息整理服务。技术指标展示、财经新闻聚合、持仓信息整理，专业AI为您提供便捷的信息获取服务。">
```

**原Schema标记（第25行，违规）**:
```json
"serviceType": ["股票分析", "金融咨询", "投资研究"],
```

**修改为（合规）**:
```json
"serviceType": ["财经信息整理", "数据聚合", "信息展示"],
```

**原Schema产品名称（第33行，违规）**:
```json
"itemOffered": {"@type": "Service", "name": "股票诊断报告"},
```

**修改为（合规）**:
```json
"itemOffered": {"@type": "Service", "name": "股票信息整理报告"},
```

---

## 执行计划

### 立即修复（P0）
1. ✅ 添加顶部风险提示
2. ✅ 修改Hero区域模拟报告
3. ✅ 修改产品卡片描述
4. ✅ 修改SEO内容
5. ✅ 修改Meta和Schema

### 后续优化（P1）
6. 检查所有"分析"词汇
7. 优化误导性表述
8. 强化风险提示

---

## 注意事项

1. **保存原文件**: 修复前先备份原文件
2. **逐行修改**: 确保不遗漏任何违规内容
3. **检查完整性**: 修改后通读整个页面
4. **推送前验证**: 确保所有修改正确后再推送

---

**风险等级**: 🔴 **极高 - 必须立即修复**  
**预计时间**: 30-60分钟  
**上线前必须**: ✅ 是
