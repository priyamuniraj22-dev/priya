import { ReactNode, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

interface ChildNotificationProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: ReactNode;
}

export default function ChildNotification({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose, 
  action,
  icon
}: ChildNotificationProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeConfig = {
    success: {
      icon: icon || <CheckCircle className="w-6 h-6 text-green-500" />,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800'
    },
    error: {
      icon: icon || <XCircle className="w-6 h-6 text-red-500" />,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800'
    },
    warning: {
      icon: icon || <AlertCircle className="w-6 h-6 text-yellow-500" />,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800'
    },
    info: {
      icon: icon || <AlertCircle className="w-6 h-6 text-blue-500" />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800'
    }
  };

  const config = typeConfig[type];

  return (
    <div 
      className={`
        ${config.bgColor} ${config.borderColor} ${config.textColor}
        border-l-4 rounded-r-lg shadow-lg p-4 mb-4
        animate-fadeInRight
        flex items-start gap-3
      `}
    >
      <div className="flex-shrink-0 mt-0.5">
        {config.icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-sm font-medium underline hover:no-underline"
          >
            {action.label}
          </button>
        )}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 ml-2 rounded-full p-1 hover:bg-black/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}