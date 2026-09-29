'use client';

import React from 'react';

interface AquaticWaveRaysProps {
  className?: string;
  intensity?: 'subtle' | 'vibrant' | 'ambient';
  theme?: 'dark' | 'light' | 'footer';
  showBubbles?: boolean;
}

export default function AquaticWaveRays({
  className = '',
  intensity = 'vibrant',
  theme = 'dark',
  showBubbles = true,
}: AquaticWaveRaysProps) {
  const intensityMap = {
    vibrant: 1,
    subtle: 0.55,
    ambient: 0.35,
  };
  const opacityMultiplier = intensityMap[intensity] || 1;

  const isLight = theme === 'light';
  const isFooter = theme === 'footer';

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* ============================================================ */}
      {/* 1. SURFACE WATER ILLUMINATION (TOP WATERLINE LIGHT SOURCE)   */}
      {/* ============================================================ */}
      <div
        className="absolute -top-24 left-1/4 sm:left-1/3 w-[800px] h-[340px] rounded-[100%] blur-3xl pointer-events-none"
        style={{
          background: isLight
            ? 'radial-gradient(ellipse at center, rgba(14, 165, 233, 0.16) 0%, rgba(56, 189, 248, 0.08) 40%, rgba(6, 182, 212, 0.02) 70%, transparent 100%)'
            : isFooter
            ? 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.25) 0%, rgba(14, 165, 233, 0.12) 40%, transparent 80%)'
            : 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.38) 0%, rgba(14, 165, 233, 0.2) 40%, rgba(2, 132, 199, 0.05) 70%, transparent 100%)',
          opacity: opacityMultiplier,
        }}
      />
      <div
        className="absolute -top-16 -right-20 w-[600px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(14, 165, 233, 0.04) 50%, transparent 75%)'
            : 'radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(14, 165, 233, 0.08) 50%, transparent 75%)',
          opacity: opacityMultiplier,
        }}
      />

      {/* ============================================================ */}
      {/* 2. VOLUMETRIC SUNLIGHT RAYS (UNDERWATER CREPUSCULAR BEAMS)   */}
      {/* ============================================================ */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Ray 1: Left-Angle Primary Hero Beam */}
        <div
          className="absolute -top-40 left-[8%] w-[180px] sm:w-[260px] h-[160%] origin-top-left wave-ray-1"
          style={{
            background: isLight
              ? 'linear-gradient(205deg, rgba(56, 189, 248, 0.2) 0%, rgba(14, 165, 233, 0.08) 35%, transparent 75%)'
              : 'linear-gradient(205deg, rgba(56, 189, 248, 0.45) 0%, rgba(14, 165, 233, 0.2) 30%, rgba(6, 182, 212, 0.06) 65%, transparent 100%)',
            filter: isLight ? 'blur(20px)' : 'blur(14px)',
            opacity: opacityMultiplier,
          }}
        />

        {/* Ray 2: Broad Luminous Ambient Wash */}
        <div
          className="absolute -top-48 left-[26%] w-[280px] sm:w-[420px] h-[170%] origin-top wave-ray-2"
          style={{
            background: isLight
              ? 'linear-gradient(198deg, rgba(14, 165, 233, 0.16) 0%, rgba(56, 189, 248, 0.07) 35%, transparent 75%)'
              : 'linear-gradient(198deg, rgba(14, 165, 233, 0.38) 0%, rgba(56, 189, 248, 0.18) 35%, rgba(2, 132, 199, 0.04) 70%, transparent 100%)',
            filter: isLight ? 'blur(26px)' : 'blur(22px)',
            opacity: opacityMultiplier * 0.9,
          }}
        />

        {/* Ray 3: Electric Piercing Laser Shaft */}
        <div
          className="absolute -top-32 left-[48%] w-[90px] sm:w-[140px] h-[150%] origin-top wave-ray-3"
          style={{
            background: isLight
              ? 'linear-gradient(200deg, rgba(56, 189, 248, 0.22) 0%, rgba(14, 165, 233, 0.06) 40%, transparent 80%)'
              : 'linear-gradient(200deg, rgba(186, 230, 253, 0.6) 0%, rgba(56, 189, 248, 0.35) 25%, rgba(14, 165, 233, 0.1) 60%, transparent 100%)',
            filter: isLight ? 'blur(16px)' : 'blur(10px)',
            opacity: opacityMultiplier,
          }}
        />

        {/* Ray 4: Right Midfield Shaft */}
        <div
          className="absolute -top-40 left-[66%] w-[220px] sm:w-[320px] h-[160%] origin-top-right wave-ray-4"
          style={{
            background: isLight
              ? 'linear-gradient(192deg, rgba(6, 182, 212, 0.18) 0%, rgba(14, 165, 233, 0.06) 35%, transparent 75%)'
              : 'linear-gradient(192deg, rgba(6, 182, 212, 0.4) 0%, rgba(14, 165, 233, 0.18) 30%, rgba(2, 132, 199, 0.05) 65%, transparent 100%)',
            filter: isLight ? 'blur(22px)' : 'blur(16px)',
            opacity: opacityMultiplier * 0.85,
          }}
        />

        {/* Ray 5: Far Right Ambient Diffusion */}
        <div
          className="absolute -top-36 left-[84%] w-[180px] sm:w-[260px] h-[150%] origin-top-right wave-ray-1"
          style={{
            animationDirection: 'reverse',
            animationDuration: '18s',
            background: isLight
              ? 'linear-gradient(188deg, rgba(56, 189, 248, 0.15) 0%, transparent 70%)'
              : 'linear-gradient(188deg, rgba(56, 189, 248, 0.35) 0%, rgba(14, 165, 233, 0.14) 35%, transparent 80%)',
            filter: isLight ? 'blur(24px)' : 'blur(18px)',
            opacity: opacityMultiplier * 0.75,
          }}
        />
      </div>

      {/* ============================================================ */}
      {/* 3. FLOWING SINUSOIDAL WAVE CAUSTIC RIBBONS                   */}
      {/* ============================================================ */}
      <div className="absolute inset-0 w-full h-full overflow-hidden wave-ribbon-container">
        <svg
          viewBox="0 0 1600 800"
          preserveAspectRatio="none"
          fill="none"
          className={`w-[120%] -ml-[10%] h-full ${isLight ? 'opacity-35' : 'opacity-65'}`}
        >
          <defs>
            <linearGradient id={`waveRayGrad1_${theme}`} x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity={isLight ? 0.3 : 0.45} />
              <stop offset="35%" stopColor="#0ea5e9" stopOpacity={isLight ? 0.2 : 0.28} />
              <stop offset="70%" stopColor="#06b6d4" stopOpacity={isLight ? 0.08 : 0.12} />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`waveRayGrad2_${theme}`} x1="0%" y1="20%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7dd3fc" stopOpacity={isLight ? 0.25 : 0.35} />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity={isLight ? 0.12 : 0.18} />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
            </linearGradient>
            <filter id={`waveGlow_${theme}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={isLight ? '5' : '8'} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Undulating Wave Strand 1 */}
          <path
            d="M -100,120 C 250,220 500,40 850,160 C 1200,280 1450,80 1750,180"
            stroke={`url(#waveRayGrad1_${theme})`}
            strokeWidth={isLight ? '2.5' : '3.5'}
            fill="none"
            filter={`url(#waveGlow_${theme})`}
            className="wave-ribbon-path-1"
          />

          {/* Undulating Wave Strand 2 */}
          <path
            d="M -100,240 C 300,120 620,320 950,190 C 1280,70 1480,260 1750,140"
            stroke={`url(#waveRayGrad2_${theme})`}
            strokeWidth={isLight ? '2' : '2.5'}
            fill="none"
            filter={`url(#waveGlow_${theme})`}
            className="wave-ribbon-path-2"
          />

          {/* Soft Water Caustic Surface Ribbon 3 */}
          <path
            d="M -100,380 C 220,460 580,290 920,420 C 1260,540 1440,330 1750,390"
            stroke={`url(#waveRayGrad1_${theme})`}
            strokeWidth="2"
            fill="none"
            opacity={isLight ? 0.4 : 0.6}
            className="wave-ribbon-path-1"
            style={{ animationDirection: 'reverse', animationDuration: '14s' }}
          />
        </svg>
      </div>

      {/* ============================================================ */}
      {/* 4. SHIMMERING CAUSTIC WATER SURFACE PULSE                    */}
      {/* ============================================================ */}
      <div
        className="absolute inset-0 w-full h-full caustic-shimmer-layer pointer-events-none"
        style={{
          background: isLight
            ? 'radial-gradient(ellipse at 40% 30%, rgba(56, 189, 248, 0.08) 0%, rgba(14, 165, 233, 0.03) 45%, transparent 70%)'
            : 'radial-gradient(ellipse at 40% 30%, rgba(56, 189, 248, 0.14) 0%, rgba(14, 165, 233, 0.06) 45%, transparent 70%)',
          mixBlendMode: isLight ? 'multiply' : 'screen',
        }}
      />

      {/* ============================================================ */}
      {/* 5. GENTLE AQUATIC LUMINESCENT PARTICLES                      */}
      {/* ============================================================ */}
      {showBubbles && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <span
            className={`absolute w-2 h-2 rounded-full blur-[1px] aquatic-bubble ${
              isLight ? 'bg-sky-400/25' : 'bg-cyan-300/40'
            }`}
            style={{ left: '18%', bottom: '15%', animationDelay: '0s', animationDuration: '9s' }}
          />
          <span
            className={`absolute w-1.5 h-1.5 rounded-full blur-[0.5px] aquatic-bubble ${
              isLight ? 'bg-sky-500/20' : 'bg-sky-200/50'
            }`}
            style={{ left: '34%', bottom: '25%', animationDelay: '2.5s', animationDuration: '11s' }}
          />
          <span
            className={`absolute w-2.5 h-2.5 rounded-full blur-[1.5px] aquatic-bubble ${
              isLight ? 'bg-cyan-500/20' : 'bg-cyan-400/30'
            }`}
            style={{ left: '55%', bottom: '10%', animationDelay: '1.2s', animationDuration: '8s' }}
          />
          <span
            className={`absolute w-1 h-1 rounded-full blur-[0.5px] aquatic-bubble ${
              isLight ? 'bg-sky-600/20' : 'bg-white/60'
            }`}
            style={{ left: '72%', bottom: '30%', animationDelay: '4s', animationDuration: '10s' }}
          />
          <span
            className={`absolute w-2 h-2 rounded-full blur-[1px] aquatic-bubble ${
              isLight ? 'bg-sky-400/20' : 'bg-sky-300/35'
            }`}
            style={{ left: '88%', bottom: '20%', animationDelay: '3s', animationDuration: '12s' }}
          />
        </div>
      )}

      {/* Bottom fade into section border */}
      <div
        className={`absolute bottom-0 inset-x-0 h-32 pointer-events-none ${
          isLight
            ? 'bg-gradient-to-t from-white via-white/80 to-transparent'
            : isFooter
            ? 'bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent'
            : 'bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent'
        }`}
      />
    </div>
  );
}

