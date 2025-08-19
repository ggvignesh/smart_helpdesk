import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../../components/AppIcon';

const QuickActions = ({ userRole }) => {
  const getActionsForRole = () => {
    switch (userRole) {
      case 'admin':
        return [
          {
            title: 'System Settings',
            description: 'Configure AI thresholds and auto-close settings',
            icon: 'Settings',
            path: '/admin/settings',
            variant: 'default'
          },
          {
            title: 'Knowledge Base',
            description: 'Manage articles and documentation',
            icon: 'BookOpen',
            path: '/knowledge-base',
            variant: 'outline'
          },
          {
            title: 'User Management',
            description: 'Manage agents and user permissions',
            icon: 'Users',
            path: '/admin/users',
            variant: 'outline'
          }
        ];
      case 'agent':
        return [
          {
            title: 'Review AI Drafts',
            description: 'Review and edit AI-generated responses',
            icon: 'MessageSquare',
            path: '/ticket-list?filter=ai-drafts',
            variant: 'default'
          },
          {
            title: 'Assigned Tickets',
            description: 'View tickets assigned to you',
            icon: 'UserCheck',
            path: '/ticket-list?filter=assigned',
            variant: 'outline'
          },
          {
            title: 'Knowledge Base',
            description: 'Search articles and documentation',
            icon: 'Search',
            path: '/knowledge-base',
            variant: 'outline'
          }
        ];
      default:
        return [
          {
            title: 'Create Ticket',
            description: 'Submit a new support request',
            icon: 'Plus',
            path: '/create-ticket',
            variant: 'default'
          },
          {
            title: 'My Tickets',
            description: 'View your submitted tickets',
            icon: 'Ticket',
            path: '/ticket-list',
            variant: 'outline'
          },
          {
            title: 'Help Center',
            description: 'Browse knowledge base articles',
            icon: 'HelpCircle',
            path: '/knowledge-base',
            variant: 'outline'
          }
        ];
    }
  };

  const actions = getActionsForRole();

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions?.map((action, index) => (
          <Link key={index} to={action?.path} className="block">
            <div className="flex items-center p-3 rounded-lg border border-border hover:bg-muted transition-smooth">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                <Icon name={action?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{action?.title}</h4>
                <p className="text-sm text-muted-foreground">{action?.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;