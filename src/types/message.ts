export type MessageType = 'success' | 'error' | 'warning' | 'info';

export interface MessagePopupProps {
  message: string;
  type: MessageType;
  duration?: number;
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  showIcon?: boolean;
  position?: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';
}

export interface MessageContextType {
  showMessage: (message: string, type: MessageType, duration?: number, title?: string) => void;
  hideMessage: () => void;
}