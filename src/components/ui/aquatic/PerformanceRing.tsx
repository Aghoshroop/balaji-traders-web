import React from 'react';

interface PerformanceRingProps {
  className?: string;
  size?: number;
}

export default function PerformanceRing({ className = '', size = 320 }: PerformanceRingProps) {
  return (
    <div
      className={`relative pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full animate-rotate-slow"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer subtle guide ring */}
        <circle
          cx="100"
          cy="100"
          r="96"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="4 8"
          className="text-sky-400/40"
        />
        {/* Mid trajectory arc */}
        <circle
          cx="100"
          cy="100"
          r="78"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="40 180"
          className="text-sky-500/60"
        />
        {/* Inner concentric ring */}
        <circle
          cx="100"
          cy="100"
          r="60"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-cyan-400/30"
        />
        {/* Cardinal tick marks */}
        <line x1="100" y1="2" x2="100" y2="8" stroke="currentColor" strokeWidth="1.5" className="text-sky-500/70" />
        <line x1="100" y1="192" x2="100" y2="198" stroke="currentColor" strokeWidth="1.5" className="text-sky-500/70" />
        <line x1="2" y1="100" x2="8" y2="100" stroke="currentColor" strokeWidth="1.5" className="text-sky-500/70" />
        <line x1="192" y1="100" x2="198" y2="100" stroke="currentColor" strokeWidth="1.5" className="text-sky-500/70" />
      </svg>
    </div>
  );
}
