import { ReactNode } from 'react';

interface BouncingElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function BouncingElement({ children, className = '', delay = 0 }: BouncingElementProps) {
  return (
    <div 
      className={`
        animate-bounce
        ${className}
      `}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: '2s'
      }}
    >
      {children}
    </div>
  );
}