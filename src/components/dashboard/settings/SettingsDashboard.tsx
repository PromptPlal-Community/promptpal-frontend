// components/dashboard/SettingsDashboard.tsx
import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  User, 
  CreditCard, 
  Bell, 
  Shield, 
  HelpCircle,
  LogOut,
  TrendingUp,
  Crown,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  Home
} from 'lucide-react';
import SettingsNavbar from './SettingsNavbar';
import ProfileSettings from './ProfileSettings';
import SubscriptionSettings from './SubscriptionSettings';
import PaymentSettings from './PaymentSettings';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';
import TipsAndHelp from './TipsAndHelp';
import MyTrends from './MyTrends';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

type SettingsSection = 
  | 'profile' 
  | 'subscription' 
  | 'payment' 
  | 'notifications' 
  | 'privacy' 
  | 'trends'
  | 'tips'
  | 'logout';

const SettingsDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
    const { logout} = useAuth();

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { id: 'profile' as SettingsSection, label: 'My Profile', icon: User, description: 'Manage your personal information' },
    { id: 'trends' as SettingsSection, label: 'My Trends', icon: TrendingUp, description: 'View your usage analytics' },
    { id: 'subscription' as SettingsSection, label: 'Subscription', icon: Crown, description: 'Manage your plan' },
    { id: 'payment' as SettingsSection, label: 'Payment Methods', icon: CreditCard, description: 'Update billing information' },
    { id: 'notifications' as SettingsSection, label: 'Notifications', icon: Bell, description: 'Configure alerts' },
    { id: 'privacy' as SettingsSection, label: 'Privacy & Security', icon: Shield, description: 'Security settings' },
    { id: 'tips' as SettingsSection, label: 'Tips & Help', icon: HelpCircle, description: 'Get help and tips' },
    { id: 'logout' as SettingsSection, label: 'Logout', icon: LogOut, description: 'Sign out of your account' },
  ];

  const handleLogout = async () => {
            try {
            await logout()
        } catch (error) {
        console.error(error)
        }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSettings />;
      case 'trends':
        return <MyTrends />;
      case 'subscription':
        return <SubscriptionSettings />;
      case 'payment':
        return <PaymentSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'tips':
        return <TipsAndHelp />;
      case 'logout':
        handleLogout();
        return null;
      default:
        return <ProfileSettings />;
    }
  };

  const getActiveSectionLabel = () => {
    const activeItem = menuItems.find(item => item.id === activeSection);
    return activeItem?.label || 'Settings';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SettingsNavbar />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Mobile Header with Breadcrumb */}
        <div className="lg:hidden mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Settings</span>
                <ChevronRight className="w-4 h-4" />
                <span className="font-medium text-gray-900">{getActiveSectionLabel()}</span>
              </div>
            </div>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Section Indicator */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                {React.createElement(menuItems.find(item => item.id === activeSection)?.icon || Settings, { 
                  className: "w-5 h-5 text-purple-600" 
                })}
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{getActiveSectionLabel()}</h1>
                <p className="text-sm text-gray-600">
                  {menuItems.find(item => item.id === activeSection)?.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Sidebar Navigation - Mobile Overlay */}
          <div className={`
            fixed lg:static inset-0 z-50 lg:z-auto
            transition-transform duration-300 ease-in-out
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            {/* Mobile Backdrop */}
            {mobileMenuOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}
            
            {/* Sidebar Content */}
            <div className={`
              relative bg-white rounded-0 lg:rounded-2xl shadow-xl lg:shadow-sm 
              border-0 lg:border border-gray-200 p-4 lg:p-6 h-full lg:h-auto
              w-4/5 max-w-sm lg:max-w-none lg:w-80 overflow-y-auto
            `}>
              {/* Mobile Close Button */}
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Settings className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
                    <p className="text-sm text-gray-500">Manage your account</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Desktop Header (hidden on mobile) */}
              <div className="hidden lg:flex items-center gap-3 mb-8">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
                  <p className="text-sm text-gray-500">Manage your account</p>
                </div>
              </div>

              <nav className="space-y-1 lg:space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  const isLogout = item.id === 'logout';

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 lg:px-4 py-3 lg:py-3 
                        rounded-lg lg:rounded-xl text-left transition-all
                        ${isActive && !isLogout
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : isLogout
                          ? 'text-red-600 hover:bg-red-50 hover:border-red-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 ${isLogout ? 'text-red-500' : ''}`} />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm lg:text-base truncate">{item.label}</div>
                        <div className="text-xs text-gray-500 truncate">{item.description}</div>
                      </div>
                      {isActive && !isLogout && (
                        <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0" />
                      )}
                      {isMobile && !isActive && (
                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Upgrade Banner - Hidden on mobile when menu is open */}
              {!isMobile || !mobileMenuOpen ? (
                <div className="mt-6 lg:mt-8 p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-semibold text-sm">Unlock Premium</span>
                  </div>
                  <p className="text-xs opacity-90 mb-3 leading-relaxed">
                    Get access to advanced features and unlimited prompts
                  </p>
                  <button className="w-full bg-white text-purple-600 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors active:scale-95">
                    Upgrade Now
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation (optional) */}
      {isMobile && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 safe-area-inset-bottom">
          <div className="flex justify-around items-center">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Menu className="w-5 h-5" />
              <span className="text-xs">Menu</span>
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </button>
          </div>
        </div>
      )}

      {/* Add safe area spacing for mobile bottom nav */}
      {isMobile && <div className="h-16 lg:h-0" />}
    </div>
  );
};

export default SettingsDashboard;