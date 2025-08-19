import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-elevation-2">
            <Icon name="Headphones" size={28} color="white" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-foreground">Smart Helpdesk</h1>
            <p className="text-sm text-muted-foreground">AI-Powered Support</p>
          </div>
        </div>
      </div>
      
      {/* Welcome Text */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Welcome Back</h2>
        <p className="text-muted-foreground">
          Sign in to access your helpdesk dashboard
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;