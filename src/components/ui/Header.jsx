import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user, onToggleSidebar, notifications = [] }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  const unreadNotifications = notifications?.filter(n => !n?.read)?.length;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleNotificationClick = (notification) => {
    if (notification?.ticketId) {
      window.location.href = `/ticket-detail?id=${notification?.ticketId}`;
    }
    setShowNotifications(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border z-1000">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section - Logo and Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </Button>
          
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Headphones" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground hidden sm:block">
              Smart Helpdesk
            </span>
          </Link>
        </div>

        {/* Right Section - Actions and User */}
        <div className="flex items-center space-x-4">
          {/* Global Search */}
          <div className="hidden md:flex items-center relative">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search tickets..."
                className="pl-10 pr-4 py-2 w-64 bg-muted border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Icon name="Bell" size={20} />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </span>
              )}
            </Button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-popover border border-border rounded-lg shadow-elevation-3 z-1200">
                <div className="p-4 border-b border-border">
                  <h3 className="font-medium text-foreground">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications?.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      No notifications
                    </div>
                  ) : (
                    notifications?.slice(0, 10)?.map((notification) => (
                      <div
                        key={notification?.id}
                        className={`p-4 border-b border-border cursor-pointer hover:bg-muted transition-smooth ${
                          !notification?.read ? 'bg-accent/5' : ''
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification?.type === 'success' ? 'bg-success' :
                            notification?.type === 'warning' ? 'bg-warning' :
                            notification?.type === 'error' ? 'bg-error' : 'bg-primary'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              {notification?.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification?.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification?.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {notifications?.length > 0 && (
                  <div className="p-3 border-t border-border">
                    <Link
                      to="/notifications"
                      className="text-sm text-primary hover:text-primary/80 transition-smooth"
                      onClick={() => setShowNotifications(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="hidden md:block text-sm font-medium text-foreground">
                {user?.name || 'User'}
              </span>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 top-12 w-56 bg-popover border border-border rounded-lg shadow-elevation-3 z-1200">
                <div className="p-3 border-b border-border">
                  <p className="font-medium text-foreground">{user?.name || 'User'}</p>
                  <p className="text-sm text-muted-foreground">{user?.email || 'user@example.com'}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.role || 'Agent'}</p>
                </div>
                <div className="py-2">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </Link>
                  <Link
                    to="/preferences"
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </Link>
                  <Link
                    to="/help"
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </Link>
                </div>
                <div className="border-t border-border py-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-error hover:bg-muted transition-smooth w-full text-left"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Search */}
      <div className="md:hidden px-6 pb-3">
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search tickets..."
            className="pl-10 pr-4 py-2 w-full bg-muted border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
          />
        </div>
      </div>
      {/* Click outside handlers */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-900"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;