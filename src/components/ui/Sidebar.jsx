import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle, user }) => {
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview and analytics'
    },
    {
      label: 'Tickets',
      icon: 'Ticket',
      children: [
        {
          label: 'All Tickets',
          path: '/ticket-list',
          icon: 'List',
          description: 'Manage all support tickets'
        },
        {
          label: 'Create Ticket',
          path: '/create-ticket',
          icon: 'Plus',
          description: 'Submit new support request'
        }
      ]
    },
    {
      label: 'Knowledge Base',
      path: '/knowledge-base',
      icon: 'BookOpen',
      description: 'Articles and documentation'
    }
  ];

  const isActiveRoute = (path) => {
    if (path === '/dashboard') {
      return location?.pathname === path;
    }
    return location?.pathname?.startsWith(path);
  };

  const isParentActive = (children) => {
    return children?.some(child => isActiveRoute(child?.path));
  };

  const renderNavigationItem = (item, isChild = false) => {
    const hasChildren = item?.children && item?.children?.length > 0;
    const isActive = item?.path ? isActiveRoute(item?.path) : isParentActive(item?.children);
    const isParent = hasChildren && !item?.path;

    if (hasChildren && !isChild) {
      return (
        <div key={item?.label} className="space-y-1">
          <div className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
            isParent && isParentActive(item?.children)
              ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
          } transition-smooth`}>
            <Icon name={item?.icon} size={20} className="flex-shrink-0" />
            {!isCollapsed && (
              <>
                <span className="ml-3">{item?.label}</span>
                <Icon name="ChevronDown" size={16} className="ml-auto" />
              </>
            )}
          </div>
          {!isCollapsed && (
            <div className="ml-6 space-y-1">
              {item?.children?.map(child => renderNavigationItem(child, true))}
            </div>
          )}
        </div>
      );
    }

    const Component = item?.path ? Link : 'div';
    const componentProps = item?.path ? { to: item?.path } : {};

    return (
      <Component
        key={item?.label}
        {...componentProps}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-smooth ${
          isActive
            ? 'text-primary bg-primary/10 border-r-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted'
        } ${isChild ? 'ml-0' : ''}`}
        title={isCollapsed ? item?.label : ''}
      >
        <Icon name={item?.icon} size={20} className="flex-shrink-0" />
        {!isCollapsed && (
          <div className="ml-3 flex-1">
            <div className="font-medium">{item?.label}</div>
            {item?.description && (
              <div className="text-xs text-muted-foreground mt-0.5">
                {item?.description}
              </div>
            )}
          </div>
        )}
      </Component>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 bg-surface border-r border-border z-900 transition-medium ${
        isCollapsed ? 'w-16' : 'w-60'
      } hidden lg:block`}>
        <div className="flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems?.map(item => renderNavigationItem(item))}
          </nav>

          {/* User Info & Collapse Toggle */}
          <div className="p-4 border-t border-border">
            {!isCollapsed && user && (
              <div className="mb-4 p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-primary-foreground">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user?.role || 'Agent'}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="w-full justify-center"
            >
              <Icon 
                name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
                size={16} 
              />
              {!isCollapsed && <span className="ml-2">Collapse</span>}
            </Button>
          </div>
        </div>
      </aside>
      {/* Mobile Sidebar Overlay */}
      <div className={`lg:hidden fixed inset-0 z-1100 ${isCollapsed ? 'pointer-events-none' : ''}`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity ${
            isCollapsed ? 'opacity-0' : 'opacity-50'
          }`}
          onClick={onToggle}
        />
        
        {/* Sidebar */}
        <aside className={`absolute left-0 top-0 bottom-0 w-64 bg-surface border-r border-border transform transition-transform ${
          isCollapsed ? '-translate-x-full' : 'translate-x-0'
        }`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Headphones" size={20} color="white" />
                </div>
                <span className="text-lg font-semibold text-foreground">
                  Smart Helpdesk
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navigationItems?.map(item => renderNavigationItem(item))}
            </nav>

            {/* User Info */}
            {user && (
              <div className="p-4 border-t border-border">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-foreground">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email || 'user@example.com'}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {user?.role || 'Agent'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;