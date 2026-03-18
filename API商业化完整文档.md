# Ourlyg API 商业化文档

**版本**: v1.0  
**发布日期**: 2026年3月  
**状态**: 生产环境

---

## 1. 产品概述

### 核心价值

Ourlyg API 是一个**专业级的财经数据接口服务**，为投资者和分析师提供实时的财经新闻、市场数据和分析报告。

```
核心场景：
├─ 算法交易者 - 实时新闻事件检测
├─ 投资研究 - 历史新闻数据分析
├─ 量化交易 - 数据源集成
├─ 风险监控 - 实时事件预警
└─ 报告生成 - 自动数据拉取
```

### 定价层级

| 计划 | 价格 | API调用/天 | 新闻条数 | 响应时间 | 支持 |
|------|------|----------|--------|--------|------|
| **基础版** | ¥99/月 | 1,000 | 5,000 | <1s | 邮件 |
| **专业版** | ¥299/月 | 10,000 | 50,000 | <500ms | 邮件+电话 |
| **企业版** | ¥999/月 | 无限 | 无限 | <200ms | 专属经理 |
| **定制版** | 面议 | 面议 | 面议 | SLA保证 | 24/7支持 |

---

## 2. 认证和密钥管理

### API密钥生成

每个用户在订阅后自动获得一个唯一的API密钥。

**生成方式**:
```python
# 自动生成（订阅时触发）
api_key = sha256(user_id:plan_type:timestamp)
# 示例: a7f3c9d2e5b1f4a8c3d6e9f2b5c8d1e4a7f3c9d2e5b1f4a8c3d6e9f2b5c8d1
```

### 密钥使用

在所有API请求的请求头中包含密钥：

```bash
curl -H "X-API-Key: your_api_key_here" \
     https://api.ourlyg.com/api/v1/news
```

### 安全建议

⚠️ **重要安全提示**:
- ✅ 始终通过HTTPS使用API
- ✅ 不要在客户端代码中硬编码密钥
- ✅ 定期轮换密钥（建议每季度）
- ✅ 监控密钥使用情况
- ❌ 不要向第三方分享密钥
- ❌ 不要在公开仓库中提交密钥

### 密钥管理界面

用户可以在 https://ourlyg.com/user/api-keys 中：
- 生成新密钥
- 轮换现有密钥
- 查看密钥使用统计
- 禁用/删除密钥
- 设置IP白名单

---

## 3. API端点参考

### 3.1 新闻接口

#### GET /api/v1/news - 获取新闻列表

获取最新的财经新闻列表。

**请求**:
```bash
curl -X GET "https://api.ourlyg.com/api/v1/news?limit=20&offset=0&category=stocks" \
  -H "X-API-Key: your_api_key"
```

**参数**:
| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| limit | integer | 否 | 返回结果数量，默认20，最大100 |
| offset | integer | 否 | 分页偏移量，默认0 |
| category | string | 否 | 新闻分类：stocks/bonds/forex/crypto/economy |

**响应示例**:
```json
{
  "code": "SUCCESS",
  "data": {
    "items": [
      {
        "id": 12345,
        "title": "A股市场再创新高，沪指突破3600点",
        "summary": "受到好消息刺激，今日A股表现强劲...",
        "content": "详细内容...",
        "source": "新浪财经",
        "category": "stocks",
        "importance": 8,
        "published_at": "2026-03-18T10:30:00Z",
        "url": "https://example.com/news/12345"
      },
      ...
    ],
    "total": 1543,
    "offset": 0,
    "limit": 20
  },
  "timestamp": "2026-03-18T12:00:00Z"
}
```

**错误处理**:
```json
{
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED",
  "message": "Daily limit for basic plan reached",
  "remaining_calls": 0,
  "reset_at": "2026-03-19T00:00:00Z"
}
```

#### GET /api/v1/news/{id} - 获取单条新闻

获取指定ID的新闻详情。

**请求**:
```bash
curl -X GET "https://api.ourlyg.com/api/v1/news/12345" \
  -H "X-API-Key: your_api_key"
```

**响应示例**:
```json
{
  "code": "SUCCESS",
  "data": {
    "id": 12345,
    "title": "A股市场再创新高",
    "summary": "受到好消息刺激...",
    "content": "详细完整内容...",
    "source": "新浪财经",
    "category": "stocks",
    "importance": 8,
    "published_at": "2026-03-18T10:30:00Z",
    "url": "https://example.com/news/12345",
    "related_news": [
      {"id": 12344, "title": "相关新闻1"},
      {"id": 12343, "title": "相关新闻2"}
    ]
  },
  "timestamp": "2026-03-18T12:00:00Z"
}
```

### 3.2 搜索接口

#### GET /api/v1/search - 搜索新闻

按关键词搜索新闻内容。

**请求**:
```bash
curl -X GET "https://api.ourlyg.com/api/v1/search?q=蔚来汽车&limit=20" \
  -H "X-API-Key: your_api_key"
```

**参数**:
| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| q | string | 是 | 搜索关键词（最多100字符） |
| limit | integer | 否 | 返回结果数量，默认20，最大100 |
| date_from | date | 否 | 搜索开始日期 (YYYY-MM-DD) |
| date_to | date | 否 | 搜索结束日期 (YYYY-MM-DD) |

**响应示例**:
```json
{
  "code": "SUCCESS",
  "data": {
    "query": "蔚来汽车",
    "results": [
      {
        "id": 12345,
        "title": "蔚来汽车Q4财报超预期",
        "matched_content": "...蔚来汽车...财报...",
        "relevance_score": 0.95,
        "published_at": "2026-03-18T10:30:00Z"
      }
    ],
    "total": 156,
    "search_time_ms": 45
  },
  "timestamp": "2026-03-18T12:00:00Z"
}
```

### 3.3 分析接口

#### GET /api/v1/analytics/summary - 获取分析汇总

获取当前平台的实时分析数据。

**请求**:
```bash
curl -X GET "https://api.ourlyg.com/api/v1/analytics/summary" \
  -H "X-API-Key: your_api_key"
```

**响应示例**:
```json
{
  "code": "SUCCESS",
  "data": {
    "date": "2026-03-18",
    "active_users": 1543,
    "page_views": 24580,
    "conversions": 157,
    "revenue": 3124.50,
    "conversion_rate": 10.18,
    "top_categories": ["stocks", "economy", "forex"]
  },
  "timestamp": "2026-03-18T12:00:00Z"
}
```

#### GET /api/v1/analytics/trends - 获取趋势数据

获取过去N天的趋势数据。

**请求**:
```bash
curl -X GET "https://api.ourlyg.com/api/v1/analytics/trends?days=30" \
  -H "X-API-Key: your_api_key"
```

**参数**:
| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| days | integer | 否 | 天数，默认30，最大365 |

**响应示例**:
```json
{
  "code": "SUCCESS",
  "data": {
    "period_days": 30,
    "start_date": "2026-02-16",
    "trends": [
      {"date": "2026-02-16", "users": 450, "views": 3200},
      {"date": "2026-02-17", "users": 520, "views": 3800},
      ...
    ]
  },
  "timestamp": "2026-03-18T12:00:00Z"
}
```

### 3.4 用户接口

#### GET /api/v1/user/profile - 获取用户信息

获取当前认证用户的信息。

**请求**:
```bash
curl -X GET "https://api.ourlyg.com/api/v1/user/profile" \
  -H "X-API-Key: your_api_key"
```

**响应示例**:
```json
{
  "code": "SUCCESS",
  "data": {
    "id": 123456,
    "email": "user@example.com",
    "plan": "pro",
    "created_at": "2026-01-15T08:00:00Z",
    "expires_at": "2026-04-15T08:00:00Z",
    "auto_renew": true
  },
  "timestamp": "2026-03-18T12:00:00Z"
}
```

#### GET /api/v1/user/usage - 获取使用情况

获取当前用户的API使用统计。

**请求**:
```bash
curl -X GET "https://api.ourlyg.com/api/v1/user/usage" \
  -H "X-API-Key: your_api_key"
```

**响应示例**:
```json
{
  "code": "SUCCESS",
  "data": {
    "plan": "pro",
    "api_calls_today": 4532,
    "api_limit": 10000,
    "usage_percentage": 45.32,
    "calls_remaining": 5468,
    "reset_time": "2026-03-19T00:00:00Z"
  },
  "timestamp": "2026-03-18T12:00:00Z"
}
```

### 3.5 Webhook

#### 订阅事件通知

向客户的服务器推送实时事件。

**支持的事件**:
- `subscription.created` - 新订阅创建
- `subscription.renewed` - 订阅续费
- `subscription.expired` - 订阅到期
- `payment.succeeded` - 支付成功
- `payment.failed` - 支付失败
- `news.published` - 新闻发布 (高优先级)

**配置方式**:
在 https://ourlyg.com/user/webhooks 中：
1. 填写Webhook URL
2. 选择要订阅的事件
3. 测试连接

**Webhook请求示例**:
```json
{
  "event_type": "news.published",
  "timestamp": "2026-03-18T12:00:00Z",
  "data": {
    "news_id": 12345,
    "title": "A股市场再创新高",
    "category": "stocks",
    "importance": 8,
    "published_at": "2026-03-18T10:30:00Z"
  },
  "signature": "sha256=..."
}
```

**验证签名**:
```python
import hmac
import hashlib

signature = request.headers.get('X-Ourlyg-Signature')
timestamp = request.headers.get('X-Ourlyg-Timestamp')
body = request.get_data()

computed_signature = hmac.new(
    webhook_secret.encode(),
    f"{timestamp}{body}".encode(),
    hashlib.sha256
).hexdigest()

assert signature == f"sha256={computed_signature}"
```

---

## 4. 集成示例

### Python 集成

```python
import requests
from datetime import datetime, timedelta

class OurlyAPIClient:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.ourlyg.com"
        self.headers = {"X-API-Key": api_key}
    
    def get_news(self, limit=20, category=None):
        """获取新闻列表"""
        params = {"limit": limit}
        if category:
            params["category"] = category
        
        response = requests.get(
            f"{self.base_url}/api/v1/news",
            params=params,
            headers=self.headers
        )
        return response.json()
    
    def search_news(self, query, limit=20):
        """搜索新闻"""
        response = requests.get(
            f"{self.base_url}/api/v1/search",
            params={"q": query, "limit": limit},
            headers=self.headers
        )
        return response.json()
    
    def get_analytics(self):
        """获取分析数据"""
        response = requests.get(
            f"{self.base_url}/api/v1/analytics/summary",
            headers=self.headers
        )
        return response.json()

# 使用示例
client = OurlyAPIClient("your_api_key")

# 获取最新新闻
news_data = client.get_news(limit=10, category="stocks")
print(f"找到 {len(news_data['data']['items'])} 条新闻")

for news in news_data['data']['items']:
    print(f"- {news['title']}")
    print(f"  来源: {news['source']}")
    print(f"  时间: {news['published_at']}\n")

# 搜索特定公司
search_results = client.search_news("蔚来汽车")
print(f"搜索 '蔚来汽车' 找到 {search_results['data']['total']} 条结果")
```

### JavaScript 集成

```javascript
class OurlyAPIClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.ourlyg.com';
  }

  async getNews(limit = 20, category = null) {
    const params = new URLSearchParams({ limit });
    if (category) params.append('category', category);

    const response = await fetch(
      `${this.baseUrl}/api/v1/news?${params}`,
      { headers: { 'X-API-Key': this.apiKey } }
    );
    return await response.json();
  }

  async searchNews(query, limit = 20) {
    const response = await fetch(
      `${this.baseUrl}/api/v1/search?q=${encodeURIComponent(query)}&limit=${limit}`,
      { headers: { 'X-API-Key': this.apiKey } }
    );
    return await response.json();
  }
}

// 使用示例
const client = new OurlyAPIClient('your_api_key');

client.getNews(10, 'stocks').then(data => {
  console.log(`Found ${data.data.items.length} news items`);
  data.data.items.forEach(news => {
    console.log(`- ${news.title}`);
    console.log(`  Source: ${news.source}`);
  });
});
```

---

## 5. 错误处理

### 常见错误码

| 错误码 | HTTP状态 | 说明 | 解决方案 |
|--------|---------|------|--------|
| `MISSING_API_KEY` | 401 | 缺少API密钥 | 在请求头中添加 X-API-Key |
| `INVALID_API_KEY` | 401 | 无效的API密钥 | 检查密钥是否正确，或重新生成 |
| `RATE_LIMIT_EXCEEDED` | 429 | 超过调用限制 | 等待重置或升级计划 |
| `NOT_FOUND` | 404 | 资源不存在 | 检查请求参数和ID |
| `INVALID_PARAMETER` | 400 | 无效参数 | 检查参数类型和范围 |
| `INTERNAL_ERROR` | 500 | 服务器错误 | 稍后重试或联系支持 |

### 错误响应示例

```json
{
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED",
  "message": "Daily limit for basic plan reached",
  "remaining_calls": 0,
  "reset_at": "2026-03-19T00:00:00Z",
  "request_id": "req_123abc"
}
```

### 重试策略

建议实现指数退避重试：

```python
import time

def api_call_with_retry(client, method, *args, max_retries=3, **kwargs):
    for attempt in range(max_retries):
        try:
            return getattr(client, method)(*args, **kwargs)
        except RateLimitError:
            wait_time = 2 ** attempt
            print(f"Rate limited. Retrying in {wait_time}s...")
            time.sleep(wait_time)
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            print(f"Error: {e}. Retrying...")
            time.sleep(1)
```

---

## 6. 最佳实践

### 性能优化

1. **缓存数据**
   ```python
   # 缓存最新新闻 (避免重复请求)
   import functools
   import time
   
   @functools.lru_cache(maxsize=128)
   def get_news_cached(limit=20):
       return client.get_news(limit)
   
   # 定期清除缓存
   def refresh_cache():
       get_news_cached.cache_clear()
   ```

2. **批量请求**
   - 使用 `limit=100` 获取最多结果
   - 减少网络往返次数

3. **异步请求**
   ```python
   import asyncio
   import aiohttp
   
   async def get_multiple_news():
       async with aiohttp.ClientSession() as session:
           tasks = [
               fetch_news(session, category)
               for category in ['stocks', 'bonds', 'crypto']
           ]
           return await asyncio.gather(*tasks)
   ```

### 安全建议

1. **环境变量存储密钥**
   ```python
   import os
   api_key = os.getenv('OURLYG_API_KEY')
   ```

2. **HTTPS only**
   - 始终使用 HTTPS 连接
   - 不要在日志中记录完整的API密钥

3. **IP白名单**
   - 在 API密钥管理界面设置可信IP列表
   - 增加安全性

### 监控和日志

```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def api_call_with_logging(client, method, *args, **kwargs):
    logger.info(f"API call: {method} with args: {args}")
    try:
        result = getattr(client, method)(*args, **kwargs)
        logger.info(f"API call successful, returned {len(result)} items")
        return result
    except Exception as e:
        logger.error(f"API call failed: {e}")
        raise
```

---

## 7. 价格和计费

### 计费方式

- **月结**: 每月1日自动扣费
- **自动续费**: 订阅到期前7天发送提醒
- **取消随时**: 取消后不再扣费

### 免费试用

- **7天免费试用**: 包含专业版全部功能
- **不需要信用卡**: 试用期无限制
- **自动转为基础版**: 试用结束后自动降级

### 超额费用

- **超出API调用限制**: 可选择按超额计费或自动限流
- **超额计费**: ¥0.1 / 1000次调用

### 发票和税务

- 提供电子发票
- 支持企业对公转账
- 年度汇总报表可用

---

## 8. 技术支持

### 获取帮助

| 方式 | 时间 | 响应时间 |
|------|------|--------|
| 邮件 | 工作日 | <24小时 |
| 在线客服 | 工作日 09:00-18:00 | <2小时 |
| 电话 | 企业版用户 | <30分钟 |
| 社区论坛 | 24/7 | 由社区维护 |

### 常见问题

**Q: API有使用量限制吗？**  
A: 有的。每个计划都有每日API调用限制。查看 `/api/v1/user/usage` 获取当前使用情况。

**Q: 如何处理API限流？**  
A: 收到 429 错误时，等待 `reset_at` 时间或升级计划。建议实现指数退避重试。

**Q: 能保证数据的实时性吗？**  
A: 新闻数据通常在发布后 1-5 分钟内出现在API中。使用Webhook获取即时通知。

**Q: 支持自定义数据导出吗？**  
A: 支持。通过API获取数据后可自行处理和导出。

---

## 9. 服务水平协议 (SLA)

### 可用性承诺

| 计划 | 可用性 | 补偿 |
|------|--------|------|
| 基础版 | 99% | 月费5折 |
| 专业版 | 99.9% | 月费10折 |
| 企业版 | 99.99% | 月费25折 |

### 保障措施

- 多地域冗余部署
- 实时监控和告警
- 自动故障转移
- 99.99% SLA覆盖

---

## 10. 更新日志

### v1.0 (2026-03-18)

- ✨ 正式发布API v1.0
- 📰 新闻接口
- 🔍 搜索接口
- 📊 分析接口
- 👤 用户接口
- 🪝 Webhook支持

### 后续计划

- 📊 高级分析报告API
- 🤖 机器学习预测API
- 💬 实时聊天API
- 📱 移动SDK

---

**联系我们**: api@ourlyg.com  
**API文档**: https://api.ourlyg.com/docs  
**状态页**: https://status.ourlyg.com

