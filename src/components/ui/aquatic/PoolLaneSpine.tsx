import React from 'react';

interface PoolLaneSpineProps {
  distance?: string;
  label?: string;
  sublabel?: string;
  className?: string;
}

export default function PoolLaneSpine({
  distance = '00.00M · START',
  label = 'OLYMPIC COMPETITION SPINE',
  sublabel,
  className = '',
}: PoolLaneSpineProps) {
  return (
    <div
      className={`relative flex items-center gap-4 select-none pointer-events-none py-6 ${className}`}
      aria-hidden="true"
    >
      {/* Distance telemetry stamp */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
        <span className="technical-mono text-[10px] font-black text-slate-500 tracking-wider">
          [{distance}]
        </span>
      </div>

      {/* The Olympic Pool Lane Rope Spine */}
      <div className="flex-1 h-3 relative flex items-center">
        {/* Underline guide wire */}
        <div className="w-full h-px bg-slate-200" />

        {/* Competition Lane Rope (Alternating Wave-Quelling Discs) */}
        <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 pool-lane-rope rounded-full opacity-80" />

        {/* Center Olympic T-Marker Cross */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <div className="w-px h-4 bg-sky-600 shadow-xs" />
          <div className="h-px w-4 bg-sky-600 shadow-xs absolute" />
          <span className="absolute -top-4 technical-mono text-[8px] font-bold text-sky-600 bg-white px-1">
            2.5M
          </span>
        </div>
      </div>

      {/* Right track label */}
      <div className="shrink-0 hidden min-[440px]:flex items-center gap-2">
        <span className="technical-mono text-[9px] sm:text-[10px] font-bold text-sky-700 tracking-wider">
          {label}
        </span>
        {sublabel && (
          <span className="technical-mono text-[8px] sm:text-[9px] text-slate-400 hidden sm:inline">
            // {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
