import React from 'react';

interface WaveDividerProps {
  fill?: string;
  className?: string;
  flip?: boolean;
}

export default function WaveDivider({ fill = '#f8fafc', className = '', flip = false }: WaveDividerProps) {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${className} ${
        flip ? 'rotate-180' : ''
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-8 sm:h-12 lg:h-16 block preserve-3d"
      >
        <path
          d="M0,32 C320,64 640,8 960,40 C1200,60 1360,36 1440,32 L1440,72 L0,72 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
