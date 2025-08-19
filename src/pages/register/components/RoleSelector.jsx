import React from 'react';
import Select from '../../../components/ui/Select';

const RoleSelector = ({ value, onChange, error, disabled = false }) => {
  const roleOptions = [
    { 
      value: 'user', 
      label: 'User', 
      description: 'Submit and track support tickets' 
    },
    { 
      value: 'agent', 
      label: 'Support Agent', 
      description: 'Handle and resolve customer tickets' 
    },
    { 
      value: 'admin', 
      label: 'Administrator', 
      description: 'Full system access and management' 
    }
  ];

  return (
    <Select
      label="Account Type"
      description="Select your role in the organization"
      options={roleOptions}
      value={value}
      onChange={onChange}
      error={error}
      placeholder="Choose your role..."
      required
      disabled={disabled}
      className="mb-4"
    />
  );
};

export default RoleSelector;