import React, { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Check, RotateCw } from 'lucide-react';
import { HEADER_IMAGES } from '@/config/headerImages';
import { markHumanVerified } from '@/lib/humanCheck';

const W = 264;
const H = 148;
const PIECE = 44;
const MAX = W - PIECE;
const TOLERANCE = 6;
const MAX_FAILS = 3;
const KEY_STEP = 4;
// Jigsaw piece in a 44×44 box: square body with a tab on the top and right.
const PIECE_PATH = 'M0 10H11A6 6 0 1 1 23 10H34V21A6 6 0 1 1 34 33V44H0Z';
const IMAGES = Object.values(HEADER_IMAGES);

const rand = (min, max) => Math.round(min + Math.random() * (max - min));
const clamp = (v) => Math.min(MAX, Math.max(0, v));
const newPuzzle = () => ({
    image: IMAGES[Math.floor(Math.random() * IMAGES.length)],
    x: rand(Math.round(W * 0.4), MAX - 6),
    y: rand(6, H - PIECE - 6),
});

function PieceOutline({ fill = 'none' }) {
    return (
        <svg viewBox={`0 0 ${PIECE} ${PIECE}`} width={PIECE} height={PIECE} className="absolute inset-0 overflow-visible" aria-hidden="true">
            <path d={PIECE_PATH} fill={fill} stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
        </svg>
    );
}

/**
 * Full-screen first-visit check: drag (or arrow-key) the piece into the gap.
 * A drag must take a moment and several moves to count, which filters the
 * simplest scripted clicks.
 */
export default function HumanCheck({ onVerified }) {
    const titleId = useId();
    const descId = useId();
    const [puzzle, setPuzzle] = useState(newPuzzle);
    const [value, setValue] = useState(0);
    const [status, setStatus] = useState('idle');
    const [fails, setFails] = useState(0);
    const valueRef = useRef(0);
    const drag = useRef(null);
    const handleRef = useRef(null);
    const timers = useRef([]);

    const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
    useEffect(() => () => timers.current.forEach(clearTimeout), []);
    useEffect(() => { handleRef.current?.focus(); }, []);

    useEffect(() => {
        const html = document.documentElement;
        const prev = html.style.overflow;
        html.style.overflow = 'hidden';
        return () => { html.style.overflow = prev; };
    }, []);

    const move = (v) => {
        valueRef.current = clamp(v);
        setValue(valueRef.current);
    };

    const reset = (fresh) => {
        move(0);
        setStatus('idle');
        if (fresh) {
            setPuzzle(newPuzzle());
            setFails(0);
        }
    };

    const check = (human) => {
        if (human && Math.abs(valueRef.current - puzzle.x) <= TOLERANCE) {
            move(puzzle.x);
            setStatus('success');
            markHumanVerified();
            later(onVerified, 800);
            return;
        }
        const nextFails = fails + 1;
        setFails(nextFails);
        setStatus('fail');
        later(() => reset(nextFails >= MAX_FAILS), 650);
    };

    const locked = status === 'success' || status === 'fail';

    const onPointerDown = (e) => {
        if (locked) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        drag.current = { startX: e.clientX, startValue: valueRef.current, startedAt: performance.now(), moves: 0 };
        setStatus('dragging');
    };
    const onPointerMove = (e) => {
        const d = drag.current;
        if (!d) return;
        d.moves += 1;
        move(d.startValue + e.clientX - d.startX);
    };
    const onPointerUp = () => {
        const d = drag.current;
        if (!d) return;
        drag.current = null;
        if (valueRef.current === 0) {
            setStatus('idle');
            return;
        }
        check(performance.now() - d.startedAt > 250 && d.moves > 3);
    };

    const onKeyDown = (e) => {
        if (locked) return;
        const step = e.shiftKey ? KEY_STEP * 4 : KEY_STEP;
        const keys = {
            ArrowRight: () => move(valueRef.current + step),
            ArrowUp: () => move(valueRef.current + step),
            ArrowLeft: () => move(valueRef.current - step),
            ArrowDown: () => move(valueRef.current - step),
            Home: () => move(0),
            End: () => move(MAX),
            Enter: () => check(true),
            ' ': () => check(true),
        };
        if (!keys[e.key]) return;
        e.preventDefault();
        keys[e.key]();
    };

    const animate = status !== 'dragging';
    const slide = animate ? 'transition-[left] duration-300 ease-out' : '';
    const grow = animate ? 'transition-[width] duration-300 ease-out' : '';
    const message = {
        success: 'Verified. Welcome.',
        fail: fails >= MAX_FAILS ? 'Not quite. Here is a new puzzle.' : 'Not quite. Try again.',
    }[status] ?? 'Drag the slider, or use the arrow keys and press Enter.';

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[hsl(215_42%_6%_/_0.72)] p-3 backdrop-blur-md animate-fade">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descId}
                className="w-full max-w-[296px] animate-enter rounded-sm border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-[0_24px_60px_-20px_rgba(6,10,16,0.6)]"
            >
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-champagne">Security check</p>
                <h2 id={titleId} className="mt-2 font-display text-2xl font-normal tracking-tight text-slate-900">Verify you are human</h2>
                <p id={descId} className="mt-1 text-sm text-slate-500">Slide the piece into the gap.</p>

                <div
                    className="relative mt-4 select-none overflow-hidden rounded-sm bg-mist"
                    style={{ width: W, height: H, backgroundImage: `url(${puzzle.image})`, backgroundSize: `${W}px ${H}px` }}
                    aria-hidden="true"
                >
                    <div className="absolute" style={{ left: puzzle.x, top: puzzle.y, width: PIECE, height: PIECE }}>
                        <PieceOutline fill="rgba(10,16,24,0.55)" />
                    </div>
                    <div
                        className={`absolute ${slide}`}
                        style={{ left: value, top: puzzle.y, width: PIECE, height: PIECE, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' }}
                    >
                        <div
                            className="h-full w-full"
                            style={{
                                clipPath: `path('${PIECE_PATH}')`,
                                backgroundImage: `url(${puzzle.image})`,
                                backgroundSize: `${W}px ${H}px`,
                                backgroundPosition: `-${puzzle.x}px -${puzzle.y}px`,
                            }}
                        />
                        <PieceOutline />
                    </div>
                    {status === 'success' && (
                        <div className="absolute inset-0 grid place-items-center bg-[hsl(215_42%_8%_/_0.45)] animate-fade">
                            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[hsl(215_42%_12%)]">
                                <Check className="h-5 w-5" strokeWidth={2} />
                            </span>
                        </div>
                    )}
                </div>

                <div
                    className={`relative mt-3 h-11 rounded-sm border bg-mist ${status === 'fail' ? 'animate-shake border-red-300' : 'border-[hsl(var(--border))]'}`}
                    style={{ width: W }}
                >
                    <div
                        className={`absolute inset-y-0 left-0 rounded-sm ${status === 'success' ? 'bg-emerald-600/15' : 'bg-[hsl(var(--champagne)_/_0.14)]'} ${grow}`}
                        style={{ width: value + PIECE }}
                        aria-hidden="true"
                    />
                    <span
                        className={`pointer-events-none absolute inset-0 grid place-items-center pl-10 text-xs tracking-wide text-slate-500 transition-opacity ${value > 8 ? 'opacity-0' : 'opacity-100'}`}
                        aria-hidden="true"
                    >
                        Slide to complete
                    </span>
                    <div
                        ref={handleRef}
                        role="slider"
                        tabIndex={0}
                        aria-label="Puzzle piece position"
                        aria-valuemin={0}
                        aria-valuemax={MAX}
                        aria-valuenow={Math.round(value)}
                        aria-describedby={descId}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                        onKeyDown={onKeyDown}
                        className={`absolute -top-px grid h-11 w-11 touch-none place-items-center rounded-sm text-white shadow-md outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 ${status === 'success' ? 'bg-emerald-700' : 'cursor-grab bg-[hsl(215_42%_12%)] active:cursor-grabbing'} ${slide}`}
                        style={{ left: value }}
                    >
                        {status === 'success' ? <Check className="h-4 w-4" strokeWidth={2} /> : <ArrowRight className="h-4 w-4" strokeWidth={1.75} />}
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                    <p role="status" aria-live="polite" className={`text-xs ${status === 'fail' ? 'text-red-600' : status === 'success' ? 'text-emerald-700' : 'text-slate-500'}`}>
                        {message}
                    </p>
                    <button
                        type="button"
                        onClick={() => reset(true)}
                        disabled={locked}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-sm text-slate-400 transition-colors hover:text-slate-900 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]"
                        aria-label="Load a new puzzle"
                    >
                        <RotateCw className="h-4 w-4" strokeWidth={1.75} />
                    </button>
                </div>
            </div>
        </div>
    );
}
