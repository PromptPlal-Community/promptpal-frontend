import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
    </div>
  );
};

export default LoadingState;
