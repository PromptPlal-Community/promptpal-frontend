import React, { useEffect } from 'react';
import type { MessagePopupProps } from '../../types/message';

const MessagePopup: React.FC<MessagePopupProps> = ({
  message,
  type,
  duration = 5000,
  isVisible,
  onClose,
  title,
  showIcon = true,
  position = 'top-center'
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStyles = () => {
    const baseStyles = "bg-white rounded-xl shadow-2xl max-w-sm w-full transform transition-all duration-300 ease-in-out border-l-4";
    
    const typeStyles = {
      success: "border-purple-500",
      error: "border-red-500",
      warning: "border-amber-500",
      info: "border-blue-500"
    };

    const positionStyles = {
      'top-right': "animate-slide-in-right",
      'top-left': "animate-slide-in-left",
      'top-center': "animate-slide-in-top",
      'bottom-right': "animate-slide-in-right",
      'bottom-left': "animate-slide-in-left",
      'bottom-center': "animate-slide-in-bottom"
    };

    return `${baseStyles} ${typeStyles[type]} ${positionStyles[position]}`;
  };

  const getIconStyles = () => {
    const styles = {
      success: "text-purple-500 bg-purple-50",
      error: "text-red-500 bg-red-50",
      warning: "text-amber-500 bg-amber-50",
      info: "text-blue-500 bg-blue-50"
    };
    return styles[type];
  };

  const getProgressStyles = () => {
    const styles = {
      success: "bg-gradient-to-r from-purple-500 to-purple-400",
      error: "bg-gradient-to-r from-red-500 to-red-400",
      warning: "bg-gradient-to-r from-amber-500 to-amber-400",
      info: "bg-gradient-to-r from-blue-500 to-blue-400"
    };
    return styles[type];
  };

  const getBackdropPosition = () => {
    const positions = {
      'top-right': "items-start justify-end",
      'top-left': "items-start justify-start",
      'top-center': "items-start justify-center",
      'bottom-right': "items-end justify-end",
      'bottom-left': "items-end justify-start",
      'bottom-center': "items-end justify-center"
    };
    return positions[position];
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex p-4 md:p-6 ${getBackdropPosition()} bg-none bg-opacity-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleBackdropClick}
    >
      <div className={getStyles()}>
        {/* Header */}
        <div className="flex items-start gap-3 p-4 pb-2">
          {showIcon && (
            <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getIconStyles()}`}>
              {getIcon()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            {title && (
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                {title}
              </h4>
            )}
            <p className="text-sm text-gray-600 leading-relaxed">
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close message"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Bar */}
        {duration > 0 && (
          <div className="w-full h-1 bg-gray-200 overflow-hidden">
            <div 
              className={`h-full ${getProgressStyles()} transition-transform duration-${duration} ease-linear`}
              style={{ 
                animation: `shrinkWidth ${duration}ms linear forwards`,
                transformOrigin: 'left'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagePopup;