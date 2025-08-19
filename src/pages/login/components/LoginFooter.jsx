import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginFooter = () => {
  return (
    <div className="space-y-6">
      {/* Create Account Link */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="text-primary hover:text-primary/80 font-medium transition-smooth"
          >
            Create Account
          </Link>
        </p>
      </div>
      {/* Security Indicators */}
      <div className="flex items-center justify-center space-x-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">256-bit Encryption</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">SOC 2 Compliant</span>
        </div>
      </div>
      {/* Copyright */}
      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} Smart Helpdesk. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginFooter;