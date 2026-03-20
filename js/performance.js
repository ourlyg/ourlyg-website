/**
 * 性能优化脚本
 * 功能：资源延迟加载、图片懒加载、关键渲染路径优化
 */

(function() {
    'use strict';

    // 1. 延迟加载非关键JavaScript
    function loadDeferredScripts() {
        const scripts = document.querySelectorAll('script[data-defer]');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.src = script.dataset.defer;
            newScript.async = true;
            document.body.appendChild(newScript);
        });
    }

    // 2. 图片懒加载 - 使用Intersection Observer API
    function lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.dataset.src;
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                            img.removeAttribute('loading');
                            observer.unobserve(img);
                        }
                    }
                });
            }, {
                rootMargin: '50px 0px', // 提前50px开始加载
                threshold: 0.01
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // 降级方案：直接加载所有图片
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }

    // 3. 延迟加载iframe（如百度统计等）
    function lazyLoadIframes() {
        const iframeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    const src = iframe.dataset.src;
                    if (src) {
                        iframe.src = src;
                        iframe.removeAttribute('data-src');
                        observer.unobserve(iframe);
                    }
                }
            });
        });

        document.querySelectorAll('iframe[data-src]').forEach(iframe => {
            iframeObserver.observe(iframe);
        });
    }

    // 4. 预加载关键资源
    function preloadCriticalResources() {
        const criticalResources = [
            'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
            '/css/style.css'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    // 5. 监听页面可见性，优化后台标签页性能
    function handleVisibilityChange() {
        if (document.hidden) {
            // 页面隐藏时，停止不必要的动画和定时器
            document.body.classList.add('page-hidden');
        } else {
            // 页面显示时，恢复
            document.body.classList.remove('page-hidden');
        }
    }

    // 6. 页面加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            lazyLoadImages();
            lazyLoadIframes();
            preloadCriticalResources();
            loadDeferredScripts();
        });
    } else {
        lazyLoadImages();
        lazyLoadIframes();
        preloadCriticalResources();
        loadDeferredScripts();
    }

    // 监听页面可见性
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 7. 移除页面隐藏时的动画
    const style = document.createElement('style');
    style.textContent = `
        .page-hidden * {
            animation-play-state: paused !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);

    console.log('Performance optimization script loaded');
})();
