import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  showCloseButton?: boolean;
}

export default function ChildModal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  showCloseButton = true
}: ChildModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-xl',
    large: 'max-w-3xl'
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div 
        className={`
          bg-white rounded-3xl shadow-2xl w-full max-h-[90vh] overflow-auto
          ${sizeClasses[size]}
          animate-scaleIn
        `}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="sticky top-0 bg-white border-b-2 border-gray-100 p-4 md:p-6 flex items-center justify-between">
            {title ? (
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
            ) : (
              <div></div>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}