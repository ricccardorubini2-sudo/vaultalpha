import React, { useRef, useEffect } from 'react';

/**
 * Premium animated network visualization.
 * Glowing interconnected nodes, drifting particles, and live connection lines
 * that respond subtly to the pointer. GPU-friendly (transform/opacity only on
 * the container; canvas draws with alpha compositing). Honors reduced-motion.
 */
export default function NetworkCanvas({ density = 0.00012, className = '', interactive = true }) {
    const canvasRef = useRef(null);
    const rafRef = useRef(0);
    const mouseRef = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let width = 0;
        let height = 0;
        let nodes = [];
        let dpr = Math.min(window.devicePixelRatio || 1, 2);

        const build = () => {
            const rect = canvas.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = Math.max(28, Math.min(120, Math.floor(width * height * density)));
            nodes = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                r: Math.random() * 1.6 + 0.6,
                pulse: Math.random() * Math.PI * 2,
                hub: Math.random() > 0.9,
            }));
        };

        const LINK = 150;
        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            const m = mouseRef.current;
            for (let i = 0; i < nodes.length; i++) {
                const a = nodes[i];
                a.x += a.vx;
                a.y += a.vy;
                if (a.x < 0 || a.x > width) a.vx *= -1;
                if (a.y < 0 || a.y > height) a.vy *= -1;
                a.pulse += 0.02;

                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < LINK) {
                        const o = (1 - dist / LINK) * 0.5;
                        ctx.strokeStyle = `rgba(37, 99, 235, ${o})`;
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }

                if (interactive) {
                    const mdx = a.x - m.x;
                    const mdy = a.y - m.y;
                    const md = Math.hypot(mdx, mdy);
                    if (md < 190) {
                        const o = (1 - md / 190) * 0.7;
                        ctx.strokeStyle = `rgba(79, 70, 229, ${o})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(m.x, m.y);
                        ctx.stroke();
                    }
                }
            }
            for (const a of nodes) {
                const glow = a.hub ? 4 : 2;
                const pr = a.r + (Math.sin(a.pulse) + 1) * (a.hub ? 1.4 : 0.5);
                ctx.beginPath();
                const g = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, pr * glow);
                g.addColorStop(0, a.hub ? 'rgba(37,99,235,0.55)' : 'rgba(59,130,246,0.4)');
                g.addColorStop(1, 'rgba(59,130,246,0)');
                ctx.fillStyle = g;
                ctx.arc(a.x, a.y, pr * glow, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = a.hub ? 'rgba(29,78,216,0.9)' : 'rgba(37,99,235,0.75)';
                ctx.arc(a.x, a.y, pr, 0, Math.PI * 2);
                ctx.fill();
            }
            rafRef.current = requestAnimationFrame(draw);
        };

        build();
        if (reduce) {
            draw();
            cancelAnimationFrame(rafRef.current);
        } else {
            draw();
        }

        const onResize = () => { dpr = Math.min(window.devicePixelRatio || 1, 2); build(); };
        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
        window.addEventListener('resize', onResize);
        if (interactive) {
            canvas.addEventListener('pointermove', onMove);
            canvas.addEventListener('pointerleave', onLeave);
        }
        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', onResize);
            canvas.removeEventListener('pointermove', onMove);
            canvas.removeEventListener('pointerleave', onLeave);
        };
    }, [density, interactive]);

    return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
