import { ReactNode } from 'react';

interface ChildButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

export default function ChildButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  className = '',
  icon
}: ChildButtonProps) {
  const baseClasses = "rounded-full font-bold transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-opacity-50";
  
  const variantClasses = {
    primary: "bg-[#FFB703] text-white hover:bg-[#e6a600] focus:ring-[#FFB703] shadow-md hover:shadow-lg",
    secondary: "bg-[#00B4D8] text-white hover:bg-[#009bbd] focus:ring-[#00B4D8] shadow-md hover:shadow-lg",
    success: "bg-[#10B981] text-white hover:bg-[#0da271] focus:ring-[#10B981] shadow-md hover:shadow-lg",
    warning: "bg-[#FF6363] text-white hover:bg-[#ff4d4d] focus:ring-[#FF6363] shadow-md hover:shadow-lg",
    outline: "bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50 focus:ring-gray-300 shadow-md hover:shadow-lg"
  };
  
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };
  
  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed transform-none" 
    : "cursor-pointer hover:-translate-y-1";
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${className}
        flex items-center justify-center gap-2
      `}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}