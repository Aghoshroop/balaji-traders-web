import React from 'react';

interface SwimLanePatternProps {
  className?: string;
  opacity?: number;
}

export default function SwimLanePattern({ className = '', opacity = 0.04 }: SwimLanePatternProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="swim-lane-grid" width="160" height="80" patternUnits="userSpaceOnUse">
            {/* Main vertical lane dividing line */}
            <line x1="0" y1="0" x2="0" y2="80" stroke="#0284c7" strokeWidth="1" strokeDasharray="6 6" />
            {/* Secondary subtle lane axis */}
            <line x1="160" y1="0" x2="160" y2="80" stroke="#0284c7" strokeWidth="1" strokeDasharray="6 6" />
            {/* Target T-cross marker at intervals */}
            <line x1="70" y1="40" x2="90" y2="40" stroke="#0284c7" strokeWidth="1" />
            <line x1="80" y1="35" x2="80" y2="45" stroke="#0284c7" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#swim-lane-grid)" />
      </svg>
    </div>
  );
}
