import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSuccess = ({ userEmail, userName }) => {
  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
        <Icon name="CheckCircle" size={32} className="text-success" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          Account Created Successfully!
        </h2>
        <p className="text-muted-foreground">
          Welcome to Smart Helpdesk, {userName}!
        </p>
      </div>
      
      <div className="bg-muted rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Mail" size={16} />
          <span>Verification email sent to:</span>
        </div>
        <p className="font-medium text-foreground">{userEmail}</p>
        <p className="text-xs text-muted-foreground">
          Please check your inbox and click the verification link to activate your account
        </p>
      </div>
      
      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          asChild
        >
          <Link to="/login">
            Continue to Sign In
          </Link>
        </Button>
        
        <Button
          variant="outline"
          size="default"
          fullWidth
          iconName="RefreshCw"
          iconPosition="left"
        >
          Resend Verification Email
        </Button>
      </div>
      
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Didn't receive the email? Check your spam folder or{' '}
          <Link 
            to="/help" 
            className="text-primary hover:text-primary/80 transition-smooth"
          >
            contact support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationSuccess;