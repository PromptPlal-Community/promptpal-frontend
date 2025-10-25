// components/dashboard/NotificationSettings.tsx
import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Shield } from 'lucide-react';

const NotificationSettings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: true,
    security: true,
    updates: false
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Notification Preferences</h2>
      <p className="text-gray-600 mb-8">Choose how you want to be notified</p>

      <div className="space-y-6">
        {[
          { key: 'email', label: 'Email Notifications', description: 'Receive updates via email', icon: Mail },
          { key: 'push', label: 'Push Notifications', description: 'Get browser notifications', icon: Bell },
          { key: 'marketing', label: 'Marketing Emails', description: 'Product updates and offers', icon: MessageSquare },
          { key: 'security', label: 'Security Alerts', description: 'Important security notifications', icon: Shield }
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                <item.icon className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.label}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
            <button
              onClick={() => toggleNotification(item.key as any)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications[item.key as keyof typeof notifications] 
                  ? 'bg-purple-600' 
                  : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications[item.key as keyof typeof notifications] 
                    ? 'translate-x-6' 
                    : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationSettings;