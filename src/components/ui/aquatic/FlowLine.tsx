import React from 'react';

interface FlowLineProps {
  className?: string;
  withPacingDot?: boolean;
}

export default function FlowLine({ className = '', withPacingDot = true }: FlowLineProps) {
  return (
    <div className={`relative w-full h-px my-8 overflow-hidden select-none pointer-events-none ${className}`} aria-hidden="true">
      {/* Background track */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" />
      {/* Dynamic hydrodynamic flow stream */}
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-75" />
      {withPacingDot && (
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(2,132,199,0.8)]" />
      )}
    </div>
  );
}
