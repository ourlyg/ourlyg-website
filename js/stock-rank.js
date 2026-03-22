// 动态涨停榜组件
(function() {
    const today = "20260321";
    const stocks = [];
    
    function renderStockBoard() {
        const container = document.getElementById('stock-rank-board');
        if (!container) return;
        
        if (!stocks || stocks.length === 0) {
            container.innerHTML = `
                <div style="font-size:14px; color:rgba(255,255,255,0.6); text-align:center; padding:20px;">
                    今日为非交易日或数据暂未更新
                </div>
            `;
            return;
        }
        
        let html = '<div style="display: grid; gap: 8px;">';
        stocks.forEach((stock, index) => {
            html += `
                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border-radius: 8px; padding: 10px 12px;">
                    <div>
                        <div style="font-size:14px; font-weight:600; color:white;">${index + 1}. ${stock[1]}</div>
                        <div style="font-size:11px; color:rgba(255,255,255,0.4);">${stock[0]}</div>
                    </div>
                    <div style="font-size:16px; font-weight:700; color:#ef4444;">+${stock[3]}%</div>
                </div>
            `;
        });
        html += '</div>';
        
        container.innerHTML = html;
    }
    
    // 页面加载后渲染
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderStockBoard);
    } else {
        renderStockBoard();
    }
})();
