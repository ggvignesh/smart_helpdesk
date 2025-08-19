import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusBadge = ({ status, size = 'default' }) => {
  const getStatusConfig = (status) => {
    const configs = {
      'open': {
        label: 'Open',
        className: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: 'Circle',
        iconColor: 'text-blue-600'
      },
      'in-progress': {
        label: 'In Progress',
        className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: 'Clock',
        iconColor: 'text-yellow-600'
      },
      'pending': {
        label: 'Pending',
        className: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: 'Pause',
        iconColor: 'text-orange-600'
      },
      'resolved': {
        label: 'Resolved',
        className: 'bg-green-100 text-green-800 border-green-200',
        icon: 'CheckCircle',
        iconColor: 'text-green-600'
      },
      'closed': {
        label: 'Closed',
        className: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: 'XCircle',
        iconColor: 'text-gray-600'
      }
    };

    return configs?.[status] || configs?.['open'];
  };

  const config = getStatusConfig(status);
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    default: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 12,
    default: 14,
    lg: 16
  };

  return (
    <span className={`inline-flex items-center space-x-1 font-medium rounded-full border ${config?.className} ${sizeClasses?.[size]}`}>
      <Icon 
        name={config?.icon} 
        size={iconSizes?.[size]} 
        className={config?.iconColor}
      />
      <span>{config?.label}</span>
    </span>
  );
};

export default StatusBadge;