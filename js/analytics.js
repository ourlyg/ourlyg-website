// 简单访问统计系统
// 使用localStorage记录访问数据

(function() {
    'use strict';

    // 数据存储键名
    const STORAGE_KEYS = {
        PV: 'ourlyg_page_views',
        UV: 'ourlyg_unique_visitors',
        LAST_VISIT: 'ourlyg_last_visit'
    };

    // 获取当前日期（YYYY-MM-DD）
    function getToday() {
        const now = new Date();
        return now.getFullYear() + '-' +
               String(now.getMonth() + 1).padStart(2, '0') + '-' +
               String(now.getDate()).padStart(2, '0');
    }

    // 获取页面唯一标识
    function getPageId() {
        return window.location.pathname;
    }

    // 生成用户唯一标识
    function getVisitorId() {
        let visitorId = localStorage.getItem('ourlyg_visitor_id');
        if (!visitorId) {
            visitorId = 'v_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('ourlyg_visitor_id', visitorId);
        }
        return visitorId;
    }

    // 记录访问数据
    function trackVisit() {
        const today = getToday();
        const pageId = getPageId();
        const visitorId = getVisitorId();
        const now = new Date();

        // 读取现有数据
        let pvData = JSON.parse(localStorage.getItem(STORAGE_KEYS.PV) || '{}');
        let uvData = JSON.parse(localStorage.getItem(STORAGE_KEYS.UV) || '{}');
        let lastVisit = localStorage.getItem(STORAGE_KEYS.LAST_VISIT);

        // 初始化日期数据
        if (!pvData[today]) pvData[today] = {};
        if (!uvData[today]) uvData[today] = {};

        // 更新PV（页面浏览量）
        if (!pvData[today][pageId]) {
            pvData[today][pageId] = 0;
        }
        pvData[today][pageId]++;

        // 更新UV（独立访客数）
        const todayVisitors = uvData[today][pageId] || [];
        if (!todayVisitors.includes(visitorId)) {
            todayVisitors.push(visitorId);
            uvData[today][pageId] = todayVisitors;
        }

        // 保存数据
        localStorage.setItem(STORAGE_KEYS.PV, JSON.stringify(pvData));
        localStorage.setItem(STORAGE_KEYS.UV, JSON.stringify(uvData));
        localStorage.setItem(STORAGE_KEYS.LAST_VISIT, now.toISOString());

        // 在控制台输出访问信息（调试用）
        if (window.console && window.console.log) {
            console.log('[Analytics] Page view tracked:', {
                page: pageId,
                date: today,
                pv: pvData[today][pageId],
                uv: uvData[today][pageId].length,
                visitorId: visitorId
            });
        }
    }

    // 获取总PV
    function getTotalPV() {
        let pvData = JSON.parse(localStorage.getItem(STORAGE_KEYS.PV) || '{}');
        let total = 0;

        Object.keys(pvData).forEach(date => {
            Object.keys(pvData[date]).forEach(pageId => {
                total += pvData[date][pageId];
            });
        });

        return total;
    }

    // 获取今日PV
    function getTodayPV() {
        const today = getToday();
        let pvData = JSON.parse(localStorage.getItem(STORAGE_KEYS.PV) || '{}');

        if (!pvData[today]) return 0;

        let total = 0;
        Object.keys(pvData[today]).forEach(pageId => {
            total += pvData[today][pageId];
        });

        return total;
    }

    // 获取总UV
    function getTotalUV() {
        let uvData = JSON.parse(localStorage.getItem(STORAGE_KEYS.UV) || '{}');
        let visitors = new Set();

        Object.keys(uvData).forEach(date => {
            Object.keys(uvData[date]).forEach(pageId => {
                uvData[date][pageId].forEach(visitorId => {
                    visitors.add(visitorId);
                });
            });
        });

        return visitors.size;
    }

    // 获取今日UV
    function getTodayUV() {
        const today = getToday();
        let uvData = JSON.parse(localStorage.getItem(STORAGE_KEYS.UV) || '{}');

        if (!uvData[today]) return 0;

        let visitors = new Set();
        Object.keys(uvData[today]).forEach(pageId => {
            uvData[today][pageId].forEach(visitorId => {
                visitors.add(visitorId);
            });
        });

        return visitors.size;
    }

    // 导出数据（用于上报）
    function exportData() {
        return {
            pv: JSON.parse(localStorage.getItem(STORAGE_KEYS.PV) || '{}'),
            uv: JSON.parse(localStorage.getItem(STORAGE_KEYS.UV) || '{}'),
            lastVisit: localStorage.getItem(STORAGE_KEYS.LAST_VISIT),
            visitorId: getVisitorId()
        };
    }

    // 显示统计数据到页面
    function displayStats() {
        const totalPV = getTotalPV();
        const todayPV = getTodayPV();
        const totalUV = getTotalUV();
        const todayUV = getTodayUV();

        // 查找统计数据显示容器
        const statElements = document.querySelectorAll('[data-analytics-display]');

        statElements.forEach(element => {
            const type = element.getAttribute('data-analytics-display');

            switch(type) {
                case 'total-pv':
                    element.textContent = totalPV.toLocaleString();
                    break;
                case 'today-pv':
                    element.textContent = todayPV.toLocaleString();
                    break;
                case 'total-uv':
                    element.textContent = totalUV.toLocaleString();
                    break;
                case 'today-uv':
                    element.textContent = todayUV.toLocaleString();
                    break;
            }
        });
    }

    // 页面加载时执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            trackVisit();
            displayStats();
        });
    } else {
        trackVisit();
        displayStats();
    }

    // 将函数暴露到全局（供外部调用）
    window.OurlygAnalytics = {
        getTotalPV: getTotalPV,
        getTodayPV: getTodayPV,
        getTotalUV: getTotalUV,
        getTodayUV: getTodayUV,
        exportData: exportData,
        displayStats: displayStats
    };

})();
