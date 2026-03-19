# VIP订阅系统 - 完整部署指南

## 🎯 系统概述

ourlyg.com VIP订阅系统是一个完整的SaaS支付解决方案，集成支付宝支付、用户管理、订阅管理和权限控制。

### 核心功能
- ✅ 支付宝集成支付
- ✅ 三层VIP计划（基础版/专业版/企业版）
- ✅ 订阅生命周期管理
- ✅ 使用统计和分析
- ✅ 自动续费管理
- ✅ 退款处理

---

## 📋 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                     用户前端界面                              │
│         (vip-subscription.html + JavaScript)                  │
└────────────────┬────────────────────────────────────────────┘
                 │
        ┌────────▼──────────┐
        │   Payment API      │
        │  (payment_api.py)  │
        └────────┬───────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
┌───▼────────────┐  ┌────────▼─────────┐
│ Alipay Handler │  │  Subscription DB  │
│(alipay_*.py)   │  │(subscription_db.py)
└────────────────┘  └──────────────────┘
```

---

## 🔧 核心模块说明

### 1. 配置模块 (alipay_config.py)
```python
# 包含内容：
- 沙箱/生产环境配置
- VIP计划定义（价格、功能、时长）
- 权限配置（不同等级的功能权限）
- 订阅配置（自动续费、试用期等）
```

**关键配置项：**
- `ENVIRONMENT`: 环境选择（'sandbox' or 'production'）
- `VIP_PLANS`: VIP计划定义
- `VIP_PERMISSIONS`: 各等级权限配置

### 2. 支付处理模块 (alipay_handler.py)
```python
# 功能：
- generate_order(): 生成支付订单
- create_payment_url(): 生成支付链接
- verify_callback(): 验证支付回调
- parse_callback(): 解析回调数据
```

### 3. 数据库模块 (subscription_db.py)
```python
# 数据表：
- users: 用户信息表
- subscriptions: 订阅表
- orders: 订单表
- payment_records: 支付记录表
- usage_records: 使用记录表
```

### 4. API接口模块 (payment_api.py)
```python
# API端点：
- create_payment_session(): 创建支付会话
- handle_alipay_callback(): 处理支付回调
- get_payment_status(): 获取支付状态
- check_subscription(): 检查订阅状态
- get_user_stats(): 获取用户统计
```

---

## 🚀 部署步骤

### 第1步：环境准备

```bash
# 1. 安装必要的Python库
pip install requests beautifulsoup4 python-alipay

# 2. 创建支付宝沙箱应用
# 访问: https://open.alipay.com/develop/sandbox/app
# 记下以下信息:
# - App ID
# - 商户私钥
# - 支付宝公钥
```

### 第2步：配置支付宝凭证

编辑 `alipay_config.py`，填入您的支付宝凭证：

```python
ALIPAY_CONFIG = {
    'sandbox': {
        'app_id': '你的APPID',  # 从支付宝获取
        'merchant_private_key': '你的商户私钥',  # 完整的私钥内容
        'alipay_public_key': '支付宝公钥',  # 从支付宝获取
    }
}

ENVIRONMENT = 'sandbox'  # 先在沙箱测试
```

### 第3步：初始化数据库

```python
from subscription_db import SubscriptionDatabase

# 这会自动创建所有必要的表
db = SubscriptionDatabase('ourlyg-website/data/subscribers.db')
```

### 第4步：集成Web框架

选择一个Web框架（Flask/FastAPI）来部署API：

#### Flask 示例：
```python
from flask import Flask, request, jsonify
from payment_api import payment_api

app = Flask(__name__)

@app.route('/api/payment/create-session', methods=['POST'])
def create_session():
    data = request.json
    result = payment_api.create_payment_session(
        data['user_id'],
        data['email'],
        data['plan'],
        data.get('months', 1)
    )
    return jsonify(result)

@app.route('/api/payment/alipay/notify', methods=['POST'])
def alipay_notify():
    result = payment_api.handle_alipay_callback(request.form.to_dict())
    return jsonify(result)

@app.route('/api/payment/status/<order_id>', methods=['GET'])
def get_status(order_id):
    result = payment_api.get_payment_status(order_id)
    return jsonify(result)

@app.route('/api/subscription/check/<user_id>', methods=['GET'])
def check_sub(user_id):
    result = payment_api.check_subscription(user_id)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

#### FastAPI 示例：
```python
from fastapi import FastAPI, Request
from payment_api import payment_api

app = FastAPI()

@app.post("/api/payment/create-session")
async def create_session(data: dict):
    result = payment_api.create_payment_session(
        data['user_id'],
        data['email'],
        data['plan'],
        data.get('months', 1)
    )
    return result

@app.post("/api/payment/alipay/notify")
async def alipay_notify(request: Request):
    params = await request.form()
    result = payment_api.handle_alipay_callback(dict(params))
    return result

# ... 其他路由
```

### 第5步：部署VIP订阅页面

1. 将 `vip-subscription.html` 放入网站根目录
2. 在网站主菜单中添加链接：
   ```html
   <a href="/vip-subscription.html" class="nav-link">💎 VIP订阅</a>
   ```

### 第6步：测试支付流程

#### 沙箱测试账号
```
买家账号: sandbox_c_xxxxxxxx@sandbox.com
支付账户密码: 在沙箱后台查看
支付宝账户: 沙箱支付宝账户

测试金额: 使用任意金额
预期结果: 支付成功后收到回调
```

#### 测试步骤
1. 访问 `/vip-subscription.html`
2. 填写用户ID和邮箱
3. 选择VIP计划
4. 点击"立即订阅"
5. 输入月数并确认
6. 跳转到支付宝支付页面
7. 使用沙箱账号完成支付
8. 支付成功后回调到系统
9. 查询用户订阅状态验证

---

## 📊 数据库查询示例

### 查询用户订阅状态
```python
from subscription_db import SubscriptionDatabase

db = SubscriptionDatabase()
subscription = db.get_active_subscription('user_123')

if subscription:
    print(f"计划: {subscription['plan_type']}")
    print(f"有效期: {subscription['start_date']} - {subscription['end_date']}")
else:
    print("用户未订阅")
```

### 查询用户使用统计
```python
stats = db.get_usage_stats('user_123')
print(stats)
# 输出: {'export': {'count': 10, 'total': 10}, 'api_call': {'count': 50, 'total': 500}}
```

### 查询订单状态
```python
order = db.get_order('ORDER_20260318120000_user_123_abc123')
print(f"订单状态: {order['status']}")
print(f"支付金额: {order['amount']}")
```

---

## 🔐 安全建议

1. **不要在代码中暴露私钥**
   ```bash
   # ✅ 正确做法：使用环境变量
   export ALIPAY_PRIVATE_KEY=$(cat /path/to/private_key.pem)
   
   # ❌ 错误做法：直接在代码中
   MERCHANT_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----..."
   ```

2. **使用HTTPS**
   - 回调地址必须使用HTTPS
   - 支付页面必须使用HTTPS

3. **验证回调签名**
   - 所有支付宝回调都必须验证签名
   - 防止冒充支付成功的攻击

4. **数据库备份**
   ```bash
   # 定期备份用户和订单数据
   sqlite3 subscribers.db ".backup subscribers_backup.db"
   ```

---

## 🧪 测试命令

```python
# 快速测试脚本
from payment_api import payment_api

# 1. 创建支付会话
result = payment_api.create_payment_session(
    'test_user_001',
    'test@example.com',
    'pro',
    1
)
print("支付会话:", result)

# 2. 模拟支付回调
callback_data = {
    'out_trade_no': result['order_id'],
    'trade_no': 'ALIPAY_TRADE_001',
    'trade_status': 'TRADE_SUCCESS',
    'total_amount': '19.9',
    'buyer_id': '12345',
    'seller_id': '67890',
    'sign': 'test_sign'
}
callback_result = payment_api.handle_alipay_callback(callback_data)
print("回调处理:", callback_result)

# 3. 检查订阅状态
subscription = payment_api.check_subscription('test_user_001')
print("订阅状态:", subscription)
```

---

## 📈 收入预测

基于当前配置的3层价格模型：

```
保守估计（100用户/月）:
- 基础版 (9.9元): 30用户 × 9.9 = 297元
- 专业版 (19.9元): 60用户 × 19.9 = 1,194元
- 企业版 (99.9元): 10用户 × 99.9 = 999元
- 月收入 = 2,490元

乐观估计（500用户/月）:
- 基础版 (9.9元): 150用户 × 9.9 = 1,485元
- 专业版 (19.9元): 300用户 × 19.9 = 5,970元
- 企业版 (99.9元): 50用户 × 99.9 = 4,995元
- 月收入 = 12,450元
```

---

## 🐛 常见问题

### Q1: 如何在生产环境中使用？
A: 将 `ENVIRONMENT = 'sandbox'` 改为 `'production'`，并配置正确的生产APPID和公私钥。

### Q2: 支付失败怎么处理？
A: 系统会自动重试3次，如果仍失败将发送邮件通知用户。

### Q3: 支付宝回调超时怎么办？
A: 支付宝会最多重试8次，确保最终一致性。同时系统会定期检查未确认的订单。

### Q4: 用户可以退款吗？
A: 支持7天内全额退款。在代码中可调用 `refund_order()` 方法。

---

## 📞 技术支持

- 支付宝文档: https://opendocs.alipay.com/open
- Python Alipay库: https://github.com/fzlee/alipay

**创建时间**: 2026年3月18日
**最后更新**: 2026年3月18日
**版本**: 1.0
