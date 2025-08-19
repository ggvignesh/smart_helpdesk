import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CredentialsHelper = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockCredentials = [
    {
      role: 'Admin',
      email: 'admin@smarthelpdesk.com',
      password: 'admin123',
      description: 'Full system access and configuration',
      icon: 'Crown',
      color: 'text-warning'
    },
    {
      role: 'Agent',
      email: 'agent@smarthelpdesk.com',
      password: 'agent123',
      description: 'Ticket management and customer support',
      icon: 'UserCheck',
      color: 'text-primary'
    },
    {
      role: 'User',
      email: 'user@smarthelpdesk.com',
      password: 'user123',
      description: 'Submit and track support tickets',
      icon: 'User',
      color: 'text-accent'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  return (
    <div className="mt-6">
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full justify-center text-sm"
        iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
        iconPosition="right"
      >
        Demo Credentials
      </Button>
      {isExpanded && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-4 text-center">
            Use these credentials to test different user roles
          </p>
          
          <div className="space-y-3">
            {mockCredentials?.map((cred, index) => (
              <div key={index} className="p-3 bg-surface rounded-md border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name={cred?.icon} size={16} className={cred?.color} />
                    <span className="text-sm font-medium text-foreground">{cred?.role}</span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">{cred?.description}</p>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Email:</span>
                    <button
                      onClick={() => copyToClipboard(cred?.email)}
                      className="text-xs text-primary hover:text-primary/80 transition-smooth flex items-center space-x-1"
                    >
                      <span className="font-mono">{cred?.email}</span>
                      <Icon name="Copy" size={12} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Password:</span>
                    <button
                      onClick={() => copyToClipboard(cred?.password)}
                      className="text-xs text-primary hover:text-primary/80 transition-smooth flex items-center space-x-1"
                    >
                      <span className="font-mono">{cred?.password}</span>
                      <Icon name="Copy" size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-accent/10 rounded-md border border-accent/20">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-accent">Demo Mode</p>
                <p className="text-xs text-accent/80 mt-1">
                  This is a demonstration environment. All data is simulated and no real authentication is performed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CredentialsHelper;