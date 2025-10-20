import { createContext, useContext } from 'react';
import type { MessageContextType } from '../types/message';

export const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessage = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};