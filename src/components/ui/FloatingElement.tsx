import { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
}

export default function FloatingElement({ children, className = '', delay = 0, amplitude = 10 }: FloatingElementProps) {
  return (
    <div 
      className={`
        animate-float
        ${className}
      `}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: '3s',
        '--float-amplitude': `${amplitude}px`
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}