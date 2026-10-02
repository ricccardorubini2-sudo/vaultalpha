import React, { useRef, useEffect } from 'react';

const LINK = 150;
const FRAME_MS = 1000 / 30;

/**
 * Faint drifting network behind the homepage hero. Decorative only, so it is
 * kept off the critical path: it starts once the browser is idle after load,
 * runs at 30fps, pauses while off-screen or in a hidden tab, and draws a
 * single still frame when reduced motion is requested.
 */
export default function NetworkCanvas({ density = 0.00008, className = '' }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;
        const ctx = canvas.getContext('2d');
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let width = 0;
        let height = 0;
        let nodes = [];
        let raf = 0;
        let last = 0;
        let visible = true;
        let started = false;
        let disposed = false;

        const build = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = Math.max(24, Math.min(90, Math.floor(width * height * density)));
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                r: Math.random() * 1.4 + (Math.random() > 0.9 ? 1.6 : 0.8),
            }));
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.lineWidth = 0.6;
            ctx.strokeStyle = 'rgb(37, 99, 235)';
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < LINK * LINK) {
                        ctx.globalAlpha = (1 - Math.sqrt(d2) / LINK) * 0.5;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = 'rgb(37, 99, 235)';
            ctx.beginPath();
            for (const a of nodes) {
                ctx.moveTo(a.x + a.r, a.y);
                ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
            }
            ctx.fill();
            ctx.globalAlpha = 1;
        };

        const step = (now) => {
            raf = requestAnimationFrame(step);
            if (now - last < FRAME_MS) return;
            last = now;
            for (const a of nodes) {
                a.x += a.vx * 2;
                a.y += a.vy * 2;
                if (a.x < 0 || a.x > width) a.vx *= -1;
                if (a.y < 0 || a.y > height) a.vy *= -1;
            }
            draw();
        };

        const play = () => {
            if (!raf && started && visible && !document.hidden && !reduce) raf = requestAnimationFrame(step);
        };
        const pause = () => {
            cancelAnimationFrame(raf);
            raf = 0;
        };

        const io = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            if (visible) play();
            else pause();
        });
        const onVisibility = () => (document.hidden ? pause() : play());
        const onResize = () => {
            build();
            draw();
        };

        const start = () => {
            if (disposed) return;
            started = true;
            build();
            draw();
            canvas.style.opacity = '';
            io.observe(canvas);
            window.addEventListener('resize', onResize);
            document.addEventListener('visibilitychange', onVisibility);
            play();
        };

        canvas.style.opacity = '0';
        const idle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 200));
        const cancelIdle = window.cancelIdleCallback ?? clearTimeout;
        let idleId = 0;
        const schedule = () => { idleId = idle(start, { timeout: 2500 }); };
        if (document.readyState === 'complete') schedule();
        else window.addEventListener('load', schedule, { once: true });

        return () => {
            disposed = true;
            pause();
            cancelIdle(idleId);
            io.disconnect();
            window.removeEventListener('load', schedule);
            window.removeEventListener('resize', onResize);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [density]);

    return <canvas ref={canvasRef} className={`transition-opacity duration-1000 ${className}`} aria-hidden="true" />;
}
