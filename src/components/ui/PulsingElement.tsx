import { ReactNode } from 'react';

interface PulsingElementProps {
  children: ReactNode;
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

export default function PulsingElement({ children, className = '', speed = 'normal' }: PulsingElementProps) {
  const speedClass = {
    slow: 'animate-pulse-slow',
    normal: 'animate-pulse',
    fast: 'animate-pulse-fast'
  }[speed];

  return (
    <div 
      className={`
        ${speedClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
}