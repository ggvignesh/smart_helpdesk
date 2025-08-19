import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center mb-8">
      <Link to="/login" className="inline-flex items-center justify-center mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-elevation-2">
          <Icon name="Headphones" size={24} color="white" />
        </div>
      </Link>
      
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Create Your Account
      </h1>
      
      <p className="text-muted-foreground text-lg">
        Join Smart Helpdesk and streamline your support experience
      </p>
      
      <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
        <Icon name="Shield" size={16} />
        <span>Secure registration with enterprise-grade encryption</span>
      </div>
    </div>
  );
};

export default RegistrationHeader;