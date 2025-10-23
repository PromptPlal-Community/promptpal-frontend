
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '',
  title,
  description,
  action
}) => {
  return (
    <section className={`mb-8 ${className}`}>
      {(title || description || action) && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            {title && (
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-gray-600 max-w-3xl">
                {description}
              </p>
            )}
          </div>
          {action && (
            <div className="flex-shrink-0">
              {action}
            </div>
          )}
        </div>
      )}
      {children}
    </section>
  );
};