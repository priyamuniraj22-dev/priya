import { useEffect, useState } from 'react';

interface ProgressBarProps {
  progress: number;
  color?: string;
  className?: string;
  animated?: boolean;
}

export default function ProgressBar({ progress, color = '#FFB703', className = '', animated = true }: ProgressBarProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      let start = displayProgress;
      const end = progress;
      const duration = 500; // ms
      const step = (end - start) / (duration / 16); // 60fps
      
      const timer = setInterval(() => {
        start += step;
        if ((step > 0 && start >= end) || (step < 0 && start <= end)) {
          setDisplayProgress(end);
          clearInterval(timer);
        } else {
          setDisplayProgress(start);
        }
      }, 16);
      
      return () => clearInterval(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, animated]);

  return (
    <div className={`w-full bg-gray-200 rounded-full h-3 overflow-hidden ${className}`}>
      <div 
        className="h-full rounded-full transition-all duration-300 ease-out"
        style={{ 
          width: `${displayProgress}%`,
          backgroundColor: color
        }}
      ></div>
    </div>
  );
}