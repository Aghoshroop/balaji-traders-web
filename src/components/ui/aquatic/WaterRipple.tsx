import React from 'react';

interface WaterRippleProps {
  className?: string;
  size?: number;
}

export default function WaterRipple({ className = '', size = 480 }: WaterRippleProps) {
  return (
    <div
      className={`relative pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-full border border-sky-300/30 animate-pulse-ring" />
      <div className="absolute inset-[15%] rounded-full border border-sky-400/25" />
      <div className="absolute inset-[32%] rounded-full border border-sky-500/20" />
      <div className="absolute inset-[50%] rounded-full border border-cyan-400/30" />
    </div>
  );
}
