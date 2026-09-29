'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Bot } from 'lucide-react';

interface ChatbotCoachMarkProps {
  targetSelector: string;
  onDismiss: () => void;
}

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
  centerX: number;
  centerY: number;
}

export default function ChatbotCoachMark({
  targetSelector,
  onDismiss,
}: ChatbotCoachMarkProps) {
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const [phase, setPhase] = useState<'enter' | 'active' | 'exit'>('enter');
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);
  const gotItRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }, []);

  const measure = useCallback(() => {
    const el = document.querySelector(targetSelector);
    if (!el) return;
    const r = el.getBoundingClientRect();
    const pad = 12;
    setTargetRect({
      top: r.top - pad,
      left: r.left - pad,
      width: r.width + pad * 2,
      height: r.height + pad * 2,
      centerX: r.left + r.width / 2,
      centerY: r.top + r.height / 2,
    });
    setVw(window.innerWidth);
    setVh(window.innerHeight);
  }, [targetSelector]);

  useEffect(() => {
    const t = setTimeout(measure, 100);
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [measure]);

  // Phase transitions
  useEffect(() => {
    if (phase === 'enter') {
      const t = setTimeout(
        () => setPhase('active'),
        reducedMotion.current ? 30 : 400
      );
      return () => clearTimeout(t);
    }
  }, [phase]);

  // ESC
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  // Focus Got It
  useEffect(() => {
    if (phase === 'active') gotItRef.current?.focus();
  }, [phase]);

  const dismiss = useCallback(() => {
    setPhase('exit');
    setTimeout(onDismiss, reducedMotion.current ? 0 : 220);
  }, [onDismiss]);

  if (!targetRect || vw === 0) return null;

  const active = phase === 'active';
  const exiting = phase === 'exit';
  const spot = Math.max(targetRect.width, targetRect.height) / 2;

  // ─── Card positioning ──────────────────────────────────────────
  const mobile = vw < 640;
  const cardW = mobile ? Math.min(270, vw - 44) : 290;
  // Place card above the chatbot, right-aligned to match chatbot
  const cardGap = mobile ? 28 : 36;
  const cardTop = targetRect.top - cardGap - 200; // ~200px card height estimate
  const cardLeft = Math.max(16, targetRect.left + targetRect.width - cardW);
  // Clamp vertically
  const safeCardTop = Math.max(16, cardTop);

  // ─── Arrow path ────────────────────────────────────────────────
  // Start from bottom-right of card, end at top of chatbot spotlight
  const ax0 = cardLeft + cardW - 40;
  const ay0 = safeCardTop + 200; // bottom of card
  const ax1 = targetRect.centerX;
  const ay1 = targetRect.top + 2;

  // Nice curve that sweeps right toward the chatbot
  const dx = ax1 - ax0;
  const dy = ay1 - ay0;
  const c1x = ax0 + dx * 0.2;
  const c1y = ay0 + dy * 0.6;
  const c2x = ax1 - Math.abs(dx) * 0.05;
  const c2y = ay1 - Math.abs(dy) * 0.12;

  const pathD = `M${ax0} ${ay0} C${c1x} ${c1y}, ${c2x} ${c2y}, ${ax1} ${ay1}`;
  const ahS = 6;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Feature discovery: Chat with Balaji AI"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        opacity: exiting ? 0 : 1,
        transition: `opacity ${reducedMotion.current ? '0ms' : '350ms'} ease`,
      }}
    >

      {/* ─── SVG Overlay ─── */}
      <svg
        viewBox={`0 0 ${vw} ${vh}`}
        width={vw}
        height={vh}
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'visible',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="coach-mask">
            <rect width={vw} height={vh} fill="white" />
            <circle
              cx={targetRect.centerX}
              cy={targetRect.centerY}
              r={spot + 4}
              fill="black"
            />
          </mask>
          <filter id="glow-f" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* Dark overlay with circular hole */}
        <rect
          width={vw}
          height={vh}
          fill="rgba(0,0,0,0.6)"
          mask="url(#coach-mask)"
          style={{ cursor: 'default' }}
          onClick={dismiss}
        />

        {/* ── Spotlight rings ── */}
        {/* Outer glow */}
        <circle
          cx={targetRect.centerX}
          cy={targetRect.centerY}
          r={spot + 18}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
          filter="url(#glow-f)"
        >
          {!reducedMotion.current && (
            <>
              <animate
                attributeName="r"
                values={`${spot + 16};${spot + 24};${spot + 16}`}
                dur="2.8s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values="0.08;0.18;0.08"
                dur="2.8s"
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>

        {/* Inner crisp ring */}
        <circle
          cx={targetRect.centerX}
          cy={targetRect.centerY}
          r={spot + 7}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.5"
        />

        {/* ── Curved arrow ── */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="300"
          strokeDashoffset={active ? '0' : '300'}
          style={{
            transition: reducedMotion.current
              ? 'none'
              : 'stroke-dashoffset 700ms cubic-bezier(0.22,1,0.36,1) 200ms',
          }}
        />

        {/* Arrowhead */}
        <path
          d={`M${ax1} ${ay1} L${ax1 - ahS} ${ay1 - ahS * 1.5} L${ax1 + ahS} ${ay1 - ahS * 1.5} Z`}
          fill="rgba(255,255,255,0.75)"
          style={{
            opacity: active ? 1 : 0,
            transition: reducedMotion.current
              ? 'none'
              : 'opacity 200ms ease 800ms',
          }}
        />
      </svg>

      {/* ─── Subtle backdrop blur (excludes spotlight) ─── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          pointerEvents: 'none',
          zIndex: -1,
          maskImage: `radial-gradient(circle ${spot + 4}px at ${targetRect.centerX}px ${targetRect.centerY}px, transparent ${spot + 4}px, black ${spot + 5}px)`,
          WebkitMaskImage: `radial-gradient(circle ${spot + 4}px at ${targetRect.centerX}px ${targetRect.centerY}px, transparent ${spot + 4}px, black ${spot + 5}px)`,
        }}
      />

      {/* ─────────────────────────────────────────────── */}
      {/* INFORMATION CARD                                */}
      {/* ─────────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          left: `${cardLeft}px`,
          top: `${safeCardTop}px`,
          width: `${cardW}px`,
          opacity: active ? 1 : 0,
          transform: `translateY(${active ? 0 : 8}px)`,
          transition: reducedMotion.current
            ? 'none'
            : 'opacity 300ms ease 100ms, transform 300ms ease 100ms',
          pointerEvents: active ? 'auto' : 'none',
          zIndex: 10000,
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            boxShadow:
              '0 24px 64px rgba(0,0,0,0.28), 0 4px 20px rgba(0,0,0,0.1)',
          }}
        >
          {/* AI Badge & Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(14, 165, 233, 0.15)',
              }}
            >
              <Bot size={18} color="#38bdf8" />
            </div>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#0284c7',
                background: '#f0f9ff',
                border: '1px solid #bae6fd',
                padding: '3px 8px',
                borderRadius: '9999px',
              }}
            >
              24/7 AI Support
            </span>
          </div>

          <h3
            style={{
              margin: '0 0 6px 0',
              fontSize: '15px',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.3,
              letterSpacing: '-0.01em',
            }}
          >
            Balaji Traders AI Support
          </h3>

          <p
            style={{
              margin: '0 0 16px 0',
              fontSize: '12.5px',
              lineHeight: 1.6,
              color: '#64748b',
            }}
          >
            Meet your personal AI assistant! Get instant 24/7 help with swimwear sizing, product specs, stock availability, and store directions anytime.
          </p>

          <button
            ref={gotItRef}
            onClick={dismiss}
            style={{
              width: '100%',
              padding: '10px 16px',
              background: '#0f172a',
              color: 'white',
              border: 'none',
              borderRadius: '11px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 120ms ease',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = '#1e293b';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = '#0f172a';
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 2px #475569';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>Got it, let&apos;s start</span>
          </button>
        </div>
      </div>
    </div>
  );
}
