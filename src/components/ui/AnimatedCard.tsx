import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedCard({ children, className = '', onClick }: AnimatedCardProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden
        hover:shadow-xl hover:-translate-y-1 transition-all duration-300
        cursor-pointer transform-gpu
        ${className}
      `}
    >
      {children}
    </div>
  );
}