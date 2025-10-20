import React, { useState } from 'react';
import type { ReactNode } from 'react';
import MessagePopup from '../components/MessagePopup/MessagePopup';
import type { MessageType } from '../types/message';
import { MessageContext } from './useMessage';

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<MessageType>('info');
  const [duration, setDuration] = useState<number>(5000);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [position, setPosition] = useState<'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center'>('top-right');

  const showMessage = (
    msg: string, 
    msgType: MessageType, 
    msgDuration?: number, 
    msgTitle?: string,
    msgPosition?: typeof position
  ) => {
    setMessage(msg);
    setType(msgType);
    setDuration(msgDuration || 5000);
    setTitle(msgTitle || '');
    if (msgPosition) setPosition(msgPosition);
    setIsVisible(true);
  };

  const hideMessage = () => {
    setIsVisible(false);
  };

  return (
    <MessageContext.Provider value={{ showMessage, hideMessage }}>
      {children}
      <MessagePopup
        message={message}
        type={type}
        duration={duration}
        isVisible={isVisible}
        onClose={hideMessage}
        title={title}
        position={position}
      />
    </MessageContext.Provider>
  );
};