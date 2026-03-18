/**
 * Stripe支付链接生成API
 * 用于自动创建支付页面（本地开发版本）
 * 生产环境需部署到Vercel/AWS Lambda
 */

// 模拟支付链接生成（完整版需真实Stripe账户）
module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { email, service_type, amount, user_id } = req.body;

        // 构建支付链接（测试版本 - 指向手动报价表单）
        const checkoutUrl = `https://ourlyg.com/payment-confirm.html?email=${encodeURIComponent(email)}&service=${encodeURIComponent(service_type)}&amount=${amount}&user_id=${user_id}`;

        return res.status(200).json({
            success: true,
            checkout_url: checkoutUrl,
            message: '支付链接已生成'
        });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
